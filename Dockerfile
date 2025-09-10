# Builder stage
FROM node:18 AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Final stage (Nginx)
FROM nginx:alpine

COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"] I did say to hold off 48 hours so I would assume since you took payment you're going to wait at least two days for me to clarify whether or not to go through with this either way payments yours
