import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.user.create({
    data: {
      id: "1",
      name: "Joselito Sem Noção",
      email: "joselito@gmail.com",
      password: "123456",
      created_at: new Date(),
      updated_at: new Date(),
    }
  })
  console.log("Usuário criado com sucesso!")
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  })