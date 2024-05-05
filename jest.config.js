module.exports = {
    // Use o preset 'ts-jest' para configurar automaticamente o suporte ao TypeScript
    preset: 'ts-jest',

    // Indique que os testes serão executados em um ambiente Node.js
    testEnvironment: 'node',

    // Configurações globais para o ts-jest
    globals: {
        'ts-jest': {
            // Isola os módulos para cada teste
            isolatedModules: true
        }
    },

    // Limpa automaticamente os mocks entre os testes
    clearMocks: true,

    // Define o provedor de cobertura de código para 'v8' (pode ser alterado conforme necessário)
    coverageProvider: 'v8',

    // Define os limiares de cobertura de código para todos os testes
    coverageThreshold: {
        global: {
            functions: 100,
            lines: 100,
            statements: 100
        }
    },

    // Ignora os arquivos no diretório 'dist' ao executar os testes
    testPathIgnorePatterns: ['./dist/*']
};