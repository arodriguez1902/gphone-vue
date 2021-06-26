<template>
  <b-form @submit.prevent="sendSearch">
    <b-modal
      id="modal-business-user-search"
      ok-only
      ok-title="Accept"
      modal-class="modal-primary"
      centered
      title="Buscar Usuario Negocio"
    >
      <b-row>

        <b-col
          cols="12"
        >
          <b-form-group
            label="Campo"
            label-for="field"
          >
            <v-select
              id="field"
              v-model="serverParams.columnFilters.field"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              :reduce="option => option.field"
              label="title"
              :options="optionsColumnsFilter"
            />
          </b-form-group>
        </b-col>

        <!-- Value -->
        <b-col
          cols="12"
        >
          <b-form-group
            label="Valor"
            label-for="value"
          >
            <b-form-input
              id="value"
              v-model="serverParams.columnFilters.value"
            />
          </b-form-group>
        </b-col>

      </b-row>

      <template #modal-footer>
        <b-button
          type="button"
          variant="outline-primary"
          @click="clearSearch"
        >
          Limpiar Filtro
        </b-button>
        <b-button
          type="submit"
          variant="primary"
          @click="sendSearch"
        >
          Buscar
        </b-button>
      </template>

    </b-modal>
  </b-form>
</template>

<script>
import {
  BRow,
  BCol, BForm, BFormGroup, BFormInput, BModal, BButton,
} from 'bootstrap-vue'
import { inject } from '@vue/composition-api'
import vSelect from 'vue-select'

export default {
  name: 'ModalSearchBusinessUser',
  components: {
    BRow,
    BCol,
    BForm,
    BFormGroup,
    BFormInput,
    BModal,
    BButton,
    vSelect,
  },
  methods: {
    sendSearch() {
      this.loadBusinessUsers()
      this.$bvModal.hide('modal-business-user-search')
    },
    clearSearch() {
      this.serverParams.columnFilters.field = ''
      this.serverParams.columnFilters.value = ''
      this.loadBusinessUsers()
      this.$bvModal.hide('modal-business-user-search')
    },
  },
  setup() {
    const loadBusinessUsers = inject('loadBusinessUsers')
    const serverParams = inject('serverParams')
    const optionsColumnsFilter = inject('optionsColumnsFilter')
    return {
      loadBusinessUsers,
      serverParams,
      optionsColumnsFilter,
    }
  },
}
</script>
