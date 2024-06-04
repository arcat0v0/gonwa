import { User, Room, RoomsToUsers } from '@gonwa/share';
import { createPostgresDataProvider } from 'remult/postgres';
import { remultExpress } from 'remult/remult-express';
import * as dotenv from 'dotenv';
dotenv.config({ path: `${__dirname}/.env` });

const envConfig = process.env;

const connectionString = `postgres://${envConfig.DATABASE_USER}:${envConfig.DATABASE_PASSWORD}@${envConfig.DATABASE_HOST}:${envConfig.DATABASE_PORT}/${envConfig.DATABASE_NAME}`;

export function remultRouter() {
  return remultExpress({
    dataProvider: createPostgresDataProvider({
      connectionString, // default: process.env["DATABASE_URL"]
      // configuration: {} // optional = a `pg.PoolConfig` object or "heroku"
    }),
    entities: [User, Room, RoomsToUsers],
  });
}
