// stores/user.ts
import { defineStore } from 'pinia'

export const useUserStore = defineStore('role', {
  state: () => ({
    role: localStorage.getItem('userRole') || null,
  }),
  actions: {
    setRole(newRole) {
      this.role = newRole
      if (newRole) {
        localStorage.setItem('userRole', newRole)
      } else {
        localStorage.removeItem('userRole')
      }
    },
  },
})
