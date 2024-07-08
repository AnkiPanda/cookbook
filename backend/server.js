const app = require('./app');
const dotenv = require("dotenv")
const connetDatabase = require("./config/database.js")

dotenv.config({path:"config/config.env"})

connetDatabase();

const server = app.listen(process.env.PORT,()=>{
    console.log(`Server is working on http://localhost:${process.env.PORT}`)
})