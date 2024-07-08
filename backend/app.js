const express = require('express');
const cookieParser = require('cookie-parser')

const app = express();

app.use(express.json())
app.use(cookieParser())

const user = require('./routes/userRoutes');
const recipe = require('./routes/recipeRoutes')
const like = require('./routes/likeRoutes')
app.use("/api/v2",user)
app.use("/api/v2",recipe)
app.use("/api/v2",like)

module.exports = app;

