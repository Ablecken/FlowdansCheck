const $ = global.$ = global.jQuery = require('jquery'); // eslint-disable-line no-unused-vars
require('angular');
require('./main.js');


require('./services/battle-api.service.js');
require('./services/queue.service.js');

require('./controllers/listing.controller.js');
