import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

export const AppDataSource = new DataSource({
  type: 'mysql',
  host:
    process.env.NODE_ENV === 'production'
      ? process.env.DOCKER_DB_HOST
      : process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT ?? '3306', 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ['dist/modules/**/entities/*.js'],
  migrations: ['dist/migrations/*.js'],
  synchronize: false,
  timezone: 'Z',
});

AppDataSource.initialize()
  .then(() => {
    return AppDataSource.runMigrations();
  })
  .then(() => {
    console.log('✅ Migration complete');
    process.exit(0);
  })
  .catch((err) => {
    console.error('❌ Migration failed:', err);
    process.exit(1);
  });
