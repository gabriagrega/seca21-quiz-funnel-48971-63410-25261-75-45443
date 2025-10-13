import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import logoSeca21 from "@/assets/logo-seca21.png";

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("Analisando suas respostas...");

  useEffect(() => {
    const messages = [
      "Analisando suas respostas...",
      "Calculando seu perfil...",
      "Personalizando seu plano...",
      "Preparando seus resultados...",
    ];

    let currentMessage = 0;
    const messageInterval = setInterval(() => {
      currentMessage = (currentMessage + 1) % messages.length;
      setMessage(messages[currentMessage]);
    }, 1000);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          clearInterval(messageInterval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 40);

    return () => {
      clearInterval(progressInterval);
      clearInterval(messageInterval);
    };
  }, [onComplete]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 py-6 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-center mb-6">
          <img src={logoSeca21} alt="SECA21" className="h-10" />
        </div>
        <div className="flex items-center justify-center min-h-[calc(100vh-8rem)]">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center max-w-md mx-auto px-6"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="inline-block mb-5"
            >
              <Loader2 className="w-12 h-12 text-primary" />
            </motion.div>
            <h2 className="text-xl font-bold mb-4">{message}</h2>
            <div className="w-full bg-secondary rounded-full h-2.5 mb-3 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-primary to-[hsl(0_100%_63%)]"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <p className="text-sm text-muted-foreground">{progress}%</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
