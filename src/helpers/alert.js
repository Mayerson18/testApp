import store from '../store'

export default {
  setAlert: (msg, status) => setAlert(msg, status),
}

const setAlert = (msg, status) => {
  if (status) {
   store.state.alert.typeAlert = 'success'
  } else {
   store.state.alert.typeAlert = 'error'
  }
  store.state.alert.msgAlert = msg
  store.state.alert.statusAlert = !store.state.alert.statusAlert
}