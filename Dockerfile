# Compile and Build angular codebase
FROM node:latest as build
RUN mkdir -p /app
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package*.json /app/

RUN npm ci --silent
RUN npm install
COPY . /app
RUN npm run build --prod

# Serve app with nginx server
FROM nginx:latest
COPY --from=build /app/dist/rocc-app /usr/share/nginx/html

EXPOSE 80
# CMD ["npm", "start"]