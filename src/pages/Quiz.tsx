import { useState } from "react";
import { QuizProgress } from "@/components/QuizProgress";
import { QuizQuestion } from "@/components/QuizQuestion";
import { MotivationalScreen } from "@/components/MotivationalScreen";
import { VideoScreen } from "@/components/VideoScreen";
import { LoadingScreen } from "@/components/LoadingScreen";
import Result from "@/pages/Result";
import { quizQuestions } from "@/data/quizQuestions";
import { motivationalMessages } from "@/data/motivationalMessages";
import { QuizAnswer } from "@/types/quiz";
import logoSeca21 from "@/assets/logo-seca21.png";

const Quiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showMotivational, setShowMotivational] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [currentMotivational, setCurrentMotivational] = useState(0);
  const [gender, setGender] = useState<'male' | 'female' | null>(null);
  const [totalScore, setTotalScore] = useState(0);
  const [userId] = useState(() => crypto.randomUUID());

  const currentQuestion = quizQuestions[currentQuestionIndex];

  const handleAnswer = (optionId: string, value: number) => {
    // Captura o gênero na primeira pergunta
    if (currentQuestionIndex === 0) {
      setGender(optionId as 'male' | 'female');
    }

    const newAnswer: QuizAnswer = {
      questionId: currentQuestion.id,
      optionId,
      value,
    };

    const newAnswers = [...answers, newAnswer];
    setAnswers(newAnswers);

    // Verifica se deve mostrar mensagem motivacional
    const motivationalMessage = motivationalMessages.find(
      (msg) => msg.showAfterQuestion === currentQuestion.id
    );

    if (motivationalMessage) {
      setCurrentMotivational(motivationalMessages.indexOf(motivationalMessage));
      setShowMotivational(true);
    } else if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Mostra o vídeo após a última pergunta
      setShowVideo(true);
    }
  };

  const handleContinueFromMotivational = () => {
    setShowMotivational(false);
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Mostra o vídeo após a última pergunta
      setShowVideo(true);
    }
  };

  const handleContinueFromVideo = () => {
    window.location.href = '/captura';
  };

  const handleLoadingComplete = async () => {
    const score = answers.reduce((sum, answer) => sum + answer.value, 0);
    setTotalScore(score);
    
    // Envia os dados do quiz para o webhook
    try {
      const payload = {
        userId,
        score,
        gender,
        answers: answers.map(answer => ({
          questionId: answer.questionId,
          optionId: answer.optionId,
          value: answer.value,
          questionText: quizQuestions.find(q => q.id === answer.questionId)?.question
        })),
        completedAt: new Date().toISOString()
      };

      await fetch('http://host.docker.internal:5678/webhook-test/quiz/seca21', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });
    } catch (error) {
      console.error('Erro ao enviar dados do quiz:', error);
    }
    
    setShowResult(true);
  };

  if (showResult) {
    return <Result score={totalScore} gender={gender} />;
  }

  if (isLoading) {
    return <LoadingScreen onComplete={handleLoadingComplete} />;
  }

  if (showVideo) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/10 py-6 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center mb-6">
            <img src={logoSeca21} alt="SECA21" className="h-10" />
          </div>
          <div className="flex items-center min-h-[calc(100vh-8rem)]">
            <VideoScreen 
              onContinue={handleContinueFromVideo} 
              gender={gender}
              answers={answers}
              userId={userId}
              videoUrl="https://example.com/video.mp4"
            />
          </div>
        </div>
      </div>
    );
  }

  if (showMotivational) {
    const message = motivationalMessages[currentMotivational];
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/10 py-6 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center mb-6">
            <img src={logoSeca21} alt="SECA21" className="h-10" />
          </div>
          <div className="flex items-center min-h-[calc(100vh-8rem)]">
            <MotivationalScreen
              title={message.title}
              message={message.message}
              author={message.author}
              onContinue={handleContinueFromMotivational}
              gender={gender}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/10 py-6 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-center mb-6">
          <img src={logoSeca21} alt="SECA21" className="h-10" />
        </div>
        <QuizProgress
          currentQuestion={currentQuestionIndex + 1}
          totalQuestions={quizQuestions.length}
        />
        <QuizQuestion key={currentQuestion.id} question={currentQuestion} onAnswer={handleAnswer} gender={gender} />
      </div>
    </div>
  );
};

export default Quiz;
