require('dotenv').config();
const express = require('express');
let path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const graphqlHTTP = require('express-graphql');

const schema = require("./schema"); // get schema
const app = express(); // initialize express


// set up middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use(bodyParser.json());


app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true,
}));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
});


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});