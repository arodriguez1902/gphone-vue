import { ref } from '@vue/composition-api'

const useVariables = () => {
  const businessUsers = ref({
    loading: false,
    data: [],
    totalRecords: 0,
  })

  const initialBusinessUser = {
    _id: 0,
    idUsuario: null,
    idNegocio: 0,
    idLogin: null,
    accion: 0,
    loading: false,
  }

  const businessUser = ref({ ...initialBusinessUser })

  const resetBusinessUser = () => {
    businessUser.value = { ...initialBusinessUser }
  }

  const initialStateCombo = {
    disabled: true,
    loading: false,
    data: [],
  }

  const combos = ref({
    business: { ...initialStateCombo },
    users: { ...initialStateCombo },
  })

  const optionsColumnsFilter = [
    {
      title: 'Nombre',
      field: 'a.nombre',
    },
  ]

  const serverParams = ref({
    columnFilters: {
      field: '',
      value: '',
    },
    page: 1,
    perPage: 10,
  })

  return {
    businessUsers,
    businessUser,
    resetBusinessUser,
    combos,
    optionsColumnsFilter,
    serverParams,
  }
}

export default useVariables
