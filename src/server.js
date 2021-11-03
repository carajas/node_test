const app = require('../src/app');
const config = require('./../src/config')
const http = require('http').createServer(app);
const logger = require('./../src/services/log')

app.get('/', (req, res) => {
  res.send(`<h2>Carajas</h2>`);
});

const port = process.env.PORT || config.port;

http.listen(port, () => {
  logger.info(`App listening on port ${port}`)
})