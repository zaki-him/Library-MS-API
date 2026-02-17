import path from 'path';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions.js';

export default (): PostgresConnectionOptions => {
  return {
    type: 'postgres',
    url: process.env.DATABASE_URL,
    entities: [path.join(__dirname, '../**/*.entity.{ts,js}')],
    synchronize: process.env.NODE_ENV !== 'production',
    ssl: {
      rejectUnauthorized: false,
    },
  };
};
