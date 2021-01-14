import { toSnakeCase } from './components/shared/to-snake-case'

const config = {
    SYSTEM_NAME: 'Test app',
    DEFAULT_DESCRIPTION: 'This application is written as demo app',
    DESCRIPTION: 'Test app',
    TITLE: 'Test app',
}

const dataset = document.getElementById('platform-body').dataset
const dataConfig = Object.keys(dataset).reduce((element, key) => (element['REACT_APP_' + toSnakeCase(key).toUpperCase()] = dataset[key], element), {})

window.APP_CONFIG = Object.assign({}, config, dataConfig)

require('./index')
