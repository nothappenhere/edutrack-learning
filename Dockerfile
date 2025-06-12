# Dockerfile (di root)

### STAGE 1: Build Frontend ###
FROM node:18 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# WORKDIR /app/src
RUN npm run build

### STAGE 2: Setup NGINX to serve frontend ###
FROM nginx:alpine AS frontend

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html

### STAGE 3: Setup Backend ###
FROM node:18 AS backend

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Expose port backend
EXPOSE 8000
CMD ["npm", "run", "server"]
