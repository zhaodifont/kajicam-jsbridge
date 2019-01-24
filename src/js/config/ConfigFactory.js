import productionConfig from './production'
import developmentConfig from './development'
import localConfig from './local'
import betaConfig from './beta'

export default class ConfigFactory {
    static getConfig() {
        if (process.env.NODE_ENV === 'production') {
            return productionConfig;

        } if (process.env.NODE_ENV === 'beta') {
            return betaConfig;

        }if (process.env.NODE_ENV === 'local') {
            return localConfig;

        } else {
            return developmentConfig;

        }
    }
}
