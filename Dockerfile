FROM node:18

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
RUN npx tsc

EXPOSE 5000
CMD ["node", "dist/index.js"]

# docker build -t personal-blog-backend .
# docker run -p 5000:5000 personal-blog-backend