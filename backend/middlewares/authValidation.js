import { body, param, validationResult } from 'express-validator'

// Fungsi untuk menangani error validasi
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  next()
}

// Validasi registrasi
export const validateRegister = [
  param('role').isIn(['student', 'teacher', 'admin']).withMessage('Role tidak valid'),
  body('full_name')
    .notEmpty()
    .withMessage('Nama lengkap harus diisi')
    .isLength({ min: 3 })
    .withMessage('Nama Lengkap harus minimal 3 karakter'),
  body('email').notEmpty().isEmail().withMessage('Format email tidak valid'),
  body('password')
    .notEmpty()
    .withMessage('Kata sandi harus diisi')
    .isLength({ min: 8 })
    .withMessage('Kata sandi harus minimal 8 karakter'),
  handleValidationErrors,
]

// Validasi login
export const validateLogin = [
  body('email').notEmpty().isEmail().withMessage('Format email tidak valid'),
  body('password')
    .notEmpty()
    .withMessage('Kata sandi harus diisi')
    .isLength({ min: 8 })
    .withMessage('Kata sandi harus minimal 8 karakter'),
  handleValidationErrors,
]

// Validasi email exist
export const validateEmailExist = [
  body('email').notEmpty().isEmail().withMessage('Format email tidak valid'),
  handleValidationErrors,
]

// Validasi reset password
export const validateResetPassword = [
  body('email').notEmpty().isEmail().withMessage('Format email tidak valid'),
  body('password')
    .notEmpty()
    .withMessage('Kata sandi harus diisi')
    .isLength({ min: 8 })
    .withMessage('Kata sandi harus minimal 8 karakter'),
  handleValidationErrors,
]
