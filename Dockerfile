# Stage 1: Build the React app
FROM node:20-alpine as build

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Serve the static files
FROM node:20-alpine

WORKDIR /app

# Install serve
RUN npm install -g serve

# Copy the built app from Vite (dist directory instead of build)
COPY --from=build /app/dist ./dist

ENV PORT=8080
EXPOSE 8080

CMD ["serve", "-s", "dist", "-l", "8080"]
