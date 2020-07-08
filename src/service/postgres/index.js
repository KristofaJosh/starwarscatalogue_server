const pgtools = require('pgtools');
const Pool = require('pg').Pool;

const config = {
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    host: '',
    port: '',
};

const pool = new Pool(config);

pgtools.createdb(config, 'starwars', function (err, res) {
    if (err) {return} // db created already
    console.log(res);
});

const query = `
    CREATE TABLE IF NOT EXISTS comments (
        id serial,
        ip varchar,
        episode varchar,
        comment varchar,
        created_at varchar                             
    );
`;

pool.query(query, (err, res) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log('Table is successfully created');
});


module.exports = pool;