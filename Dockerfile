# Stage 1: Build the React app
FROM node:20-alpine as build

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install

COPY . .

RUN ls -la

RUN npm run build

RUN ls -la /app

# Stage 2: Serve the static files
FROM node:20-alpine

WORKDIR /app

# Install a simple static server
RUN npm install -g serve

# Copy the built app from the previous stage
COPY --from=build /app/dist ./dist

# Environment variables
ENV PORT=3000

EXPOSE 3000

CMD ["serve", "-s", "build", "-l", "3000"]
