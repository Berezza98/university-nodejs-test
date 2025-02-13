import http from 'node:http';
import pg from 'pg';

const client = new pg.Client({
  host     : process.env.DB_HOSTNAME,
  user     : process.env.DB_USERNAME,
  password : process.env.DB_PASSWORD,
  port     : process.env.DB_PORT,
  database : process.env.DB_DB_NAME,
  // ssl: {
  //   rejectUnauthorized: false,
  // },
});

const server = http.createServer((req, res) => {
  res.end('HELLO ROMAN');
});

async function main() {
  try {
    console.log('TRY TO RUN MAIN');
    await client.connect();
    await client.query(`
CREATE TABLE IF NOT EXISTS app_user (
  id INT GENERATED ALWAYS AS IDENTITY,
  username VARCHAR(45) NOT NULL,
  password VARCHAR(450) NOT NULL
)`);
  
    console.log('CONNECTION DONE !!!')
  
    server.listen(process.env.PORT);
  } catch (e) {
    console.error(e);
  }
}

main();