const betaConfig = require('./beta.js')
const proConfig = require('./prod.js')
const localConfig = require('./local.js')
let env = process.env.NODE_ENV
let config = null

if (env == 'local' || env == 'dev' || env == 'development') {
  config = localConfig
} else if (env == 'beta') {
  config = betaConfig
} else {
  config = proConfig
}

module.exports = config
