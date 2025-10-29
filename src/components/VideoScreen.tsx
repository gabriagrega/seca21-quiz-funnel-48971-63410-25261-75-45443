import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Play, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import { QuizAnswer } from "@/types/quiz";
import videoFile from '../assets/video-tiago-1.mp4';

interface VideoScreenProps {
  onContinue: () => void;
  gender: 'male' | 'female' | null;
  answers: QuizAnswer[];
  userId: string;
  cameFromCheckout?: boolean;
}

export const VideoScreen = ({ onContinue, gender, answers, userId, cameFromCheckout }: VideoScreenProps) => {
  const [videoEnded, setVideoEnded] = useState(false);
  const [showWhatsApp, setShowWhatsApp] = useState(false);
  const [whatsapp, setWhatsapp] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleVideoEnd = () => {
    setVideoEnded(true);
  };

  const handleTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = e.currentTarget;
    if (video.currentTime >= 28 && !videoEnded) {
      setVideoEnded(true);
    }
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

  const handleAppSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Continue to checkout — map gender to the correct Kiwify link.
    // Male -> D0jeViL, Female -> mhuPjE4 (per request).
    const checkoutUrl = gender === 'female'
      ? 'https://pay.kiwify.com.br/mhuPjE4'
      : 'https://pay.kiwify.com.br/D0jeViL';
    // append s1 userId so the checkout can identify the lead when needed
    window.location.href = `${checkoutUrl}?s1=${userId}`;
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
            className="relative w-[95%] md:w-auto md:max-w-md mx-auto aspect-[9/16] max-h-[75vh] md:max-h-[85vh] rounded-lg overflow-hidden bg-black"
          >
            <video
              src={videoFile}
              title="SECA21 - Apresentação"
              autoPlay
              playsInline
              controlsList="nodownload nofullscreen"
              disablePictureInPicture
              //onTimeUpdate={handleTimeUpdate}
              //onEnded={handleVideoEnd}
              className="w-full h-full object-cover"
            />
          </motion.div>

          <AnimatePresence mode="wait">

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
                      <span>Assistente pessoal para acompanhamento personalizado</span>
                    </li>
                  </ul>
                </div>

                <Button
                  onClick={handleAppSubmit}
                  size="lg"
                  className="w-full bg-gradient-to-r from-primary to-primary/80 hover:opacity-90 transition-opacity text-base h-14 text-lg font-semibold animate-[shake_2s_ease-in-out_infinite]"
                >
                  SECAR BARRIGUEIRA AGORA
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </motion.div>

          </AnimatePresence>
        </div>
      </Card>
    </motion.div>
  );
};