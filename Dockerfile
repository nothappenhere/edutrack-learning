# Dockerfile (di root)

# === Build Vue.js & Express.js + Serve Vue dist ===
FROM node:18 AS frontend
WORKDIR /app/client
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Copy build hasil Vue
FROM nginx:alpine AS builder
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=frontend /app/dist /usr/share/nginx/html

# Jalankan aplikasi
WORKDIR /app
EXPOSE 8000
CMD ["npm", "start.js"]
