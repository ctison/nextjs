FROM node:17.0.1@sha256:ac817d2e9750109b99a166b5895f4c3e1faccf3878b5f99d571f5d7b30f3414b as base
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