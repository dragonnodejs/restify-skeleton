'use strict';

// Initialize New Relic Node.js agent

if (process.env.NEW_RELIC_LICENSE_KEY) {
    require('newrelic');
}

// Load the libraries and run the modules for the application

let directory = __dirname + '/modules/';
let modules = [
    [require('dragonnodejs-restify'), [
        ['errors'],
        ['server', {
            options: {},
            plugins: (restify, server) => {
                server.use(restify.acceptParser(server.acceptable));
                server.use(restify.authorizationParser());
                server.use(restify.bodyParser({ mapParams: false }));
                server.use(restify.CORS());
                server.use(restify.gzipResponse());
                server.use(restify.queryParser({ mapParams: false }));
            },
            listen: [process.env.PORT]
        }],
        ['package', require(__dirname + '/package.json')],
        ['validators', (validator, errors) => [
            ['email', input => {
                input = validator.trim(input);
                if (!validator.isEmail(input)) {
                    throw new errors.BadRequestError('invalid email');
                }
                return input;
            }],
            ['password', input => validator.trim(input)]
        ]]
    ]],
    ['example',
        // Configuration for the module
    ]
];
let libraries = {};
require('dragonnodejs')(directory, modules, libraries);
