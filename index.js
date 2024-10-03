require('dotenv').config();

const Server = require('./models/server')

const intializedServer = new Server();

intializedServer.listen();
