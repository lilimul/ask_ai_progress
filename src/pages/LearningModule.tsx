import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  ArrowRight, 
  Volume2, 
  Check, 
  X,
  Mic,
  MicOff,
  Play,
  Pause
} from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';
import { getCourseById, getLessonById, getModuleContent } from '../services/mockData';
import { useAuthStore } from '../store/authStore';
import { useProgressStore } from '../store/progressStore';
import type { ModuleType } from '../types';

export default function LearningModule() {
  const { courseId, lessonId, moduleType } = useParams<{ 
    courseId: string; 
    lessonId: string; 
    moduleType?: ModuleType;
  }>();
  const navigate = useNavigate();
  const { user, updateXP } = useAuthStore();
  const { addProgress, incrementStudyTime, incrementWordsLearned } = useProgressStore();
  
  const [currentCourse, setCurrentCourse] = useState(getCourseById(courseId || ''));
  const [currentLesson, setCurrentLesson] = useState(getLessonById(courseId || '', lessonId || ''));
  const [activeModuleType, setActiveModuleType] = useState<ModuleType>(moduleType || 'vocabulary');
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [userInput, setUserInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [completed, setCompleted] = useState(false);
  const [startTime] = useState(Date.now());

  const moduleContent = getModuleContent(`${lessonId}-${activeModuleType === 'vocabulary' ? 'm1' : activeModuleType === 'grammar' ? 'm2' : activeModuleType === 'speaking' ? 'm3' : 'm4'}`);

  useEffect(() => {
    setCurrentCourse(getCourseById(courseId || ''));
    setCurrentLesson(getLessonById(courseId || '', lessonId || ''));
  }, [courseId, lessonId]);

  useEffect(() => {
    if (moduleType) {
      setActiveModuleType(moduleType);
    }
  }, [moduleType]);

  useEffect(() => {
    return () => {
      const timeSpent = Math.floor((Date.now() - startTime) / 60000);
      if (timeSpent > 0) {
        incrementStudyTime(timeSpent);
      }
    };
  }, [startTime, incrementStudyTime]);

  const handleComplete = useCallback(() => {
    if (!user || !currentLesson) return;
    
    const timeSpent = Math.floor((Date.now() - startTime) / 60000);
    
    addProgress({
      id: `${user.id}-${courseId}-${lessonId}-${activeModuleType}`,
      userId: user.id,
      courseId: courseId || '',
      lessonId: lessonId || '',
      moduleId: activeModuleType,
      completed: true,
      score,
      timeSpent,
      completedAt: new Date().toISOString(),
    });

    const xpEarned = Math.floor(score * 10 + timeSpent * 5);
    updateXP(xpEarned);
    
    if (activeModuleType === 'vocabulary') {
      incrementWordsLearned(5);
    }

    setCompleted(true);
  }, [user, currentLesson, courseId, lessonId, activeModuleType, score, startTime, addProgress, updateXP, incrementWordsLearned]);

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      const langMap: Record<string, string> = {
        english: 'en-US',
        japanese: 'ja-JP',
        korean: 'ko-KR',
        chinese: 'zh-CN',
        spanish: 'es-ES',
        french: 'fr-FR',
        german: 'de-DE',
      };
      utterance.lang = langMap[currentCourse?.language || 'english'] || 'en-US';
      utterance.rate = 0.8;
      window.speechSynthesis.speak(utterance);
    }
  };

  const startRecording = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      const recognition = new SpeechRecognition();
      
      const langMap: Record<string, string> = {
        english: 'en-US',
        japanese: 'ja-JP',
        korean: 'ko-KR',
        chinese: 'zh-CN',
        spanish: 'es-ES',
        french: 'fr-FR',
        german: 'de-DE',
      };
      
      recognition.lang = langMap[currentCourse?.language || 'english'] || 'en-US';
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => {
        setIsRecording(true);
      };

      recognition.onresult = (event: any) => {
        const result = event.results[0][0].transcript;
        setTranscript(result);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognition.start();
    } else {
      alert('Speech recognition is not supported in your browser.');
    }
  };

  const renderVocabularyModule = () => {
    const words = moduleContent?.vocabulary?.words || [];
    if (words.length === 0) {
      return (
        <div className="text-center py-12">
          <p className="text-gray-500">No vocabulary content available.</p>
        </div>
      );
    }

    const currentWord = words[currentIndex];
    const isLastWord = currentIndex === words.length - 1;

    return (
      <div className="max-w-2xl mx-auto">
        <div className="glass rounded-2xl p-8 mb-6">
          <div className="text-center mb-8">
            <motion.div
              key={currentWord.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="font-display text-4xl font-bold mb-2">{currentWord.word}</h2>
              <p className="text-gray-500 text-lg mb-4">{currentWord.pronunciation}</p>
              <button
                onClick={() => speakText(currentWord.word)}
                className="p-3 rounded-full bg-primary-100 text-primary-500 hover:bg-primary-200 transition-colors mb-4"
              >
                <Volume2 className="w-6 h-6" />
              </button>
              <p className="text-xl text-gray-700 dark:text-gray-300 mb-2">{currentWord.meaning}</p>
              <p className="text-gray-500 italic">"{currentWord.example}"</p>
            </motion.div>
          </div>

          <div className="flex justify-center gap-4">
            <button
              onClick={() => {
                if (currentIndex > 0) {
                  setCurrentIndex(currentIndex - 1);
                  setShowResult(false);
                  setIsCorrect(null);
                }
              }}
              disabled={currentIndex === 0}
              className="p-3 rounded-full bg-gray-100 dark:bg-gray-800 disabled:opacity-50"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => {
                setScore(score + 1);
                if (isLastWord) {
                  handleComplete();
                } else {
                  setCurrentIndex(currentIndex + 1);
                }
              }}
              className="btn-primary flex items-center gap-2"
            >
              {isLastWord ? 'Complete' : 'Next'}
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex justify-center gap-2">
          {words.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex ? 'bg-primary-500' :
                index < currentIndex ? 'bg-success-500' : 'bg-gray-300 dark:bg-gray-600'
              }`}
            />
          ))}
        </div>
      </div>
    );
  };

  const renderGrammarModule = () => {
    const exercises = moduleContent?.grammar?.exercises || [];
    if (exercises.length === 0) {
      return (
        <div className="text-center py-12">
          <p className="text-gray-500">No grammar exercises available.</p>
        </div>
      );
    }

    const currentExercise = exercises[currentIndex];
    const isLastExercise = currentIndex === exercises.length - 1;

    const checkAnswer = () => {
      const correct = selectedAnswer === currentExercise.answer || userInput.toLowerCase().trim() === currentExercise.answer.toLowerCase();
      setIsCorrect(correct);
      setShowResult(true);
      if (correct) {
        setScore(score + 1);
      }
    };

    return (
      <div className="max-w-2xl mx-auto">
        <div className="glass rounded-2xl p-8 mb-6">
          <div className="mb-6">
            <span className="text-sm text-gray-500 mb-2 block">
              Exercise {currentIndex + 1} of {exercises.length}
            </span>
            <h3 className="font-display text-xl font-semibold mb-4">{currentExercise.question}</h3>
          </div>

          {currentExercise.type === 'choice' && currentExercise.options ? (
            <div className="space-y-3">
              {currentExercise.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => !showResult && setSelectedAnswer(option)}
                  disabled={showResult}
                  className={`w-full p-4 rounded-xl text-left transition-all ${
                    showResult
                      ? option === currentExercise.answer
                        ? 'bg-success-100 border-2 border-success-500'
                        : selectedAnswer === option
                        ? 'bg-error-100 border-2 border-error-500'
                        : 'bg-gray-100 dark:bg-gray-800'
                      : selectedAnswer === option
                      ? 'bg-primary-100 border-2 border-primary-500'
                      : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 border-2 border-transparent'
                  }`}
                >
                  <span className="font-medium">{option}</span>
                </button>
              ))}
            </div>
          ) : (
            <div>
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                disabled={showResult}
                placeholder="Type your answer..."
                className={`w-full p-4 rounded-xl border-2 transition-all ${
                  showResult
                    ? isCorrect
                      ? 'border-success-500 bg-success-50'
                      : 'border-error-500 bg-error-50'
                    : 'border-gray-200 dark:border-gray-700 focus:border-primary-500'
                } bg-white dark:bg-gray-800 focus:outline-none`}
              />
            </div>
          )}

          {showResult && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mt-4 p-4 rounded-xl ${isCorrect ? 'bg-success-50' : 'bg-error-50'}`}
            >
              <div className="flex items-center gap-2 mb-2">
                {isCorrect ? (
                  <Check className="w-5 h-5 text-success-500" />
                ) : (
                  <X className="w-5 h-5 text-error-500" />
                )}
                <span className={`font-semibold ${isCorrect ? 'text-success-600' : 'text-error-600'}`}>
                  {isCorrect ? 'Correct!' : 'Incorrect'}
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {currentExercise.explanation}
              </p>
              {!isCorrect && (
                <p className="text-sm mt-2">
                  <span className="font-medium">Correct answer:</span> {currentExercise.answer}
                </p>
              )}
            </motion.div>
          )}

          <div className="flex justify-center gap-4 mt-6">
            {!showResult ? (
              <button
                onClick={checkAnswer}
                disabled={!selectedAnswer && !userInput}
                className="btn-primary disabled:opacity-50"
              >
                Check Answer
              </button>
            ) : (
              <button
                onClick={() => {
                  if (isLastExercise) {
                    handleComplete();
                  } else {
                    setCurrentIndex(currentIndex + 1);
                    setShowResult(false);
                    setIsCorrect(null);
                    setSelectedAnswer('');
                    setUserInput('');
                  }
                }}
                className="btn-primary flex items-center gap-2"
              >
                {isLastExercise ? 'Complete' : 'Next'}
                <ArrowRight className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        <div className="flex justify-center gap-2">
          {exercises.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex ? 'bg-primary-500' :
                index < currentIndex ? 'bg-success-500' : 'bg-gray-300 dark:bg-gray-600'
              }`}
            />
          ))}
        </div>
      </div>
    );
  };

  const renderSpeakingModule = () => {
    const phrases = moduleContent?.speaking?.phrases || [];
    if (phrases.length === 0) {
      return (
        <div className="text-center py-12">
          <p className="text-gray-500">No speaking exercises available.</p>
        </div>
      );
    }

    const currentPhrase = phrases[currentIndex];
    const isLastPhrase = currentIndex === phrases.length - 1;

    const calculateSimilarity = (str1: string, str2: string) => {
      const s1 = str1.toLowerCase().replace(/[^a-z0-9]/g, '');
      const s2 = str2.toLowerCase().replace(/[^a-z0-9]/g, '');
      if (s1 === s2) return 100;
      const longer = s1.length > s2.length ? s1 : s2;
      if (longer.length === 0) return 100;
      const editDistance = (a: string, b: string): number => {
        if (a.length === 0) return b.length;
        if (b.length === 0) return a.length;
        const matrix = Array(a.length + 1).fill(null).map(() => Array(b.length + 1).fill(null));
        for (let i = 0; i <= a.length; i++) matrix[i][0] = i;
        for (let j = 0; j <= b.length; j++) matrix[0][j] = j;
        for (let i = 1; i <= a.length; i++) {
          for (let j = 1; j <= b.length; j++) {
            const cost = a[i - 1] === b[j - 1] ? 0 : 1;
            matrix[i][j] = Math.min(matrix[i - 1][j] + 1, matrix[i][j - 1] + 1, matrix[i - 1][j - 1] + cost);
          }
        }
        return matrix[a.length][b.length];
      };
      return Math.round((1 - editDistance(s1, s2) / longer.length) * 100);
    };

    const similarity = transcript ? calculateSimilarity(transcript, currentPhrase.text) : 0;

    return (
      <div className="max-w-2xl mx-auto">
        <div className="glass rounded-2xl p-8 mb-6">
          <div className="text-center mb-8">
            <h2 className="font-display text-2xl font-bold mb-4">{currentPhrase.text}</h2>
            <p className="text-gray-500 mb-4">{currentPhrase.translation}</p>
            
            <button
              onClick={() => speakText(currentPhrase.text)}
              className="p-4 rounded-full bg-primary-100 text-primary-500 hover:bg-primary-200 transition-colors mb-6"
            >
              <Volume2 className="w-8 h-8" />
            </button>

            <div className="mb-6">
              <button
                onClick={startRecording}
                disabled={isRecording}
                className={`p-6 rounded-full transition-all ${
                  isRecording
                    ? 'bg-error-500 text-white animate-pulse'
                    : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {isRecording ? (
                  <MicOff className="w-8 h-8" />
                ) : (
                  <Mic className="w-8 h-8" />
                )}
              </button>
              <p className="text-sm text-gray-500 mt-2">
                {isRecording ? 'Listening...' : 'Click to record'}
              </p>
            </div>

            {transcript && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-xl bg-gray-100 dark:bg-gray-800 mb-4"
              >
                <p className="text-lg font-medium mb-2">You said:</p>
                <p className="text-xl">{transcript}</p>
                <div className="mt-4">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="text-sm text-gray-500">Similarity:</span>
                    <span className={`text-lg font-bold ${
                      similarity >= 80 ? 'text-success-500' :
                      similarity >= 50 ? 'text-accent-500' : 'text-error-500'
                    }`}>
                      {similarity}%
                    </span>
                  </div>
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all ${
                        similarity >= 80 ? 'bg-success-500' :
                        similarity >= 50 ? 'bg-accent-500' : 'bg-error-500'
                      }`}
                      style={{ width: `${similarity}%` }}
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          <div className="flex justify-center gap-4">
            <button
              onClick={() => {
                setTranscript('');
                if (currentIndex > 0) {
                  setCurrentIndex(currentIndex - 1);
                }
              }}
              disabled={currentIndex === 0}
              className="p-3 rounded-full bg-gray-100 dark:bg-gray-800 disabled:opacity-50"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => {
                setTranscript('');
                if (similarity >= 50) {
                  setScore(score + 1);
                }
                if (isLastPhrase) {
                  handleComplete();
                } else {
                  setCurrentIndex(currentIndex + 1);
                }
              }}
              className="btn-primary flex items-center gap-2"
            >
              {isLastPhrase ? 'Complete' : 'Next'}
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex justify-center gap-2">
          {phrases.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex ? 'bg-primary-500' :
                index < currentIndex ? 'bg-success-500' : 'bg-gray-300 dark:bg-gray-600'
              }`}
            />
          ))}
        </div>
      </div>
    );
  };

  const renderListeningModule = () => {
    const content = moduleContent?.listening;
    if (!content) {
      return (
        <div className="text-center py-12">
          <p className="text-gray-500">No listening exercises available.</p>
        </div>
      );
    }

    const questions = content.questions;
    const currentQuestion = questions[currentIndex];
    const isLastQuestion = currentIndex === questions.length - 1;

    const checkAnswer = () => {
      const correct = selectedAnswer === currentQuestion.answer;
      setIsCorrect(correct);
      setShowResult(true);
      if (correct) {
        setScore(score + 1);
      }
    };

    return (
      <div className="max-w-2xl mx-auto">
        <div className="glass rounded-2xl p-8 mb-6">
          <div className="mb-6">
            <div className="flex items-center justify-center gap-4 mb-6">
              <button
                onClick={() => speakText(content.transcript)}
                className="p-4 rounded-full transition-all bg-primary-100 text-primary-500 hover:bg-primary-200"
              >
                <Play className="w-6 h-6" />
              </button>
              <div className="text-center">
                <p className="text-sm text-gray-500">Click to play audio</p>
              </div>
            </div>

            <span className="text-sm text-gray-500 mb-2 block">
              Question {currentIndex + 1} of {questions.length}
            </span>
            <h3 className="font-display text-xl font-semibold mb-4">{currentQuestion.question}</h3>
          </div>

          {currentQuestion.type === 'choice' && currentQuestion.options ? (
            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => !showResult && setSelectedAnswer(option)}
                  disabled={showResult}
                  className={`w-full p-4 rounded-xl text-left transition-all ${
                    showResult
                      ? option === currentQuestion.answer
                        ? 'bg-success-100 border-2 border-success-500'
                        : selectedAnswer === option
                        ? 'bg-error-100 border-2 border-error-500'
                        : 'bg-gray-100 dark:bg-gray-800'
                      : selectedAnswer === option
                      ? 'bg-primary-100 border-2 border-primary-500'
                      : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 border-2 border-transparent'
                  }`}
                >
                  <span className="font-medium">{option}</span>
                </button>
              ))}
            </div>
          ) : (
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              disabled={showResult}
              placeholder="Type your answer..."
              className={`w-full p-4 rounded-xl border-2 transition-all ${
                showResult
                  ? isCorrect
                    ? 'border-success-500 bg-success-50'
                    : 'border-error-500 bg-error-50'
                  : 'border-gray-200 dark:border-gray-700 focus:border-primary-500'
              } bg-white dark:bg-gray-800 focus:outline-none`}
            />
          )}

          {showResult && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mt-4 p-4 rounded-xl ${isCorrect ? 'bg-success-50' : 'bg-error-50'}`}
            >
              <div className="flex items-center gap-2">
                {isCorrect ? (
                  <Check className="w-5 h-5 text-success-500" />
                ) : (
                  <X className="w-5 h-5 text-error-500" />
                )}
                <span className={`font-semibold ${isCorrect ? 'text-success-600' : 'text-error-600'}`}>
                  {isCorrect ? 'Correct!' : `Incorrect. Answer: ${currentQuestion.answer}`}
                </span>
              </div>
            </motion.div>
          )}

          <div className="flex justify-center gap-4 mt-6">
            {!showResult ? (
              <button
                onClick={checkAnswer}
                disabled={!selectedAnswer && !userInput}
                className="btn-primary disabled:opacity-50"
              >
                Check Answer
              </button>
            ) : (
              <button
                onClick={() => {
                  if (isLastQuestion) {
                    handleComplete();
                  } else {
                    setCurrentIndex(currentIndex + 1);
                    setShowResult(false);
                    setIsCorrect(null);
                    setSelectedAnswer('');
                    setUserInput('');
                  }
                }}
                className="btn-primary flex items-center gap-2"
              >
                {isLastQuestion ? 'Complete' : 'Next'}
                <ArrowRight className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        <div className="flex justify-center gap-2">
          {questions.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex ? 'bg-primary-500' :
                index < currentIndex ? 'bg-success-500' : 'bg-gray-300 dark:bg-gray-600'
              }`}
            />
          ))}
        </div>
      </div>
    );
  };

  if (!currentCourse || !currentLesson) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Lesson Not Found</h2>
          <Link to="/courses" className="btn-primary">
            Back to Courses
          </Link>
        </div>
      </div>
    );
  }

  const moduleIcons: Record<ModuleType, string> = {
    vocabulary: '📚',
    grammar: '✏️',
    speaking: '🎤',
    listening: '🎧',
  };

  const moduleNames: Record<ModuleType, string> = {
    vocabulary: 'Vocabulary',
    grammar: 'Grammar',
    speaking: 'Speaking',
    listening: 'Listening',
  };

  if (completed) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass rounded-3xl p-8 text-center max-w-md"
        >
          <div className="w-20 h-20 mx-auto mb-6 rounded-full gradient-success flex items-center justify-center">
            <Check className="w-10 h-10 text-white" />
          </div>
          <h2 className="font-display text-2xl font-bold mb-2">Module Complete!</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            You've finished the {moduleNames[activeModuleType]} module.
          </p>
          <div className="glass rounded-xl p-4 mb-6">
            <p className="text-3xl font-bold text-gradient mb-1">{score}</p>
            <p className="text-sm text-gray-500">Points earned</p>
          </div>
          <div className="flex gap-3">
            <Link to={`/courses/${courseId}`} className="btn-secondary flex-1">
              Back to Course
            </Link>
            <Link to="/courses" className="btn-primary flex-1">
              More Courses
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link
            to={`/courses/${courseId}`}
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary-500 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Course
          </Link>
          
          <div className="glass rounded-xl p-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="font-display text-xl font-bold">{currentLesson.title}</h1>
                <p className="text-sm text-gray-500">{currentCourse.title}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Score:</span>
                <span className="font-bold text-primary-500">{score}</span>
              </div>
            </div>
            
            <div className="flex gap-2">
              {currentLesson.modules.map((module) => (
                <button
                  key={module.id}
                  onClick={() => {
                    setActiveModuleType(module.type);
                    setCurrentIndex(0);
                    setShowResult(false);
                    setIsCorrect(null);
                    setSelectedAnswer('');
                    setUserInput('');
                    setTranscript('');
                    navigate(`/learn/${courseId}/${lessonId}/${module.type}`, { replace: true });
                  }}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeModuleType === module.type
                      ? 'bg-primary-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  {moduleIcons[module.type]} {moduleNames[module.type]}
                </button>
              ))}
            </div>
          </div>
        </div>

        <motion.div
          key={activeModuleType}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeModuleType === 'vocabulary' && renderVocabularyModule()}
          {activeModuleType === 'grammar' && renderGrammarModule()}
          {activeModuleType === 'speaking' && renderSpeakingModule()}
          {activeModuleType === 'listening' && renderListeningModule()}
        </motion.div>
      </div>
    </div>
  );
}
