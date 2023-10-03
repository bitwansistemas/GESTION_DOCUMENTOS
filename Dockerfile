FROM nginx:1.20.1
COPY /dist /usr/share/nginx/html
EXPOSE 4250:80

