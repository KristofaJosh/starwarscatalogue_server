const pool = require('../../service/postgres');


module.exports.create_comment = async (ip, episode, comment) => {


    const created_at = new Date(Date.now()).toUTCString();

    return await pool.query('INSERT INTO comments (ip, episode, comment, created_at) VALUES ($1, $2, $3, $4)', [ip, episode, comment, created_at])
        .then(res => {
            return {episode, ip, comment, created_at}
        })
        .catch(err => {
            throw new Error(err)
        });
};


module.exports.get_all_comments = async () => {
    return await pool.query('SELECT * FROM comments')
        .then(res=>{
            return res.rows
        })
        .catch(err=>{
            throw new Error(err)
        });
};