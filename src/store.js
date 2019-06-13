import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '',
    allProducts: [],
    propina: {
      total: 0,
      status: false,
      value: 0
    },
    discount: {
      total: 0,
      value: 0,
      type: 'value',
      status: false
    },
    clientes: [],
    clienteSelected: {},
    products: [],
    categories: [],
    ventas: [],
    currency: {},
    descuentoVuex: 0,
    table: {},
    type_business: '',
    user: {},
    warehouse: {},
    total: 0,
    totalModalpago: 0,
    collection: [],
    productSelected: -1,
    alert: {
      typeAlert: 'success',
      msgAlert: '',
      statusAlert: false
    },
    statusComanda: false,
    userSelected: ''
  },
  getters: {
    getTotalModalPago: state => {
      return state.totalModalpago
    }
  },
  mutations: {
    addDiscount: (state, action) => {
      let ventas = state.ventas.slice()
      let x = ventas.map((a) => {
        let b = Object.assign({}, a.price)
        let add = a.additions
        // if (b.tax > 0) {
            let discount = 0
            if (action.type === 'percent') {
              discount = (action.discount/100) * b.subtotal
            } else {
              discount = action.discount
            }
            let tax = (b.tax_percent/100)
            b.subtotal_discount = b.subtotal - discount
            
            b.newTax = tax * b.subtotal_discount
            
            
            let c = Object.assign({}, a)
            c.price = b
            if (add) {
              
              add.map((d) => {
                d.discount = (action.discount/100) * d.price
                discount += d.status === 1 && d.discount ? (d.discount * d.qty): 0
              })
            }
            c.additions = add
            c.discount = discount + (b.tax -b.newTax)
            state.discount.total += c.discount
            return c
          // } else {
          //   b.subtotal_discount = b.subtotal
          //   let c = Object.assign({}, a)
          //   c.price = b
          //   return c
          // }
      })
      state.ventas = x
    },
    discountProduct: (state, action) => {
      if (state.ventas.length > 0) {
        const index = state.ventas.findIndex(item => item.id === action.id)
        const found = state.ventas.find((item) => {
          if (item.additions && item.additions.length > 0) {
            let status = item.additions.find(b => b.status && b.status === 1)
            if (status)
              return true
            else
              return false
          }
        })
        if (index >= 0 && !found) {
          let auxPayload = Object.assign({}, action.price) 
          let auxState = Object.assign({}, state.ventas[index].price)
          if (auxState.qty === 1) {
            return
          }
          auxState.qty -= 1
          auxState.total = auxPayload.total*auxState.qty
          auxState.subtotal = auxPayload.subtotal*auxState.qty
          auxState.tax = auxPayload.tax*auxState.qty
          const updatedItems = state.ventas.map(item => {
            if(item.id === action.id){
              action.price = auxState
              return { ...item, ...action }
            }
            return item
          })
          state.ventas = updatedItems
          return
        }
      }
      const newObject = action
      newObject.price.qty = 1
      state.ventas = [
        newObject,
        ...state.ventas
      ]
    },
    addProduct: (state, action) => {
      if (state.ventas.length > 0) {
        const index = state.ventas.findIndex(item => item.id === action.id)
        const found = state.ventas.find((item) => {
          if (item.additions && item.additions.length > 0) {
            let status = item.additions.find(b => b.status && b.status === 1)
            if (status)
              return true
            else
              return false
          }
        })
        if (index >= 0 && !found) {
          let auxPayload = Object.assign({}, action.price) 
          let auxState = Object.assign({}, state.ventas[index].price)
          auxState.qty += 1
          auxState.total = auxPayload.total*auxState.qty
          auxState.subtotal = auxPayload.subtotal*auxState.qty
          auxState.tax = auxPayload.tax*auxState.qty
          const updatedItems = state.ventas.map(item => {
            if(item.id === action.id){
              action.price = auxState
              return { ...item, ...action }
            }
            return item
          })
          state.ventas = updatedItems
          return
        }
      }
      const newObject = action
      newObject.price.qty = 1
      state.ventas = [
        newObject,
        ...state.ventas
      ]
    },
    addAddition: (state, action) => {
      
      let index = action.product.additions.findIndex((a) => a.id === action.item.id)
      let id = action.product.id
      let ventas = state.ventas 
      let found = ventas.findIndex((a) => {
        if (a.id === id) {
          return a
        }
      })
      ventas[found].additions[index].status = true
      return ventas[found].additions.filter(a => a.status)
    },
    deleteProduct: (state, action) => {
      state.ventas = state.ventas.filter((a) => {
        return a.id !== action.id
      })
    },
    deleteAllProducts: (state) => {
      state.ventas = []
    },
    addCollection: (state, action) => {
      const newObject = {
        total: action.total,
        bill: action.bill,
        method: action.method
      }
      let newCollection = []
      if (state.collection.length > 0 && state.collection.find((a) => a.method.name === action.method.name)) {
        let sum = state.collection.map((a) => {
          if (a.method.name === action.method.name) {
            a.bill += action.bill
            a.total += action.total
            return a
          } else {
            return a
          }
        })
        newCollection = [...sum]
      } else {
        newCollection = [
          ...state.collection,
          newObject
        ]
      }
      state.collection = newCollection
    },
    deleteCollection: (state, action) => {
      state.collection = [
        ...state.collection.filter(a => a.method.name !== action.method.name)
      ]
    }
  },
  actions: {

  }
})
