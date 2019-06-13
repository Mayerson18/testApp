<template>
  <div class="leftxd">
    <div class="total-a-pagar">
      <p class="title">Total a pagar</p>
      <h4 class="price">$ {{numberWithCommas($store.state.total)}} </h4>
    </div>
    <div class="falta-por-pagar">
      <p class="title">Falta por pagar</p>
      <h4 class="price">$ {{numberWithCommas(getRestante())}} </h4>
    </div>
    <Totales/>
    <div class="total">
      <p class="title">Total recibido</p>
      <h4 class="price">$ {{numberWithCommas(getRecibido())}} </h4>
    </div>
  </div>
</template>
<script>
import helperCommas from '../../../helpers/commas';
import helperVentas from '../../../helpers/ventas';
import Totales from './Totales'

export default {
  name: 'Left',
  components: {
    Totales
  },
  data() {
    return {
    }
  },
  methods: {
    numberWithCommas: helperCommas.numberWithCommas,
    getRecibido: helperVentas.getRecibido,
    getRestante: helperVentas.getRestante,
  }
}
</script>

<style lang="scss" scoped>

  .total {
    padding-left: 1.5em;
    .price {
      margin-top: 5px;
      color: green;
      font-size: 2.2em;
    }
  }

  .total-a-pagar {
    padding-left: 1.5em;
    .title {
      margin-bottom: 5px;
    }
    .price {
      margin-top: 5px;
      color: green;
      font-size: 2.2em;
      margin-bottom: .5em;
    }
  }

  .falta-por-pagar {
    padding-left: 1.5em;
    .title {
      margin-bottom: 5px;
    }
    .price {
      color: red;
      font-size: 2.2em;
      margin-top: 5px;
      margin-bottom: .3em;
    }
  }
</style>
