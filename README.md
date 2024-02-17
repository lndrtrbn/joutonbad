# Joutonbad

Web application to help manage and centralize the registrations of your club's badminton players to individual tournaments organized by other clubs.

> Project made by Landry Trebon for the REC Badminton.

## Table of contents

- [Joutonbad](#joutonbad)
  - [Table of contents](#table-of-contents)
  - [Repository organization](#repository-organization)
  - [Development techs](#development-techs)
  - [Run locally](#run-locally)
    - [Start Docker containers](#start-docker-containers)
    - [\[FIRST LAUNCH\] Configure Keycloak](#first-launch-configure-keycloak)
      - [Realm and Client](#realm-and-client)
      - [Custom role](#custom-role)
      - [Moderator user](#moderator-user)
      - [Email configuration](#email-configuration)
    - [\[FIRST LAUNCH\] Prepare the environment](#first-launch-prepare-the-environment)
    - [Start applications](#start-applications)

## Repository organization

**Root folder** - Contains documentation.\
**Deployment** - Contains Docker deployment files.\
**Backend** - Contains source code for the API.\
**Frontend** - Contains source code for the web application.

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

### [FIRST LAUNCH] Configure Keycloak

#### Realm and Client

First we create a realm and a client. They represent our app.

- Go to http://localhost:8080/ to configure Keycloak.
- Use the account set in the `docker-compose.yml` file to log in with `KEYCLOAK_ADMIN_USER` and `KEYCLOAK_ADMIN_PASSWORD`.
- Create a new Realm called `joutonbad` (top-left button).
- Create a new Client (Menu: Clients then Create button):
  - Set the Client ID to `joutonbad-api`,
  - Set Client authentication to `ON`,
  - Save the client.

> You can find the Client Secret in the tab `Credentials`.

#### Custom role

Then we create a custom role that represent admins in our app.

- Menu: Clients > the client you created and roles tab then Create button:
  - Set a name for this role,
  - Save the role.
- Menu: Realm roles then Create button:
  - Set a name for this role,
  - Save the role,
  - Associate the role with the client role.

#### Moderator user

We create a user that will be used in the codebase to call Keycloak API.

- Menu: Users then Add button:
  - Set username to `joutonbad-api`,
  - Set Email Verified to `Yes`,
  - Create the user.
  - In Credentials tab create a password for the user,
    - Generate a password,
    - Keep the password in mind for env variables later,
    - Set Temporary password to `No`,
    - Save the password.
  - In Role mapping tab, asign those roles:
    - `realm-admin`,
    - `view-users`,
    - `query-users`,
    - `manage-users`.

#### Email configuration

Finally we configure Keycloak to be able to send emails.

- Menu: Realm Settings, tab Email:
  - Set From with `recbad35.inscriptions.tournois@gmail.com`,
  - Set Display name with `Rec Badminton - inscriptions tournois`,
  - Set Host with `smtp.gmail.com`,
  - Set Port with `465`,
  - Enable SSL,
  - Enable Authentication,
  - Set Username with `recbad35.inscriptions.tournois`,
  - Set Password with 16 digit code from Google.

### [FIRST LAUNCH] Prepare the environment

Install dependencies in both **frontend** and **backend** folders using the command:

```sh
npm install # or npm i
```

In the backend:

- Create a file `.env` by copying `.env.template` and fill the environment variables,
- Initialize Prisma with the command:

```sh
npm run prisma
```

### Start applications

In each **frontend** and **backend** folder run the command:

```sh
npm start
```
