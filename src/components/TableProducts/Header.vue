<template>
  <div class="header">
    <p class="p" style="padding-left: .5em">Cantidad</p>
    <p class="p end">Producto</p>
    <p class="p end">Total</p>
    <div class="p center"><font-awesome-icon
      icon="times-circle"
      :style="{ color: '#ddd', cursor: 'pointer', paddingTop: 10, paddingRight: '1.5em' }" 
      size="lg"
      @click="deleteAll()"
    /></div>
  </div>
</template>
<script>
import { mapMutations } from 'vuex'
import helperVentas from '../../helpers/ventas'
export default {
  name: 'Header',
  data() {
    return {
    }
  },
  methods: {
    cleanAll: helperVentas.cleanAll,
    ...mapMutations([
      'deleteAllProducts'
    ]),
    deleteAll() {
      this.cleanAll()
    }
  }
}
</script>

<style scoped>
  .end {
    display: flex;
    justify-content: flex-end;
  }

  .p {
    font-size: .8em;
    width: 25%;
  }

  .center {
    display: flex;
    justify-content: flex-end;
  }

  .header {
    /* padding-left: 1em;
    padding-right: 1em; */
    display: flex;
    /* justify-content: space-between; */
    width: 100%;
    border-radius: 5%;
    border: 1px solid #ddd;
  }
</style>
