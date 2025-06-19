# Backend Dockerfile
FROM node:18-alpine AS backend

WORKDIR /app/backend

# Backend dependencies
COPY backend/package*.json ./
RUN npm ci --only=production

# Backend source
COPY backend/ ./

EXPOSE 5000

CMD ["npm", "start"]
