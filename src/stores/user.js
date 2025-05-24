import { defineStore } from 'pinia'

const LOCAL_STORAGE_USER = 'userData'
const LOCAL_STORAGE_ROLE = 'userRole'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    role: localStorage.getItem(LOCAL_STORAGE_ROLE) || null,
  }),

  actions: {
    /**
     * Set user data dan simpan ke localStorage
     * @param {Object} user - Object user berisi user_id, full_name, role, token
     */
    setUser(user) {
      this.user = user
      localStorage.setItem(LOCAL_STORAGE_USER, JSON.stringify(user))
      this.setRole(user?.role)
    },

    /**
     * Ambil user data dari localStorage dan simpan ke state
     */
    loadUser() {
      const storedData = localStorage.getItem(LOCAL_STORAGE_USER)
      if (storedData) {
        const parsedUser = JSON.parse(storedData)
        this.user = parsedUser
        this.setRole(parsedUser?.role)
      }
    },

    /**
     * Hapus user data dari state dan localStorage
     */
    clearUser() {
      this.user = null
      localStorage.removeItem(LOCAL_STORAGE_USER)
      this.setRole(null)
    },

    /**
     * Set role pengguna dan simpan ke localStorage
     * @param {string|null} newRole
     */
    setRole(newRole) {
      this.role = newRole
      if (newRole) {
        localStorage.setItem(LOCAL_STORAGE_ROLE, newRole)
      } else {
        localStorage.removeItem(LOCAL_STORAGE_ROLE)
      }
    },
  },
})
