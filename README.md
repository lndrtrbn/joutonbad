# Joutonbad

Web application to help manage and centralize the registrations of your club's badminton players to individual tournaments organized by other clubs.

Project made by Landry Trebon for the REC Badminton.

> This README is to help developers set up a local env.
> For deployment informations please go to `/deployment` folder.

- [Joutonbad](#joutonbad)
  - [Repository organization](#repository-organization)
  - [Development techs](#development-techs)
  - [Run locally](#run-locally)
    - [Start Docker containers](#start-docker-containers)
    - [\[first launch\] Prepare the environment](#first-launch-prepare-the-environment)
    - [Start applications](#start-applications)
    - [\[backend\] How to run a migration](#backend-how-to-run-a-migration)

## Repository organization

**Root folder** - Contains documentation and prettier config.\
**Deployment** - Contains Docker deployment files.\
**Backend** - Contains source code for the API.\
**Frontend** - Contains source code for the browser app.

## Development techs

Both backend and frontend are developped in TypeScript.

**Frontend** - Uses React and Tailwind.\
**Backend** - Uses NestJS and Prisma.

## Run locally

> How to run the platform locally for development purpose.

### Start Docker containers

Go to `deployment/joutonbad-local` and run the command:

```sh
docker compose up -d
```

### [first launch] Prepare the environment

Install dependencies in both **frontend** and **backend** folders using the command:

```sh
npm install # or npm i
```

In the backend:

- Create a file `.env` by copying `.env.template` and fill the environment variables (you will need to ask for what to fill),
- Initialize Prisma with the command:

```sh
npm run prisma
```

### Start applications

In each **frontend** and **backend** folder run the command:

```sh
npm start
```

### [backend] How to run a migration

> /!\ Only for local environment, NOT for production.

Go to the migration folder (`backend/prisma/migrations`) and run this command:

```sh
node <filename> --db=<DB_URL>
```

Where `filename` is s Javascript file containing the migration.

Update the file `MIGRATION.md` to update the number of the last migration run.
