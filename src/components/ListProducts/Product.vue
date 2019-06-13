<template>
  <div :class="{product: true, select: isSelect(product.id)}" @click="addProductLocal(product)">
    <div class="number-items" v-if="isSelect(product.id)">
      {{getNumber(product.id)}}
    </div>
    <img alt="Vendty" class="image" :src="getImage()">
    <p class="title border">{{fixName(product.name)}}</p>
    <p class="price">${{numberWithCommas(product.price.total)}}</p>
  </div>
</template>
<script>
import helperCommas from '../../helpers/commas';
import { mapMutations } from 'vuex'

export default {
  name: 'Product',
  props: ["product"],
  data() {
    return {
    }
  },
  methods: {
    getNumber(id) {
      let found = this.getFound(id)
      return found.price.qty
    },
    getFound(id) {
      return this.$store.state.ventas.find(a => a.id === id)
    },
    isSelect(id) {
      let found = this.getFound(id)
      return found ? true: false
    },
    fixName(name) {
      return name.length > 14 ? name.substring(0,14): name
    },
    getImage() {
      let image = this.product.images[0]
      return image && image !== '' ? image: require('../../assets/placeholder.png')
    },
    ...mapMutations([
      'addProduct'
    ]),
    addProductLocal(product) {
      console.log(product)
      let auxProduct = Object.assign({}, product)
      if (auxProduct.additions && auxProduct.additions.length > 0) {
        auxProduct.additions.map((a) => {
          if (a && a.status && a.status === 1) {
            a.status = 0
            return a
          }
          return {}
        })
        auxProduct.additions = auxProduct.additions.filter(Boolean)
      }
      this.addProduct(auxProduct)
      if (this.$store.state.type_business === 'restaurante' && product.additions && product.additions.length > 0) {
        this.$store.state.productSelected = auxProduct
        this.$modal.show('modalAdiciones')
      }
    },
    numberWithCommas: helperCommas.numberWithCommas
  },
  mounted() {
    //this.getProducts()
  }
}
</script>

<style scoped>

  .number-items {
    position: absolute;
    z-index: 1;
    background-color: #61ce70;
    color: #fff;
    top: 0;
    right: 0;
    margin-right: .2em;
    margin-top: .2em;
    border-radius: 50%;
    padding: .1em .4em;
  }

  .border {
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
  }

  .title {
    color: #777;
    margin-bottom: 0;
    font-size: .8em;
    margin-top: 0;
    padding-bottom: .2em;
    background-color: #eee;
    position: relative;
    top: -4px;
  }

  .price {
    margin-top: 0;
    color: #5cb85c;
    margin-bottom: 0;
    position: relative;
    top: -4px;
    padding-top: .5em;
  }

  .product {
    width: 100%;
    border-radius: 10%;
    border: 1px solid #ddd;
    cursor: pointer;
    position: relative;
  }

  .image{
    width: 100%;
    max-width: 97%;
    max-height: 100px;
    border-top-left-radius: 10%;
    border-top-right-radius: 10%;
  }

  .select {
    border-color: green;
  }

</style>
