FROM node:14.7.0-stretch-slim as base
WORKDIR /app
COPY package.json yarn.lock ./

FROM base as dev
RUN yarn install

FROM dev as build
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