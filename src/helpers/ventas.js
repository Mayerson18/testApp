import store from '../store'
export default {
  getTotalAdditions: () => getTotalAdditions(),
  getPropina: () => getPropina(),
  cleanPropina: () => cleanPropina(),
  cleanDiscount: () => cleanDiscount(),
  getPayments: () => getPayments(),
  getRecibido: () => getRecibido(),
  getRestante: () => getRestante(),
  cleanAll: () => cleanAll(),
  getProducts: () => getProducts(),
  getTotalProducts: () => getTotalProducts(),
  getSubTotal: () => getSubTotal(),
  getDescuento: () =>  getDescuento(),
  getIva: () =>  getIva(),
  getIdProducts: () =>  getIdProducts(),
  getTotalFixed: () => getTotalFixed(),
}

const getTotalAdditions = () => {
  let adds = store.state.ventas.map((a) => {
    if (a && a.additions && a.additions.length > 0) {
      return a.additions.filter(b => b.status === 1)
    } else {
      return []
    }
  })
  var total = 0
  if (adds.length > 0) {
    adds.map((a) => {
      a.map((b) => {
        //let desc = store.state.discount.status && b.discount? b.discount * b.qty: 0
        let desc = 0
        total += b ? (b.price * b.qty) - desc: 0
      })
    })
  }
  return total ? total: 0
}

const getTotalProducts = () => {
  let length = 0
  const ventas = store.state.ventas
  for (let i = 0; i < ventas.length; i++) {
    const element = ventas[i]
    length += element.price.qty
  }
  return length
}

const getTotalWithDiscount = () => {
  return getTotal() - getDescuento()
}

const getTotalFixed = () => {
  return getTotalWithDiscount() + getPropina() + getTotalAdditions()
}

const getSubTotal = () => {
  let subtotal = 0
  if (store.state.discount.status) {
    subtotal = getFormat('subtotal_discount')
  } else {
    subtotal = getFormat('subtotal')
  }
  return subtotal
}

const getIdProducts = () => {
  let x = store.state.ventas.map((a) => {
    if (a) {
      let adds = a.additions && a.additions.length > 0 ? a.additions.filter(c => c.status === 1): []
      let ids = []
      for (let i = 0; i < adds.length; i++) {
        const element = adds[i]
        if (element.qty) {
          for(let i = 0; i < element.qty; i++) {
            ids.push(element.id)
          }
        } else {
          ids = [element.id]
        }
      }
      let mods = a.modifications && a.modifications.length > 0 ? a.modifications.filter(c => c.status === 1): []
      let ids2 = []
      for (let i = 0; i < mods.length; i++) {
        const element = mods[i]
        if (element.qty) {
          for(let i = 0; i < element.qty; i++) {
            ids2.push(element.id)
          }
        } else {
          ids2 = [element.id]
        }
      }
      return {
        id: a.id,
        additions: ids,
        modifications: ids2
      }
    }
  })
  // let x = store.state.ventas.map((a) => {
  //   if (a) {
  //     return a.id
  //   }
  // })
  return x
}

const getIva = () => {
  let iva = 0
  if (store.state.discount.status) {
    iva = getFormat('newTax')
  } else {
    iva = getFormat('tax')
  }
  return iva
}

const getTotal = () => {
  const total = getFormat('total')
  return parseFloat(total)
}

const getDescuento = () => {
  let discount = store.state.discount
  return discount.status ? discount.total: 0
}

const getFormat = (type) => {
    
  const currency = store.state.currency.thousands_sep ? store.state.currency.thousands_sep: ','
  let totales = []
  if (type === 'discount') {
    totales = store.state.ventas.map((a) => a.discount)  
  } else {
    totales = store.state.ventas.map((a) => a.price[type])
  }
  return totales.length > 0 ? totales.reduce(
    (a, b) => {
      let fixA, fixB
      if (type !== 'tax') {
        if (currency === ',') {
          fixA = typeof a === 'number' || !a ? a : a.replace(/,/, '')
          fixB = typeof b === 'number' || !b ? b : b.replace(/,/, '')
        } else {
          fixA = typeof a === 'number' ? a : a.replace(/./, '')
          fixB = typeof b === 'number' ? b : b.replace(/./, '')
        }
        fixA = fixA ? fixA : 0
        fixB = fixB ? fixB : 0
      } else {

        fixA = a
        fixB = b
      }
      return parseFloat(fixA) + parseFloat(fixB)
    }
  ) : '0.00'
}

const getRecibido = () => {
  const auxTotal = store.state.collection.map((a) => a.total)
  let total = 0
  if (auxTotal.length > 0) {
    total = auxTotal.reduce((a, b) => parseFloat(a) + parseFloat(b))
  }
  return total
}

const getProducts = () => {
  let total = store.state.ventas.map((a) => {
    let id = a.id
    let quantity = a.price.qty
    return { id, quantity}
  })
  return total
}

const cleanAll = () => {
  store.state.collection = []
  store.state.total = 0
  store.state.totalModalpago = 0
  store.state.ventas.map((a) => {
    if ( a && a.additions) {
      a.additions.map((addition) => {
        addition.qty = 0
        addition.status = 0
        addition.discount = 0
      })
    }
  })
  store.state.userSelected = ''
  store.state.ventas = []
  cleanDiscount()
  cleanPropina()
}

const cleanPropina = () => {
  store.state.propina.value = 0
  store.state.propina.status = false
  store.state.propina.total = 0
}

const cleanDiscount = () => {
  let discount = store.state.discount
  discount.value = 0
  discount.type = "value"
  discount.total = 0
  discount.status = false

}

const getRestante = () => {
  const total = store.state.total
  let restante = getRecibido()
  let x = total - restante
  return x
}

const getPayments = () => {
  let payments = []
  for (let i = 0; i < store.state.collection.length; i++) {
    const element = store.state.collection[i];
    payments.push({
      id: element.method.id,
      consecutive: '0',
      type_payment: element.method.code,
      total_payment_method: element.bill
    })
  }
  return payments
}

const getPropina = () => {
  if (store.state.propina.status) {
    let total = getTotalWithDiscount()
    store.state.propina.total = total*(store.state.propina.value/100)
    return store.state.propina.total
  } else {
    return 0
  }
}