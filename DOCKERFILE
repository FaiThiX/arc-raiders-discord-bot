# -------------------------------
# STAGE 1: Build stage
# -------------------------------
FROM node:25-alpine3.21 AS builder

WORKDIR /app

# Install system tools (optional but useful)
RUN apk add --no-cache git

# Copy package files
COPY package*.json ./

# Install ALL dependencies (including devDependencies)
RUN npm install

# Copy the complete project
COPY . .

# Build the TypeScript project → outputs dist/
RUN npm run build

# -------------------------------
# STAGE 2: Production image
# -------------------------------
FROM node:25-alpine3.21 AS production
WORKDIR /app

# Copy only production dependencies
COPY package*.json ./
RUN npm install --production

# Copy compiled JavaScript from builder
COPY --from=builder /app/dist ./dist

# Copy .env.example (optional)
# COPY .env.example ./

ENV NODE_ENV=production

CMD ["node", "dist/index.js"]
