import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Mail, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import logoSeca21 from "@/assets/logo-seca21.png";

const LeadCapture = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { score } = location.state || { score: 0 };
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !name) {
      toast.error("Por favor, preencha todos os campos");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Por favor, insira um email válido");
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast.success("Email cadastrado com sucesso!");
    navigate("/resultado", { state: { email, name, score } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 py-6 px-4">
      <div className="max-w-md mx-auto">
        <div className="flex justify-center mb-6">
          <img src={logoSeca21} alt="SECA21" className="h-10" />
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full"
        >
          <Card className="p-6 shadow-xl">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-r from-primary to-[hsl(0_100%_63%)] mb-3">
                <Mail className="w-7 h-7 text-white" />
              </div>
              <h1 className="text-2xl font-bold mb-2">Quase lá!</h1>
              <p className="text-sm text-muted-foreground">
                Digite seu email para receber seu resultado personalizado e descobrir o melhor plano para você
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <Input
                  type="text"
                  placeholder="Seu nome"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-11"
                  required
                />
              </div>
              <div>
                <Input
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-11"
                  required
                />
              </div>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-11 text-base font-semibold bg-gradient-to-r from-primary to-[hsl(0_100%_63%)] hover:opacity-90 transition-opacity"
              >
                {isSubmitting ? (
                  "Processando..."
                ) : (
                  <>
                    Ver Meu Resultado
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </>
                )}
              </Button>
            </form>

            <p className="text-xs text-center text-muted-foreground mt-5">
              🔒 Seus dados estão seguros conosco
            </p>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default LeadCapture;
