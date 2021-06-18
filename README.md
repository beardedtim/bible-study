# Bible Study

## Getting Started

```shell
# start the database in the background
docker-compose up -d
# Next install deps
npm install
# If this is your first time,
# you will need to prepare the DB
# This will not exit and once it prints
# "Database prepared", wait 3 seconds then ctrl + c
node init.js
# You can then run the system in production
node index.js
# or you can run the system in development and
# have changes to your code cause it to restart
npm run dev
```

You can now access `localhost:5000` according to the Insomnia
API docs found in the [artifacts](./artifacts/API-Docs-Insomnia.yml)

### Changing Port

You will want to change `server.listen(<port>)` inside of `index.js`

### Change DB Connection Values

You will want to change `knexfile.js`
