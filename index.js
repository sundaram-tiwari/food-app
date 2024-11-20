const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectDatabase = require('./config/dbConnect');

//dotenv configuration
dotenv.config();

//Dtatabse Connection
connectDatabase();

//rest object
const app = express();

//middleware
app.use(express.json());
app.use(morgan('dev'));

//route
app.use('/api/v1/auth',require('./routes/authRoutes'))
app.use('/api/v1/user',require('./routes/userRoutes'))

app.get('/', (req, res) => {
    res.send("<h1> Server Started a</h1>")
});

//PORT
const PORT = process.env.PORT;

//listen
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});