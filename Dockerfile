FROM node:17.6.0@sha256:e3b6896c517a81c973f6d08092f72b2318dd8c1ce42b3df032958d7cd1d3ce6d as base
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