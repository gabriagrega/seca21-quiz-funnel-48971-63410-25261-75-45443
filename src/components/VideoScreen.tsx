import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Play, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import { QuizAnswer } from "@/types/quiz";

interface VideoScreenProps {
  onContinue: () => void;
  gender: 'male' | 'female' | null;
  answers: QuizAnswer[];
  userId: string;
}

export const VideoScreen = ({ onContinue, gender, answers, userId }: VideoScreenProps) => {
  const [videoEnded, setVideoEnded] = useState(false);
  const [showWhatsApp, setShowWhatsApp] = useState(false);
  const [whatsapp, setWhatsapp] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleVideoEnd = () => {
    setVideoEnded(true);
  };

  const formatWhatsApp = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 2) return numbers;
    if (numbers.length <= 7) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
  };

  const handleWhatsAppChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatWhatsApp(e.target.value);
    setWhatsapp(formatted);
  };

  const handleSecarClick = () => {
    setShowWhatsApp(true);
  };

  const handleWhatsAppSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!whatsapp) {
      toast.error("Por favor, insira seu WhatsApp");
      return;
    }

    // Validação básica de número (pelo menos 10 dígitos)
    const numbersOnly = whatsapp.replace(/\D/g, '');
    if (numbersOnly.length < 10) {
      toast.error("Por favor, insira um WhatsApp válido");
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Envia os dados do quiz junto com o WhatsApp
      const score = answers.reduce((sum, answer) => sum + answer.value, 0);
      
      await fetch('http://host.docker.internal:5678/webhook-test/quiz/seca21', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          score,
          gender,
          whatsapp: numbersOnly,
          answers,
          completedAt: new Date().toISOString()
        })
      });
    } catch (error) {
      console.error('Erro ao enviar dados:', error);
    }
    
    // Redireciona para o checkout da Kiwify baseado no gênero
    const checkoutUrl = gender === 'female' 
      ? 'https://pay.kiwify.com.br/KOaMcLU'
      : 'https://pay.kiwify.com.br/E42kRSx';
    
    window.location.href = checkoutUrl;
  };
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="w-full max-w-3xl mx-auto"
    >
      <Card className="p-6 bg-gradient-to-br from-card to-card/50 border-primary/20 shadow-[0_0_50px_-12px_hsl(var(--primary))] overflow-hidden">
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center space-y-3"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary/70 mx-auto mb-4">
              <Play className="w-8 h-8 text-primary-foreground ml-1" />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Descubra Como o SECA21 Vai Transformar Seu Corpo
            </h2>
            <p className="text-muted-foreground text-lg">
              Assista a mensagem especial do Tiago Crisi sobre o programa
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="relative -mx-6 w-[calc(100%+3rem)] aspect-[9/16] max-h-[75vh] bg-black"
          >
            <iframe
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?enablejsapi=1"
              title="SECA21 - Apresentação"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
              onLoad={(e) => {
                const iframe = e.currentTarget;
                const player = iframe.contentWindow;
                if (player) {
                  // Simula o fim do vídeo após 3 segundos para teste (remova em produção)
                  setTimeout(() => setVideoEnded(true), 3000);
                }
              }}
            />
          </motion.div>

          <AnimatePresence mode="wait">
            {videoEnded && !showWhatsApp && (
              <motion.div
                key="offer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="space-y-4"
              >
                <div className="bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-lg p-4">
                  <p className="text-sm text-center">
                    <span className="font-bold text-primary">Por apenas R$ 49,90</span> você recebe:
                  </p>
                  <ul className="mt-3 space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <span className="text-primary">✓</span>
                      <span>Treinos completos personalizados para 21 dias</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-primary">✓</span>
                      <span>Plano alimentar detalhado e fácil de seguir</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-primary">✓</span>
                      <span>Suporte direto e acompanhamento diário</span>
                    </li>
                  </ul>
                </div>

                <Button
                  onClick={handleSecarClick}
                  size="lg"
                  className="w-full bg-gradient-to-r from-primary to-primary/80 hover:opacity-90 transition-opacity text-base h-14 text-lg font-semibold animate-[shake_2s_ease-in-out_infinite]"
                >
                  SECAR BARRIGUEIRA AGORA
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </motion.div>
            )}

            {showWhatsApp && (
              <motion.div
                key="whatsapp"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-4"
              >
                <div className="bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-lg p-5">
                  <div className="flex items-center justify-center mb-3">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                      <MessageCircle className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-center mb-2">
                    Antes de continuar...
                  </h3>
                  <p className="text-sm text-center text-muted-foreground mb-4">
                    Compartilhe seu WhatsApp para receber atualizações importantes sobre seu treino e suporte exclusivo
                  </p>
                  
                  <form onSubmit={handleWhatsAppSubmit} className="space-y-3">
                    <Input
                      type="tel"
                      placeholder="(00) 00000-0000"
                      value={whatsapp}
                      onChange={handleWhatsAppChange}
                      className="h-11 text-center"
                      maxLength={15}
                      required
                    />
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      size="lg"
                      className="w-full bg-gradient-to-r from-primary to-primary/80 hover:opacity-90 transition-opacity h-12 font-semibold"
                    >
                      {isSubmitting ? "Processando..." : (
                        <>
                          Continuar para o Checkout
                          <ArrowRight className="ml-2 w-5 h-5" />
                        </>
                      )}
                    </Button>
                  </form>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Card>
    </motion.div>
  );
};
