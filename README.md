# Ultimate Feed API

Repository for the main backend api in the Ultimate Feed project .

## Getting started

```bash
# 1. Clone this repository.

# 2. Enter your newly-cloned folder.
$ cd ultimate-feed

# 3. Create Environment variables file.
$ cp .env.example .env
```

## Installation

```bash
npm install
```

## Database

The project uses PostgresSQL as a database

### Configuration

fill correct configuration in env file

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=ultimate-feed
```

### Migrations

```bash
# To create new migration file
$ npm run migration:create migration_name

# Truncate full database (note: it isn't deleting the database)
$ npm run schema:drop

# Generate migration from update of entities
$ npm run migration:generate migration_name
```

## Running the app

```bash
# build
$ npm run build

# watch mode
$ npm run start:dev

# debug mode
$ npm run start:debug

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Documentation

This project uses swagger openapi and the api documentation can be found at `/documentation` when starting in dev

The code base was made using awesome-nest-boilerplate as a guide and closely follows both the architecture and naming conventions

1. [Architecture](https://narhakobyan.github.io/awesome-nest-boilerplate/docs/architecture.html)
2. [Naming Cheatsheet](https://narhakobyan.github.io/awesome-nest-boilerplate/docs/naming-cheatsheet.html)

## Git Workflow

### Branchs

-   master branch: where production ready code lives, rarely merge to here.
-   staging branch: environment closely resembling production for testing.
-   feature branch(es): used for developing new features or fixing bugs, use naming convention _feat/\<feature-name>_ for example _feat/user-authentication_ or _feat/\<ticket-or-issue>_, example _feat/YMC-1232_

### Commits

Commit messages should be in the format _(\<type>) \<detailed comment>_ with type being one of the following

-   feat - actual feature implementation
-   style - code style and code cleanup
-   test - actual test implementation
-   fix - bug fix
-   refactor - refactoring that doesn't affect the code behavior
-   chore - no production code change, but configuration edits and setup

examples

-   _(feat) add authentication_
-   _(fix) cleanup cookies on logout_
-   _(chor) added .env.example file_
-   _(style) fixed indentation_
