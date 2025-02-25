# Etapa 1: Construcción de la aplicación Angular
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --prod

# Etapa 2: Servir la aplicación con Nginx
FROM nginx:alpine
# Asegúrate de usar la ruta correcta según lo que indica angular.json
COPY --from=build /app/dist/mcm_proyecto_angular /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
