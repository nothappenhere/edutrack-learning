import db from '../config/db.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

/**
 * @desc Register a new user with the specified role
 * @route POST /api/auth/register/:role
 */
export const registerUser = async (req, res, next) => {
  const { role } = req.params
  const { full_name, email, password } = req.body

  try {
    const allowedRoles = ['student', 'teacher', 'admin']
    if (!allowedRoles.includes(role)) {
      return res.status(400).json({ error: 'Role tidak valid' })
    }

    // Periksa apakah email sudah terdaftar
    const checkEmail = await db.query('SELECT email FROM users WHERE email = $1', [email])
    const existingUser = checkEmail.rows

    if (existingUser.length > 0) {
      return res.status(409).json({ error: 'Alamat email yang digunakan telah terdaftar' })
    }

    // Hash password sebelum disimpan ke database
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    // Simpan user baru ke database
    const result = await db.query(
      'INSERT INTO users (full_name, email, password_hash, role) VALUES ($1, $2, $3, $4) RETURNING id',
      [full_name, email, hashedPassword, role],
    )

    res.status(201).json({
      message: 'Pendaftaran berhasil',
      user_id: result.rows[0].id,
    })
  } catch (error) {
    // res.status(500).json({ error: 'Registration error' })
    console.error('Registration error:', error)
    next(error)
  }
}

/**
 * @desc Login user based on their role
 * @route POST /api/auth/login
 */
export const loginUser = async (req, res, next) => {
  const { email, password } = req.body

  try {
    // Query user berdasarkan email
    const result = await db.query(
      'SELECT id, full_name, email, password_hash, role FROM users WHERE email = $1',
      [email],
    )
    const selectResult = result.rows

    if (selectResult.length === 0) {
      return res.status(403).json({
        error: 'Email atau kata sandi salah',
      })
    }

    const user = selectResult[0]

    // Periksa kecocokan password
    const isMatch = await bcrypt.compare(password, user.password_hash)
    if (!isMatch) {
      return res.status(403).json({
        error: 'Email atau kata sandi salah',
      })
    }

    // Generate token JWT
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is not defined in environment')
    }

    const token = jwt.sign(
      { user_id: user.id, full_name: user.full_name, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
    )

    res.status(200).json({
      message: 'Login berhasil',
      user_id: user.id,
      full_name: user.full_name,
      email: user.email,
      role: user.role,
      token,
    })
  } catch (error) {
    // res.status(500).json({ error: 'Login error' })
    console.error('Login error:', error)
    next(error)
  }
}

/**
 * @desc Check if the given email is already registered
 * @route POST /api/auth/check-email-exist
 */
export const checkEmailExist = async (req, res, next) => {
  const { email } = req.body

  try {
    // Periksa apakah email sudah terdaftar
    const checkEmail = await db.query('SELECT email FROM users WHERE email = $1', [email])
    const existingUser = checkEmail.rows

    if (existingUser.length === 0) {
      return res.status(404).json({
        error: 'Alamat email tidak ditemukan',
        exist: false,
      })
    }

    res.status(200).json({
      message: 'Alamat email ditemukan, silakan masukan kata sandi baru',
      exist: true,
    })
  } catch (error) {
    // res.status(500).json({ error: 'Email-check error' })
    console.error('Email-check error:', error)
    next(error)
  }
}

/**
 * @desc Reset the user's password
 * @route PUT /api/auth/reset-password
 */
export const resetPasswordUser = async (req, res, next) => {
  const { email, password } = req.body

  try {
    // Hash password sebelum disimpan ke database
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    // Simpan data user baru ke database
    const result = await db.query('UPDATE users SET password_hash = $1 WHERE email = $2', [
      hashedPassword,
      email,
    ])

    // Periksa apakah email sudah terdaftar
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Alamat email tidak ditemukan' })
    }

    res.status(200).json({ message: 'Berhasil mengatur ulang kata sandi' })
  } catch (error) {
    // res.status(500).json({ error: 'Password-reset error' })
    console.error('Password-reset error:', error)
    next(error)
  }
}

/**
 * @desc Login user based on their role
 * @route POST /auth/me
 */
export const getCurrentUser = async (req, res, next) => {
  const { user_id } = req.body

  try {
    // Query user berdasarkan email
    const result = await db.query(
      'SELECT full_name, email, password_hash, role FROM users WHERE id = $1',
      [user_id],
    )
    const selectResult = result.rows

    if (selectResult.length === 0) {
      return res.status(404).json({
        error: 'Pengguna tidak ditemukan',
      })
    }

    const user = selectResult[0]

    res.status(200).json({
      message: 'Pengguna ditemukan dan sudah terdaftar',
      full_name: user.full_name,
      email: user.email,
      password: user.password,
      role: user.role,
    })
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve user' })
    console.error('Failed to retrieve user:', error)
    next(error)
  }
}
