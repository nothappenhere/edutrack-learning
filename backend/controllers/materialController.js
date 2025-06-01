import db from '../config/db.js'
import dotenv from 'dotenv'
import fs from 'fs/promises'
import s3, { getFormattedTimestamp } from '../config/s3.js'

import path from 'path'
import { v4 as uuidv4 } from 'uuid'

dotenv.config()

/**
 * @desc   Getting all materials by creator id
 * @route  GET /api/materials/:id
 */
export const getMaterials = async (req, res, next) => {
  const id = req.params.id

  try {
    const result = await db.query(
      `
      SELECT
        materials.*,
        users.full_name
      FROM
        materials
      INNER JOIN
        users ON users.id = materials.uploaded_by
      WHERE
        materials.uploaded_by = $1
      ORDER BY
        materials.created_at DESC
    `,
      [id],
    )

    const materials = result.rows

    if (materials.length === 0) {
      return res.status(404).json({ error: 'Belum ada materi yang tersedia' })
    }

    res.status(200).json({
      message: 'Berhasil mendapatkan daftar materi',
      materials,
    })
  } catch (error) {
    res.status(500).json({ error: 'Gagal mengambil data materi' })
    console.error('Gagal mengambil data materi:', error)
    next(error)
  }
}

/**
 * @desc   Getting single material
 * @route  GET /api/material/:id
 */
export const getSingleMaterial = async (req, res, next) => {
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
 * @desc Upload material + file to S3
 * @route POST /api/material
 */
export const addMaterial = async (req, res, next) => {
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
 * @desc Update material + file to s3
 * @route PUT /api/material
 */
export const updateMaterial = async (req, res, next) => {
  const id = req.params.id
  const { title, description, uploadedBy, subject, level } = req.body
  const file = req.file

  try {
    let fileUrl = null

    if (file) {
      // 1. Ambil data materi lama untuk mendapatkan file_url
      const materialRes = await db.query('SELECT file_url FROM materials WHERE id = $1', [id])
      if (materialRes.rows.length === 0) {
        return res.status(404).json({ error: 'Materi tidak ditemukan' })
      }

      const oldFileUrl = materialRes.rows[0].file_url

      // 2. Ekstrak object key dari URL
      const oldKey = oldFileUrl.split('.amazonaws.com/')[1]

      // 3. Hapus file lama dari S3
      if (oldKey) {
        await s3
          .deleteObject({
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: oldKey,
          })
          .promise()
      }

      // 4. Upload file baru
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

      await fs.unlink(file.path)
      fileUrl = uploadResult.Location
    }

    // 5. Simpan update ke database
    const updateQuery = file
      ? `UPDATE materials SET title = $1, description = $2, file_url = $3, uploaded_by = $4, subject = $5, level = $6 WHERE id = $7`
      : `UPDATE materials SET title = $1, description = $2, uploaded_by = $3, subject = $4, level = $5 WHERE id = $6`

    const updateValues = file
      ? [title, description, fileUrl, uploadedBy, subject, level, id]
      : [title, description, uploadedBy, subject, level, id]

    await db.query(updateQuery, updateValues)

    res.status(200).json({ message: 'Berhasil memperbarui materi' })
  } catch (error) {
    console.error('Gagal memperbarui materi:', error)
    res.status(500).json({ error: 'Gagal memperbarui materi' })
    next(error)
  }
}

/**
 * @desc   Delete material by ID
 * @route  DELETE /api/material/:id
 */
export const deleteMaterial = async (req, res, next) => {
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
