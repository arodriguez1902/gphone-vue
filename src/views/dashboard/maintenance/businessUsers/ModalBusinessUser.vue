<template>
  <validation-observer
    ref="modal-business-user"
    v-slot="{ handleSubmit }"
  >
    <b-form @submit.prevent="handleSubmit(sendForm)">
      <b-modal
        id="modal-business-user"
        ok-only
        ok-title="Accept"
        modal-class="modal-primary"
        centered
        :title="businessUser._id ? 'Modificar Usuario Negocio' : 'Registrar Usuario Negocio'"
        no-close-on-esc
        no-close-on-backdrop
      >

        <!-- Headers BusinessUser -->

        <b-row>

          <!-- User -->

          <b-col
            cols="12"
          >
            <validation-provider
              #default="{ errors }"
              name="Negocio"
              rules="requiredComboVueSelect"
            >
              <b-form-group
                label-for="business"
                label="Negocio *"
                :state="errors.length > 0 ? false:null"
              >
                <v-select
                  id="business"
                  v-model="businessUser.idNegocio"
                  :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                  :reduce="business => business._id"
                  label="nombre"
                  :options="combos.business.data"
                  :loading="combos.business.loading"
                  :clearable="false"
                  :disabled="combos.business.disabled"
                >
                  <template v-slot:no-options>
                    No se encontraron resultados.
                  </template>
                </v-select>
                <small class="text-danger">{{ errors[0] }}</small>
              </b-form-group>
            </validation-provider>
          </b-col>

          <!-- business -->

          <b-col
            cols="12"
          >
            <validation-provider
              #default="{ errors }"
              name="Negocio"
              rules="requiredComboVueSelect"
            >
              <b-form-group
                label-for="business"
                label="Negocio *"
                :state="errors.length > 0 ? false:null"
              >
                <v-select
                  id="business"
                  v-model="businessUser.idNegocio"
                  :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                  :reduce="business => business._id"
                  label="nombre"
                  :options="combos.business.data"
                  :loading="combos.business.loading"
                  :clearable="false"
                  :disabled="combos.business.disabled"
                >
                  <template v-slot:no-options>
                    No se encontraron resultados.
                  </template>
                </v-select>
                <small class="text-danger">{{ errors[0] }}</small>
              </b-form-group>
            </validation-provider>
          </b-col>

          <!-- Name -->

        </b-row>

        <template #modal-footer>
          <b-button
            type="button"
            variant="outline-primary"
            @click="closeForm"
          >
            Cerrar
          </b-button>
          <b-overlay
            :show="businessUser.loading"
            variant="transparent"
            :opacity="0.85"
            blur="2px"
            rounded="sm"
          >
            <b-button
              type="submit"
              variant="primary"
              @click="handleSubmit(sendForm)"
            >
              Guardar
            </b-button>
          </b-overlay>
        </template>

      </b-modal>
    </b-form>
  </validation-observer>
</template>

<script>
/* eslint no-underscore-dangle: 0 */
import {
  BRow, BCol, BForm, BFormGroup, BModal, BButton, BOverlay,
} from 'bootstrap-vue'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import { required } from '@validations'
import vSelect from 'vue-select'
import { inject } from '@vue/composition-api'
import Ripple from 'vue-ripple-directive'
import store from '@/store'
import useFetch from '@/hooks/useFetch'

export default {
  name: 'ModalBusinessUser',
  components: {
    BRow,
    BCol,
    BForm,
    BFormGroup,
    BModal,
    BButton,
    BOverlay,
    ValidationObserver,
    ValidationProvider,
    vSelect,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      required,
    }
  },
  setup(props, context) {
    const businessUser = inject('businessUser')
    const messageToast = inject('messageToast')
    const loadBusinessUsers = inject('loadBusinessUsers')
    const combos = inject('combos')

    const sendForm = async () => {
      businessUser.value.loading = true
      businessUser.value.accion = businessUser.value._id ? 2 : 1
      businessUser.value.idUsuario = store.state.auth.user._id
      const { error, data } = await useFetch('/usuarioNegocio', businessUser.value, 'POST')
      if (error) {
        messageToast('danger', 'Error', 'Ocurrio un error')
        businessUser.value.loading = false
      } else {
        data.forEach(({ id, mensaje }) => {
          if (id === 0) {
            messageToast('warning', 'Advertencia', mensaje)
          } else {
            businessUser.value._id = id
            messageToast('success', 'Negocio', mensaje)
            context.root.$bvModal.hide('modal-business-user')
            loadBusinessUsers()
          }
        })
        businessUser.value.loading = false
      }
    }

    const closeForm = () => {
      context.root.$bvModal.hide('modal-business-user')
    }

    return {
      businessUser,
      combos,
      sendForm,
      closeForm,
    }
  },
}
</script>
