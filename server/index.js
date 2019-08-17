const http = require( 'http' ),
      path = require( 'path' ),
      Routing = require( './rutas.js' )
      bodyParser= require( 'body-parser' ),
      express = require( 'express' ),
      session = require( 'express-session' ),
      mongoose = require( 'mongoose' );

const PORT = 3000
const app = express()

app.use(session({secret:'XASDASDA',resave: false,saveUninitialized: true,}));

const server = http.createServer(app)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.use(express.static(path.join(__dirname, '../client')));

app.use('/',Routing)

var url = "mongodb://localhost:27017/agenda_node";
mongoose.connect(url,{useNewUrlParser: true});

server.listen(PORT, function(){
    console.log('Conectado al puerto: ' + PORT)
})