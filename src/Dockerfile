# src/Dockerfile

# Stage 1: Build Vue app
FROM node:18 AS build-stage

WORKDIR /app

COPY . .

RUN npm install
RUN npm run build

# Stage 2: Serve with nginx
FROM nginx:stable-alpine AS production-stage

# Copy built files
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Replace default nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose HTTP
EXPOSE 80
