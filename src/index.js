const express = require('express');
const bodyParser = require('body-parser');
const route = require('./route/route.js');
const { default: mongoose } = require('mongoose');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//mongodb+srv://Pramod09:Pramod%4010@pramod09.i3td2.mongodb.net/pramod09-db

// mongodb+srv://swethaHirge:eNbiwvH7LUDppBrx@cluster0.0xins.mongodb.net/group19-Database?retryWrites=true&w=majority
mongoose.connect("mongodb+srv://swethaHirge:eNbiwvH7LUDppBrx@cluster0.0xins.mongodb.net/group19-Database?retryWrites=true&w=majority", {
    useNewUrlParser: true
})
    .then(() => console.log("MongoDb is connected"))
    .catch(err => console.log(err))

app.use('/', route);


app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});