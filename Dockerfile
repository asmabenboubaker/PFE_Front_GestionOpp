# Stage 1: Use nginx to serve the built Angular app
FROM nginx:alpine

# Remove default nginx static files
RUN rm -rf /usr/share/nginx/html/*

# Copy the build output from the Jenkins pipeline (dist folder) to Nginx directory
COPY ./dist /usr/share/nginx/html

# Copy custom NGINX configuration to listen on port 4302
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 4302 for the frontend
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
