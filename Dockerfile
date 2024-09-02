FROM nginx:alpine

COPY dist/Opportunite /usr/share/nginx/html

EXPOSE 4302

CMD ["nginx", "-g", "daemon off;"]