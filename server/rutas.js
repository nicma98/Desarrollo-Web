const Router = require('express').Router();
const User = require('./models.js')
const Event = require('./models_event.js')

Router.post('/login',function (req,res) { 
    let usuario = req.body.user
    req.session.user = req.body.user
    let pass = req.body.pass
    User.find({user:usuario}).exec((error,result) => {
        if(error){
            res.status(500)
            res.json(error)
        }
        if ( Object.keys(result).length === 0 ) {
            res.send('Usuario no encontrado')
        }else{
            let userName = result[0]['user']
            let userPass = result[0]['pass']
            if (userPass === pass) {
                res.send('Validado')
            }else{
                res.send('Contraseña incorrecta')
            }
        }
    })       
})

Router.get('/events/all',function (req,res) {
    let user = req.session.user 
    Event.find({user:user}).exec((error,result) => {
        if(error){
            res.status(500)
            res.json(error)
        }
        res.json(result)
    })
       
})

Router.post('/events/new',function (req,res) {
    let idEvent = Math.floor(Math.random()*1000) 
    let user = req.session.user
    let nameEvento = req.body.title
    let inicio = req.body.start
    let fin = req.body.end
    let newEvent = new Event({id:idEvent,user:user,title:nameEvento,start:inicio,end:fin})
    newEvent.save((error) => {
        if (error) {
            res.send('Se ha presentado un error: ' + error)
        } else {
            res.send('Has creado un evento nuevo')
        }
    })    
})

Router.post('/events/delete',function (req,res) {
    let idEvent = req.body.id
    Event.deleteOne({id:idEvent},(error) => {
        if (error) {
            res.send('Se ha presentado un error eliminando el evento: ' + error)
        } else {
            res.send('Se ha eliminado el evento')
        }
    })   
})

Router.post('/events/reload',function (req,res) {
    let id = req.body.id
    let start = req.body.start
    let end = req.body.end
    Event.updateOne({id:id},{start:start,end:end},(error) => {
        if (error) {
            res.send('Se ha presentado un error actualizando el evento: ' + error)
        } else {
            res.send('Se ha actualizado el evento')
        }
    })
})

module.exports = Router
