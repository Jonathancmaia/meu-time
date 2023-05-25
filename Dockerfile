# Base image
FROM node:18-alpine

# Diretório de trabalho dentro do contêiner
WORKDIR /app

# Instalar dependências do aplicativo
COPY package.json package-lock.json /app/
RUN npm i

# Copiar o restante dos arquivos do aplicativo
COPY . /app

# Porta que o aplicativo será exposto
EXPOSE 3000

# Comando para iniciar o aplicativo
CMD ["npm", "build"]
