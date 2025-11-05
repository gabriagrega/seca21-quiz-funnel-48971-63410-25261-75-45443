import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { QuizProgress } from "@/components/QuizProgress";
import { Button } from "@/components/ui/button";
import { QuizQuestion } from "@/components/QuizQuestion";
import { MotivationalScreen } from "@/components/MotivationalScreen";
import { VideoScreen } from "@/components/VideoScreen";
import { LoadingScreen } from "@/components/LoadingScreen";
import Result from "@/pages/Result";
import { quizQuestions } from "@/data/quizQuestions";
import { motivationalMessages } from "@/data/motivationalMessages";
import { QuizAnswer } from "@/types/quiz";
import logoSeca21 from "@/assets/logo-seca21.png";
import ConsentModal from "@/components/ConsentModal";

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

  // Dev-only helper: auto-fill quiz for testing. Visible only in non-production builds.
  // Helper: produce an ISO-like timestamp in local time including the timezone offset (e.g. 2025-11-05T11:17:38.525-03:00)
  function localIsoWithOffset(date: Date = new Date()) {
    const pad = (n: number) => String(n).padStart(2, '0');
    const d = date;
    const tzOffset = -d.getTimezoneOffset(); // minutes
    const sign = tzOffset >= 0 ? '+' : '-';
    const absOffset = Math.abs(tzOffset);
    const hh = Math.floor(absOffset / 60);
    const mm = absOffset % 60;
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}.${String(d.getMilliseconds()).padStart(3, '0')}${sign}${pad(hh)}:${pad(mm)}`;
  }

  const autoFillAndFinish = async () => {
    try {
      // Auto-consent for test flows
      const at = new Date().toISOString();
      setConsentGiven(true);
      setConsentAcceptedAt(at);
      try { localStorage.setItem('seca21_consent', JSON.stringify({ acceptedAt: at, version: 'v1', given: true })); } catch (e) {}

      const generatedAnswers: QuizAnswer[] = quizQuestions.map((q) => {
        // pick a reasonable default
        if (q.type === 'gender') {
          const opt = q.options && q.options.find(o => o.id === 'female') ? 'female' : (q.options && q.options[0]?.id) || 'male';
          return {
            questionId: q.id,
            optionId: String(opt),
            value: opt === 'male' ? 'male' : 'female',
            questonText: q.question,
            optionText: opt
          } as QuizAnswer;
        }

        if (q.options && q.options.length > 0) {
          const opt = q.options[0];
          // if option has a numeric score, use it, otherwise default to 1
          const val = typeof (opt as any).value === 'number' ? (opt as any).value : 1;
          return {
            questionId: q.id,
            optionId: opt.id,
            value: val,
            questonText: q.question,
            optionText: opt.text
          } as QuizAnswer;
        }

        // input style questions
        const sampleText = (q.type === 'email') ? 'teste@example.com' : (q.type === 'phone' ? '+5511999999999' : (q.type === 'number' ? 70 : 'Teste'));
        return {
          questionId: q.id,
          optionId: 'input',
          value: sampleText as any,
          questonText: q.question,
          optionText: String(sampleText)
        } as QuizAnswer;
      });

      setAnswers(generatedAnswers);

      // send payload same as normal finish flow
      // use relative path in development so Vite dev proxy can forward requests and avoid CORS
      // in production prefer a configured webhook URL. You can set VITE_WEBHOOK_URL at build time.
      const webhook = import.meta.env.PROD
        ? (import.meta.env.VITE_WEBHOOK_URL ?? 'https://n8n.somosagrega.com.br/webhook/quiz/seca21')
        : '/api/quiz/seca21';
      const score = generatedAnswers.reduce((sum, a) => sum + (typeof a.value === 'number' ? a.value : 0), 0);
      const getAnswer = (id: number) => {
        const a = generatedAnswers.find(x => x.questionId === id);
        return a ? a.value : null;
      };

      // Use the test values requested
      const name = 'Gabriel';
      const email = getAnswer(13) || 'gabriel@example.com';
      const whatsappAnswer = '+5532998486700';

      const tracking = (() => {
        const params = new URLSearchParams(window.location.search);
        return {
          utm_source: params.get('utm_source'),
          utm_medium: params.get('utm_medium'),
          utm_campaign: params.get('utm_campaign'),
          utm_content: params.get('utm_content'),
          fbclid: params.get('fbclid'),
          gclid: params.get('gclid'),
        };
      })();

      const completedAt = localIsoWithOffset();

      const payload = {
        userId,
        whatsapp: whatsappAnswer,
        name,
        email,
        score,
        gender: getAnswer(2) || gender,
        answers: generatedAnswers,
        consent: { given: true, acceptedAt: at },
        completedAt,
        source: 'quiz',
        ...tracking
      };

      await fetch(webhook, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      try { localStorage.setItem('seca21_quizSubmitted', 'true'); } catch (e) {}

      // show video after sending
      setShowVideo(true);
    } catch (err) {
      console.error('Auto-fill submit failed', err);
      // still show video so flow can continue
      setShowVideo(true);
    }
  };

  const getAnswerValueByQuestionId = (answersArr: QuizAnswer[], id: number) => {
    const a = answersArr.find((x) => x.questionId === id);
    return a ? a.value : null;
  };

  const [consentGiven, setConsentGiven] = useState<boolean>(false);
  const [consentAcceptedAt, setConsentAcceptedAt] = useState<string | null>(null);
  const [showConsentModal, setShowConsentModal] = useState(false);
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

    // If we've already submitted before, show the video directly
    try {
      const alreadySubmitted = !!localStorage.getItem('seca21_quizSubmitted');
      if (alreadySubmitted) {
        setCameFromCheckout(true);
        setShowVideo(true);
        return;
      }
    } catch (e) { /* ignore */ }

      // Prepare and send the quiz payload now (before showing the video) — in-page fetch works reliably here.
      try {
        // choose webhook depending on environment (dev uses local proxy)
        const webhook = import.meta.env.PROD
          ? (import.meta.env.VITE_WEBHOOK_URL ?? 'https://n8n.somosagrega.com.br/webhook/quiz/seca21')
          : '/api/quiz/seca21';
      const score = newAnswersToSend.reduce((sum, a) => sum + (typeof a.value === 'number' ? a.value : 0), 0);
      const getAnswer = (id: number) => {
        const a = newAnswersToSend.find((x) => x.questionId === id);
        return a ? a.value : null;
      };

      const consentMeta = { given: consentGiven, acceptedAt: consentAcceptedAt };
      const name = consentGiven ? getAnswer(1) : null;
      const email = consentGiven ? getAnswer(13) : null;
      // WhatsApp is the same as phone param; include only if consent is given
  const whatsappAnswer = consentGiven ? (getAnswer(14) ?? localStorage.getItem('seca21_phone')) : null;

  function getURLParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    utm_source: params.get('utm_source'),
    utm_medium: params.get('utm_medium'),
    utm_campaign: params.get('utm_campaign'),
      utm_content: params.get('utm_content'),
    fbclid: params.get('fbclid'),
    gclid: params.get('gclid'),
  };
}

const tracking = getURLParams();

      const completedAt = localIsoWithOffset();

      const payload = {
        userId,
        whatsapp: whatsappAnswer,
        name,
        email,
        score,
        gender,
        answers: newAnswersToSend,
        consent: consentMeta,
        completedAt,
        source: 'quiz_finish',
        ...tracking
      };

      await fetch(webhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      try { localStorage.setItem('seca21_quizSubmitted', 'true'); } catch (e) { /* ignore */ }
    } catch (err) {
      console.error('Erro ao enviar dados do quiz antes do vídeo:', err);
      try { localStorage.setItem('seca21_quizSubmitted', 'true'); } catch (e) { /* ignore */ }
    }

    // Show the video after sending
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
      // read consent if present; if not present, open consent modal
      try {
        const c = localStorage.getItem('seca21_consent');
        if (c) {
          const parsed = JSON.parse(c);
          // parsed can be { acceptedAt } (accepted) or { given: false, decidedAt }
          if (parsed && parsed.acceptedAt) {
            setConsentGiven(true);
            setConsentAcceptedAt(parsed.acceptedAt);
          } else if (parsed && parsed.given === false) {
            // user previously declined; keep consentGiven false and do not force modal
            setConsentGiven(false);
            setConsentAcceptedAt(parsed.decidedAt || null);
          } else {
            setShowConsentModal(true);
          }
        } else {
          setShowConsentModal(true);
        }
      } catch (e) {
        setShowConsentModal(true);
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
            <VideoScreen onContinue={handleContinueFromVideo} gender={gender} answers={answers} userId={userId} cameFromCheckout={cameFromCheckout} />
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
        {/* Dev-only auto-fill button: appears when not in production */}
        {import.meta.env.MODE !== 'production' && (
          <div className="flex justify-end mb-4">
            <Button variant="outline" size="sm" onClick={autoFillAndFinish}>Auto-fill (TEST)</Button>
          </div>
        )}
        <QuizProgress currentQuestion={currentQuestionIndex + 1} totalQuestions={quizQuestions.length} />
        <ConsentModal
          open={showConsentModal}
          consentGiven={consentGiven}
          acceptedAt={consentAcceptedAt}
          onAccept={async () => {
            const at = new Date().toISOString();
            setConsentGiven(true);
            setConsentAcceptedAt(at);
            try { localStorage.setItem('seca21_consent', JSON.stringify({ acceptedAt: at, version: 'v1', given: true })); } catch (e) { /* ignore */ }
            setShowConsentModal(false);
          }}
          onDecline={async () => {
            // persist explicit refusal and optionally send an audit event to the webhook
            const decidedAt = new Date().toISOString();
            setConsentGiven(false);
            setConsentAcceptedAt(null);
            try { localStorage.setItem('seca21_consent', JSON.stringify({ given: false, decidedAt })); } catch (e) { /* ignore */ }
            setShowConsentModal(false);
            try {
              // Consent refusal recorded locally; no external call — quiz data will be sent only on Kiwify CTA
              // If you want to track refusals server-side, enable this fetch and update the webhook URL accordingly.
            } catch (err) {
              console.warn('Could not send consent_refused webhook', err);
            }
          }}
          onRevoke={async () => {
            const decidedAt = new Date().toISOString();
            // revoke consent: persist refusal and notify webhook
            setConsentGiven(false);
            setConsentAcceptedAt(null);
            try { localStorage.setItem('seca21_consent', JSON.stringify({ given: false, decidedAt })); } catch (e) { /* ignore */ }
            setShowConsentModal(false);
            try {
              // Consent revocation recorded locally; no external call — quiz data will be sent only on Kiwify CTA
              // If you want to track revocations server-side, enable this fetch and update the webhook URL accordingly.
            } catch (err) {
              console.warn('Could not send consent_revoked webhook', err);
            }
          }}
        />

        <QuizQuestion key={currentQuestion.id} question={currentQuestion} onAnswer={handleAnswer} gender={gender} consentGiven={consentGiven} onRequestConsent={() => setShowConsentModal(true)} />
      </div>
    </div>
  );
};

export default Quiz;