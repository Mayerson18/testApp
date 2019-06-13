<template>
  <div class="methods">
    <div class="item-container" v-for="(method, index) in methods" :key="index" @click="selectMethod(method)">
      <div class="item">
        <font-awesome-icon 
          :icon="method.code === 'efectivo' ? 'money-bill': 'credit-card'"
          :style="{ color: '#aaa', paddingTop: 10 }"
          size="2x"
        />
      </div>
      <p class="title">{{method.name}}</p>
    </div>
  </div>
</template>
<script>
import helperAlert from '../../../helpers/alert';
import helperConfig from '../../../helpers/config';
import helperVentas from '../../../helpers/ventas';
import { mapMutations } from 'vuex'
import axios from 'axios'
export default {
  name: 'Methods',
  data() {
    return {
      methods: []
    }
  },
  methods: {
    getConfig: helperConfig.getConfig,
    getRestante: helperVentas.getRestante,
    setAlert: helperAlert.setAlert,
    ...mapMutations([
      'addCollection'
    ]),
    selectMethod(item) {
      if (parseFloat(this.$store.state.totalModalpago) > 0) {
        let restante = this.getRestante()
        if (this.$store.state.totalModalpago > restante && item.code !== 'efectivo' ) {
          this.setAlert('Monto no permitido')
        } else {
          this.addCollection({ total: this.$store.state.totalModalpago, bill: this.$store.state.totalModalpago, method: item })
          const newTotal = restante - this.$store.state.totalModalpago
          this.$store.state.totalModalpago = newTotal > 0 ? newTotal: 0
          //this.props.setTotalPago(newTotal > 0 ? newTotal: 0)
        }
      } else {
        this.setAlert('Total invalido')
      }
      
    },
    async getMethods() {
      try {
        const res = await axios(this.getConfig('get', '/payment-methods'))
        this.methods = res.data.data
        localStorage.setItem('payment-methods', JSON.stringify(this.methods))
      } catch (error) {
        //console.error(error)
      }
    },
    getLocalMethods() {
      let local = localStorage.getItem('payment-methods')
      if (local) {
        this.methods = JSON.parse(local)
      } else {
        this.getMethods()
      }
    }
  },
  mounted() {
    this.getLocalMethods()
  }
}
</script>

<style scoped>
  .title {
    color: #aaa;
    text-align: center;
  }

  .methods {
    display: flex;
    width: 100%;
  }

  .item-container {
    cursor: pointer;
    width: 33.3%;
    border-radius: 5px;
    border: 2px solid #ddd;
    margin: 3%
  }

  .item {

    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
