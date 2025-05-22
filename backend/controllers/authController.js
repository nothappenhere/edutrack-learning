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
    // Periksa apakah email sudah terdaftar
    const checkEmail = await db.query('SELECT email FROM users WHERE email = $1', [email])
    const existingUser = checkEmail.rows

    if (existingUser.length > 0) {
      return res.status(400).json({ error: 'Email is already registered.' })
    }

    // Hash password sebelum disimpan ke database
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    // Simpan user baru ke database
    const result = await db.query(
      'INSERT INTO users (full_name, email, password_hash, role) VALUES ($1, $2, $3, $4) RETURNING user_id',
      [full_name, email, hashedPassword, role],
    )

    res.status(201).json({
      message: 'User registered successfully.',
      user_id: result.rows[0].user_id,
    })
  } catch (error) {
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
      'SELECT user_id, full_name, email, password_hash, role FROM users WHERE email = $1',
      [email],
    )
    const selectResult = result.rows

    if (selectResult.length === 0) {
      return res.status(401).json({
        error: 'Invalid credentials, please check your email or password.',
      })
    }

    const user = selectResult[0]

    // Periksa kecocokan password
    const isMatch = await bcrypt.compare(password, user.password_hash)
    if (!isMatch) {
      return res.status(401).json({
        error: 'Invalid credentials, please check your email or password.',
      })
    }

    // Generate token JWT
    const token = jwt.sign(
      { user_id: user.user_id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
    )

    res.status(200).json({
      message: 'Login successful.',
      token,
      data: {
        user_id: user.user_id,
        full_name: user.full_name,
        email: user.email,
        role: user.role,
      },
    })
  } catch (error) {
    console.error('Login error:', error)
    next(error)
  }
}

/**
 * @desc Check if the given email is already registered
 * @route POST /api/auth/check-email
 */
export const checkEmailExist = async (req, res, next) => {
  const { email } = req.body

  try {
    // Periksa apakah email sudah terdaftar
    const checkEmail = await db.query('SELECT email FROM users WHERE email = $1', [email])
    const existingUser = checkEmail.rows

    if (existingUser.length === 0) {
      return res.status(404).json({
        error: 'No email address found.',
        exists: false,
      })
    }

    res.status(200).json({
      message: 'Email address has been registered.',
      exists: true,
    })
  } catch (error) {
    console.error('Email-check error:', error)
    next(error)
  }
}

/**
 * @desc Reset the user's password
 * @route POST /api/auth/reset-password
 */
export const resetPasswordUser = async (req, res, next) => {
  const { email, password } = req.body

  try {
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    const result = await db.query('UPDATE users SET password_hash = $1 WHERE email = $2', [
      hashedPassword,
      email,
    ])

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'No email address found.' })
    }

    res.status(200).json({ message: 'Password reset successfully.' })
  } catch (error) {
    console.error('Password-reset error:', error)
    next(error)
  }
}

/**
 * @desc Login user based on their role
 * @route POST /auth/me
 */
export const getCurrentUser = async (req, res) => {
  try {
    const { userId } = req.user

    const [rows] = await db
      .promise()
      .query('SELECT user_id, full_name, email, role FROM users WHERE user_id = ?', [userId])

    if (rows.length === 0) return res.status(404).json({ error: 'User not found.' })

    res.status(200).json({ user: rows[0] })
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve user.' })
  }
}
