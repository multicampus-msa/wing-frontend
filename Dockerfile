FROM nginx:alpine
RUN mkdir /app
WORKDIR /app
RUN mkdir ./build
COPY ./build ./build
RUN rm -rf /etc/nginx/conf.d/default.conf
COPY default.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]