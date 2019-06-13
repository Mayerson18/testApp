<template>
  <div class="home">
    <ModalAlert/>
    <div class="flex">
      <div class="width60">
        <SearchProduct/>
        <Categories/>
        <ListProduct/>
        
      </div>
      <div class="width40">
        <Clientes/>
        <TableProduct/>
      </div>
    </div>
    <div class="flex">
      
    </div>

  </div>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld.vue'
import SearchProduct from '@/components/SearchProduct/index'
import ListProduct from '@/components/ListProducts/ListProducts'
import Categories from '@/components/Categories/index'
import TableProduct from '@/components/TableProducts/index'
import Clientes from '@/components/Clientes/index'
import ModalAlert from '@/components/ModalAlert/index'

import axios from 'axios'
import auxAxios from '../helpers/config'

export default {
  name: 'home',
  components: {
    ListProduct,
    TableProduct,
    Categories,
    SearchProduct,
    Clientes,
    ModalAlert
  },
  data() {
    return {
    }
  },
  methods: {
    async getCustomers() {
      try {
        const res = await axios(this.getConfig('get', '/customers'))
        let data = res.data.data
         if (data) {
          this.$store.state.clientes = data
          localStorage.setItem('clientes', JSON.stringify(res.data))
          const cliente_default = data.find((a) => {
            if(a.name === 'General' || a.name === 'general') {
              return a
            }
          })
          if (cliente_default) {
            this.$store.state.clienteSelected = cliente_default
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
    async createTable() {
      try {
        const res = await axios(this.getConfig('get', '/tables/create'))
        if (res.data.status) {
          this.$store.state.table = res.data.table
        }
      } catch (error) {
        console.log('error')
        console.log(error)
      }
    },
    async Login() {
      const data = {
        email: 'restaurante@vendty.com',
        password: '123456789',
        app: 'test'
      }
      try {
        const res = await axios(this.getConfig('post', '/login', data))
        let dat = JSON.stringify(res.data)
        localStorage.setItem('api_auth', dat)
      } catch (error) {
        console.log('error')
        console.log(error)
      }
    },
    getConfig: auxAxios.getConfig
  },
  created() {
    let item = localStorage.getItem("api_auth")
    if (item) {
      let auxItem = JSON.parse(item)
      this.$store.state.statusComanda = auxItem.command
      this.$store.state.token = auxItem.token
      this.$store.state.type_business = auxItem.type_business
      this.$store.state.user = auxItem.user
      this.$store.state.warehouse = auxItem.warehouse
      this.createTable()
      this.getCustomers()
      localStorage.setItem('apiToken', auxItem.token)
    }
    //this.Login()
  }
}
</script>

<style scoped>
  .flex {
    display: flex;
    width: 100%;
  }

  .width60 {
    width: 57.4%;
  }
  .width40 {
    padding-left: 3%;
    width: 50%;
  }
</style>
