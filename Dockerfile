# Stage 1
FROM node:alpine as build 
WORKDIR /app
COPY package.json ./
RUN npm install --legacy-peer-deps
COPY . ./
RUN npm run build

# Stage 2
FROM node:alpine 
RUN npm install -g serve --force
WORKDIR /app 
COPY --from=build /app/build .
CMD ["serve", "-p", "3000", "-s", "."]