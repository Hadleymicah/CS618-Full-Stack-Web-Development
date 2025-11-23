FROM node:20 AS build
ARG VITE_BACKEND_URL=https://zany-winner-g45xrx4gp7g93v5w4-3001.app.github.dev/api/v1
WORKDIR /build
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
RUN npm run build

EXPOSE 3000

# Start the SSR server
CMD ["npm", "start"]