import { createRouter, createWebHistory } from 'vue-router'
import { computed } from 'vue'
import { useToast } from 'vue-toastification'

import { useUserStore } from '@/stores/user.js'
import { useToastOption } from '@/stores/toast.js'

import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import ResetPassView from '@/views/ResetPassView.vue'

import DashboardView from '@/views/DashboardView.vue'
import AddProduct from '../views/AddProductView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginView,
    },
    {
      path: '/register/:role',
      name: 'Register',
      component: RegisterView,
    },
    {
      path: '/reset-password',
      name: 'ForgotPassword',
      component: ResetPassView,
    },
    {
      path: '/dashboard/:role',
      name: 'Dashboard',
      component: DashboardView,
      meta: { requiresAuth: true },
      children: [
        {
          path: 'add-material',
          name: 'Add-Material',
          component: AddProduct,
          meta: { requiresRole: 'teacher' },
        },
      ],
    },
    {
      path: '/:catchAll(.*)',
      name: 'NotFound',
      component: () => import('../views/NotFoundView.vue'), // Lazy load
    },
  ],
})

//* Navigation Guard
router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  userStore.loadUser()

  const token = userStore.user?.token
  const role = userStore.role

  const toast = useToast()
  const toastOpt = useToastOption()

  const isDashboard = to.path.startsWith('/dashboard')
  const isRegister = to.path.startsWith('/register')
  const expectedRole = to.params.role

  // 1. Cek jika rute butuh login tapi user belum login
  if (to.meta.requiresAuth && !token) {
    toast.error('Anda harus login terlebih dahulu!', toastOpt.toastOptions)
    return next('/login')
  }

  // 2. Jika user sudah login dan buka '/', arahkan ke dashboard-nya
  if (to.path === '/' && role) {
    return next(`/dashboard/${role}`)
  }

  // 3. Cegah akses dashboard jika belum login/role belum tersedia
  if (isDashboard && !role) {
    return next('/')
  }

  // 4. Jika masuk ke dashboard role yang salah, arahkan ke role yang benar
  if (isDashboard && expectedRole && expectedRole !== role) {
    const newPath = to.path.replace(`/dashboard/${expectedRole}`, `/dashboard/${role}`)
    return next(newPath)
  }

  // 5. Halaman register bebas diakses siapa saja
  if (isRegister) {
    return next()
  }

  // 6. Jika role di path tidak sesuai dengan role login
  if (expectedRole && expectedRole !== role) {
    return next(`/dashboard/${role}`)
  }

  // 7. Loloskan jika semua valid
  next()
})

export default router
