<template>
  <div class="modalAdiciones">
    <modal
      name="modalAdiciones"
      :clickToClose="false"
      :minHeight="350"
      :height="350"
      :width="'80%'"
    >
      <div class="header">
        <font-awesome-icon
          icon="chevron-left"
          :style="{ position: 'relative', zIndex: 10, color: '#aaa', cursor: 'pointer', paddingTop: 10, paddingLeft: 10, paddingRight: 5, marginBottom: '.3em' }"
          size="lg"
          @click="goBack()"
        />
        <div class="p absolute">{{textSelected}}</div>
      </div>
      <div class="container-types">
        <div class="container-positions">
          <div class="left" >
            <div v-for="(type, index) in types" :key="index" class="container-type" 
              @click="selectType(type)"
            >{{type}}</div>
          </div>
          <div class="middle">
            <div class="flex" v-for="(items, index) in Partition(selected, 3)" :key="index">
              <div 
                v-for="(item, index2) in items" 
                :key="index2"
                class="item"
                @click="addItem(item)"
              >
                {{item.name ? item.name: item.nombre}}
              </div>
            </div>
          </div>
          <div class="right" v-if="textSelected === 'Adiciones'">
            <div class="flex" v-for="(items, index) in Partition(itemsSelecteds, 2)" :key="index">
              <div 
                @click="removeItem(item)"
                v-for="(item, index2) in items"
                :key="index2"
                class="item-selecteds"
              >
                <div class="quantity">
                  {{item.qty}}
                </div>
                {{item.name ? item.name : item.nombre}}
              </div>
            </div>
          </div>
          <div class="right" v-if="textSelected === 'Modificaciones'">
            <div class="flex" v-for="(items, index) in Partition(itemsSelectedsModificaciones, 2)" :key="index">
              <div 
                @click="removeItem(item)"
                v-for="(item, index2) in items"
                :key="index2"
                class="item-selecteds"
              >
                <div class="quantity">
                  {{item.qty}}
                </div>
                {{item.name ? item.name : item.nombre}}
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </modal>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'ModalAdiciones',
  data: function data() {
    return {
      types: ["Adiciones", "Modificaciones", "Tamaño (Proximamente)"],
      textSelected: 'Adiciones',
      selected: ['test'],
      itemsSelecteds: [],
      itemsSelectedsModificaciones: []
    };
  },
  watch: {
    productSelected() {
      this.selectType('Adiciones');
    }
  },
  methods: {
    Partition(items, size) {
      var output = [];

      for (var i = 0; i < items.length; i += size) {
        output[output.length] = items.slice(i, i + size);
      }

      return output;
    },
    selectType(type) {
      if (type === 'Adiciones') {
        this.selected = this.productSelected.additions;
        this.textSelected = 'Adiciones';
      } else if (type === 'Modificaciones') {
        this.selected = this.productSelected.modifications;
        this.textSelected = 'Modificaciones';
      }
    },
    addItem(item) {
      if (item.name) {
        //Adiciones
        let add_aux = Object.assign({}, this.$store.state.productSelected);
        var index = add_aux.additions.findIndex(function (a) {
          return a.id === item.id;
        });
        var additions = add_aux.additions;
        additions[index].status = 1;
        if (additions[index].qty) {
          additions[index].qty += 1
        } else {
          additions[index].qty = 1
        }
        var id = this.$store.state.productSelected.id;
        this.$store.state.ventas = [
          ...this.$store.state.ventas.filter(function (element) {
            return element.id !== id;
          }),
          this.$store.state.productSelected
        ]
        console.log(additions)
        this.itemsSelecteds = additions.filter(function (a) {
          return a.status && a.status === 1;
        });
      } else {
        let add_aux = Object.assign({}, this.$store.state.productSelected);
        let index = add_aux.modifications.findIndex(function (a) {
          return a.id === item.id;
        });
        var modifications = add_aux.modifications;
        modifications[index].status = 1;
        if (modifications[index].qty) {
          modifications[index].qty += 1
        } else {
          modifications[index].qty = 1
        }
        let id = this.$store.state.productSelected.id;
        this.$store.state.ventas = [
          ...this.$store.state.ventas.filter(function (element) {
            return element.id !== id;
          }),
          this.$store.state.productSelected
        ]
        console.log(modifications)
        this.itemsSelectedsModificaciones = modifications.filter(function (a) {
          return a.status && a.status === 1;
        });
      }
    },
    removeItem(item) {
      if (item.name) {
        var index = this.$store.state.productSelected.additions.findIndex(function (a) {
          return a.id === item.id
        });
        var additions = this.$store.state.productSelected.additions;
        additions[index].status = 0;
        additions[index].qty = 0;
        var id = this.$store.state.productSelected.id;
        this.$store.state.ventas = [
          ...this.$store.state.ventas.filter(function (element) {
            return element.id !== id;
          }),
          this.$store.state.productSelected
        ]
        this.itemsSelecteds = additions.filter(function (a) {
          return a.status && a.status === 1;
        });
      } else {
        let index = this.$store.state.productSelected.modifications.findIndex(function (a) {
          return a.id === item.id
        });
        var modifications = this.$store.state.productSelected.modifications;
        console.log('modifications')
        console.log(modifications[index])
        modifications[index].status = 0;
        modifications[index].qty = 0;
        let id = this.$store.state.productSelected.id;
        this.$store.state.ventas = [
          ...this.$store.state.ventas.filter(function (element) {
            return element.id !== id;
          }),
          this.$store.state.productSelected
        ]
        this.itemsSelectedsModificaciones = modifications.filter(function (a) {
          return a.status && a.status === 1;
        });
      }
    },
    goBack() {
      this.itemsSelecteds = [];
      this.itemsSelectedsModificaciones = [];
      this.$modal.hide('modalAdiciones');
    }
  },
  computed: mapState([
    'productSelected'
  ]),
  mounted() {}
}
</script>

<style scoped>
.absolute {
    position: absolute;
  top: 0;
  margin-top: 0.5em !important;
  margin-bottom: 1em !important;
}
.quantity {
    position: absolute;
  right: 0;
  border-radius: 50%;
  border: 1px solid #fff;
  padding: 0px 0.3em;
  top: 0;
  margin-top: 2px;
  margin-right: 2px;
  font-size: 0.9em;
}
.p {
    text-align: center;
  width: 80%;
  font-weight: bolder;
  margin-top: 0;
}
.header {
  display: block;
}
.container-positions {
    border-radius: 5px;
  border: 1px solid #ddd;
  width: 100%;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  margin-bottom: 2em;
}
.right {
  width: 30%;
  border-left: 1px solid #ddd;
  padding: 0px 1em;
  padding-top: 1em;
  max-height: 35vh;
  overflow-y: scroll;
}
.left {
  width: 20%;
  border-right: 1px solid #ddd;
  height: 35vh;
  padding: 0px 1em;
  padding-top: 1em;
  max-height: 35vh;
  
}
.middle {
  width: 45%;
  font-size: 0.9em;
  padding: 0px 1em;
  padding-top: 1em;
  max-height: 35vh;
  overflow-y: scroll;
}
.container-selecteds {
  border-radius: 5px;
  border: 1px solid #ddd;
  height: 40vh;
  width: 85%;
  margin: 0px 5%;
  padding: 1em;
}
.item-selecteds, .item, .container-type {
    cursor: pointer;
  padding: 1em;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
      -ms-flex-pack: center;
          justify-content: center;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 1em;
}
.container-types {
    display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  padding: 0px 5%;
  padding-top: 2em;
  -webkit-box-pack: justify;
      -ms-flex-pack: justify;
          justify-content: space-between;
  border-top: 1px solid #ddd;
}
.flex {
    display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
      -ms-flex-pack: justify;
          justify-content: space-between;
}
.container-type:hover {
    background-color: #ddd;
}
.item {
    width: 30%;
  padding: 0.8em 0;
}
.item:hover {
    background-color: #ddd;
}
.item-selecteds {
    width: 25%;
  background-color: #61ce70;
  color: #fff;
  position: relative;
}
</style>
