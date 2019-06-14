const path=require('path')
const express=require('express')
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')

const app=express()
const publicDirectoryPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')

app.set('view engine','hbs') //handlebar
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather',
        name: 'Aneesh' 
    })  //contacts hbs index page
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About Me',
        name: 'Aneesh'
    })  //contacts hbs index page
})

app.get('/help',(req,res)=>{
    res.render('help',{
        helptext:'This is the help section!',
        title: 'Help',
        name: 'Aneesh'
    })  //contacts hbs index page
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }
    const command=req.query.address

    geocode(command,(error,{longitude,latitude,location}={})=>{
        if(error){
            return res.send({
                error: error
            })
        }
    
        forecast(longitude, latitude, (error, forecastData) => {
            if(error){
                return res.send({
                    error: error
                })
            } 
            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address
            })  
            
            // console.log(location)
            // console.log(forecastData)        
          })
    })     
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })   
})

app.get('/help/*',(req,res)=>{
    res.render('error404',{
        title: '404',
        name: 'Aneesh',
        error: 'Help article does not exist'
    })
})

app.get('*',(req,res)=>{
    res.render('error404',{
        title: '404',
        name: 'Aneesh',
        error: 'Page not found'})
})

//app.com
//app.com/help
//app.com/about

app.listen(3000,()=>{
     console.log('Server is up on port 3000.')
})