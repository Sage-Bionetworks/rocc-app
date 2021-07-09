# Compile and Build angular codebase
FROM node:latest as build
RUN mkdir -p /app
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package*.json ./
RUN npm ci --silent
RUN npm install
COPY . ./
RUN npm run build

# Serve app with nginx server
FROM nginx:1.21.0-alpine
COPY --from=build /app/dist/rocc-app /usr/share/nginx/html
COPY nginx-client/nginx.conf /etc/nginx/conf.d/default.conf

# WORKDIR /usr/share/nginx/html
COPY env.sh .
COPY env_vars .

RUN apk add --no-cache bash
RUN chmod +x env.sh

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
# CMD ["/bin/bash", "-c", "/usr/share/nginx/html/env.sh && nginx -g \"daemon off;\""]
