# Estágio de build: compila a aplicação
FROM node:20-alpine AS builder

# Configura o diretório de trabalho
WORKDIR /app

# 1. Copia os arquivos de definição de dependências
COPY package.json package-lock.json ./

# 2. Instala as dependências (incluindo devDependencies)
RUN npm ci

# 3. Copia todo o código fonte
COPY . .

# 4. Executa o build (TypeScript + Vite)
RUN npm run build

# Estágio de produção: imagem leve
FROM node:20-alpine

# Configura o diretório de trabalho
WORKDIR /app

# 5. Instala apenas as dependências de produção
COPY package.json package-lock.json ./
RUN npm ci --production

# 6. Copia os artefatos de build
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/index.js ./

# 7. Configura variáveis de ambiente
ENV PORT=8080
ENV NODE_ENV=production

# 8. Expõe a porta e inicia o servidor
EXPOSE $PORT
CMD ["node", "index.js"]
