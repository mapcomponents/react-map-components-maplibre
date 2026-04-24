FROM node:22 as node_builder
WORKDIR /usr/src/app
COPY . /usr/src/app
RUN yarn
RUN yarn build

FROM nginxinc/nginx-unprivileged:1.29

COPY --from=node_builder /usr/src/app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
