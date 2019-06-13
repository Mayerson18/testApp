<template>
  <div class="footer">
    <div class="flex">
      <p class="left">Sub Total ({{getTotalProducts()}} Items)</p>
      <p class="right">${{numberWithCommas(getSubTotal())}}</p>
    </div>
    <div class="flex">
      <p class="left">Impuesto</p>
      <p class="right">${{numberWithCommas(getIva())}}</p>
    </div>
    <div class="flex">
      <p class="left click" v-if="$store.state.discount.status" @click="quitDescuento()">Descuento <strong class="red">(-)</strong></p>
      <p class="left click" v-else>Descuento</p>
      <p class="right click" @click="openDescuento()" v-if="!$store.state.discount.status">+</p>
      <p class="right" v-else>${{numberWithCommas($store.state.discount.total)}}</p>
    </div>
    <div class="flex">
      <p class="left click" v-if="$store.state.propina.status" @click="quitPropina()">Propina <strong class="red">(-)</strong></p>
      <p class="left click" v-else>Propina</p>
      <p class="right click" @click="openPropina()" v-if="!$store.state.propina.status">+</p>
      <p class="right" v-else>${{numberWithCommas(getPropina)}}</p>
    </div>
    <div class="flex">
      <p class="left">Total</p>
      <p class="right">${{numberWithCommas(getTotalFixed)}}</p>
    </div>
  </div>
</template>
<script>
import helperAlert from '../../helpers/alert';
import helperCommas from '../../helpers/commas';
import helperVentas from '../../helpers/ventas';

export default {
  name: 'Footer',
  props: ["getTotalFixed", "getPropina"],
  data() {
    return {
    }
  },
  methods: {
    openDescuento() {
      if (this.$store.state.ventas.length > 0)
        this.$modal.show("descuento")
      else
        this.setAlert("Por favor agregue productos")
    },
    quitDescuento() {
      this.cleanDiscount()
    },
    openPropina() {
      if (this.$store.state.ventas.length > 0)
        this.$modal.show("propina")
      else
        this.setAlert("Por favor agregue productos")
    },
    quitPropina() {
      this.cleanPropina()
    },
    setAlert: helperAlert.setAlert,
    cleanPropina: helperVentas.cleanPropina,
    cleanDiscount: helperVentas.cleanDiscount,
    getIva: helperVentas.getIva,
    getSubTotal: helperVentas.getSubTotal,
    getTotalProducts: helperVentas.getTotalProducts,
    numberWithCommas: helperCommas.numberWithCommas,
  },
  mounted() {
    
  }
}
</script>

<style scoped>
  .red {
    color: red;
  }

  .click {
    cursor: pointer;
  }

  .flex {
    display: flex;
    justify-content: space-between;
    padding: .5em 1em;
    border-bottom: 1px solid #ddd;
  }

  .p {
    font-size: .8em;
  }

  .left {
    color: #aaa;
    margin: 0;
  }

  .right {
    font-weight: bold;
    margin: 0;
  }

  .footer {
    border: 1px solid #ddd;
    font-size: .8em;
    margin: 0px 1em;
    width: auto;
    border-radius: 5px;
    
  }
</style>
