

<template>
  <div class="addCliente">
    <modal
    :clickToClose="false"
    name="addCliente"
    :minHeight="600"
    :height="600"
  >
    <div class="header">
      <font-awesome-icon 
        icon="times" 
        :style="{ position: 'absolute', color: '#666161', cursor: 'pointer', right: 0, paddingRight: 10 }" 
        size="lg"
        @click="goBack()"
      />
      Nuevo cliente
    </div>
    <div class="body-cliente">

      <div class="container-item">
        <div class="item item70">
          <label class="label-item" for="name">Nombre Completo</label>
          <input placeholder="Nombre Completo" class="input-item" id="xd" type="text" v-model="name" name="xd">
        </div>
        <div class="item item30">
          <label class="label-item" for="typeId">Tipo Identificación</label>
          <input placeholder="Tipo Identificación" class="input-item" type="text" v-model="typeId" name="typeId">
        </div>
      </div>

      <div class="container-item">
        <div class="item item30">
          <label class="label-item" for="id">Numero Identificación</label>
          <input placeholder="Numero Identificación" class="input-item" type="text" v-model="id" name="id">
        </div>
        <div class="item item70">
          <label class="label-item" for="xd2">Correo Electronico</label>
          <input placeholder="Correo Electronico" class="input-item" type="text" v-model="email" name="xd2">
        </div>
      </div>

      <div class="container-item">
        <div class="item item30">
          <label class="label-item" for="telefono">Telefono</label>
          <input placeholder="Telefono" class="input-item" type="text" v-model="phone" name="telefono">
        </div>
        <div class="item item30">
          <label class="label-item" for="celular">Celular</label>
          <input placeholder="Celular" class="input-item" type="text" v-model="cellphone" name="celular">
        </div>
        <div class="item item30">
          <label class="label-item" for="direccion">Dirección</label>
          <input placeholder="Dirección" class="input-item" type="text" v-model="address" name="direccion">
        </div>
      </div>

      <div class="container-item">
        <div class="item item30">
          <label class="label-item" for="pais">País</label>
          <input placeholder="País" class="input-item" type="text" v-model="country" name="pais">
        </div>
        <div class="item item30">
          <label class="label-item" for="ciudad">Ciudad</label>
          <input placeholder="Ciudad" class="input-item" type="text" v-model="city" name="ciudad">
        </div>
        <div class="item item30">
          <label class="label-item" for="grupo">Grupo</label>
          <input placeholder="Grupo" class="input-item" type="text" v-model="group" name="grupo">
        </div>
      </div>

    </div>
    <div class="buttons">
      <div class="button cancel" @click="goBack()">Cancelar</div>
      <div class="button success" @click="Guardar()">Guardar</div>
    </div>

  </modal>
  </div>
</template>
<script>
import helperConfig from '../../helpers/config'
import axios from 'axios'
export default {
  name: 'AddCliente',
  components: {
  },
  data() {
    return {
      name: '',
      typeId: '',
      id: '',
      email: '',
      phone: '',
      cellphone: '',
      address: '',
      country: '',
      city: '',
      group: ''
    }
  },
  methods: {
    getConfig: helperConfig.getConfig,
    goBack() {
      this.$modal.hide('addCliente')
    },
    Guardar() {
      const data = {
        "social_reason": this.name,
        "address": this.address,
        "phone": this.phone,
        "customers_group": this.group,
        "country": this.country
      }
      console.log(data)
      this.createCustomer(data)
    },
    async createCustomer(data) {
      
      try {
        const res = await axios(this.getConfig('post', '/customers', data))
        console.log(res)
        this.goBack()
      } catch (error) {
        console.log('error')
        console.log(error)
      }
    // if (this.props.network.isConnected) {
    //   try {
    //     let response = await fetch(`${config.urlApi}/customers`, {
    //       method: "POST",
    //       headers: {
    //         Accept: 'application/json',
    //         'Content-Type': 'application/json',
    //         'Authorization': 'Bearer ' + this.props.token
    //       },
    //       body: JSON.stringify({
    //         "social_reason": this.name,
    //         "address": this.state.direccion,
    //         "phone": this.state.telefono,
    //         "customers_group": this.props.group.id,
    //         "country": this.props.user.pais === "" || !this.props.user.pais ? 'Colombia': this.props.user.pais
    //       })
    //     });
        
    //     let responseJson = await response.json();
    //     if (responseJson.data.id) {
        
    //       this.setState({customer: responseJson.data})
    //       ToastAndroid.show('Cliente agregado exitosamente', ToastAndroid.SHORT);
    //     } else {
    //       ToastAndroid.show('Error agregando el usuario, por favor contacte soporte', ToastAndroid.SHORT);
    //     }
        
    //   } catch (error) {
    //     console.error(error);
    //   }
    // } else {
    //   ToastAndroid.show('No se puede agregar cliente sin conexion a internet', ToastAndroid.SHORT);
    // }
    }
  },
  mounted() {
  }
}
</script>

<style scoped>

  .body-cliente {
    margin-top: 2em;
  }

  label {
    font-size: .9em;
    padding-left: 1em;
  }

  input[type=text] {
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    box-sizing: border-box;
    border: 1px solid #ddd;
  }

  textarea:focus, input:focus{
    outline: none;
  }

  .container-item {
    display: flex;
    justify-content: space-between;
    padding: 0 1em;
  }

  .header {
    display: flex;
    justify-content: center;
    padding: .5em 0px;
    font-size: 1.5em;
    border-bottom: 1px solid #ddd;
    background: #eee;
    color: #aaa;
  }

  .buttons {
    display: flex;
  }

  .input-item {
    border-radius: 5px;

  }

  .addCliente {

  }

  .item {
    margin: .5em .5em;
  }

  .item30 {
    width: 30%;
  }

  .item70 {
    width: 70%;
  }

  .buttons {
    display: flex;
    justify-content: center;
    margin-top: 5%;
  }

  .button {
    padding: 1em;
    border-radius: 5px;
    cursor: pointer;
    margin: 0px 1em;
    color: #fff;
  }

  .cancel {
    background-color: #ccc;
  }

  .success {
    background-color: #61ce70;
  }
</style>
