# Compile and Build angular codebase
FROM node:latest as build

RUN mkdir -p /app

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

RUN npm run build --prod

# Serve app with nginx server
FROM nginx:latest

# Copy the build outputPath to replace the default nginx contents.
COPY --from=build /app/dist/rocc-app /usr/share/nginx/html

EXPOSE 80