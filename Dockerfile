# Stage 1: Use nginx to serve the built Angular app
FROM nginx:alpine
#WORKDIR /app
# Remove default nginx static files
RUN rm -rf /usr/share/nginx/html/*

# Copy the build output from the Jenkins pipeline (dist folder) to Nginx directory
COPY /dist/startng-seed /usr/share/nginx/html

# Expose port 4302 for the frontend
EXPOSE 4302

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
