<template>
  <div class="Right">
    <!-- <div class="total">$ {{numberWithCommas($store.state.total)}}</div> -->
    <div class="total">$ {{numberWithCommas(getTotalModalPago)}}</div>
    <Methods/>
    <div class="flex">
      <div class="width50">
        <Calculator/>
      </div>
      <div class="width50">
        <Bills/>
        <div class="buttons">
          <div class="button button-gray" @click="Cancelar()">
            Cancelar
          </div>
          <div class="button button-success" @click="Imprimir()">
            Imprimir
          </div>
        </div>
      </div>
    </div>
    
  </div>
</template>
<script>
import helperAlert from '../../../helpers/alert';
import helperCommas from '../../../helpers/commas';
import helperConfig from '../../../helpers/config';
import helperVentas from '../../../helpers/ventas';
import { mapGetters } from 'vuex'
import axios from 'axios'

import Methods from './Methods'
import Bills from './Bills'
import Calculator from './Calculator'
export default {
  name: 'Right',
  components: {
    Methods,
    Bills,
    Calculator
  },
  data() {
    return {
      total: 0,
      conn: {}
    }
  },
  methods: {
    sendDataToSocket(data) {
      this.conn.send(data);
    },
    openConnection() {
      //this.conn = window.WebSocket || window.MozWebSocket;
      if (this.conn.readyState === undefined || this.conn.readyState > 1) {
        this.conn = new WebSocket(this.getUrlSocketPrinter());
        var app = this;

        this.conn.onopen = function () {
          app.conn.send("Connection Established Confirmation");
        };

        this.conn.onmessage = function () {//document.getElementById("content").innerHTML = event.data;
        };

        this.conn.onerror = function () {
          console.log("Web Socket Error");
          app.setAlert('Por favor revise su sistema de impresión', false);
        };

        this.conn.onclose = function () {
          console.log("Web Socket Closed");
        };
      }
    },
    async sendTable(products) {
      const data = {
        products,
        table: this.$store.state.table.id
      }
      try {
        const res = await axios(this.getConfig('post', '/take-order/orders/massive',data))
        let status = res.data.status
        return status
      } catch (error) {
        console.log('error')
        console.log(error)
        return false
      }
    },
    getCambio() {
      const cambio = this.getRestante()
      return cambio > 0 ? 0: cambio *-1
    },
    async createTable() {
      try {
        const res = await axios(this.getConfig('get', '/tables/create'))
        let status = res.data.status
        if(status)
          this.$store.state.table = res.data.table;
      } catch (error) {
        console.log('error')
        console.log(error)
        
      }
    },
    async Imprimir() {
       let recibido = this.getRecibido()

      if (recibido < this.$store.state.total) {
        alert('Por favor verifique los datos')
        return
      }
      let ids = this.getIdProducts()
      console.log(ids)
      await this.sendTable(ids)

      const payments = this.getPayments()
      const products = this.getProducts()

      const store_id = this.$store.state.warehouse.id
      const customer = this.$store.state.user.id
      const total_payment = this.$store.state.total
      const total_received = recibido
      const total_change = this.getCambio()

      let discount = this.$store.state.discount;
      let propina = this.$store.state.propina;

      const ticket = {
        "zone": "-1",
        "table": this.$store.state.table.id ? this.$store.state.table.id: '1557262347865',
        products,
        payments,
        store_id,
        total_payment,
        total_received,
        total_change: total_change <= 0 ? 0: total_change,
        "selected_domicile": "0",
        customer,
        "type_process": "quick-service",
        "total_discount": discount.total,
        "type_discount": discount.type === 'value' ? 'value' : 'percent',
        "discount": discount.value === 'value' ? "0" : discount.value,
        "total_propine": propina.total + "",
        "note_invoice": "",
        "order_consecutive": "300",
        "quick_service_command": "si"
      }
      console.log(ticket)
      this.Checkout(ticket)
    },
    async Checkout(data){
      try {
        const res = await axios(this.getConfig('post', '/checkout/process',data)) 
        console.log(res.data)
        if (res.data.status) {
          const _data = JSON.stringify(res.data.fast_print_data_new);
          this.sendDataToSocket(_data);
          //this.conn.send(JSON.stringify(res.data.fast_print_data_new));
          this.cleanAll();
          this.createTable();
          this.$modal.hide('hello-world');
        }
      } catch (error) {
        console.log('error')
        console.log(error)
        this.cleanAll();
        this.createTable();
        this.$modal.hide('hello-world');
        return false
      }
    },
    Cancelar() {
      this.$modal.hide('hello-world')
    },
    setAlert: helperAlert.setAlert,
    numberWithCommas: helperCommas.numberWithCommas,
    getConfig: helperConfig.getConfig,
    getUrlSocketPrinter: helperConfig.getUrlSocketPrinter,
    getProducts: helperVentas.getProducts,
    cleanAll: helperVentas.cleanAll,
    getPayments: helperVentas.getPayments,
    getRecibido: helperVentas.getRecibido,
    getRestante: helperVentas.getRestante,
    getIdProducts: helperVentas.getIdProducts
  },
  computed: {
    ...mapGetters([
      'getTotalModalPago'
    ]),
  },
  mounted() {
    this.openConnection()
  }
}
</script>

<style scoped>

  .button {
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1em;
    cursor: pointer;
  }

  .button-success {
    border-radius: 5px;
    background-color: green;
  }

  .button-gray {
    border-radius: 5px;
    background-color: #ddd;
  }

  .buttons {
    margin-top: 1em;
    display: flex;
    justify-content: space-between;
  }

  .total {
    border-bottom: 1px solid #ddd;
    color: black;
    font-size: 2.5em;
    padding-left: 1em;
    width: 50%;
  }

  .flex {
    display: flex;
    padding: 0px 1em;
  }

 .width50 {
   width: 50%;
 }
</style>
