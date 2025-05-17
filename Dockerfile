# Stage 1: Build
FROM node:20-alpine AS builder
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source files and build the app
COPY . .


# ✅ Generate Prisma client sebelum build
RUN npx prisma generate

RUN npm run build

# Stage 2: Run
FROM node:20-alpine AS runner
WORKDIR /app

# Only copy necessary files from build stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000

# CMD ["npm", "start"]
# Ini bagian penting!
CMD npx prisma db push && npm run start
