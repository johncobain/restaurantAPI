FROM node:18-slim

WORKDIR /usr/app

# Instala dependências do sistema se necessário
RUN apt-get update && apt-get install -y --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

# Copia os arquivos de dependência
COPY package*.json ./

# Instala as dependências do Node.js
RUN npm install

# Copia o código fonte
COPY ./src ./src

COPY .env ./

# Expõe a porta da aplicação
EXPOSE 3000

# Define o usuário não-root para segurança
USER node

# Comando para iniciar a aplicação
CMD ["npm", "start"]