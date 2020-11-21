FROM ubuntu:14.04

RUN apt-get update
RUN apt-get install -y nodejs yarn

ADD . /var/www/

WORKDIR /var/www
RUN yarn install

EXPOSE 3000

CMD yarn start