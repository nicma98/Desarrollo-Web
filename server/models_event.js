var mongoose = require('mongoose')
var schema = mongoose.Schema

var EventSchema = new schema({
	id:{ type: Number, require: true, unique:true },
	user:{ type: String, require: true },
	title:{ type: String, require: true },
	start:{ type: Date, require: true },
	end:{ type: Date, require: true },
})

var Event = mongoose.model('eventos', EventSchema)
module.exports = Event