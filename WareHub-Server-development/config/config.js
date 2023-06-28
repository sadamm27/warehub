require ('dotenv').config()

const config = {
    development: {
        username: process.env.DB_USERNAME,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
        host: process.env.HOST,
        dialect: 'postgres'
    },
    test :{
        username: process.env.DB_USERNAME,
        password: process.env.PASSWORD,
        database: process.env.DATABASE_TEST,
        host: process.env.HOST,
        dialect: 'postgres'
    }
}


module.exports = config;