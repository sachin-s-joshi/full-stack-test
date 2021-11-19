FROM node:14.18.1-buster-slim
WORKDIR /app/backend
COPY . /app/
RUN npm install
CMD ["npm","start"]