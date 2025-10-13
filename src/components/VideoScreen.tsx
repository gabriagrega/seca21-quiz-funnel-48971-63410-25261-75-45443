import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";

interface VideoScreenProps {
  onContinue: () => void;
}

export const VideoScreen = ({ onContinue }: VideoScreenProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="w-full max-w-3xl mx-auto"
    >
      <Card className="p-6 bg-gradient-to-br from-card to-card/50 border-primary/20 shadow-[0_0_50px_-12px_hsl(var(--primary))]">
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
            className="relative w-full aspect-video rounded-lg overflow-hidden bg-black/5 border-2 border-primary/20"
          >
            <iframe
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="SECA21 - Apresentação"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
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
              onClick={onContinue}
              size="lg"
              className="w-full bg-gradient-to-r from-primary to-primary/80 hover:opacity-90 transition-opacity text-base h-14 text-lg font-semibold"
            >
              Ver Meu Plano Personalizado
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>
        </div>
      </Card>
    </motion.div>
  );
};
