import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import tiagoPhoto from "@/assets/tiago-photo.jpeg";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import transformation1 from "@/assets/transformation-1.jpg";
import transformation2 from "@/assets/transformation-2.jpg";
import transformation3 from "@/assets/transformation-3.jpg";
import transformation4 from "@/assets/transformation-4.jpg";
import transformation5 from "@/assets/transformation-5.jpg";
import transformation6 from "@/assets/transformation-5.jpg";
import transformationTiagoResult from "@/assets/transformation-tiago-result.png";

interface MotivationalScreenProps {
  title: string;
  message: string;
  author?: string;
  onContinue: () => void;
  gender?: 'male' | 'female' | null;
}

export const MotivationalScreen = ({
  title,
  message,
  author,
  onContinue,
  gender,
}: MotivationalScreenProps) => {
  const isTiagoPresentation = title.includes("Tiago Crisi");
  const showCarousel = title.includes("Você está no caminho certo");
  const showTiagoResult = title.includes("Estamos quase lá");
  
  const transformationImages = [
    transformation1,
    transformation2,
    transformation3,
    transformation4,
    transformation5,
    transformation6,
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="w-full max-w-2xl mx-auto"
    >
      <Card className="p-6 bg-gradient-to-br from-card to-card/50 border-primary/20 shadow-[0_0_50px_-12px_hsl(var(--primary))]">
        <div className="text-center space-y-5">
          {!isTiagoPresentation && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary/70 mx-auto"
            >
              <Sparkles className="w-8 h-8 text-primary-foreground" />
            </motion.div>
          )}

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-2xl font-bold"
          >
            {title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-base text-muted-foreground leading-relaxed"
          >
            {message}
          </motion.p>

          {isTiagoPresentation && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, type: "spring" }}
              className="relative max-w-xs mx-auto mt-6"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-primary/10 rounded-2xl blur-3xl"></div>
              <div className="relative">
                <div className="relative mx-auto rounded-2xl overflow-hidden border-4 border-primary shadow-[0_0_50px_-5px_hsl(var(--primary))] bg-gradient-to-br from-primary/5 to-transparent">
                  <img 
                    src={tiagoPhoto} 
                    alt="Tiago Crisi - Criador do SECA21"
                    className="w-full h-auto object-contain"
                  />
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="mt-4 px-4 py-2 bg-gradient-to-r from-primary/20 to-primary/10 border border-primary/30 rounded-full inline-block"
                >
                  <p className="text-xs font-semibold text-primary">
                    +15 anos de experiência • 5.000+ alunos
                  </p>
                </motion.div>
              </div>
            </motion.div>
          )}

          {showCarousel && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="w-full mt-5"
            >
              <Carousel
                opts={{
                  align: "center",
                  loop: true,
                  dragFree: false,
                  containScroll: false,
                }}
                plugins={[
                  Autoplay({
                    delay: 2500,
                    stopOnInteraction: false,
                    stopOnMouseEnter: false,
                  }),
                ]}
                className="w-full select-none max-w-sm mx-auto"
              >
                <CarouselContent className="-ml-2">
                  {transformationImages.map((image, index) => (
                    <CarouselItem key={index} className="pl-2 basis-[70%]">
                      <div className="pointer-events-none">
                        <Card className="overflow-hidden border-primary/20 bg-transparent shadow-lg">
                          <img
                            src={image}
                            alt={`Transformação ${index + 1}`}
                            className="w-full h-auto object-cover rounded-lg"
                            draggable="false"
                          />
                        </Card>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </motion.div>
          )}

          {showTiagoResult && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="w-full mt-5"
            >
              <Card className="overflow-hidden border-primary/20 bg-transparent shadow-lg max-w-xl mx-auto">
                <img
                  src={gender === 'male' ? transformation1 : transformationTiagoResult}
                  alt="Resultado de Transformação"
                  className="w-full h-auto object-cover rounded-lg"
                />
              </Card>
            </motion.div>
          )}

          {author && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-primary font-semibold text-base"
            >
              — {author}
            </motion.p>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Button
              onClick={onContinue}
              size="lg"
              className="mt-3 bg-gradient-to-r from-primary to-primary/80 hover:opacity-90 transition-opacity text-base h-12 px-6"
            >
              Continuar
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>
        </div>
      </Card>
    </motion.div>
  );
};
