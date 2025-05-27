import { useToast } from 'vue-toastification'
import { useToastOption } from '@/stores/toast.js'

export const errorMessage = (error) => {
  const toast = useToast()
  const toastOpt = useToastOption()

  const message =
    error.response?.data?.error ||
    error.response?.data?.errors?.[0]?.msg || // error dari express-validator
    'Terjadi kesalahan, silakan coba lagi'

  toast.error(`${message}.`, toastOpt.toastOptions)
}
