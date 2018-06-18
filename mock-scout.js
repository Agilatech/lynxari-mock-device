
const config = require('./config');
const Scout = require(process.lynxari.scout);
const Mock = require('./mock');

module.exports = class MockScout extends Scout {

  constructor(opts) {

    super();

    if (typeof opts !== 'undefined') {
      // copy all config defined in the server
      for (const key in opts) {
        if (typeof opts[key] !== 'undefined') {
          config[key] = opts[key];
        }
      }
    }

    if (config.name === undefined) { config.name = "MOCK" }
    this.name = config.name;

    this.mock = new Mock(config);

  }

  init(next) {
    const query = this.server.where({name: this.name});
  
    const self = this;

    this.server.find(query, function(err, results) {
      if (!err) {
        if (results[0]) {
          self.provision(results[0], self.mock);
          self.server.info('Provisioned known device ' + self.name);
        } else {
          self.discover(self.mock);
          self.server.info('Discovered new device ' + self.name);
        }
      }
      else {
        self.server.error(err);
      }
    });

    next();
  }

}
