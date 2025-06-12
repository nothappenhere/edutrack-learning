# src/Dockerfile

# Stage 1: Build with Node
FROM node:18 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

# Stage 2: Serve with nginx
FROM nginx:alpine

# Salin hasil build ke direktori nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Gunakan config custom (jika ada)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
