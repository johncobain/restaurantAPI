# Multi-stage build para otimizar o tamanho da imagem
FROM node:18-alpine AS builder

WORKDIR /usr/app

# Copia os arquivos de dependência primeiro (para cache layer optimization)
COPY package*.json ./

# Instala todas as dependências (incluindo devDependencies)
RUN npm ci

# Stage de produção
FROM node:18-alpine AS production

WORKDIR /usr/app

# Instala apenas curl para healthcheck
RUN apk add --no-cache curl

# Cria usuário não-root para segurança
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

# Copia package.json e instala apenas dependências de produção
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

# Copia o código fonte
COPY ./src ./src

# Cria diretório para logs e define permissões
RUN mkdir -p /usr/app/logs && \
    chown -R nodejs:nodejs /usr/app

# Muda para usuário não-root
USER nodejs

# Expõe a porta da aplicação
EXPOSE 3000

# Healthcheck para verificar se a aplicação está funcionando
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1

# Comando para iniciar a aplicação
CMD ["npm", "start"]