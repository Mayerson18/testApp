<template>
  <div class="listProduct">
    <ModalAdiciones/>
    <div v-for="(items, index1) in Partition($store.state.products, 4)" :key="index1" class="flex">
      <div v-for="(item, index2) in items" :key="index2" class="width30">
        <Product :product="item"/>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios'
import helperConfig from '../../helpers/config'
import ModalAdiciones from '../ModalAdiciones/index'
import Product from './Product.vue'

export default {
  name: 'listProduct',
  components: {
    Product,
    ModalAdiciones
  },
  data() {
    return {

    }
  },
  methods: {
    getProductsLocal() {
      let products = localStorage.getItem('products')
      if (products) {
        products = JSON.parse(products)
        this.$store.state.products = products
        this.$store.state.allProducts = products
      } else {
        this.getProducts()
      }
    },
    async getProducts() {
      try {
        const res = await axios(this.getConfig('get', '/products'))
        let data = res.data.data.filter(a => a.type !== "ingrediente")
        //console.log(data)
        this.$store.state.allProducts = data
        this.$store.state.products = data
        this.$store.state.statusComanda =  res.data.command
        localStorage.setItem('products', JSON.stringify(data))
      } catch (error) {
        console.log('error')
        console.log(error)
      }
    },
    Partition(items, size) {
      let output = [];
      for (let i = 0; i < items.length; i += size)
      {
        output[output.length] = items.slice(i, i + size);
      }
      return output;
    },
    getConfig: helperConfig.getConfig,
  },
  mounted() {
    this.getProducts()
    //this.getProductsLocal()
  }
}
</script>
<style scoped>
  .listProduct {
    max-height: 77vh;
    min-height: 77vh;
    height: 77vh;
    width: 104%;
    min-width: 104%;
    overflow-y: scroll;

  }

  .flex {
    display: flex;
    justify-content: space-between;
    margin-bottom: 2em;
    padding: 0px 1em;
  }

  .width30{
    width: 20%;
  }

</style>
