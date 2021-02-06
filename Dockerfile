FROM nginx

WORKDIR /var/www/

RUN mkdir /agentblog

ADD ./build /var/www/agentblog/build

RUN rm /etc/nginx/conf.d/default.conf

COPY ./nginx.conf /etc/nginx/conf.d

EXPOSE 80

#CMD ["nginx", "-g", "daemon off;"]