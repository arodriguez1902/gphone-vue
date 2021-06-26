<template>
  <div>
    <modal-business-user />
    <modal-search-business-user />
    <b-card>
      <table-business-user />
    </b-card>
  </div>
</template>

<script>
import { inject, provide, onMounted } from '@vue/composition-api'
import { BCard } from 'bootstrap-vue'
import useFetch from '@/hooks/useFetch'
import useVariables from './useVariables'
import TableBusinessUser from './TableBusinessUser.vue'
import ModalBusinessUser from './ModalBusinessUser.vue'
import ModalSearchBusinessUser from './ModalSearchBusinessUser.vue'

export default {
  name: 'BusinessUser',
  components: {
    BCard,
    TableBusinessUser,
    ModalBusinessUser,
    ModalSearchBusinessUser,
  },
  setup() {
    const {
      businessUsers, businessUser, resetBusinessUser, optionsColumnsFilter,
      serverParams, combos,
    } = useVariables()

    const messageToast = inject('messageToast')
    const loadComboBoxes = inject('loadComboBoxes')

    const loadBusinessUsers = async () => {
      businessUsers.value.loading = true
      const { columnFilters, page, perPage } = serverParams.value
      const { field, value } = columnFilters
      let url = `/usuarionegocio/?_id=0&tabla=negocio&pinicio=${page}&pfin=${perPage}`
      if (field) url += `&campofiltro=${field}&filtro=${value}`
      const { data, error } = await useFetch(url)
      if (error) {
        messageToast('danger', 'Error', 'Error al momento de cargar los Usuarios de negocio')
      } else if (data) {
        businessUsers.value.data = data
        businessUsers.value.totalRecords = 0
        if (data?.length) {
          if (data[0]?.numberRow) businessUsers.value.totalRecords = data[0].numberRow
        }
      }
      businessUsers.value.loading = false
    }

    onMounted(() => {
      loadBusinessUsers()
      loadComboBoxes(combos.value, ['business'], '/combo/negocio/1', 'Error al momento de cargar los negocios')
      loadComboBoxes(combos.value, ['users'], '/combo/negocio/1', 'Error al momento de cargar los negocios')
    })

    provide('businessUsers', businessUsers)
    provide('loadBusinessUsers', loadBusinessUsers)
    provide('businessUser', businessUser)
    provide('resetBusinessUser', resetBusinessUser)
    provide('optionsColumnsFilter', optionsColumnsFilter)
    provide('serverParams', serverParams)
    provide('combos', combos)
  },
}
</script>

<style lang="scss">
  @import '@core/scss/vue/libs/vue-select.scss';
  @import '@core/scss/vue/libs/vue-sweetalert.scss';
</style>
