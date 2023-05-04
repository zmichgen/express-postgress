const express = require('express');
const cors = require('cors');
require('dotenv').config();
const userRouter = require('./routes/user');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors())
    .use(express.json())
    .use(express.urlencoded({
        extended: false
    }))    
    .use('/user', userRouter);
// connectToDb();


app.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`);
});