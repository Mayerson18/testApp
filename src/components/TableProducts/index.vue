<template>
  <div class="tableProducts">
    <Header />
    <div class="body">
      <div v-for="(product, index) in $store.state.ventas" :key="index">
        <div class="flex">
          <div class="first-container">
            <font-awesome-icon
              @click="minus(product.id)"
              icon="minus"
              :style="{ border: '1px solid #ddd', color: '#aaa', cursor: 'pointer', paddingLeft: 10, paddingBottom: '.25em', paddingTop: '.25em', paddingRight: 5 }"
              size="xs"
            />
            <p class="qty">{{testQty(product)}}</p>
            <font-awesome-icon
              @click="more(product.id)"
              icon="plus"
              :style="{ border: '1px solid #ddd', color: '#aaa', cursor: 'pointer', paddingLeft: 10, paddingBottom: '.25em', paddingTop: '.25em', paddingRight: 5 }"
              size="xs"
            />
          </div>
          <div>
            <font-awesome-icon
              v-show="isDown(product)"
              @click="toggleAdditions(product.id)"
              icon="chevron-down"
              :style="{ color: '#aaa', cursor: 'pointer', paddingBottom: 10, paddingTop: 10, paddingRight: 5 }"
              size="lg"
            />
          </div>
          <p :class="{'icon.down': isDown(product), 'name-product': true}">{{fixName(product.name)}}</p>
          <p class="price">${{getTotalProduct(product)}}</p>
          <font-awesome-icon
            @click="deleteProductLocal(product)"
            icon="times-circle"
            :style="{ color: '#ddd', cursor: 'pointer', paddingTop: '.7em', paddingRight: 5 }"
            size="lg"
          />
       </div>
        <div v-if="isAdditions(product)">
          <div v-for="(addition, index2) in additionsActive(product.additions)" :key="index2" class="adds">
            <div class="left">
              <div class="minus" @click="removeAddition(product, addition, index, index2)">
                -
              </div>
              {{addition.qty}}
              {{addition.name}}
            </div>
            <div class="right">
              {{numberWithCommas(getAdditionsPrice(addition))}}
            </div>
          </div>
          <div v-for="(modification, index2) in additionsActive(product.modifications)" :key="index2" class="adds">
            <div class="left">
              <div class="minus" @click="removeAddition(product, modification, index, index2)">
                -
              </div>
              {{modification.qty}}
              {{modification.nombre}}
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer :getTotalFixed="getTotalFixed()" :getPropina="getPropina()"/>
    <div class="boton" @click="openModal()" v-if="!$store.state.statusComanda">
      <p class="pagar">Pagar</p>
    </div>
    <div class="boton flex-boton" @click="sendCommanda()" v-else>
        <font-awesome-icon
          icon="print"
          :style="{ color: '#fff', cursor: 'pointer', paddingRight: 10 }"
          size="2x"
        />
      <p class="pagar">Pagar / Comanda</p>
    </div>
    <ModalPago/>
    <Descuento/>
    <Propina/>
  </div>
</template>
<script>
import helperCommas from '../../helpers/commas';
import helperVentas from '../../helpers/ventas';
import helperConfig from '../../helpers/config';
import helperAlert from '../../helpers/alert';
import axios from 'axios'

import ModalPago from '../ModalPago/index'
import Descuento from '../Descuento/index'
import Propina from '../Propina/index'
import { mapMutations } from 'vuex'

import Header from './Header'
import Footer from './Footer'
export default {
  name: 'TableProducts',
  components: {
    Header,
    Footer,
    ModalPago,
    Descuento,
    Propina
  },
  data() {
    return {
      products: [
        {name: 'test', qty: 1, total: 1000}
      ],
      statusAdditions: -1,
      additions: []
    }
  },
  methods: {
    ...mapMutations([
      "deleteProduct",
      "addProduct",
      "discountProduct"
    ]),
    testQty(product) {
      console.log('product')
      console.log(product)
      return product.price.qty
    },
    getDescuento(addition) {
      if (this.$store.state.discount.status) {
        return addition.discount ? addition.discount : 0;
      }
      return 0;
    },
    getAdditionsPrice(addition) {
      return addition.qty * addition.price - this.getDescuento(addition) * addition.qty;
    },
    isAdditions(product) {
      if (product)
      return this.statusAdditions === product.id && product.additions && product.additions.length > 0
      return false
    },
    additionsActive(additions) {
      return additions && additions.length > 0 ? additions.filter(function (a) {
        return a && a.status === 1;
      }) : [];
    },
    removeAddition(product, item, index, index2) {
      if (!item) {
        return
      }
      if (item.name) {
        var add_aux = Object.assign({}, this.$store.state.ventas);

        if (add_aux[index].additions[index2].qty <= 1) {
          add_aux[index].additions[index2].qty = 0;
          add_aux[index].additions[index2].status = 0;
        } else {
          add_aux[index].additions[index2].qty -= 1;
        }
        console.log('additiom')
        console.log(add_aux[index].additions[index2])
        add_aux[index]
        this.$store.state.ventas = [
          ...this.$store.state.ventas.filter((element, i) => {
            return i !== index
          }),
          add_aux[index]
        ]
      } else {
        let add_aux = Object.assign({}, this.$store.state.ventas);

        if (add_aux[index].modifications[index2].qty <= 1) {
          add_aux[index].modifications[index2].qty = 0;
          add_aux[index].modifications[index2].status = 0;
        } else {
          add_aux[index].modifications[index2].qty -= 1;
        }
        add_aux[index]
        this.$store.state.ventas = [
          ...this.$store.state.ventas.filter((element, i) => {
            return i !== index
          }),
          add_aux[index]
        ]
      }
    },
    more(id) {
      let found = Object.assign({}, this.$store.state.allProducts.find(function (a) {
        return a.id === id;
      }));
      this.addProduct(found);
    },
    minus(id) {
      let found = Object.assign({}, this.$store.state.allProducts.find(function (a) {
        return a.id === id;
      }));
      this.discountProduct(found)
    },
    isDown(item) {
      return item.additions && item.additions.length > 0
    },
    toggleAdditions(id) {
      if (this.statusAdditions !== id) 
        this.statusAdditions = id
      else
        this.statusAdditions = -1
    },
    async sendCommanda() {
      let table = this.$store.state.table.id;
      let zone = this.$store.state.table.id_seccion;
      let products = this.getIdProducts()
      let data = {
        zone: zone,
        table: table,
        products: products
      };
      console.log(JSON.stringify(data));
      try {
        const res = await axios(this.getConfig('post', '/take-order/order/command', data))
        console.log('comanda')
        console.log(res)
        this.openModal()
      } catch (error) {
        console.log('error')
        console.log(error)
      }
    },
    fixName(name) {
      return name.length > 10 ? name.substring(0, 10) : name;
    },
    getTotalProduct(product) {
      let statusDiscount = this.$store.state.discount.status;
      let price = product.price;
      let total = this.$store.state.discount.status ? price.subtotal_discount + price.newTax : price.total;

      if (product.additions && product.additions.length > 0) {
        let additions = product.additions.filter((a) => {
          return a && a.status && a.status === 1
        })
        let totalAdditions = 0
        console.log('additions')
        console.log(additions)
        if (additions && additions.length > 0) {
          additions.map(function (a) {
            var desc = a.discount && statusDiscount ? a.discount : 0;
            console.log(a)
            totalAdditions += a.price * a.qty - desc * a.qty;
          });
        }

        total += totalAdditions;
      }

      return this.numberWithCommas(total);
    },
    async Continue() {
      let ids = this.$store.state.ventas
      if (ids.length > 0) {
        let total = this.getTotalFixed()
        this.$store.state.total = total
        this.$store.state.totalModalpago = total
        this.$modal.show('hello-world')
      } else {
        alert('Por favor Agrega productos')
      }
    },
    openModal() {
      this.getStatusApertura()
    },
    async getStatusApertura() {
      try {
        const res = await axios(this.getConfig('get', '/box/verify-state'))
        let status = res.data.status
        if (status) {
          this.Continue()
        } else {
          alert('Por favor haz apertura de caja')
        }
      } catch (error) {
        console.log('error')
        console.log(error)
      }
    },
    deleteProductLocal(product) {
      this.deleteProduct(product)
    },
    setAlert: helperAlert.setAlert,
    getConfig: helperConfig.getConfig,
    numberWithCommas: helperCommas.numberWithCommas,
    getTotalFixed: helperVentas.getTotalFixed,
    getPropina: helperVentas.getPropina,
    getIdProducts: helperVentas.getIdProducts
  },
  mounted() {
    console.log(this.$store.state.statusComanda)
  }
}
</script>

<style lang="scss" scoped>
$GREEN: #61ce70;
.flex-boton {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  font-size: 0.95em !important;
}
.left {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
}
.minus {
  border-radius: 50%;
  color: red;
  border-color: red;
  border: 1px solid red;
  padding: 0 0.4em;
  margin-right: 1em;
  cursor: pointer;
}
.adds {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  padding: 0px 1em;
  font-size: 0.9em;
  margin: 0.3em 0px;
}
.icon-down {
  margin: 0;
  padding-top: 1em;
}
.first-container {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  margin-top: 2%;
  margin-bottom: 2%;
  padding-left: 1em;
}
.flex {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  width: 100%;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  border-bottom: 1px solid #ddd;
  font-size: 0.8em;
}
.body {
  max-height: 50vh;
  height: 50vh;
  overflow-y: scroll;
}
.tableProducts {
  width: 100%;
  background-color: "#fff";
  border-left: 1px solid #ddd;
  border-right: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  max-height: 100vh;
}
.boton {
  background-color: #61ce70;
  width: 100%;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  padding-top: 1em;
  padding-bottom: 1em;
}
.pagar {
  margin: 0;
  color: #fff;
  font-style: italic;
  font-size: 2em;
  cursor: pointer;
}
.image {
  width: 100px;
}
.qty {
  background-color: #ccc;
  margin: 0;
  padding: 0em 1em;
  font-size: 0.8em;
  height: 14px;
  padding-top: 0.2em;
  color: green;
}
.end {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: end;
  -ms-flex-pack: end;
  justify-content: flex-end;
}
.name-product {
  width: 100px;
}
.price {
  width: 100px;
}
</style>

