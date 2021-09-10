FROM node:16.9.0@sha256:94fc8b0a24f03336536ee099a1a70afe9cfe7e71462b65aae79c17426ea4a372 as base
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