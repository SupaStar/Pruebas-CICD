# Etapa 1: Build
FROM node:20-alpine AS builder

# Establece el directorio de trabajo
WORKDIR /app

# Copia dependencias y archivos de configuración
COPY package.json package-lock.json* pnpm-lock.yaml* yarn.lock* ./

# Instala dependencias
RUN npm install

# Copia el resto del código fuente
COPY . .

# Compila la aplicación Vite
RUN npm run build

# Etapa 2: Servidor estático (nginx)
FROM nginx:stable-alpine

# Copia el build generado al directorio de nginx
COPY --from=builder /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf


# Copia configuración personalizada de nginx si la tienes
# COPY nginx.conf /etc/nginx/nginx.conf

# Expone el puerto 80
EXPOSE 80

# Comando de inicio por defecto
CMD ["nginx", "-g", "daemon off;"]
