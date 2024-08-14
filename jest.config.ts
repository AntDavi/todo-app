// jest.config.ts

import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
    preset: 'ts-jest',
    testEnvironment: 'jest-environment-jsdom',
    transform: {
        "^.+\\.tsx?$": "ts-jest", // Processar arquivos *.tsx e *.ts com ts-jest
    },
    rootDir: "src", // Diretório raiz dos testes
    testMatch: [
        '**/__tests__/**/*.(test|spec).ts?(x)', // Encontrar arquivos de teste com .test.ts, .test.tsx, .spec.ts, .spec.tsx
        '**/?(*.)+(test|spec).ts?(x)' // Encontrar arquivos de teste com .test.ts, .test.tsx, .spec.ts, .spec.tsx
    ],
    moduleNameMapper: {
        '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/test/__mocks__/fileMock.js',
    },
};

export default config;
