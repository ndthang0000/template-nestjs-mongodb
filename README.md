# NestJS Backend Template

A TypeScript API starter built with NestJS, MongoDB and Redis. The sample `user-tests` resource shows how an HTTP request flows through a controller, a service and a MongoDB repository.

## What to explore

- [Sample controller](src/@api/controllers/user-test.controller.ts) — CRUD endpoints with ObjectId checks, allowlisted sorting, date filters and pagination.
- [Service](src/@api/services/user-test.service.ts) and [repository](src/@core/mongodb/repository/user-test.repository.ts) — the application and persistence layers for the sample resource.
- [Redis cache](src/@core/infrastructure/redis.cache.ts) and [JWT module](src/@api/@guard/jwt.module.ts) — reusable infrastructure and authentication configuration.
- [API bootstrap](src/main.ts) — global DTO validation and Swagger setup.
- [Scaffolding tools](tools/Readme.md) — generators for entities, CRUD modules and DTOs.

## Run locally

Use Node.js 22 and npm, with MongoDB and Redis available. Install dependencies using the checked-in lockfile:

```sh
npm ci
```

Copy [`env/example.env`](env/example.env) to `env/local.env`. Leave `NODE_ENV` unset or set it to `local`. Set `MONGODB_URL`, `REDIS_HOST` and `REDIS_PORT` for your local services and use local JWT secrets. The [configuration file](src/@core/config/core.config.ts) lists the available settings and defaults.

```sh
npm run start:dev
```

With the default port, Swagger is available at `http://localhost:3000/docs`. Try `GET /api/user-tests` or `GET /api/user-tests/paginate` to inspect the sample resource.

## Build and tests

```sh
npm run build
npm run test:e2e
```

The end-to-end test entry point is [`test/app.e2e-spec.ts`](test/app.e2e-spec.ts).
