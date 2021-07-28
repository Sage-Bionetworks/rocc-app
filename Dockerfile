# Build angular app
FROM node:16.2.0-alpine3.12 as build
WORKDIR /app
COPY . ./
RUN npm run install:dependencies \
    && npm run build

# Setup nginx
FROM nginx:1.21.0-alpine
COPY --from=build /app/dist/rocc-app /usr/share/nginx/html
COPY nginx/nginx-client.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
