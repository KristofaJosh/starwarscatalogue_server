const pgtools = require('pgtools');
const Pool = require('pg').Pool;
require('dotenv').config();

let herokuDB = {
    user: process.env.P_POSTGRES_USER,
    password: process.env.P_POSTGRES_PASSWORD,
    database: process.env.P_POSTGRES_DB,
    host: process.env.P_HOST,
    port: '5432',
};

const local = {
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    host: '',
    port: '',
};

let db = 'starwars'
let config = `postgres://${process.env.P_POSTGRES_USER}:${process.env.P_POSTGRES_PASSWORD}@${process.env.P_HOST}:5432/${process.env.P_POSTGRES_DB};`
if(process.env.NODE_ENV === 'development'){
    config = local
}else {
    config = herokuDB
    db =  process.env.POSTGRES_DB;
}

const pool = new Pool(config);

pgtools.createdb(config, db, function (err, res) {
    if (err) {
        return
    } // db created already
    console.log(res);
});


const query = `
    CREATE TABLE IF NOT EXISTS comments
    (
        id         serial,
        ip         varchar,
        episode    varchar,
        comment    varchar,
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