FROM node:18

WORKDIR /app
COPY . .

WORKDIR /app/backend
RUN npm install && npm run build

WORKDIR /app/frontend
RUN npm install && npm run build

WORKDIR /app

RUN npm install -g concurrently

ENV PORT=10000
EXPOSE $PORT

CMD ["sh", "-c", "concurrently 'cd backend && PORT=3000 npm run start' 'cd frontend && npx vite preview --host 0.0.0.0 --port $PORT'"]