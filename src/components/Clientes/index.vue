<template>

  <div>
    <v-select
      placeholder="Buscar cliente"
      v-model="$store.state.userSelected" :options="getClientes">

    >

    </v-select>
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
  mounted() {},
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

</style>

