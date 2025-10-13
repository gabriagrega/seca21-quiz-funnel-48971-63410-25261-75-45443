import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  CheckCircle,
  Star,
  Users,
  Clock,
  TrendingDown,
  Flame,
  Heart,
  Award,
  Lock,
} from "lucide-react";
import { motion } from "framer-motion";

const Offer = () => {
  const benefits = [
    "Protocolo SECA21 completo em vídeo aulas",
    "Plano alimentar personalizado para 21 dias",
    "Treinos diários de 15-30 minutos",
    "Suporte direto via WhatsApp",
    "Grupo exclusivo de alunos",
    "Material de apoio em PDF",
    "Lista de compras semanal",
    "Receitas fitness deliciosas",
  ];

  const testimonials = [
    {
      name: "Maria Silva",
      result: "Perdi 6kg em 21 dias",
      text: "Nunca imaginei que conseguiria resultados tão rápidos! O programa é incrível!",
    },
    {
      name: "João Santos",
      result: "Eliminei 8kg",
      text: "O melhor investimento que fiz na minha saúde. Recomendo demais!",
    },
    {
      name: "Ana Costa",
      result: "Perdi 5kg e muita medida",
      text: "Além de emagrecer, ganhei disposição e autoestima. Gratidão!",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Hero Section */}
      <section className="py-12 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6">
            <Star className="w-5 h-5 fill-primary" />
            <span className="font-semibold">Oferta Exclusiva</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Transforme Seu Corpo em{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-[hsl(0_100%_63%)]">
              21 Dias
            </span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            O programa completo que já ajudou mais de 10.000 pessoas a eliminarem
            a gordura abdominal e recuperarem a autoestima
          </p>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-8 px-4 bg-gradient-to-r from-primary to-[hsl(0_100%_63%)]">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">
          <div>
            <Users className="w-8 h-8 mx-auto mb-2" />
            <p className="text-3xl font-bold">10.000+</p>
            <p className="text-sm opacity-90">Alunos Ativos</p>
          </div>
          <div>
            <TrendingDown className="w-8 h-8 mx-auto mb-2" />
            <p className="text-3xl font-bold">5-8kg</p>
            <p className="text-sm opacity-90">Média de Perda</p>
          </div>
          <div>
            <Star className="w-8 h-8 mx-auto mb-2 fill-white" />
            <p className="text-3xl font-bold">4.9</p>
            <p className="text-sm opacity-90">Avaliação</p>
          </div>
          <div>
            <Award className="w-8 h-8 mx-auto mb-2" />
            <p className="text-3xl font-bold">98%</p>
            <p className="text-sm opacity-90">Satisfação</p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            O Que Você Vai Receber
          </h2>
          <Card className="p-8 shadow-xl">
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                  <p className="font-medium">{benefit}</p>
                </motion.div>
              ))}
            </div>

            <div className="border-t pt-8">
              <div className="flex items-center justify-center gap-4 mb-6">
                <Flame className="w-8 h-8 text-primary" />
                <Clock className="w-8 h-8 text-primary" />
                <Heart className="w-8 h-8 text-primary" />
              </div>
              <div className="text-center mb-8">
                <p className="text-sm text-muted-foreground line-through mb-2">
                  De R$ 497,00 por
                </p>
                <p className="text-5xl font-bold text-primary mb-2">
                  R$ 97,00
                </p>
                <p className="text-muted-foreground">ou 12x de R$ 9,47</p>
              </div>

              <Button className="w-full h-16 text-xl font-bold bg-gradient-to-r from-primary to-[hsl(0_100%_63%)] hover:opacity-90 transition-opacity shadow-xl mb-4">
                Garantir Minha Vaga Agora
              </Button>

              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Lock className="w-4 h-4" />
                <span>Compra 100% segura</span>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Resultados Reais de Pessoas Reais
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 h-full">
                  <div className="flex gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="mb-4 italic">"{testimonial.text}"</p>
                  <div>
                    <p className="font-bold">{testimonial.name}</p>
                    <p className="text-sm text-primary font-semibold">
                      {testimonial.result}
                    </p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Guarantee Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Card className="p-8 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <Award className="w-16 h-16 text-primary mx-auto mb-4" />
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Garantia Incondicional de 7 Dias
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Se por qualquer motivo você não estiver satisfeito, devolvemos 100%
              do seu investimento. Sem perguntas, sem burocracia.
            </p>
            <Button
              size="lg"
              className="bg-gradient-to-r from-primary to-[hsl(0_100%_63%)] hover:opacity-90 transition-opacity shadow-lg"
            >
              Começar Agora Sem Riscos
            </Button>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Offer;
