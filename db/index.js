const {
    Pool,
    Client
} = require("pg");
const connectionString = "postgres://user:password@host:port/database";

const pool = new Pool({
    connectionString: process.env.DATABASE_URL || connectionString,
    ssl: true
});

module.exports = () => {
    query: (text, params, callback) => {
        return pool.query(text, params, callback);
    };
};
