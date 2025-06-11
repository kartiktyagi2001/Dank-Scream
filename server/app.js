const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config()
const cors = require('cors')

app.use(cors());
app.use(express.json())

const port = process.env.PORT || 3000;
const dbURI = process.env.MONGODB_URI || "mongodb+srv://kartiktyagi1201:V2hXL6CCVE9RlAyt@cluster0.2a3ro7a.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
const userRouter = require('./routes/userRouter');
const postRouter = require('./routes/postRouter');


app.use('/user', userRouter);
app.use('/posts', postRouter);


app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
})

mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(()=>{console.log('Connected to Database')})
.catch((err)=>{console.error(`Connection to Database failed: ${err}`)});

