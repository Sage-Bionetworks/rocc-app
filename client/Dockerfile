# Compile and Build angular codebase
FROM node:16.2.0-alpine3.12 as build
RUN mkdir -p /app
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package*.json ./
RUN npm ci --silent
# RUN npm install
COPY . ./
RUN npm run build

# Serve app with nginx server
FROM nginx:1.21.0-alpine
# Remove default nginx website
# RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /app/dist/rocc-app /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

# WORKDIR /usr/share/nginx/html
# COPY replace_api_url.sh .
# RUN apk add --no-cache bash
# RUN chmod +x replace_api_url.sh

EXPOSE 80

# CMD ["/bin/bash", "-c", "/usr/share/nginx/html/replace_api_url.sh"]
CMD ["nginx", "-g", "daemon off;"]
