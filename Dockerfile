# Use the official Node.js 14 image as the base image
FROM node:14

# Set the working directory to /app
WORKDIR /app


# Copy package.json and package-lock.json to the container
COPY package*.json ./

RUN apt-get update && \
    apt-get install -y openssl && \
    apt-get clean

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose port 3000 for the React app
EXPOSE 3000

# Start the React app with hot reloading
CMD ["npm", "start"]