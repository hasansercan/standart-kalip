# Frontend Dockerfile
FROM node:18-alpine AS build

WORKDIR /app

# Frontend dependencies
COPY package*.json ./
RUN npm ci

# Frontend source
COPY . ./

# Build frontend
RUN npm run build

# Nginx to serve frontend
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
