import path from "path";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions.js";

export default (): PostgresConnectionOptions => ({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  port: parseInt(process.env.PORT!, 10),
  entities: [path.relative(__dirname, '/**/*.entity{.ts,.js}')],
  synchronize: true, // set to false in production
})