#Dockerfile

# Use this image as the platform to build the app
FROM node:20.11-alpine

LABEL Developers="Carly Richmond"

# The WORKDIR instruction sets the working directory for everything that will happen next
WORKDIR /app

COPY package.json package.json
COPY package-lock.json package-lock.json

# Clean install all node modules
RUN npm ci

# Copy all local files into the image
COPY . .

# Build SvelteKit app
RUN npm run build

# This is the command that will be run inside the image when you tell Docker to start the container
ENTRYPOINT ["npm", "run", "preview"]

# Make available default port
ENV PORT=4173
EXPOSE ${PORT}