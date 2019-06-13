<template>
  <div class="categories">
    <div class="flex">
      <div class="left">
         <font-awesome-icon
            icon="caret-left"
            :style="{ color: '#aaa', cursor: 'pointer', paddingLeft: 10, paddingTop: 10, paddingRight: 5}"
            size="4x"
            @click="Back()"
          />  
      </div>
      <div class="right">
         <font-awesome-icon
            icon="caret-right"
            :style="{ color: '#aaa', cursor: 'pointer', paddingLeft: 10, paddingTop: 10, paddingRight: 5}"
            size="4x"
            @click="Next()"
          />  
      </div>
    </div>
    <carousel
      :perPage="4"
      :paginationEnabled="false"
      class="carousel"
      ref="test"
    >
      <slide v-for="(categorie, index) in categories" :key="index" class="slide" >
        <div 
          :class="{categorie: true, 'margin-right': index % 3 === 0, 'active-categorie': selected === categorie.id}"
          @click="selectCategorie(categorie)"
        >
          {{categorie.name}}
        </div>
      </slide>
    </carousel>
  </div>
</template>
<script>
import axios from 'axios'
import config from '../../../config/config'
import helperConfig from '../../helpers/config'
export default {
  name: 'Categories',
  data() {
    return {
      categories: [
      ],
      selected: -1
    }
  },
  methods: {
    Back() {
      const back = this.$refs.test.getPreviousPage();
      this.$refs.test.goToPage(back);
    },
    Next() {
      const next = this.$refs.test.getNextPage();
      this.$refs.test.goToPage(next);
    },
    fixName(name) {
      return name.length > 8 ? name.substring(0, 8) : name;
    },
    getConfig: helperConfig.getConfig,
    selectCategorie(categorie) {
      this.selected = categorie.id;

      if (categorie.name === 'Todos') {
        this.$store.state.products = this.$store.state.allProducts;
      } else {
        this.$store.state.products = this.$store.state.allProducts.filter(function (a) {
          var auxId = a.category ? a.category.id : -2;
          if (auxId === categorie.id) return a;
        });
      }
    },
    async getCategories() {
      const todos = {active: 1, id: -1, image: "", name: "Todos" ,shop: 1, subcategories: []}
      try {
        const res = await axios(this.getConfig('get', '/categories'))
        let data = res.data.data
        data.unshift(todos)
        this.$store.state.categories = data
        this.categories = data
        localStorage.setItem('categories', JSON.stringify(data))
      } catch (error) {
        console.log('error')
        console.log(error)
      }
    },
  },
  mounted() {
    this.getCategories()
  }
}
</script>

<style scoped>
  
  .left {
      cursor: pointer;
    z-index: 1;
  }
  .right {
      cursor: pointer;
    z-index: 1;
    margin-right: -1em;
  }
  .categories {
        position: relative;
      margin-bottom: 1em;
  }
  .flex {
    width: 100%;
    position: absolute;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
  }
  .carousel[data-v-030ae062] {
    width: 100%;
    padding: 0 1em;
  }
  .slide[data-v-030ae062] {
    padding-top: 1em;
    widows: 20%;
  }
  .margin-right[data-v-030ae062] {
    margin-right: 20%!important;
  }
  .active-categorie[data-v-030ae062] {
    background-color: #61ce70;
    color: #fff;
  }
  .categorie[data-v-030ae062] {
    cursor: pointer;
    /* margin: 0px 10%; */
    margin: 0px 15%;
    margin-top: .5em;
    padding: .5em 1em;
    border-radius: .5em;
    border: 1px solid #ddd;
    height: 20px;
    font-size: .9em;
  }
  
</style>
