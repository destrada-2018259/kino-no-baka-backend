const express = require('express')
const cors = require('cors')

class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.servicePath = '/api/service'

        this.middlewares()
        this.routes()
    }

    middlewares(){
        this.app.use(cors())
        this.app.use(express.static('public'))
        this.app.use(express.json())
    }
    routes(){
        this.app.use(this.servicePath, require('../routes/email'))
    }
    
    listen(){
        this.app.listen(this.port, ()=>{
            console.log(`Server running on port: ${this.port}`)
        })
    }


}


module.exports = Server;