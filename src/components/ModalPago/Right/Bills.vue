<template>
  <div class="bills">
    <div v-for="(items, index1) in Partition(bills, 3)" :key="index1" class="flex">
      <div v-for="(bill, index2) in items" :key="index2" class="bill" @click="selectBill(bill)">
        ${{numberWithCommas(bill)}}
      </div>
    </div>
  </div>
</template>
<script>
import helperCommas from '../../../helpers/commas';
import helperConfig from '../../../helpers/config';
import axios from 'axios'

export default {
  name: 'Bills',
  data() {
    return {
      bills: [
      ]
    }
  },
  methods: {
    numberWithCommas: helperCommas.numberWithCommas,
    getConfig: helperConfig.getConfig,
    selectBill(bill) {
      this.$store.state.totalModalpago = bill
    },
    async getBills() {
      let data = {
        amount: this.$store.state.totalModalPago
      }
       try {
        const res = await axios(this.getConfig('post', '/checkout/help-pay-amounts', data))
        this.bills = res.data
        localStorage.setItem('bills', JSON.stringify(this.bills))
      } catch (error) {
        console.log('error')
        console.log(error)
      }
    },
    getLocalBills() {
      let local = localStorage.getItem('bills')
      if (local) {
        this.bills = JSON.parse(local)
      } else {
        this.getBills()
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
    this.getLocalBills()
  }
}
</script>

<style scoped>
  .flex {
    display: flex;
    justify-content: space-between;
  }

  .bills{
    border-radius: 5px;
    border: 1px solid #ccc;
    padding: 1em;
  }

  .bill{
    cursor: pointer;
    margin-bottom: .5em;
    padding: 1em;
    border-radius: 5px;
    border: 1px solid #ccc;
  }
</style>
