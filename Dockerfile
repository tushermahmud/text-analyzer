# Use the official Node.js image
FROM node:18.18.0 as build

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application code
COPY . .

# building the app
RUN npm run build

# ommiting dev dependencies
RUN npm ci --omit=dev


FROM node:18.18.0-alpine3.18
WORKDIR /app

COPY --from=build /usr/src/app ./
# Expose the port the app runs on
EXPOSE 4000

# Start the application
CMD ["npm", "start"]
