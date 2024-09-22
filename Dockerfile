# Use the official Node.js image
FROM node:18.18.0

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["npx", "nodemon", "--exec", "npx", "ts-node", "src/app.ts"]
