<template>
  <div class="totales-container">
    <div class="totales-item" v-for="(item, index) in $store.state.collection" :key="index">
      <div class="restar" @click="removeItem(item)">-</div>
      <p class="title">{{item.method.name}}</p>
      <h4 class="price">$ {{numberWithCommas(item.bill)}} </h4>
    </div>
  </div>
</template>
<script>
import helperCommas from '../../../helpers/commas';
import { mapMutations } from 'vuex'
//import helperVentas from '../../../helpers/ventas';

export default {
  name: 'Totales',
  data() {
    return {
    }
  },
  methods: {
    ...mapMutations([
      'deleteCollection'
    ]),
    numberWithCommas: helperCommas.numberWithCommas,
    removeItem(item) {
      this.deleteCollection(item)
    }
  }
}
</script>

<style lang="scss" scoped>

  .restar {
    border-radius: 50%;
    color: red;
    border-color: red;
    border: 1px solid red;
    padding: 0px .4em;
    height: 17px;
    margin-top: 1.2em;
    margin-right: 1em;
    cursor: pointer;
  }

  .totales-container {
    padding-left: 1em;
    padding-right: 1em;
    width: 90%;
    height: 40vh;
    min-height: 40vh;
    .totales-item {
      display: flex;
      justify-content: space-between;
      border: 1px solid #ddd;
      border-radius: 5px;
      padding: 0px .5em;
      .title {
        padding-top: .3em;
      }
    }
  }
</style>
