const express = require('express')
const connectDB = require('./config/db')
const cors = require('cors')
const app= express()
connectDB()

//init middleware
app.use(express.json({extended: false}))
app.use(cors({
    origin: "http://localhost:3000"
}))
app.get('/',(req, res)=> res.send('API running'))

//define router
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts',require('./routes/api/posts'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> console.log(`Server start on ${PORT}`))

