# Use an official Node.js runtime as the base image
FROM node:20.4.0

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install the project dependencies
RUN npm install

RUN npm install -g @nestjs/cli

# Copy the rest of the application code to the container
COPY . .

# Expose the port that the application will run on
EXPOSE 3000

# Set the command to run your NestJS application when the container starts
CMD [ "npm", "run", "start" ]

