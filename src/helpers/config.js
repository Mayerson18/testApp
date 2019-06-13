import config from '../../config/config'

export default {
  getConfig: (method, url, data) => getConfig(method, url, data),
  getUrlSocketPrinter: () => getUrlSocketPrinter()
}

const getUrlSocketPrinter = () => {
  return config.urlSocketPrinter
}

const getConfig = (method, url, data) => {
  //const token = store.state.token
  let token = localStorage.getItem("apiToken")
  let configAux
  if (!data) {
    configAux = {
      url: `${config.urlApi}${url}`,
      method,
      headers: {'Authorization': "Bearer " + token}
    }
  } else {
    configAux = {
      url: `${config.urlApi}${url}`,
      method,
      headers: {'Authorization': "Bearer " + token},
      data
    }
  }
  return configAux
}