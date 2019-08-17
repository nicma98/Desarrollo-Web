module.exports.insert = function (nombre,contra,db,callback) {
    let coleccion = db.collection('usuarios');
    coleccion.insertMany([
        {user:nombre,pass:contra}
    ],(error, result) => {
        console.log('Se ha creado el usuario ' + nombre + ' con la contraseña ' + contra + '.')
    })
}
module.exports.delete = function (db,callback) {
    let coleccion = db.collection('');
    try {
        coleccion.deleteOne({})
        console.log('Se elimino el registro correctamente')
    } catch (e) {
        console.log('Se genero un error: '+ e)
    }
}
module.exports.query = function (db,callback) {
    let coleccion = db.collection('');
    coleccion.find().toArray((error,docs) => {
        if(error)console.log(error)
        console.log(docs)
    })    
}
module.exports.reload = function (db,callback) {
    let coleccion = db.collection('');
    try {
        coleccion.updateOne({},{$set:{}})
        console.log('Se ha actualizado el registro')
    } catch (e) {
        console.log('Error actualizando el registro: ' + e) 
    }  
}