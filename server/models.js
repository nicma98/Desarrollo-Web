var mongoose = require('mongoose')
var schema = mongoose.Schema

var UserSchema = new schema({
	user:{ type: String, require: true },
	pass:{ type: String, require: true },
})

var User = mongoose.model('usuarios', UserSchema)
module.exports = User