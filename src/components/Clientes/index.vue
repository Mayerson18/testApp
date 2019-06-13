<template>

  <div class="clientes">
    <v-select
      label="name"
      placeholder="Buscar cliente"
      v-model="$store.state.userSelected"
      :options="getClientes"
      :style="{
        width: '94%',
        paddingLeft: '1em',
        borderRadius: '50%!important',
        color: '#ddd' 
      }"
    ></v-select>
    <font-awesome-icon 
      icon="search" 
      :style="{ 
        color: '#aaa', 
        cursor: 'pointer',
        border: '0',
        left: '0px',
        top: '0px',
        position: 'absolute',
        color: 'rgb(170, 170, 170)',
        cursor: 'pointer',
        'marginLeft': '1.6em!important',
        'marginTop': '3%!important'
      }" 
      size="md"
    />
    <div class="float" @click="openModal">
      +
    </div>
    <AddCliente/>
  </div>
</template>

<script>
import AddCliente from './addCliente'
export default {
  name: 'Clientes',
  components: {
    AddCliente
  },
  data() {
    return {
      clientes: []
    };
  },
  methods: {
    openModal() {
      this.$modal.show('addCliente');
    }
  },
  mounted() {
    console.log(this.$store.state.clientes)
  },
  computed: {
    getClientes() {
      return this.$store.state.clientes.filter(function (a) {
        return a.name !== '';
      });
    }
  }
}
</script>

<style scoped>
  .clientes {
    display: flex;
    position: relative;
    border-left: 1px solid #ddd;
    padding: .5em 0px;
  }

  .float {
    margin-left: 1em;
    cursor: pointer;
    border-radius: 50%;
    border: 1px solid green;
    color: green;
    height: 18px;
    padding: 0 .3em;
    margin-top: .5em;
  }
</style>

