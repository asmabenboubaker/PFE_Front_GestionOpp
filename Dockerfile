# Use a Node.js image to build the Angular app
FROM node:16 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --prod

# Use an Nginx image to serve the Angular app
FROM nginx:alpine
COPY --from=build /app/dist/startng-seed /usr/share/nginx/html
EXPOSE 4302
CMD ["nginx", "-g", "daemon off;"]
