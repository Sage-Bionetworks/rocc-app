# Stage 1: Compile and Build angular codebase

# Use official node image as the base image
FROM node:latest as build

RUN mkdir -p /app

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

RUN npm run build --prod


# Stage 2: Serve app with nginx server

# Use official nginx image as the base image
FROM nginx:latest

# Copy the build outputPath to replace the default nginx contents.
COPY --from=build /app/dist/rocc-app /usr/share/nginx/html

# Expose port 80
EXPOSE 80