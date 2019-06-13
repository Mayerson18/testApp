<template>
<div>
  <modal
    :clickToClose="false"
    name="hello-world"
    :width="'80%'"
    :minHeight="600"
    :height="600"
  >
    <div class="border">
      <font-awesome-icon 
        icon="chevron-left" 
        :style="{ color: '#aaa', cursor: 'pointer', paddingLeft: 10, paddingTop: 10, paddingRight: 5 }" 
        size="lg"
        @click="goBack()"
      />
    </div>
    <div class="flex">
      <div class="left">
        <Left/>
      </div>
      <div class="right">
        <Right/>
      </div>
    </div>
  </modal>
</div>
</template>
<script>
import helperVentas from '../../helpers/ventas';
import Right from './Right/index'
import Left from './Left/index'
export default {
  name: 'ModalPago',
  components: {
    Left,
    Right
  },
  data() {
    return {
    }
  },
  methods: {
    goBack() {
      this.$modal.hide('hello-world')
    },
    cleanAll: helperVentas.cleanAll,
  }
}
</script>

<style scoped>
  .border {
    padding-bottom: .5em;
    border-bottom: 1px solid #ddd;
  }

  .flex {
    display: flex;
  }

  .left {
    width: 30%;
    height: 100vh;
    border-right: 1px solid #ddd;
  }

  .right {
    width: 70%;
    height: 100vh;
    /* border-left: 1px solid #ddd; */
  }
</style>
