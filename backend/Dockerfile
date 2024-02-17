###################
# BUILD FOR PRODUCTION
###################

FROM node:20.5.1-alpine3.18 As build

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./
RUN npm ci

COPY --chown=node:node . .
RUN npx prisma generate
ENV NODE_OPTIONS=--max_old_space_size=2048
RUN npm run build

ENV NODE_ENV production

USER node

###################
# PRODUCTION
###################

FROM node:20.5.1-alpine3.18 As production

RUN apk update && apk add bash

COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist
COPY --chown=node:node --from=build /usr/src/app/prisma ./prisma
COPY --chown=node:node --from=build /usr/src/app/google-private-key.json .
COPY --chown=node:node start.sh ./

CMD ["/bin/bash", "start.sh"]