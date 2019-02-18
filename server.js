const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000

var app = express()

hbs.registerPartials(__dirname+ '/views/partials')
app.set('view engine','hbs')


app.use((req,res,next)=> {

    var now = new Date().toString()
    var logUserInput =`${now}: ${req.method} ${req.url}`

    console.log(logUserInput);
    fs.appendFile('server.log',logUserInput +'\n', (err)=>{
        if (err){
            console.log("Unable to append server.log");
        }
    })
    next()
})

//////////////// to get a front maintenace page. As it is the first webpage request on the script it will block all other pages. if there is no link in the page, next() does not matter 

// app.use((req,res,next)=> {
//     res.render('maintenace.hbs')
  
// })

app.use(express.static(__dirname+ '/public'))


hbs.registerHelper('getCurrentYear',() => {
    return new Date().getFullYear()
    // return "test"
})

hbs.registerHelper('screamIt',(text)=>{
    return text.toUpperCase()
})

// app.get('/',(req, res)=>{
    
//     // res.send('<h1>Hello Express</h1>'
//     res.send({
//         name: 'Fenkil',
//         likes:["Hockey","Soccer" ]
//     })

// })

app.get('/',(req, res)=>{
    
    res.render('home.hbs',{
        pageTitle: "Home Page",
        welcomeMessage: "Welcome to my Website"
    })

})


app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        pageTitle: "About Page",
    })
})

app.get('/bad',(req,res)=>{
    res.send({
        ErrorMessage: "Note working"
    })
})
app.listen(port,()=>{console.log(`Server is up on ${port}`)})