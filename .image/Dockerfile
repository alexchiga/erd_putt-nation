FROM node:16.16.0 AS build
WORKDIR /sources
COPY . .
RUN yarn install
RUN yarn build

FROM nginx:1.20.1 AS production
COPY ./.image/nginx.conf /etc/nginx/conf.d/default.conf
ENV JSFOLDER=/usr/share/nginx/html/*/*.js
COPY ./.image/start-nginx.sh /usr/bin/start-nginx.sh
RUN chmod +x /usr/bin/start-nginx.sh
WORKDIR /usr/share/nginx/html
COPY --from=build /sources/dist/spa .
ENTRYPOINT [ "start-nginx.sh" ]
