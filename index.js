const express= require('express');
const authRouter=require('./router/route')
const bodyParser = require('body-parser');
const cors= require('cors');
const corsOptions = require('./config/cors');
require("dotenv/config")
const mongoose= require("mongoose")
// const helpers=require("./helpers/helper")

const app = express();
app.use(cors())
app.use(bodyParser.json());// for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));// for parsing application/xwww-
app.use(authRouter);
// helpers.generateAsymetricKey()
// require('./config/passport')(passport);

mongoose.connect(process.env.DB_CONNECTION,()=>{
    console.log("DB Connected ...");
})
app.listen(process.env.PORT, ()=>{
    console.log('listening on port 3000');
});
