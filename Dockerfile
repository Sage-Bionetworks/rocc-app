# Build the Angular app
FROM node:16.2.0-alpine3.12 as build
WORKDIR /app
COPY rocc-client-angular rocc-client-angular/
COPY sage-angular sage-angular/
COPY src src/
COPY angular.json package.json package-lock.json tsconfig.app.json \
    tsconfig.json tsconfig.spec.json tslint.json ./
RUN npm run install:dependencies \
    && npm run build

# Setup nginx
FROM nginx:1.21.0-alpine
COPY --from=build /app/dist/rocc-app /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY nginx/templates /etc/nginx/templates
COPY 10-envsubst-on-app-config-template.sh /docker-entrypoint.d/.
RUN chmod +x /docker-entrypoint.d/10-envsubst-on-app-config-template.sh

EXPOSE 80

# ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
