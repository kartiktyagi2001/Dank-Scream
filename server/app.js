require('dotenv').config({path: './.env'});
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors')

app.use(cors());
app.use(express.json())

const port = process.env.PORT || 3000;
const dbURI = process.env.MONGODB_URI
const userRouter = require('./routes/userRouter');
const postRouter = require('./routes/postRouter');

app.use('/', postRouter);
app.use('/user', userRouter);
app.use('/posts', postRouter);

console.log(process.env.JWT_SECRET);


app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
})

mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(()=>{console.log('Connected to Database')})
.catch((err)=>{console.error(`Connection to Database failed: ${err}`)});

