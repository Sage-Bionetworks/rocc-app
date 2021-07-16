# Compile and Build angular codebase
FROM node:16.2.0-alpine3.12 as build
RUN mkdir -p /app
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . ./
RUN npm run build

# Serve app with nginx server
FROM nginx:1.21.0-alpine
COPY --from=build /app/dist/rocc-app /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
