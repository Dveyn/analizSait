# Используем образ Node.js с поддержкой TypeScript
FROM node:14

# Устанавливаем рабочую директорию
WORKDIR /usr/src/app

# Копируем package.json и package-lock.json для установки зависимостей
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем все файлы проекта
COPY . .

# Открываем порт, если это необходимо
# EXPOSE 3000

# Команда для запуска приложения в режиме разработки
CMD ["npm", "run", "dev"]
