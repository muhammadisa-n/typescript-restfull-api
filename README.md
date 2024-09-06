# typescript-restfull-api

# Setup Project

Create .env file

```
DATABASE_URL="mysql://username:password@host:port/databasename"
```

```shell
npm install
npx prisma migrate dev
npx prisma generate
npx tsc
node dist/main,js
```
