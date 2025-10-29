import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const [userId, setUserId] = useState<string>(() => {
    try {
      const stored = localStorage.getItem('seca21_userId');
      if (stored) return stored;
    } catch (e) {
      console.warn('Could not read stored userId', e);
    }
    return '';
  });
  const [cameFromCheckout, setCameFromCheckout] = useState(false);
  const [phone, setPhone] = useState<string | null>(null);

  const currentQuestion = quizQuestions[currentQuestionIndex];
  const navigate = useNavigate();

  const handleAnswer = async (optionId: string, value: number | string) => {
    // set gender when the current question is a gender type (position may change)
    if (currentQuestion.type === 'gender') {
      setGender(optionId as 'male' | 'female');
    }

    const optionFromList = currentQuestion.options?.find(o => o.id === optionId);
    const optionText = optionFromList ? optionFromList.text : (typeof value === 'string' ? value : String(value));

    const newAnswer: QuizAnswer = {
      questionId: currentQuestion.id,
      optionId,
      value,
      questonText: currentQuestion.question,
      optionText
    };

    const newAnswers = [...answers, newAnswer];
    setAnswers(newAnswers);

    const motivationalMessage = motivationalMessages.find(
      (msg) => msg.showAfterQuestion === currentQuestion.id
    );

    if (motivationalMessage) {
      const idx = motivationalMessages.findIndex((m) => m.id === motivationalMessage.id);
      setCurrentMotivational(idx >= 0 ? idx : 0);
      setCurrentQuestionIndex((i) => Math.min(i + 1, quizQuestions.length - 1));
      setShowMotivational(true);
      return;
    }

    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex((i) => i + 1);
      return;
    }

    // Last question: decide where to go
    const newAnswersToSend = newAnswers;

    // If user arrived with ref and phone, they already bought: submit and go to obrigado
    if (userId && phone) {
      try {
        const alreadySubmitted = !!localStorage.getItem('seca21_quizSubmitted');
        if (!alreadySubmitted) {
          const score = newAnswersToSend.reduce((sum, a) => sum + (typeof a.value === 'number' ? a.value : 0), 0);
          await fetch('https://n8n.somosagrega.com.br/webhook-test/quiz/post', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId, phone, score, gender, answers: newAnswersToSend, completedAt: new Date().toISOString() })
          });
          try { localStorage.setItem('seca21_quizSubmitted', 'true'); } catch (e) { /* ignore */ }
        }
      } catch (err) {
        console.error('Erro ao enviar dados do quiz for returning buyer:', err);
        try { localStorage.setItem('seca21_quizSubmitted', 'true'); } catch (e) { /* ignore */ }
      }
      // Instead of going to a thank-you page, show the video directly for returning buyers
      setCameFromCheckout(true);
      setShowVideo(true);
      return;
    }

    // If we've already submitted before, go to obrigado
    try {
      const alreadySubmitted = !!localStorage.getItem('seca21_quizSubmitted');
      if (alreadySubmitted) {
        // If previously submitted, go straight to the video (no obrigado page)
        setCameFromCheckout(true);
        setShowVideo(true);
        return;
      }
    } catch (e) { /* ignore */ }

    // Otherwise send the answers and then show the video
    try {
      const score = newAnswersToSend.reduce((sum, a) => sum + (typeof a.value === 'number' ? a.value : 0), 0);
      await fetch('https://n8n.somosagrega.com.br/webhook-test/quiz/post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, phone, score, gender, answers: newAnswersToSend, completedAt: new Date().toISOString() })
      });
      try { localStorage.setItem('seca21_quizSubmitted', 'true'); } catch (e) { /* ignore */ }
    } catch (err) {
      console.error('Erro ao enviar dados do quiz antes do vídeo:', err);
      try { localStorage.setItem('seca21_quizSubmitted', 'true'); } catch (e) { /* ignore */ }
    }

    setShowVideo(true);
  };

  const handleContinueFromMotivational = () => {
    setShowMotivational(false);
  };

  const handleContinueFromVideo = () => {
    navigate('/captura');
  };

  const handleLoadingComplete = async () => {
    const score = answers.reduce((sum, a) => sum + (typeof a.value === 'number' ? a.value : 0), 0);
    setTotalScore(score);
    setShowResult(true);
  };

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const s1 = params.get('s1');
      const ref = params.get('ref');
      const phoneParam = params.get('phone');
      if (s1) setCameFromCheckout(true);

      if (ref) {
        setUserId(ref);
        try { localStorage.setItem('seca21_userId', ref); } catch (e) { /* ignore */ }
      } else {
        const stored = localStorage.getItem('seca21_userId');
        if (stored) setUserId(stored);
        else {
          const id = crypto.randomUUID();
          setUserId(id);
          try { localStorage.setItem('seca21_userId', id); } catch (e) { /* ignore */ }
        }
      }

      if (phoneParam) {
        setPhone(phoneParam);
        try { localStorage.setItem('seca21_phone', phoneParam); } catch (e) { /* ignore */ }
      } else {
        const storedPhone = localStorage.getItem('seca21_phone');
        if (storedPhone) setPhone(storedPhone);
      }
    } catch (e) { console.warn('Error parsing URL params', e); }
  }, []);

  if (showResult) return <Result score={totalScore} gender={gender} />;
  if (isLoading) return <LoadingScreen onComplete={handleLoadingComplete} />;

  if (showMotivational) {
    const message = motivationalMessages[currentMotivational] ?? null;
    if (!message) return null;
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/10 py-6 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center mb-6">
            <img src={logoSeca21} alt="SECA21" className="h-10" />
          </div>
          <div className="flex items-center min-h-[calc(100vh-8rem)]">
            <MotivationalScreen title={message.title} message={message.message} author={message.author} onContinue={handleContinueFromMotivational} gender={gender} />
          </div>
        </div>
      </div>
    );
  }

  if (showVideo) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/10 py-6 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center mb-6">
            <img src={logoSeca21} alt="SECA21" className="h-10" />
          </div>
          <div className="flex items-center min-h-[calc(100vh-8rem)]">
<<<<<<< HEAD
            <VideoScreen onContinue={handleContinueFromVideo} gender={gender} answers={answers} userId={userId} cameFromCheckout={cameFromCheckout} />
=======
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
>>>>>>> 2b30b6b72b996045c0b7121a6c0fcbaaf9e01bb7
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
<<<<<<< HEAD
        <QuizProgress currentQuestion={currentQuestionIndex + 1} totalQuestions={quizQuestions.length} />
=======
        <QuizProgress
          currentQuestion={currentQuestionIndex + 1}
          totalQuestions={quizQuestions.length}
        />
>>>>>>> 2b30b6b72b996045c0b7121a6c0fcbaaf9e01bb7
        <QuizQuestion key={currentQuestion.id} question={currentQuestion} onAnswer={handleAnswer} gender={gender} />
      </div>
    </div>
  );
};

export default Quiz;