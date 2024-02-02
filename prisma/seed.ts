import { PrismaClient } from "@prisma/client";

const userSeed = [
    {
        id: '33cf9780-3ff4-46a1-a599-addf1d9e577b',
        name: 'Test User',
        email: 'test@test.com',
        password: '123456789',
        created_at: '2024-01-29T20:04:30.809Z',
        updated_at: null,
        deleted_at: null
    }
];

const prisma = new PrismaClient();

async function main() {
    for (let user of userSeed) {
        await prisma.user.create({
            data: user
        });
    }
}

main().catch(error => {
    console.log(error);
    process.exit(1);
}).finally(() => {
    prisma.$disconnect();
})