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
  param('role').isIn(['admin', 'agency', 'citizen']).withMessage('Invalid role.'),
  body('full_name')
    .notEmpty()
    .withMessage('Full Name is required.')
    .isLength({ min: 3 })
    .withMessage('Full Name must be at least 3 characters.'),
  body('email').isEmail().withMessage('Invalid email format.'),
  body('password')
    .notEmpty()
    .withMessage('Password is required.')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long.'),
  handleValidationErrors,
]

// Validasi login
export const validateLogin = [
  body('email').isEmail().withMessage('Invalid email format.'),
  body('password')
    .notEmpty()
    .withMessage('Password is required.')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long.'),
  handleValidationErrors,
]

// Validasi reset password
export const validateResetPassword = [
  body('email').isEmail().withMessage('Invalid email format.'),
  body('password')
    .notEmpty()
    .withMessage('Password is required.')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long.'),
  handleValidationErrors,
]
