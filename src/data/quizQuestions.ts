import { QuizQuestion } from "@/types/quiz";

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "Primeiro, me diz: qual é o seu sexo?",
    subtitle: "Vamos personalizar o programa para você",
    type: "gender",
    options: [
      { id: "male", text: "Homem", value: 0, icon: "male" },
      { id: "female", text: "Mulher", value: 0, icon: "female" },
    ],
  },
  {
    id: 2,
    question: "Qual é a sua idade?",
    subtitle: "Isso nos ajuda a personalizar melhor o programa",
    type: "age",
    options: [
      { id: "18-29", text: "18-29 anos", value: 0, image: "18-29" },
      { id: "30-39", text: "30-39 anos", value: 0, image: "30-39" },
      { id: "40-49", text: "40-49 anos", value: 0, image: "40-49" },
      { id: "50+", text: "50+ anos", value: 0, image: "50plus" },
    ],
  },
  {
    id: 3,
    question: "Qual é o seu principal objetivo com o SECA21?",
    options: [
      { id: "a", text: "Perder barriga e definir o abdômen", value: 3 },
      { id: "b", text: "Emagrecer de forma saudável", value: 2 },
      { id: "c", text: "Ganhar mais disposição e energia", value: 1 },
      { id: "d", text: "Todos os acima", value: 3 },
    ],
  },
  {
    id: 4,
    question: "Quanto tempo você pode dedicar aos treinos por dia?",
    options: [
      { id: "a", text: "Menos de 15 minutos", value: 1 },
      { id: "b", text: "15 a 30 minutos", value: 2 },
      { id: "c", text: "30 a 45 minutos", value: 3 },
      { id: "d", text: "Mais de 45 minutos", value: 3 },
    ],
  },
  {
    id: 5,
    question: "Como você descreveria sua alimentação atual?",
    options: [
      { id: "a", text: "Muito desregulada, como qualquer coisa", value: 1 },
      { id: "b", text: "Tento comer bem, mas tenho dificuldades", value: 2 },
      { id: "c", text: "Sigo uma alimentação balanceada na maioria das vezes", value: 3 },
      { id: "d", text: "Muito controlada e saudável", value: 3 },
    ],
  },
  {
    id: 6,
    question: "Qual é o seu nível atual de atividade física?",
    options: [
      { id: "a", text: "Sedentário - não faço exercícios", value: 1 },
      { id: "b", text: "Leve - 1 a 2x por semana", value: 2 },
      { id: "c", text: "Moderado - 3 a 4x por semana", value: 3 },
      { id: "d", text: "Intenso - 5x ou mais por semana", value: 3 },
    ],
  },
  {
    id: 7,
    question: "Qual é o seu maior desafio para emagrecer?",
    options: [
      { id: "a", text: "Falta de tempo para treinar", value: 2 },
      { id: "b", text: "Falta de motivação e disciplina", value: 2 },
      { id: "c", text: "Não sei por onde começar", value: 3 },
      { id: "d", text: "Dificuldade em manter a consistência", value: 3 },
    ],
  },
  {
    id: 8,
    question: "Você tem alguma restrição alimentar?",
    options: [
      { id: "a", text: "Não tenho restrições", value: 3 },
      { id: "b", text: "Vegetariano/Vegano", value: 2 },
      { id: "c", text: "Intolerância a lactose/glúten", value: 2 },
      { id: "d", text: "Outras restrições", value: 2 },
    ],
  },
  {
    id: 9,
    question: "Você já tentou programas de emagrecimento antes?",
    options: [
      { id: "a", text: "Não, esta seria minha primeira vez", value: 1 },
      { id: "b", text: "Sim, mas não consegui resultados", value: 3 },
      { id: "c", text: "Sim, tive resultados mas não mantive", value: 3 },
      { id: "d", text: "Sim, e tive sucesso parcial", value: 2 },
    ],
  },
  {
    id: 10,
    question: "Qual resultado você espera alcançar em 21 dias?",
    options: [
      { id: "a", text: "Perder de 3 a 5 kg", value: 2 },
      { id: "b", text: "Perder de 5 a 8 kg", value: 3 },
      { id: "c", text: "Definir o abdômen e perder medidas", value: 2 },
      { id: "d", text: "Criar hábitos saudáveis duradouros", value: 3 },
    ],
  },
  {
    id: 11,
    question: "Você está realmente comprometido(a) a seguir o programa por 21 dias?",
    options: [
      { id: "a", text: "Sim, estou 100% comprometido(a)!", value: 3 },
      { id: "b", text: "Sim, mas vou precisar de suporte", value: 2 },
      { id: "c", text: "Talvez, quero ver primeiro como funciona", value: 1 },
      { id: "d", text: "Sim, já tentei outras coisas e quero algo que realmente funcione", value: 3 },
    ],
  },
];
