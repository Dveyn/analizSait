import { Pool } from 'pg';

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'ai_sait',
  password: 'a8928a',
  port: 5432,
});

export default pool;
