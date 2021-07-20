# Stage 1 --- angular app
FROM node:16.2.0-alpine3.12 as build
RUN mkdir -p /app
WORKDIR /app
COPY . ./
RUN npm run install:deps
RUN npm run build

# Stage 2 --- nginx
FROM nginx:1.21.0-alpine
COPY --from=build /app/dist/rocc-app /usr/share/nginx/html
COPY nginx/nginx-client.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
