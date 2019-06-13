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

export default {
  name: 'Calculator',
  data() {
    return {
      keys: [
        { key: '1' },
        { key: '2' },
        { key: '3' },
        { key: '4' },
        { key: '5' },
        { key: '6' },
        { key: '7' },
        { key: '8' },
        { key: '9' },
        { key: '0' },
        { key: '00' },
        {key: 'back'}
      ]
    }
  },
  methods: {
    touchKey(key) {
      let total = 0
      if (key === 'back') {
        const str = (this.$store.state.totalModalpago).toString()
        const aux = str.substring(0, str.length-1)
        total = parseFloat((parseInt(aux)))
      } else {
        total = parseFloat((parseInt(this.$store.state.totalModalpago) + '' + key))
      }
      if (total) {
        this.$store.state.totalModalpago = total  
      } else {
        this.$store.state.totalModalpago = 0
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
  },
  mounted() {
  }
}
</script>

<style scoped>
  .calculator-container {
    display: flex;
  }

  .calculator {
    border-radius: 5px;
    border: 1px solid #ddd;
    padding: 1em;
    margin-right: 1em;
  }

  .item-container {
    cursor: pointer;
    margin: 0px .5em;
    margin-bottom: .5em;
    height: 60px;
    border-radius: 50%;
    border: 1px solid #ddd;
    width: 33%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .item-container:hover {
    background-color: #ddd;
  }

  .item-key {
  }
</style>
