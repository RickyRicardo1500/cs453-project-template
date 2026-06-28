# Database

This project uses PostgreSQL running in Docker.

## Setting up the database

```shell
docker compose up -d
or 
npm run db:start

```

Check if running
```shell
docker ps
```

Should see docker container cs453-postgress.

Stop the database
```shell
docker compose down 
or 
npm run db:stop
```
Reset the database completely
```shell
docker compose down -v
or 
npm run db:reset
```
## Default connection settings
- Database: cs453 
- User: postgres 
- Password: postgres 
- Port: 5432

```dotenv
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/cs453
```

## Creating tables

Install psql client
```
sudo apt install postgresql-client
```

Run the schema file against the local database after PostgreSQL is running:

```shell
psql postgresql://postgres:postgres@localhost:5432/cs453 -f database/schema.sql
```

## Errors
If there is failure to connect, its likely due to using IPv6 instead of IPv4
Create daemon.json at /etc/docker/ and add the text below and save the file.

{
    "ipv6": false,
    "dns": ["8.8.8.8", "1.1.1.1"]
}

Restart docker
```shell
sudo systemctl restart docker
```

Rerun above commands