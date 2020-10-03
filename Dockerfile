FROM nginx

COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf.template

COPY ./nginx/nginx.conf /etc/nginx/nginx.conf

COPY ./public /usr/share/nginx/html
