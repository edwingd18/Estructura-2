# Usa la imagen base de Node.js
FROM node:18

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia el archivo package.json y package-lock.json (si existe)
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de los archivos del proyecto
COPY . .

# Elimina la carpeta node_modules y vuelve a instalar las dependencias
RUN rm -rf node_modules && npm install

# Expone el puerto en el que se ejecutará el servidor
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "start"]
