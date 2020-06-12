FROM nginx:alpine
RUN mkdir /app
WORKDIR /app
RUN mkdir ./build
COPY ./build ./build
RUN rm -rf /etc/nginx/conf.d/default.conf
COPY default.conf /etc/nginx/conf.d
COPY ./fullchain.pem /etc/ssl/fullchain.pem
COPY ./privkey.pem /etc/ssl/privkey.pem
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]