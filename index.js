const express = require('express');
const mongoose = require('mongoose')
const app = express();
const path = require('path');

const port = process.env.PORT || 8080;
const hostname ='127.0.0.1';

// EXPRESS SPECIFIC STUFF
app.use('/static',express.static('static'));
app.use(express.urlencoded());  //this is a middleware that helps the data of the forms to reach express


// PUG SPECIFIC STUFF
app.set('view engine', 'pug')  // Set the template engine as pug
app.set('views', path.join(__dirname, 'views'))  // Setting the path to the views directory 

// DATABASE CONNECTION
mongoose.connect('mongodb://localhost/DanceContactUs',{useNewUrlParser: true,useUnifiedTopology: true});

// CREATING A SCHEMA AND MODELLING IT
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    age: String
});
let contactus = mongoose.model('contactInfo',contactSchema);

// SETTING UP ENDPOINTS
app.get('/',(req,res) => {
    const params = {};
    res.status(200).render('1_home.pug',params);
    // This will read base.pug only , and wherever it sees block, it will replace its value from home.pug
})
app.get('/contact',(req,res) => {
    const params = {};
    res.status(200).render('2_contact.pug',params);
})
app.post('/contact',(req,res) => {
    // creating a myData document/object
    let myData = new contactus(req.body);       //req.body stores all the data in the form of the json object

    // saving it into the collection named plural of modelName

    // .save()returns a promise that can be handled like this
    myData.save().then(()=>{
        res.send("This item has been saved to the database")
    }).catch(()=>{
        res.status(400).send("item was not saved to the databs")
    });

})

// STARTING THE SERVER
app.listen(port, ()=> {
    console.log(`The application started succesfully at http://${hostname}:${port}/`);
    
})