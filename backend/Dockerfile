# backend/Dockerfile

FROM node:18

# Set working directory
WORKDIR /app

# Copy project files
COPY . .

# Install dependencies
RUN npm install

# Expose port
EXPOSE 8000

# Start the backend server
CMD ["node", "server.js"]

