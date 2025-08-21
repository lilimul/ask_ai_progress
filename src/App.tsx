import { useEffect, useRef, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import systemPrompts from './prompts/system.json'

const MODEL_META = {
  'gpt1': {
    background:
      'OpenAI 的首个 GPT（2018），展示了「大规模无监督预训练 + 下游微调」范式的可行性，参数量约 117M，能力有限但奠定了方向。',
    stats:
      '研究阶段模型；无面向消费者的用户规模披露（学术与内部为主）。'
  },
  'gpt2': {
    background:
      '2019 年发布的第二代 GPT，基于 WebText 语料，按阶段开放，从 124M/355M/774M 到 1.5B（2019-11-05 全量放出）。以“更大规模 + 纯自监督”验证了零样本/少样本泛化能力。',
    stats:
      '研究/开发者为主的影响力；未有面向消费者的用户量披露（因滥用风险先分阶段发布，后全量开源）。'
  },
  'text-davinci-001': {
    background:
      'InstructGPT 早期对外型号之一（基于 GPT-3，经 RLHF 对齐），2022 年起在 OpenAI API 作为指令跟随方向的重要模型。',
    stats:
      'API 场景主力之一，但未披露单独用户/DAU；随后被 text-davinci-002/003 与 gpt-3.5 系列替代（进入弃用通道）。'
  },
  'gpt-3.5-turbo': {
    background:
      '支撑 ChatGPT 首发体验的 3.5 代聊天模型；2023-03 起随 Chat Completions API 面向开发者，后续加入函数调用、微调等能力。',
    stats:
      '带动 ChatGPT 在 2023-01 约两个月即达 1 亿 MAU（行业估算）；2023-11 官方口径为 1 亿 WAU（平台整体）。是当年最主流的对话模型之一。'
  },
  'gpt-4-0314': {
    background:
      'GPT-4 的首个公开快照（2023-03-14）。默认 8K（另有 32K 变体）；技术报告显示在多项专业基准上达到接近人类水平（如模拟律师资格考试约前 10%）。',
    stats:
      'Plus/企业场景核心能力来源之一；具体到 GPT-4 单模型的用户量未披露（平台 2023-11 为 1 亿 WAU，口径为 ChatGPT 整体）。'
  },
  'gpt-5-mini': {
    background:
      '2025-08-07 官方发布的新一代旗舰，面向编码、推理、长上下文等全面提升，并提供最高约 400K 上下文等规格（含多档位）。',
    stats:
      '已在 ChatGPT 与 OpenAI API 提供；上线初期与 4o 等并行，媒体报道关注度极高但未披露独立活跃用户规模（仍以平台口径报道为主）。'
  }
}

type ModelKey = keyof typeof MODEL_META
type RequestKey =
  | 'openai/gpt-5-mini'
  | 'openai/gpt-4-0314'
  | 'openai/gpt-3.5-turbo'
  | 'emulate/gpt1'
  | 'emulate/gpt2'
  | 'emulate/text-davinci-001'

type ModelStatus = {
  loading: boolean
  content: string
  error: string | null
}

type ModelStatusMap = Partial<Record<RequestKey, ModelStatus>>

export default function App() {
  function ModelMeta({ k }: { k: ModelKey }) {
    const meta = MODEL_META[k]
    if (!meta) return null
    return (
      <div className="mb-2 text-xs opacity-70 leading-relaxed">
        <p>{meta.background}</p>
        <p className="mt-1">数据：{meta.stats}</p>
      </div>
    )
  }
  const [isEditingTitle, setIsEditingTitle] = useState(false)
  const [titleInputValue, setTitleInputValue] = useState('')
  const [isEditingApiKey, setIsEditingApiKey] = useState(false)
  const [apiKeyValue, setApiKeyValue] = useState('')
  const defaultTitleText = 'What would you say if you could talk to a future OpenAI model?'
  const [displayTitle, setDisplayTitle] = useState(defaultTitleText)
  const [modelStatus, setModelStatus] = useState<ModelStatusMap>({})

  const isAnyLoading = Object.values(modelStatus).some((s) => s?.loading)

  const scrollContainerRef = useRef<HTMLDivElement | null>(null)
  const [fullyVisibleSet, setFullyVisibleSet] = useState<Set<string>>(new Set())

  function computeVisibility() {
    const container = scrollContainerRef.current
    if (!container) return
    const containerRect = container.getBoundingClientRect()
    const items = container.querySelectorAll<HTMLElement>('section[data-timeline-item]')
    const next = new Set<string>()
    items.forEach((el) => {
      const r = el.getBoundingClientRect()
      if (r.left >= containerRect.left && r.right <= containerRect.right) {
        const key = el.getAttribute('data-timeline-item')
        if (key) next.add(key)
      }
    })
    setFullyVisibleSet(next)
  }

  function ensureFullyVisible(label: string) {
    const container = scrollContainerRef.current
    if (!container) return
    const el = container.querySelector<HTMLElement>(`section[data-timeline-item="${label}"]`)
    if (!el) return
    const peek = 24 // extra pixels to reveal the next item
    const elLeft = el.offsetLeft
    const elRight = elLeft + el.offsetWidth
    const maxLeft = container.scrollWidth - container.clientWidth
    const viewLeft = container.scrollLeft
    const viewRight = viewLeft + container.clientWidth

    if (elLeft < viewLeft) {
      // Bring the item fully into view from the left, try to keep a small peek on the right if possible
      const target = Math.min(elLeft, Math.max(0, elRight - container.clientWidth + peek))
      container.scrollTo({ left: Math.max(0, Math.min(target, maxLeft)), behavior: 'smooth' })
    } else if (elRight > viewRight) {
      // Bring the item fully into view from the right, leaving a peek area on the right for the next item
      const target = Math.min(elLeft, elRight - container.clientWidth + peek)
      container.scrollTo({ left: Math.max(0, Math.min(target, maxLeft)), behavior: 'smooth' })
    }
  }

  useEffect(() => {
    computeVisibility()
    const onResize = () => computeVisibility()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // Initialize OpenRouter API key from URL query parameter `?key=`
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search)
      const keyParam = params.get('key')
      if (keyParam && keyParam.trim()) {
        setApiKeyValue(keyParam.trim())
      }
    } catch {}
  }, [])

  async function fetchOpenRouterChat(
    model: string,
    prompt: string,
    apiKey: string,
    systemPrompt?: string | null
  ) {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
        'X-Title': 'GPT History Demo',
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: 'system', content: systemPrompt || 'You are a helpful AI assistant.' },
          { role: 'user', content: prompt },
        ],
      }),
    })
    if (!response.ok) {
      const errorText = await response.text().catch(() => 'Request failed')
      throw new Error(errorText)
    }
    const data = await response.json()
    const content = data?.choices?.[0]?.message?.content ?? ''
    return content
  }

  function submitPrompt() {
    const trimmed = titleInputValue.trim()
    if (trimmed) setDisplayTitle(trimmed)
    setIsEditingTitle(false)

    if (!apiKeyValue.trim()) {
      setModelStatus((prev) => ({
        ...prev,
        'openai/gpt-5-mini': { loading: false, content: '', error: 'Missing OpenRouter API Key' },
        'openai/gpt-4-0314': { loading: false, content: '', error: 'Missing OpenRouter API Key' },
        'openai/gpt-3.5-turbo': { loading: false, content: '', error: 'Missing OpenRouter API Key' },
        'emulate/gpt1': { loading: false, content: '', error: 'Missing OpenRouter API Key' },
        'emulate/gpt2': { loading: false, content: '', error: 'Missing OpenRouter API Key' },
        'emulate/text-davinci-001': { loading: false, content: '', error: 'Missing OpenRouter API Key' },
      }))
      return
    }

    const requests: Array<{ key: RequestKey; model: string; systemPrompt: string | null | undefined }> = [
      { key: 'openai/gpt-5-mini', model: 'openai/gpt-5-mini', systemPrompt: null },
      { key: 'openai/gpt-4-0314', model: 'openai/gpt-4-0314', systemPrompt: null },
      { key: 'openai/gpt-3.5-turbo', model: 'openai/gpt-3.5-turbo', systemPrompt: null },
      { key: 'emulate/gpt1', model: 'openai/gpt-5-mini', systemPrompt: systemPrompts?.gpt1 as string | undefined },
      { key: 'emulate/gpt2', model: 'openai/gpt-5-mini', systemPrompt: systemPrompts?.gpt2 as string | undefined },
      { key: 'emulate/text-davinci-001', model: 'openai/gpt-5-mini', systemPrompt: (systemPrompts as Record<string, string | undefined>)?.['text-davinci-001'] },
    ]
    setModelStatus((prev) => ({
      ...prev,
      ...Object.fromEntries(requests.map((r) => [r.key, { loading: true, content: '', error: null }]))
    }))

    // Kick off each request and update as soon as it resolves
    requests.forEach((r) => {
      fetchOpenRouterChat(r.model, trimmed || displayTitle, apiKeyValue, r.systemPrompt)
        .then((content) => {
          setModelStatus((prev) => ({
            ...prev,
            [r.key]: { loading: false, content, error: null },
          }))
        })
        .catch((err) => {
          setModelStatus((prev) => ({
            ...prev,
            [r.key]: { loading: false, content: '', error: err?.message || 'Request failed' },
          }))
        })
    })
  }
  return (
    <main className="max-w-[1800px] mx-auto relative flex flex-col gap-8 md:gap-16 lg:gap-20 min-h-[100dvh] text-black dark:text-white selection:bg-black/90 selection:text-white dark:selection:bg-white/90 dark:selection:text-black">
      <div className="min-h-screen flex flex-col">
        <header className="bg-white/80 dark:bg-black/80 text-black dark:text-white backdrop-blur-sm sticky top-0 z-10 flex flex-row items-stretch min-h-[60px] border-[#cccccc] dark:border-[#333333] border-y sm:border-t-0">
          <a href="https://openai.com" className="p-2 flex shrink-0 items-center w-[60px] justify-center border-[#cccccc] dark:border-[#333333] 2xl:border-l" aria-label="OpenAI" />
          <p className="grow px-4 py-2 flex font-semibold items-center text-sm border-[#cccccc] dark:border-[#333333] border-x">
            AI has been evolving at an incredible rate. This piece aims to highlight the progress made so far.
          </p>
          <a
            href="https://progress.openai.com/?prompt=1"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold px-4 flex items-center dark:text-white md:px-8 border-[#cccccc] dark:border-[#333333] bg-black text-white dark:bg-white dark:text-black 2xl:border-r cursor-pointer hover:bg-[#333333] dark:hover:bg-[#F5F5F5]"
          >
            Source
          </a>
        </header>

        <div className="flex flex-col gap-2 min-h-[275px] lg:min-h-[300px] justify-top pt-[50px] lg:pt-[75px] pb-[50px] lg:pb-[75px] text-balance px-4">
          {isEditingApiKey ? (
            <input
              autoFocus
              value={apiKeyValue}
              onChange={(e) => setApiKeyValue(e.target.value)}
              onBlur={() => setIsEditingApiKey(false)}
              placeholder="Please input an OpenRouter API Key"
              className="opacity-45 bg-transparent outline-none border-b border-transparent focus:border-[#cccccc] dark:focus:border-[#333333]"
            />
          ) : (
            <p
              className="opacity-45 cursor-text"
              onClick={() => setIsEditingApiKey(true)}
              title="Click to edit"
            >
              {apiKeyValue ? 'Ask via OpenRouter' : 'Please input an OpenRouter API Key'}
            </p>
          )}
          <div className="fade-swap show">
            {isEditingTitle ? (
              <div className="flex items-center gap-2 lg:max-w-[80%]">
                <input
                  autoFocus
                  value={titleInputValue}
                  onChange={(e) => setTitleInputValue(e.target.value)}
                  onBlur={() => {
                    const trimmed = titleInputValue.trim()
                    if (trimmed) setDisplayTitle(trimmed)
                    setIsEditingTitle(false)
                  }}
                  placeholder="What would you ask..."
                  className="text-[30px] lg:text-[42px] tracking-tight leading-[1.15] font-semibold bg-transparent outline-none border-b border-[#cccccc] dark:border-[#333333] focus:border-black dark:focus:border-white placeholder:text-gray-400 flex-1 min-w-0"
                />
              </div>
            ) : (
              <div className="flex items-center gap-2 lg:max-w-[80%]">
                <h1
                  className="text-[30px] lg:text-[42px] tracking-tight leading-[1.15] font-semibold cursor-text"
                  onClick={() => {
                    setTitleInputValue(displayTitle)
                    setIsEditingTitle(true)
                  }}
                  title="Click to edit"
                >
                  {displayTitle}
                </h1>
                <button
                  id="composer-submit-button"
                  aria-label="Send prompt"
                  data-testid="send-button"
                  disabled={isAnyLoading}
                  className={`composer-submit-btn composer-submit-button-color h-[36px] w-[36px] rounded-full bg-black text-white flex items-center justify-center shrink-0 ${isAnyLoading ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}`}
                  onClick={submitPrompt}
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="icon">
                    <path d="M8.99992 16V6.41407L5.70696 9.70704C5.31643 10.0976 4.68342 10.0976 4.29289 9.70704C3.90237 9.31652 3.90237 8.6835 4.29289 8.29298L9.29289 3.29298L9.36907 3.22462C9.76184 2.90427 10.3408 2.92686 10.707 3.29298L15.707 8.29298L15.7753 8.36915C16.0957 8.76192 16.0731 9.34092 15.707 9.70704C15.3408 10.0732 14.7618 10.0958 14.3691 9.7754L14.2929 9.70704L10.9999 6.41407V16C10.9999 16.5523 10.5522 17 9.99992 17C9.44764 17 8.99992 16.5523 8.99992 16Z" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Years rail */}
        <div
          ref={scrollContainerRef}
          onScroll={computeVisibility}
          className="flex flex-col flex-1 min-h-0 overflow-x-auto hide-scrollbar snap-x snap-mandatory gap-3 sm:gap-4"
        >
          <div className="flex flex-row">
            {[
              { label: '2018' },
              { label: '2019' },
              { label: '2021' },
              { label: '2022', dim: true },
              { label: '2023', dim: true },
              { label: '2025', dim: true },
            ].map((y, idx) => (
              <div key={y.label} className={`grow flex flex-col gap-3 sm:gap-4 w-[calc(100vw-7.5rem)] md:w-[calc(50vw-2.5rem)] lg:w-[calc(33vw-2.5rem)] xl:w-[calc(25vw-1.25rem)] shrink-0 2xl:shrink ${y.dim ? 'cursor-pointer' : 'cursor-default'}`}>
                <p className="font-bold pl-4" style={{ opacity: y.dim ? 0.36 : 1 }}>{y.label}</p>
                <div className="flex flex-col flex-1 grow-0 text-[#cccccc] dark:text-[#333333]">
                  <div className="relative w-full" style={{ height: 30 }}>
                    <div className="absolute" style={{ width: 1, backgroundColor: 'currentColor', height: '100%', transform: 'translateX(-50%)', left: '1rem' }} />
                    <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(currentColor, currentColor)', backgroundRepeat: 'no-repeat', backgroundSize: '100% 1px', backgroundPosition: 'center', left: 0 }} />
                    {idx > 0 && (
                      <>
                        <div className="absolute top-1/2 -translate-y-1/2 bg-white dark:bg-black" style={{ right: '26.5px', width: '7px', height: '2px' }} />
                        <div className="absolute" style={{ right: '33.5px', top: '50%', width: '1px', height: '12px', backgroundColor: 'currentColor', transform: 'translateY(-50%) rotate(30deg)', transformOrigin: 'center' }} />
                        <div className="absolute" style={{ right: '26.5px', top: '50%', width: '1px', height: '12px', backgroundColor: 'currentColor', transform: 'translateY(-50%) rotate(30deg)', transformOrigin: 'center' }} />
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Content row */}
          <div className="flex flex-row">
            <section
              data-timeline-item="2018"
              onClick={() => {
                if (!fullyVisibleSet.has('2018')) ensureFullyVisible('2018')
              }}
              className={`snap-center md:snap-start lg:snap-center xl:snap-start px-4 overflow-x-auto w-[calc(100vw-7.5rem)] md:w-[calc(50vw-2.5rem)] lg:w-[calc(33vw-2.5rem)] xl:w-[calc(25vw-1.25rem)] shrink-0 2xl:shrink transition-opacity ${fullyVisibleSet.has('2018') ? '' : 'opacity-80 cursor-pointer'}`}
            >
              <div className="flex flex-col gap-3 sm:gap-4">
                <p className="font-bold uppercase opacity-45">GPT-1(mock by GPT-5-mini)</p>
                <div className="fade-swap show">
                  <ModelMeta k="gpt1" />
                  <div className="timeline-markdown">
                    {modelStatus['emulate/gpt1']?.loading ? (
                      <p>Loading…</p>
                    ) : modelStatus['emulate/gpt1']?.error ? (
                      <p className="text-red-500">{modelStatus['emulate/gpt1']?.error}</p>
                    ) : modelStatus['emulate/gpt1']?.content ? (
                      <ReactMarkdown>{modelStatus['emulate/gpt1']?.content}</ReactMarkdown>
                    ) : (
                      <p>
                        Ask a question above, then press the arrow to fetch a response in GPT-1 style.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </section>

            <section
              data-timeline-item="2019"
              onClick={() => {
                if (!fullyVisibleSet.has('2019')) ensureFullyVisible('2019')
              }}
              className={`snap-center md:snap-start lg:snap-center xl:snap-start px-4 overflow-x-auto w-[calc(100vw-7.5rem)] md:w-[calc(50vw-2.5rem)] lg:w-[calc(33vw-2.5rem)] xl:w-[calc(25vw-1.25rem)] shrink-0 2xl:shrink transition-opacity ${fullyVisibleSet.has('2019') ? '' : 'opacity-80 cursor-pointer'}`}
            >
              <div className="flex flex-col gap-3 sm:gap-4">
                <p className="font-bold uppercase opacity-45">GPT-2(mock by GPT-5-mini)</p>
                <div className="fade-swap show">
                  <ModelMeta k="gpt2" />
                  <div className="timeline-markdown">
                    {modelStatus['emulate/gpt2']?.loading ? (
                      <p>Loading…</p>
                    ) : modelStatus['emulate/gpt2']?.error ? (
                      <p className="text-red-500">{modelStatus['emulate/gpt2']?.error}</p>
                    ) : modelStatus['emulate/gpt2']?.content ? (
                      <ReactMarkdown>{modelStatus['emulate/gpt2']?.content}</ReactMarkdown>
                    ) : (
                      <p>
                        Ask a question above, then press the arrow to fetch a response in GPT-2 style.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </section>

            <section
              data-timeline-item="2021"
              onClick={() => {
                if (!fullyVisibleSet.has('2021')) ensureFullyVisible('2021')
              }}
              className={`snap-center md:snap-start lg:snap-center xl:snap-start px-4 overflow-x-auto w-[calc(100vw-7.5rem)] md:w-[calc(50vw-2.5rem)] lg:w-[calc(33vw-2.5rem)] xl:w-[calc(25vw-1.25rem)] shrink-0 2xl:shrink transition-opacity ${fullyVisibleSet.has('2021') ? '' : 'opacity-80 cursor-pointer'}`}
            >
              <div className="flex flex-col gap-3 sm:gap-4">
                <p className="font-bold uppercase opacity-45">text-davinci-001(mock by GPT-5-mini)</p>
                <div className="fade-swap show">
                  <ModelMeta k="text-davinci-001" />
                  <div className="timeline-markdown">
                    {modelStatus['emulate/text-davinci-001']?.loading ? (
                      <p>Loading…</p>
                    ) : modelStatus['emulate/text-davinci-001']?.error ? (
                      <p className="text-red-500">{modelStatus['emulate/text-davinci-001']?.error}</p>
                    ) : modelStatus['emulate/text-davinci-001']?.content ? (
                      <ReactMarkdown>{modelStatus['emulate/text-davinci-001']?.content}</ReactMarkdown>
                    ) : (
                      <p>
                        Ask a question above, then press the arrow to fetch a response in text-davinci-001 style.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </section>

            <section
              data-timeline-item="2022"
              onClick={() => {
                if (!fullyVisibleSet.has('2022')) ensureFullyVisible('2022')
              }}
              className={`snap-center md:snap-start lg:snap-center xl:snap-start px-4 overflow-x-auto w-[calc(100vw-7.5rem)] md:w-[calc(50vw-2.5rem)] lg:w-[calc(33vw-2.5rem)] xl:w-[calc(25vw-1.25rem)] shrink-0 2xl:shrink transition-opacity ${fullyVisibleSet.has('2022') ? '' : 'opacity-80 cursor-pointer'}`}
            >
              <div className="flex flex-col gap-3 sm:gap-4">
                <p className="font-bold uppercase opacity-45">gpt-3.5-turbo</p>
                <div className="fade-swap show">
                  <ModelMeta k="gpt-3.5-turbo" />
                  <div className="timeline-markdown">
                    {modelStatus['openai/gpt-3.5-turbo']?.loading ? (
                      <p>Loading…</p>
                    ) : modelStatus['openai/gpt-3.5-turbo']?.error ? (
                      <p className="text-red-500">{modelStatus['openai/gpt-3.5-turbo']?.error}</p>
                    ) : modelStatus['openai/gpt-3.5-turbo']?.content ? (
                      <ReactMarkdown>{modelStatus['openai/gpt-3.5-turbo']?.content}</ReactMarkdown>
                    ) : (
                      <p>
                        Ask a question above, then press the arrow to fetch a response from gpt-3.5-turbo.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </section>

            <section
              data-timeline-item="2023"
              onClick={() => {
                if (!fullyVisibleSet.has('2023')) ensureFullyVisible('2023')
              }}
              className={`snap-center md:snap-start lg:snap-center xl:snap-start px-4 overflow-x-auto w-[calc(100vw-7.5rem)] md:w-[calc(50vw-2.5rem)] lg:w-[calc(33vw-2.5rem)] xl:w-[calc(25vw-1.25rem)] shrink-0 2xl:shrink transition-opacity ${fullyVisibleSet.has('2023') ? '' : 'opacity-80 cursor-pointer'}`}
            >
              <div className="flex flex-col gap-3 sm:gap-4">
                <p className="font-bold uppercase opacity-45">gpt-4-0314</p>
                <div className="fade-swap show">
                  <ModelMeta k="gpt-4-0314" />
                  <div className="timeline-markdown">
                    {modelStatus['openai/gpt-4-0314']?.loading ? (
                      <p>Loading…</p>
                    ) : modelStatus['openai/gpt-4-0314']?.error ? (
                      <p className="text-red-500">{modelStatus['openai/gpt-4-0314']?.error}</p>
                    ) : modelStatus['openai/gpt-4-0314']?.content ? (
                      <ReactMarkdown>{modelStatus['openai/gpt-4-0314']?.content}</ReactMarkdown>
                    ) : (
                      <p>
                        Ask a question above, then press the arrow to fetch a response from gpt-4-0314.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </section>

            <section
              data-timeline-item="2025"
              onClick={() => {
                if (!fullyVisibleSet.has('2025')) ensureFullyVisible('2025')
              }}
              className={`snap-center md:snap-start lg:snap-center xl:snap-start px-4 overflow-x-auto w-[calc(100vw-7.5rem)] md:w-[calc(50vw-2.5rem)] lg:w-[calc(33vw-2.5rem)] xl:w-[calc(25vw-1.25rem)] shrink-0 2xl:shrink transition-opacity ${fullyVisibleSet.has('2025') ? '' : 'opacity-80 cursor-pointer'}`}
            >
              <div className="flex flex-col gap-3 sm:gap-4">
                <p className="font-bold uppercase opacity-45">gpt-5-mini</p>
                <div className="fade-swap show">
                  <ModelMeta k="gpt-5-mini" />
                  <div className="timeline-markdown">
                    {modelStatus['openai/gpt-5-mini']?.loading ? (
                      <p>Loading…</p>
                    ) : modelStatus['openai/gpt-5-mini']?.error ? (
                      <p className="text-red-500">{modelStatus['openai/gpt-5-mini']?.error}</p>
                    ) : modelStatus['openai/gpt-5-mini']?.content ? (
                      <ReactMarkdown>{modelStatus['openai/gpt-5-mini']?.content}</ReactMarkdown>
                    ) : (
                      <p>
                        Ask a question above, then press the arrow to fetch a response from gpt-5-mini.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  )
}
