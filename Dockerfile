# Estágio de build: compila a aplicação
FROM node:20-alpine AS builder

WORKDIR /app

# 1. Copia apenas os arquivos necessários para instalação
COPY package.json package-lock.json ./

# 2. Instala todas as dependências (incluindo devDependencies)
RUN npm ci

# 3. Copia o restante do código
COPY . .

# 4. Executa o build (TypeScript + Vite)
RUN npm run build

# Estágio de produção: imagem leve
FROM node:20-alpine

WORKDIR /app

# 5. Copia apenas o necessário para produção
COPY package.json package-lock.json ./

# 6. Instala apenas dependências de produção (IGNORA scripts)
RUN npm ci --production --ignore-scripts

# 7. Copia os artefatos de build
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/index.js ./

# 8. Configura variáveis de ambiente
ENV PORT=8080
ENV NODE_ENV=production

# 9. Expõe a porta e inicia o servidor
EXPOSE $PORT
CMD ["node", "index.js"]
