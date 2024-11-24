const swaggerAutogen = require("swagger-autogen")();

const outputFile = "./swagger-output.json"; // Arquivo gerado
const endpointsFiles = ["./src/index.js"]; // Arquivos principais de rotas

const doc = {
  info: {
    title: "API ToNaFila",
    description: "Documentação gerada automaticamente",
  },
  host: "localhost:3000", // Substitua pela URL de produção, se necessário
  schemes: ["http", "https"],
};

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  require("./src/index.js"); // Inicia o servidor
});
