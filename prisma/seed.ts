import { PrismaClient } from "@prisma/client";

const userSeed = [
    {
        id: '33cf9780-3ff4-46a1-a599-addf1d9e577a',
        name: 'Test User Uno',
        email: 'test1@test.com',
        password: '$2b$11$IBrvwcSwMV4XcG/nfJF0.OKOdvlBn8A8s/zxdxlaAIcPSQzTFlpLi',
        created_at: '2024-01-29T20:04:30.809Z',
        updated_at: null,
        deleted_at: null
    },
    {
        id: '13cf9280-3ff4-4aa1-o599-adwf1d9s547b',
        name: 'Test User Dos',
        email: 'test2@test.com',
        password: '$2b$11$IBrvwcSwMV4XcG/nfJF0.OKOdvlBn8A8s/zxdxlaAIcPSQzTFlpLi',
        created_at: '2024-01-29T20:04:30.809Z',
        updated_at: null,
        deleted_at: null
    },
    {
        id: 'd3c29780-3fr4-41a1-a39d-2dhf1d9ea77c',
        name: 'Test User Tres',
        email: 'test3@test.com',
        password: '$2b$11$IBrvwcSwMV4XcG/nfJF0.OKOdvlBn8A8s/zxdxlaAIcPSQzTFlpLi',
        created_at: '2024-01-29T20:04:30.809Z',
        updated_at: null,
        deleted_at: null
    },
    {
        id: 'a3ct9f81-gfa4-41a1-b392-1dhg1d9ea2fd',
        name: 'Test User Catorse',
        email: 'test4@test.com',
        password: '$2b$11$IBrvwcSwMV4XcG/nfJF0.OKOdvlBn8A8s/zxdxlaAIcPSQzTFlpLi',
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