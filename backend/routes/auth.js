import express from 'express'
const router = express.Router()

import {
  loginUser,
  registerUser,
  checkEmailExist,
  resetPasswordUser,
  getCurrentUser,
} from '../controllers/authController.js'
import {
  validateLogin,
  validateRegister,
  validateEmailExist,
  validateResetPassword,
} from '../middlewares/authValidation.js'
import { authenticateToken } from '../middlewares/authMiddleware.js'

//? Route untuk Register akun baru (student/teacher)
router.post('/auth/register/:role', validateRegister, registerUser)

//? Route untuk Login dan terima JWT token
router.post('/auth/login', validateLogin, loginUser)

//? Route untuk Check email terdaftar
router.post('/auth/check-email-exist', validateEmailExist, checkEmailExist)

//? Route untuk Reset password
router.put('/auth/reset-password', validateResetPassword, resetPasswordUser)

//? Route untuk Get profil pengguna (authed)
router.get('/auth/me', authenticateToken, getCurrentUser)

export default router
