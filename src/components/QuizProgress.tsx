import { Progress } from "@/components/ui/progress";

interface QuizProgressProps {
  currentQuestion: number;
  totalQuestions: number;
}

export const QuizProgress = ({ currentQuestion, totalQuestions }: QuizProgressProps) => {
  const progress = (currentQuestion / totalQuestions) * 100;

  return (
    <div className="w-full max-w-2xl mx-auto mb-6">
      <div className="flex justify-between items-center mb-2 px-2">
        <span className="text-xs font-medium text-muted-foreground">
          Pergunta {currentQuestion} de {totalQuestions}
        </span>
        <span className="text-xs font-semibold text-primary">
          {Math.round(progress)}%
        </span>
      </div>
      <Progress value={progress} className="h-2" />
    </div>
  );
};
