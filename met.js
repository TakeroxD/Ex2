const request = require('request')

const searchMetObjects = function(toSearch, callback){
	const url = 'https://collectionapi.metmuseum.org/public/collection/v1/search?q='+toSearch
	request({url, json:true}, function(error, response){
		if(error){
			callback(error,undefined)
		} else if(response.body.objectIDs == null){
			callback('No search results',undefined)
		} else {
			callback(undefined,response.body.objectIDs[0])
		}
	})
}

const getMetObject = function(objectId,callback){
	const url = 'https://collectionapi.metmuseum.org/public/collection/v1/objects/'+objectId
	request({url, json:true}, function(error, response){
		if(error){
			callback(error,undefined)
		} else {
			const info ={
				artist: response.body.artistDisplayName,
				title: response.body.title,
				year: response.body.objectBeginDate+'-'+response.body.objectEndDate,
				technique: response.body.medium,
				metUrl: response.body.objectURL,
				image: response.body.primaryImage
			}
			callback(undefined,info)
		}
	})
}

module.exports = {
	searchMetObjects,
	getMetObject
}