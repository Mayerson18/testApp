<template>
  <div class="modal-alert">
    <sweet-modal icon="success" ref="success">
      {{$store.state.alert.msgAlert}}
    </sweet-modal>
    <sweet-modal icon="error" ref="error">
      {{$store.state.alert.msgAlert}}
    </sweet-modal>
  </div>
</template>
<script>

export default {
  name: 'ModalAlert',
  data() {
    return {
    }
  },
  watch: {
    getStatus() {
      if (this.$store.state.alert.typeAlert === 'success') {
        this.$refs.success.open()
      } else {
        this.$refs.error.open()
      }
    }
  },
  methods: {
  },
  computed: {
    getStatus() {
      return this.$store.state.alert.statusAlert
    }
  },
  mounted() {
  }
}
</script>

<style scoped>
</style>
