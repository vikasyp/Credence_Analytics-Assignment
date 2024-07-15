
const express = require('express');
const mongoose = require('mongoose');
const dotenv =require('dotenv')
const seriesRoutes = require('./routes/seriesRoutes');
const app = express();
app.use(express.json());

dotenv.config();

const PORT= process.env.PORT || 5001;
const MONGOURL=process.env.MONGO_URL;

mongoose.connect(MONGOURL).then(() => {
    console.log('Database connected successfully');
app.listen(PORT , (err) => {
    if(err){
        console.log(e);
    }
    console.log(`server is running on port : ${PORT}`);
})
    
}).catch(error=>console.log(error))


app.use('/api', seriesRoutes);
