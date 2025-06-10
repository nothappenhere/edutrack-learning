# Build stage
FROM node:18 as build-stage

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=build-stage /app/dist /usr/share/nginx/html

EXPOSE 80
