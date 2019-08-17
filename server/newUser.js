//Script para crear nuevo usuario

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('Ingresa la siguiente informacion para crear un nuevo usuario.')

rl.question('Nombre de usuario: ', (answer) => {
    var nombre = answer;
    rl.question('Contraseña: ', (answer) => {
        var name = nombre;
        var contr = answer;

        var MongoClient = require('mongodb').MongoClient;
        var Operaciones = require('./CRUD.js');

        var url = "mongodb://localhost:27017";
        var dbName = 'agenda_node';
        MongoClient.connect( url, useNewUrlParser=true, function(err, client) {
            var nameUser = name
            var contraUser = contr
            if(err)console.log(err)
            const db = client.db(dbName);
            Operaciones.insert(nameUser,contraUser,db,(error,result) => {
                if(error)console.log('Error consultando los registros: ' + error)
            })
        client.close();
        });
        rl.close();
    });
});