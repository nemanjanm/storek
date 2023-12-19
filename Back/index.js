const express = require('express')
const cors = require("cors")
const app = express()
const config = require('./config')

var mongoose = require('mongoose')
mongoose.connect(config.dbConnection)
console.log(mongoose.connection);

const rezultatiRoutes = require('./routes/rezultati')
const timRoutes = require('./routes/timovi')
const igraciRoutes = require('./routes/igraci')
const vestiRoutes = require('./routes/vesti')
const userRoutes = require("./routes/user")

app.use(cors())
app.use(express.json())
app.use("/uploads", express.static("uploads"))
app.use("/tim",timRoutes);
app.use("/rezultat",rezultatiRoutes);
app.use("/igrac",igraciRoutes);
app.use("/vest", vestiRoutes);
app.use("/user", userRoutes);
app.listen(config.port, () => {
    console.log(`Example app listening on port ${config.port}`)
})