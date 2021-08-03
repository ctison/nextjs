FROM node:16.6.1@sha256:f71e36d6dcc304ade813e89d3b585d6b4c57b95cc8b27da04e3c25b1b50981a5 as base
WORKDIR /app
COPY package.json yarn.lock ./

FROM base as dev

FROM base as build
RUN yarn install
COPY . ./
RUN yarn run format
RUN yarn run lint
RUN yarn run build

FROM base as prod
COPY --from=build /app/node_modules/ ./node_modules/
COPY --from=build /app/public/ ./public/
COPY --from=build /app/.next/ ./.next/
EXPOSE 3000
CMD ["yarn", "start"]