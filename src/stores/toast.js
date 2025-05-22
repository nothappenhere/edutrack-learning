import { defineStore } from 'pinia'

export const useToastOption = defineStore('toastOption', {
  state: () => ({
    toastOptions: {
      position: 'top-right',
      timeout: 2962,
      closeOnClick: true,
      pauseOnFocusLoss: true,
      pauseOnHover: false,
      draggable: true,
      draggablePercent: 1,
      showCloseButtonOnHover: true,
      hideProgressBar: false,
      closeButton: 'button',
      icon: true,
      rtl: false,
    },
  }),
})
