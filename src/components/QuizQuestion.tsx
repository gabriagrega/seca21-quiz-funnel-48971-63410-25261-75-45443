import { QuizQuestion as QuizQuestionType } from "@/types/quiz";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import manAvatar from "@/assets/man-avatar.png";
import womanAvatar from "@/assets/woman-avatar.png";
import man1829 from "@/assets/man-18-29.png";
import man3039 from "@/assets/man-30-39.png";
import man4049 from "@/assets/man-40-49.png";
import man50plus from "@/assets/man-50plus.png";
import woman1829 from "@/assets/woman-18-29.png";
import woman3039 from "@/assets/woman-30-39.png";
import woman4049 from "@/assets/woman-40-49.png";
import woman50plus from "@/assets/woman-50plus.png";

interface QuizQuestionProps {
  question: QuizQuestionType;
  onAnswer: (optionId: string, value: number) => void;
  gender?: 'male' | 'female' | null;
}

export const QuizQuestion = ({ question, onAnswer, gender }: QuizQuestionProps) => {
  const isGenderQuestion = question.type === "gender";
  const isAgeQuestion = question.type === "age";

  const getAgeImage = (imageKey: string) => {
    const ageImages = {
      male: {
        "18-29": man1829,
        "30-39": man3039,
        "40-49": man4049,
        "50plus": man50plus,
      },
      female: {
        "18-29": woman1829,
        "30-39": woman3039,
        "40-49": woman4049,
        "50plus": woman50plus,
      },
    };
    
    return gender ? ageImages[gender][imageKey as keyof typeof ageImages.male] : null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold mb-2 text-foreground px-4">
          {question.question}
        </h2>
        {question.subtitle && (
          <p className="text-muted-foreground text-sm px-4">{question.subtitle}</p>
        )}
      </div>

      <div className={`grid gap-3 ${isGenderQuestion || isAgeQuestion ? "grid-cols-2" : ""}`}>
        {question.options.map((option, index) => (
          <motion.div
            key={option.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Card
              className="p-4 cursor-pointer transition-all hover:shadow-[0_0_30px_-5px_hsl(var(--primary))] border-2 border-border hover:border-primary bg-card/50 backdrop-blur-sm group"
              onClick={() => onAnswer(option.id, option.value)}
            >
              {isGenderQuestion ? (
                <div className="flex flex-col items-center justify-center gap-3 py-2">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-primary/20 group-hover:border-primary/40 transition-all">
                    <img 
                      src={option.icon === "male" ? manAvatar : womanAvatar} 
                      alt={option.text}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-base font-bold text-center">{option.text}</p>
                </div>
              ) : isAgeQuestion && option.image ? (
                <div className="flex flex-col items-center justify-center gap-3 py-2">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-primary/20 group-hover:border-primary/40 transition-all">
                    <img 
                      src={getAgeImage(option.image) || ""} 
                      alt={option.text}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-base font-bold text-center">{option.text}</p>
                </div>
              ) : (
                <p className="text-sm font-medium text-center group-hover:text-primary transition-colors py-2">
                  {option.text}
                </p>
              )}
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
