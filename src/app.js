const path = require('path')
const express = require('express')
const hbs = require('hbs')
const app  = express()
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const port = process.env.PORT || 3000
const constdirfile = path.join(__dirname,'../public')
const viewpath = path.join(__dirname,'../templates/views')
const partialspath = path.join(__dirname,'../templates/partials')

app.set('view engine','hbs')
app.set('views',viewpath)
hbs.registerPartials(partialspath)

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error : 'please enter address'
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
          return res.send({error})
        }
        forecast(latitude,longitude, (error, forecastData) => {
            if(error){
              return res.send({error})
            }   
            res.send({
                forecast : forecastData,
                location:location,
                address:req.query.address
             })
        }) 
    })
})

app.use(express.static(constdirfile))

app.get('/about',(req,res)=>{
    res.render('about',{
        title : 'weather app',
        name : 'mostafa'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        message:'please help me',
        title :'help',
        name:'ahmed'
    })
})
app.get('/help/*',(req,res)=>{
    res.render('error',{
        title : '404',
        name : 'mostafa',
        message:'help article not found'
    })
})
app.get('/help',(req,res)=>{
    res.render('error',{
        title : '404',
        name : 'mostafa',
        message:'404 not found'
    })
})
app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'please enter search query'
        })
    }
    res.send({
        product:[]
    })
})
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'mostafa'
    })
})

app.listen(port,()=>{
    console.log('Server is up on port '+ port)
})