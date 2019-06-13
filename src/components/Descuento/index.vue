<template>
  <div class="descuento">
    <modal
      name="descuento"
      :clickToClose="false"
      :minHeight="500"
      :height="500"
      :width="400"
    >
      <font-awesome-icon
        icon="times"
        :style="{ position: 'absolute', color: 'black', cursor: 'pointer', paddingTop: 10, paddingRight: 15, right: 0 }"
        size="lg"
        @click="goBack()"
      />

      <div class="container">
        <div class="modelDescuento">
          {{$store.state.discount.value}}
        </div>
        <div class="percentage">
          <font-awesome-icon
            icon="percentage"
            :style="{ color: '#aaa'}"
            size="lg"
          />  
        </div>
      </div>

      <div class="container2">
        <div class="container-calculator">
          <Calculator/>
          <div class="boton" @click="Guardar">
            <div class="pagar">Guadar descuento</div>
          </div>
        </div>
      </div>
    </modal>

  </div>
</template>

<script>
import helperConfig from "../../helpers/config"
import Calculator from "./Calculator"
import { mapMutations } from "vuex"
export default {
  name: 'Descuento',
  components: {
    Calculator
  },
  data: function data() {
    return {
      descuento: ''
    };
  },
  methods: {
    ...mapMutations([
      'addProduct',
      'addDiscount'
    ]),
    getConfig: helperConfig.getConfig,
    goBack() {
      this.$modal.hide('descuento');
    },
    Guardar() {
      var discount = this.$store.state.discount;
      this.$store.state.discount.type = 'percent';
      discount.status = true;
      this.addDiscount({
        type: "percent",
        discount: discount.value
      });
      this.goBack();
    }
  },
  mounted() {

  }
}
</script>

<style scoped>
  .percentage {
    position: relative;
    background-color: #fff;
    padding: .8em .8em;
    border: 1px solid #aaa;
    border-radius: 15%;
    height: 100%;
    min-height: 100%;
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
  .container-calculator {
    width:74%;
  }
  .container2 {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
  }
  .container {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    padding-top: 1em;
    margin-bottom: 1em;
  }
  .modelDescuento {
        width: 57%;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    padding: 1em .5em;
    padding-right: 0;
    border-radius: 5px;
    background-color: #ddd;
    
  }
  .boton {
    
    border-radius: 5px;
    padding-left: 1em;
    margin-top: 1em;
    background-color: #61ce70;
    width: 100%;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    padding-top: .1em;
    padding-bottom: .3em;
    padding: 1em 0px;
  }
  .pagar {
    text-align: center;
    color: #fff;
    font-style: italic;
    font-size: 1.5em;
    cursor: pointer;
  }
</style>
