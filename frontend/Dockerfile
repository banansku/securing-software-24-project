FROM node:18

WORKDIR /app

COPY . .

RUN npm install && \
    npm run build

EXPOSE 5173

CMD ["npx", "vite", "preview", "--host", "0.0.0.0", "--port", "5173"]