# backend/Dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy file package.json dari root proyek (satu level di atas folder backend)
COPY package*.json ./

# Install dependency
RUN npm install

# Salin isi folder backend ke /app
COPY backend/ .

EXPOSE 8000

CMD ["npm", "run", "server"]
