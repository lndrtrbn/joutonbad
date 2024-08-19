###################
# BUILD FOR PRODUCTION
###################

FROM node:20.5.1-alpine3.18 As build

ARG VITE_API_URL
ARG VITE_KC_EDITOR_ROLE

WORKDIR /app

COPY --chown=node:node package*.json ./
RUN npm ci

COPY --chown=node:node . .
RUN npm run build

ENV NODE_ENV production

USER node

###################
# PRODUCTION
###################

FROM nginx:1.25.2-bookworm As production

ENV NODE_ENV production

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]