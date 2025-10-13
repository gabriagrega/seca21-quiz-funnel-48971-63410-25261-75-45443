import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle, TrendingDown, Flame, Clock, ArrowRight, Star } from "lucide-react";
import { motion } from "framer-motion";
import logoSeca21 from "@/assets/logo-seca21.png";

interface ResultProps {
  score: number;
  gender: 'male' | 'female' | null;
}

const Result = ({ score, gender = 'male' }: ResultProps) => {

  const getResultCategory = (score: number) => {
    if (score <= 12) return "iniciante";
    if (score <= 22) return "intermediario";
    return "avancado";
  };

  const category = getResultCategory(score);

  const results = {
    iniciante: {
      title: "Seu Perfil: Iniciante",
      description: "Você está no começo da sua jornada de transformação e o SECA21 é perfeito para você!",
      benefits: [
        "Programa adaptado para quem está começando",
        "Treinos de 15-30 minutos por dia",
        "Plano alimentar completo e fácil de seguir",
        "Resultados visíveis já nas primeiras semanas",
        "Suporte completo via WhatsApp",
      ],
    },
    intermediario: {
      title: "Seu Perfil: Intermediário",
      description: "Você já tem base e está pronto para acelerar os resultados com o método SECA21!",
      benefits: [
        "Treinos mais intensos e eficientes",
        "Plano nutricional otimizado para queima de gordura",
        "Técnicas avançadas de emagrecimento",
        "Perca de 5 a 10kg em 21 dias",
        "Grupo exclusivo de alunos para motivação",
      ],
    },
    avancado: {
      title: "Seu Perfil: Avançado",
      description: "Você está determinado e o SECA21 vai levar seus resultados ao próximo nível!",
      benefits: [
        "Protocolo intensivo de 21 dias",
        "Treinos HIIT e funcionais para máxima queima",
        "Estratégias de nutrição avançadas",
        "Definição abdominal em tempo recorde",
        "Suporte VIP do Tiago Crisi",
      ],
    },
  };

  const result = results[category];

  // URLs de checkout baseado no gênero
  const checkoutUrl = gender === 'female' 
    ? 'https://pay.kiwify.com.br/bnNYhm3'
    : 'https://kiwify.app/4fVyol3';

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/10 py-6 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-center mb-6">
          <img src={logoSeca21} alt="SECA21" className="h-10" />
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="text-center mb-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
              className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary/70 mb-4"
            >
              <TrendingDown className="w-8 h-8 text-primary-foreground" />
            </motion.div>
            
            <h1 className="text-3xl font-bold mb-2">
              Parabéns! 🎉
            </h1>
            <p className="text-base text-muted-foreground">
              Seu resultado está pronto
            </p>
          </div>

          <Card className="p-5 mb-6 shadow-[0_0_50px_-12px_hsl(var(--primary))] bg-gradient-to-br from-card to-card/50 border-primary/20">
            <div className="text-center mb-5">
              <h2 className="text-2xl font-bold mb-2 text-primary">{result.title}</h2>
              <p className="text-sm text-muted-foreground">{result.description}</p>
            </div>

            <div className="space-y-3 mb-6">
              {result.benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex items-start gap-2"
                >
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <p className="text-sm">{benefit}</p>
                </motion.div>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-2 mb-6">
              <Card className="p-3 text-center bg-gradient-to-br from-primary/20 to-primary/10 border-primary/30">
                <Flame className="w-6 h-6 text-primary mx-auto mb-1" />
                <p className="text-xs font-semibold">Queima Acelerada</p>
              </Card>
              <Card className="p-3 text-center bg-gradient-to-br from-primary/20 to-primary/10 border-primary/30">
                <Clock className="w-6 h-6 text-primary mx-auto mb-1" />
                <p className="text-xs font-semibold">21 Dias</p>
              </Card>
              <Card className="p-3 text-center bg-gradient-to-br from-primary/20 to-primary/10 border-primary/30">
                <Star className="w-6 h-6 text-primary mx-auto mb-1" />
                <p className="text-xs font-semibold">5.000+ Alunos</p>
              </Card>
            </div>

            <div className="bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-lg p-4 mb-5">
              <p className="text-center text-lg font-bold mb-1">
                <span className="line-through text-muted-foreground text-sm">R$ 297,00</span>
              </p>
              <p className="text-center text-3xl font-bold text-primary mb-1">
                12x de R$ 19,90
              </p>
              <p className="text-center text-sm text-muted-foreground">
                ou R$ 197,00 à vista
              </p>
            </div>

            <Button
              onClick={() => window.location.href = checkoutUrl}
              className="w-full h-14 text-base font-bold bg-gradient-to-r from-primary to-primary/80 hover:opacity-90 transition-opacity shadow-[0_0_30px_-5px_hsl(var(--primary))]"
            >
              QUERO COMEÇAR AGORA
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>

            <p className="text-center text-xs text-muted-foreground mt-3">
              ⚡ Vagas limitadas • Garantia de 7 dias
            </p>
          </Card>

          <div className="text-center text-xs text-muted-foreground space-y-1">
            <p>✓ Acesso imediato após a compra</p>
            <p>✓ Compra 100% segura</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Result;
