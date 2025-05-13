########################
# 1️⃣ Build the project
########################
FROM node:24-alpine AS builder

# Create app directory
WORKDIR /app

COPY package*.json ./
RUN npm ci --ignore-scripts

# Copy the rest of the source and build
COPY . .
RUN npm run build

########################
# 2️⃣ Serve with NGINX
########################
FROM nginx:alpine

# Copy the compiled static bundle
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
