# Stage 1: Build the React app
FROM node:20-alpine as build

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install

# Accept build arguments
ARG VITE_API_URL
ARG VITE_COMPANY_URL

# Set environment variables for the build process
ENV VITE_API_URL=$VITE_API_URL
ENV VITE_COMPANY_URL=$VITE_COMPANY_URL

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
