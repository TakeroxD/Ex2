const express = require('express')
const met = require('./met.js')
const app = express()
const port = process.env.PORT || 3000

app.get('/',function(req,res){
	res.send('<p style="font-size:80px" align="center">UwU</p><p>Aqui no hay nada, ve a /students/A00817381 o /met?search=</p>')
})

app.get('/students/:id',function(req,res){
	if(req.params.id != 'A00817381'){
		res.send({error: 'Esa matrícula no es mía >:(  (este mensaje se considera adecuado)'})
	}
	res.send({
		id: req.params.id,
		fullname: 'Diego Alí López Alvarez',
		nickname: 'TakeroxD',
		age: '23'
	})
})

app.get('/met',function(req,res){
	if(!req.query.search){
		res.send({error: 'No se recibio search'})
	}
	met.searchMetObjects(req.query.search,function(error,response){
		if(error){
			res.send(error)
		}
		var objectID = response
		met.getMetObject(objectID,function(error,response){
			if(error){
				res.send(error)
			}
			res.send({
				searchTerm:req.query.search,
				artist: response.artist,
				title: response.title,
				year: response.year,
				technique: response.technique,
				metUrl: response.metUrl,
				image: response.image
			})
		})
	})

})

app.get('*',function(req,res){
	res.send('Hahahaha esa ruta ni existe :A')
})

app.listen(port,function(){
	console.log('This is up for the exam bruh')
})