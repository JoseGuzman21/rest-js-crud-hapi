const hapi = require('@hapi/hapi');
require('dotenv').config()
require('./database')
const routes = require('./routes/index.routes');

const init = async () => {
    const server = new hapi.Server({
        port: 3000,
        host: 'localhost'
    });

    routes(server);

    await server.start();
    console.log(`Server running on ${server.info.uri}`);

}

init();
