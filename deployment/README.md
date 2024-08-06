# Joutonbad - Deployment documentation

- [Joutonbad - Deployment documentation](#joutonbad---deployment-documentation)
  - [Repository organization](#repository-organization)
  - [Deploy the application](#deploy-the-application)
  - [Usefull docker commands](#usefull-docker-commands)
  - [Run a Prisma migration](#run-a-prisma-migration)
  - [Nginx configuration](#nginx-configuration)
    - [Set app in maintenance](#set-app-in-maintenance)
    - [Set app back online](#set-app-back-online)
    - [make keycloak available](#make-keycloak-available)


## Repository organization

**joutonbad-dev** - Docker compose to deploy a dev/test env.\
**joutonbad-local** - Docker compose for a local env for development purpose.\
**joutonbad-prod** - Docker compose for prod.\
**maintenance.html** - HTML page where in maintenance.

## Deploy the application

Connect to the VPS through SSH.

Go to `joutonbad/deployment/joutonbad-prod` folder.

Fetch last commits and run

```
docker compose build
docker compose up -d
```

## Usefull docker commands

```
docker ps                           # print containers states
docker logs -f <container>          # Print logs of a container
docker exec -it <container> sh      # Execute a shell inside a container
```

## Run a Prisma migration

```
cd joutonbad/deployment/joutonbad-prod
docker exec -it api sh
cd prisma/migrations
node <migration_file> --db=<DB_URL>
exit
docker compose down api
docker compose up -d
```

## Nginx configuration

### Set app in maintenance

```
sudo rm /etc/nginx/sites-enabled/joutonbad
sudo ln -s /etc/nginx/sites-available/joutonbad-maintenance-app /etc/nginx/sites-enabled/joutonbad-maintenance-app
sudo ln -s /etc/nginx/sites-available/joutonbad-maintenance-kc /etc/nginx/sites-enabled/joutonbad-maintenance-kc
sudo service nginx restart
```

### Set app back online

```
sudo rm /etc/nginx/sites-enabled/joutonbad-maintenance-app
sudo ln -s /etc/nginx/sites-available/joutonbad /etc/nginx/sites-enabled/joutonbad
sudo service nginx restart
```

### make keycloak available

```
sudo rm /etc/nginx/sites-enabled/joutonbad-maintenance-kc
sudo service nginx restart
```