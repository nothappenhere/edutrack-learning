import db from '../config/db.js'
import dotenv from 'dotenv'
import fs from 'fs/promises'
import s3, { getFormattedTimestamp } from '../config/s3.js'

import path from 'path'
import { v4 as uuidv4 } from 'uuid'

dotenv.config()

/**
 * @desc   Getting all quizzes
 * @route  GET /api/quizzes
 */
export const getQuizzes = async (req, res, next) => {
  try {
    const result = await db.query(`
      SELECT
        quizzes.*,
        users.full_name
      FROM
        quizzes
      INNER JOIN
        users ON users.id = quizzes.created_by
      ORDER BY
        quizzes.created_at DESC
    `)

    const quizzes = result.rows

    if (quizzes.length === 0) {
      return res.status(404).json({ error: 'Belum ada quiz yang tersedia' })
    }

    res.status(200).json({
      message: 'Berhasil mendapatkan daftar quiz',
      quizzes,
    })
  } catch (error) {
    res.status(500).json({ error: 'Gagal mengambil data quiz' })
    console.error('Gagal mengambil data quiz:', error)
    next(error)
  }
}

/**
 * @desc   Getting single quiz
 * @route  GET /api/quizzes/:id
 */
export const getSingleQuiz = async (req, res, next) => {
  const id = req.params.id

  try {
    const result = await db.query(
      `
      SELECT
        materials.*,
        users.full_name AS teacher_name,
        users.email AS teacher_email
      FROM
        materials
      INNER JOIN
        users ON users.id = materials.uploaded_by
      WHERE
        materials.id = $1
      `,
      [id],
    )

    const material = result.rows
    if (material.length === 0) {
      return res.status(404).json({ error: 'Materi tidak ditemukan' })
    }

    return res.status(200).json({
      message: 'Berhasil mendapatkan data materi',
      material: material[0], // ambil satu objek, bukan array
    })
  } catch (error) {
    res.status(500).json({ error: 'Gagal mengambil data materi' })
    console.error('Gagal mengambil data materi:', error)
    next(error)
  }
}

/**
 * @desc Upload quiz + file to S3
 * @route POST /api/quizzes
 */
export const addQuiz = async (req, res, next) => {
  const { title, description, uploadedBy, subject, level } = req.body
  const file = req.file

  try {
    // Upload gambar ke S3
    const fileContent = await fs.readFile(file.path)

    const ext = path.extname(file.originalname)
    const filename = path.basename(file.originalname, ext)
    const timestamp = getFormattedTimestamp()

    const key = `uploads/${filename}-${timestamp}-${uuidv4()}${ext}`

    const uploadResult = await s3
      .upload({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: key,
        Body: fileContent,
        ContentType: file.mimetype,
      })
      .promise()

    // Hapus file lokal setelah berhasil upload
    await fs.unlink(file.path)

    // URL gambar di S3
    const fileUrl = uploadResult.Location

    // Simpan materi baru ke database
    const result = await db.query(
      `INSERT INTO materials (title, description, file_url, uploaded_by, subject, level)
        VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`,
      [title, description, fileUrl, uploadedBy, subject, level],
    )

    res.status(201).json({
      message: 'Berhasil menambahkan materi baru',
      material_id: result.rows[0].id,
    })
  } catch (error) {
    res.status(500).json({ error: 'Gagal menambahkan materi baru' })
    console.error('Gagal menambahkan materi baru:', error)
    next(error)
  }
}

/**
 * @desc   Delete quiz by ID
 * @route  DELETE /api/quizzes/:id
 */
export const deleteQuiz = async (req, res, next) => {
  const id = req.params.id

  try {
    // Periksa apakah materi dengan ID tersebut ada
    const checkMaterial = await db.query('SELECT * FROM materials WHERE id = $1', [id])

    const material = checkMaterial.rows
    if (material.length === 0) {
      return res.status(404).json({ error: 'Materi tidak ditemukan' })
    }

    const key = material[0].file_url.split('/').slice(-1)[0]
    await s3
      .deleteObject({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `uploads/${key}`,
      })
      .promise()

    // Hapus materi
    const result = await db.query('DELETE FROM materials WHERE id = $1', [id])

    // Periksa apakah penghapusan berhasil
    if (result.rowCount === 0) {
      return res.status(403).json({ error: 'Gagal menghapus materi' })
    }

    res.status(200).json({ message: 'Materi berhasil dihapus' })
  } catch (error) {
    // res.status(500).json({ error: 'Password-reset error' })
    console.error('Failed to delete material:', error)
    next(error)
  }
}
