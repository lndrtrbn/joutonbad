###################
# BUILD FOR PRODUCTION
###################

FROM node:18 as keycloakify_jar_builder

RUN apt-get update && \
    apt-get install -y openjdk-17-jdk && \
    apt-get install -y maven;

COPY ./theme/package.json ./theme/yarn.lock /opt/app/

WORKDIR /opt/app

RUN yarn install --frozen-lockfile
COPY ./theme/ /opt/app/
RUN yarn build-keycloak-theme

FROM bitnami/keycloak:23.0.7 as builder

WORKDIR /opt/bitnami/keycloak

COPY --from=keycloakify_jar_builder /opt/app/dist_keycloak/target/joutonbad-theme-keycloak-theme-6.1.10.jar /opt/bitnami/keycloak/providers/
RUN /opt/bitnami/keycloak/bin/kc.sh build

###################
# PRODUCTION
###################

FROM bitnami/keycloak:23.0.7

COPY --from=builder /opt/bitnami/keycloak/ /opt/bitnami/keycloak/

ENTRYPOINT ["/opt/bitnami/keycloak/bin/kc.sh", "start-dev"]