import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, CheckCircle, TrendingDown, Users, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import logoSeca21 from "@/assets/logo-seca21.png";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="flex justify-center pt-6 pb-4 px-4">
        <img src={logoSeca21} alt="SECA21" className="h-10" />
      </div>
      
      {/* Hero Section */}
      <section className="relative py-8 px-4 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center relative z-10"
        >
          <h1 className="text-4xl font-bold mb-4 leading-tight">
            BORA PERDER A{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/80">
              BARRIGUEIRA?
            </span>
          </h1>
          <p className="text-lg mb-1">
            Mais de <span className="text-primary font-bold">5.000 alunos</span> já transformaram
          </p>
          <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
            o corpo com o nosso método
          </p>
          <Button
            onClick={() => navigate("/quiz")}
            size="lg"
            className="h-12 px-6 text-base font-semibold bg-gradient-to-r from-primary to-[hsl(0_100%_63%)] hover:opacity-90 transition-opacity shadow-xl"
          >
            Começar Quiz Gratuito
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          <p className="mt-3 text-xs text-muted-foreground">
            ⚡ Leva apenas 2 minutos
          </p>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-8 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-2 gap-3">
          {[
            { icon: Users, value: "10.000+", label: "Alunos" },
            { icon: TrendingDown, value: "5-8kg", label: "Perda Média" },
            { icon: Clock, value: "21", label: "Dias" },
            { icon: CheckCircle, value: "98%", label: "Sucesso" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-4 text-center hover:shadow-lg transition-shadow">
                <stat.icon className="w-6 h-6 mx-auto mb-2 text-primary" />
                <p className="text-2xl font-bold mb-1">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-10 px-4 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-6">
            Por Que Fazer o Quiz?
          </h2>
          <div className="grid gap-4">
            {[
              {
                title: "Plano Personalizado",
                description:
                  "Receba um programa adaptado aos seus objetivos, tempo disponível e nível de condicionamento",
              },
              {
                title: "Resultados Comprovados",
                description:
                  "Método testado por mais de 10 mil pessoas com resultados reais e duradouros",
              },
              {
                title: "Suporte Completo",
                description:
                  "Acesso a grupo exclusivo, materiais de apoio e acompanhamento profissional",
              },
              {
                title: "100% Online",
                description:
                  "Treine de casa, no seu ritmo, sem precisar de equipamentos caros ou academia",
              },
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-5 hover:shadow-lg transition-shadow">
                  <CheckCircle className="w-6 h-6 text-primary mb-3" />
                  <h3 className="text-lg font-bold mb-2">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-10 px-4 pb-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <Card className="p-6 text-center bg-gradient-to-br from-card to-primary/5 shadow-2xl">
            <h2 className="text-2xl font-bold mb-3">
              Pronto Para Transformar Seu Corpo?
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
              Faça o quiz agora e descubra o caminho mais rápido para seus objetivos
            </p>
            <Button
              onClick={() => navigate("/quiz")}
              size="lg"
              className="h-12 px-8 text-base font-bold bg-gradient-to-r from-primary to-[hsl(0_100%_63%)] hover:opacity-90 transition-opacity shadow-xl"
            >
              Iniciar Minha Transformação
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Card>
        </motion.div>
      </section>
    </div>
  );
};

export default Index;
