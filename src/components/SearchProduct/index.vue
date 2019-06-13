

<template>
  <div class="searchProduct">
    <input type="text" v-model="search" class="input" placeholder="Por favor digité su busqueda">
    <font-awesome-icon 
        icon="search" 
        :style="{ color: 'black', cursor: 'pointer', }" 
        size="lg"
      />
  </div>
</template>
<script>

export default {
  name: 'SearchProduct',
  data() {
    return {
      search: ''
    }
  },
  watch: {
    search(value) {
      if (value === '') {
        this.$store.state.products = this.$store.state.allProducts
      } else {
        const filter = this.$store.state.allProducts.filter((a) => {
          const name = a.name ? a.name.toUpperCase(): ''
          if (name.includes(value.toUpperCase()))
            return a
        })
        this.$store.state.products = filter
      }
    }
  },
  methods: {
    selectCategorie(categorie) {
      console.log(categorie)
    }
  }
}
</script>

<style scoped>
  .searchProduct{
    border-radius: 19px;
    padding-top: .5em;
    background-color: #eeeeee;
    width: 100%;
    height: 30px;
  }

  .input {
    width: 90%;
    border: 0;
    height: 80%;
    background-color: transparent;
    border-bottom: 1px solid #ddd;
  }
</style>
