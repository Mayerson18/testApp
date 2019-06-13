<template>
   <div class="calculator">
    <div v-for="(items, index) in Partition(keys, 3)" :key="index" class="calculator-container">
      <div class="item-container" v-for="(key, index2) in items" :key="index2" @click="touchKey(key.key)">
        {{key.key}}
      </div>
    </div>
  </div>
</template>

<script>
import helperAlert from "../../helpers/alert"
export default {
  name: 'Calculator',
  data() {
    return {
      msg: '',
      keys: [{
        key: '1'
      }, {
        key: '2'
      }, {
        key: '3'
      }, {
        key: '4'
      }, {
        key: '5'
      }, {
        key: '6'
      }, {
        key: '7'
      }, {
        key: '8'
      }, {
        key: '9'
      }, {
        key: '0'
      }, {
        key: '00'
      }, {
        key: 'back'
      }]
    };
  },
  methods: {
    setAlert: helperAlert.setAlert,
    touchKey(key) {
      var total = 0;
      if (key === 'back') {
        var str = this.$store.state.propina.value.toString();
        var aux = str.substring(0, str.length - 1);
        total = parseFloat(parseInt(aux));
      } else {
        total = parseFloat(parseInt(this.$store.state.propina.value) + '' + key);
      }

      if (total) {
        if (total <= 100) {
          this.$store.state.propina.value = total;
        } else {
          this.setAlert('Monto invalido', false);
        }
      } else {
        this.$store.state.propina.value = 0;
      }
    },
    Partition(items, size) {
      var output = [];

      for (var i = 0; i < items.length; i += size) {
        output[output.length] = items.slice(i, i + size);
      }

      return output;
    }
  },
  mounted() {}
}
</script>

<style scoped>
  .calculator-container {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
  }
  .calculator {
    border-radius: 5px;
    border: 1px solid #ddd;
    padding: 1em;
  }
  .item-container {
    cursor: pointer;
    margin: 0px .5em;
    margin-bottom: .5em;
    height: 60px;
    border-radius: 50%;
    border: 1px solid #ddd;
    width: 33%;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
  }
  .item-container:hover {
    background-color: #ddd;
  }

</style>
