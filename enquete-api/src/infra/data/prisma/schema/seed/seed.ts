import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const statusQuestions = [
  {
    id_status_question: 1,
    status_question: "Ativa",
  },
  {
    id_status_question: 2,
    status_question: "Finalizada",
  },
  {
    id_status_question: 3,
    status_question: "Deletada",
  },
  {
    id_status_question: 4,
    status_question: "Desativada",
  },
];

async function questionSeed() {
  for await (const statusQuestion of statusQuestions) {
    await prisma.statusQuestion.upsert({
      where: {
        id_status_question: statusQuestion.id_status_question,
      },
      create: statusQuestion,
      update: statusQuestion,
    });
  }
}

questionSeed()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async () => {
    await prisma.$disconnect;
    process.exit(1);
  });
