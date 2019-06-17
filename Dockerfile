FROM nginx:alpine
COPY scriptit.js /usr/share/nginx/html
COPY index.html /usr/share/nginx/html
EXPOSE 80
