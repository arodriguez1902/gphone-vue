<template>
  <table-component
    :export-pdf="true"
    :export-excel="true"
  />
</template>

<script>
/* eslint no-underscore-dangle: 0 */
import { inject, provide } from '@vue/composition-api'
import TableComponent from '@/components/TableComponent.vue'
import useFetch from '@/hooks/useFetch'

export default {
  name: 'TableBusinessUser',
  components: {
    TableComponent,
  },
  setup() {
    const businessUser = inject('businessUser')
    const businessUsers = inject('businessUsers')
    const loadBusinessUsers = inject('loadBusinessUsers')
    const resetBusinessUser = inject('resetBusinessUser')
    const serverParams = inject('serverParams')
    const messageToast = inject('messageToast')
    const columns = [
      {
        label: 'Acción',
        field: 'action',
        width: '85px',
        thClass: 'align-middle',
        pdf: false,
      },
      {
        label: 'Id',
        field: '_id',
        thClass: 'align-middle',
        tdClass: 'align-middle',
        pdf: true,
      },
      {
        label: 'Nombre',
        field: 'nombreNegocio',
        thClass: 'align-middle',
        tdClass: 'align-middle',
        pdf: true,
      },
      {
        label: 'Estado',
        field: 'activo',
        thClass: 'align-middle',
        tdClass: 'align-middle text-center',
        pdf: true,
      },
    ]

    const idModal = 'modal-business-user'
    const url = '/usuarionegocio'

    const loadDataForEdit = async (rowSelected, row) => {
      const { error, data } = await useFetch(`/usuarionegocio/${rowSelected._id}`)
      if (error) {
        messageToast('danger', 'Error', 'Ocurrio un Error')
        return false
      }
      row.value = data
      return true
    }

    const urlForExportData = '/usuarionegocio/?_id=0&tabla=negocio'
    provide('columns', columns)
    provide('data', businessUsers)
    provide('row', businessUser)
    provide('resetRow', resetBusinessUser)
    provide('url', url)
    provide('serverParams', serverParams)
    provide('loadTable', loadBusinessUsers)
    provide('idModal', idModal)
    provide('loadDataForEdit', loadDataForEdit)

    // Provide for Export to Document (PDF, EXCEL)
    provide('urlForExportData', urlForExportData)
    provide('titleForExport', 'Usuario Negocio')
  },
}
</script>

<style>

</style>
