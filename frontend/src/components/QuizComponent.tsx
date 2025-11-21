import React, { useState } from 'react';
import { CheckCircle, XCircle, RefreshCw, Award, Brain } from 'lucide-react';
import { Quiz, QuizQuestion } from '../types/course';

interface QuizComponentProps {
  quizzes: Quiz[];
  onComplete: (score: number) => void;
}

const QuizComponent: React.FC<QuizComponentProps> = ({ quizzes, onComplete }) => {
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showResult, setShowResult] = useState(false);
  const [answers, setAnswers] = useState<{[key: string]: string}>({});
  const [quizCompleted, setQuizCompleted] = useState(false);

  const currentQuiz = quizzes && quizzes.length > 0 ? quizzes[currentQuizIndex] : null;
  const currentQuestion = currentQuiz && currentQuiz.questions && currentQuiz.questions.length > 0 ? currentQuiz.questions[currentQuestionIndex] : null;

  if (!quizzes || quizzes.length === 0 || !currentQuiz) {
    return (
      <div className="text-center py-12">
        <Brain className="h-16 w-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No Quizzes Available</h3>
        <p className="text-gray-600">Quizzes will be generated based on your course content.</p>
      </div>
    );
  }

  if (!currentQuestion) {
    return (
      <div className="text-center py-12">
        <Brain className="h-16 w-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No Questions Available</h3>
        <p className="text-gray-600">This quiz doesn't have any questions yet.</p>
      </div>
    );
  }

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const handleNext = () => {
    if (selectedAnswer) {
      const questionId = `${currentQuizIndex}-${currentQuestionIndex}`;
      setAnswers({ ...answers, [questionId]: selectedAnswer });
      setShowResult(true);
    }
  };

  const handleContinue = () => {
    setShowResult(false);
    setSelectedAnswer('');

    if (currentQuestionIndex < currentQuiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Quiz completed
      const totalQuestions = currentQuiz.questions.length;
      const correctAnswers = currentQuiz.questions.filter((q, index) => {
        const questionId = `${currentQuizIndex}-${index}`;
        return answers[questionId] === q.correctAnswer || 
               (index === currentQuestionIndex && selectedAnswer === q.correctAnswer);
      }).length;
      
      const score = Math.round((correctAnswers / totalQuestions) * 100);
      setQuizCompleted(true);
      onComplete(score);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer('');
    setShowResult(false);
    setAnswers({});
    setQuizCompleted(false);
  };

  const isCorrect = selectedAnswer === currentQuestion?.correctAnswer;

  if (quizCompleted) {
    const totalQuestions = currentQuiz.questions.length;
    const correctAnswers = Object.keys(answers).filter(questionId => {
      const questionIndex = parseInt(questionId.split('-')[1]);
      return answers[questionId] === currentQuiz.questions[questionIndex]?.correctAnswer;
    }).length + (selectedAnswer === currentQuestion?.correctAnswer ? 1 : 0);
    
    const score = Math.round((correctAnswers / totalQuestions) * 100);

    return (
      <div className="text-center py-12">
        <div className="mb-8">
          <Award className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Quiz Completed!</h3>
          <p className="text-gray-600 mb-6">You've finished the {currentQuiz.title}</p>
          
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 max-w-sm mx-auto">
            <div className="text-4xl font-bold text-gray-900 mb-2">{score}%</div>
            <div className="text-gray-600">
              {correctAnswers} out of {totalQuestions} correct
            </div>
          </div>
        </div>
        
        <button
          onClick={handleRestart}
          className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors mx-auto"
        >
          <RefreshCw className="h-4 w-4" />
          <span>Retake Quiz</span>
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900">{currentQuiz.title}</h2>
          <span className="text-sm text-gray-500">
            Question {currentQuestionIndex + 1} of {currentQuiz.questions.length}
          </span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all"
            style={{ width: `${((currentQuestionIndex + 1) / currentQuiz.questions.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {!showResult ? (
        <div>
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              {currentQuestion?.question}
            </h3>
            
            <div className="space-y-3">
              {currentQuestion?.options?.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(option)}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                    selectedAnswer === option
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded-full border-2 ${
                      selectedAnswer === option
                        ? 'border-blue-500 bg-blue-500'
                        : 'border-gray-300'
                    }`}>
                      {selectedAnswer === option && (
                        <div className="w-full h-full bg-white rounded-full scale-50"></div>
                      )}
                    </div>
                    <span className="text-gray-900">{option}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleNext}
              disabled={!selectedAnswer}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              Submit Answer
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center py-8">
          <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-6 ${
            isCorrect ? 'bg-green-100' : 'bg-red-100'
          }`}>
            {isCorrect ? (
              <CheckCircle className="h-8 w-8 text-green-600" />
            ) : (
              <XCircle className="h-8 w-8 text-red-600" />
            )}
          </div>
          
          <h3 className={`text-2xl font-bold mb-4 ${
            isCorrect ? 'text-green-600' : 'text-red-600'
          }`}>
            {isCorrect ? 'Correct!' : 'Incorrect'}
          </h3>
          
          <div className={`p-6 rounded-lg mb-6 ${
            isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
          }`}>
            <p className="text-gray-700">
              <strong>Explanation:</strong> {currentQuestion?.explanation}
            </p>
            {!isCorrect && (
              <p className="mt-2 text-gray-700">
                <strong>Correct answer:</strong> {currentQuestion?.correctAnswer}
              </p>
            )}
          </div>
          
          <button
            onClick={handleContinue}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            {currentQuestionIndex < currentQuiz.questions.length - 1 ? 'Next Question' : 'Complete Quiz'}
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizComponent;