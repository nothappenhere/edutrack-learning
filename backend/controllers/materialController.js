import db from '../config/db.js'
import dotenv from 'dotenv'
import fs from 'fs/promises'
import s3 from '../config/s3.js'

dotenv.config()

// //* GET product
// router.get('/product', async (req, res) => {
//   try {
//     const result = await db.query('SELECT * FROM produk')

//     if (result.rows.length === 0) {
//       return res.status(404).json({ message: 'Tidak ada produk ditemukan' })
//     }

//     res.json(result.rows) // Kirim data sebagai JSON ke frontend
//   } catch (err) {
//     console.error('Error mengambil data:', err)
//     res.status(500).json({ error: 'Terjadi kesalahan server' })
//   }
// })

//* GET files dari S3 (optional kalau mau liat daftar gambar di S3)
// export const getMaterials = async (req, res) => {
//   try {
//     const params = { Bucket: process.env.AWS_BUCKET_NAME }
//     const data = await s3.listObjectsV2(params).promise()

//     const files = data.Contents.map((file) => ({
//       key: file.Key,
//       url: `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${file.Key}`,
//       lastModified: file.LastModified,
//       size: file.Size,
//     }))

//     res.json(files)
//   } catch (error) {
//     console.error('Error fetching files:', error)
//     res.status(500).json({ message: 'Failed to retrieve file list.' })
//   }
// }

/**
 * @desc   Getting all material
 * @route  GET /api/materials
 */
export const getMaterials = async (req, res, next) => {
  try {
    const result = await db.query(`
      SELECT
        materials.*,
        users.full_name
      FROM
        materials
      INNER JOIN
        users ON users.id = materials.uploaded_by
      ORDER BY
        materials.created_at DESC
    `)

    const materials = result.rows

    return res.status(200).json({
      message:
        materials.length === 0
          ? 'Belum ada materi yang tersedia'
          : 'Berhasil mendapatkan daftar materi',
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
 * @route  GET /api/materials/:id
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

    const materials = result.rows

    if (materials.length === 0) {
      return res.status(404).json({ error: 'Materi tidak ditemukan' })
    }

    return res.status(200).json({
      message: 'Berhasil mendapatkan data materi',
      material: materials[0], // ambil satu objek, bukan array
    })
  } catch (error) {
    res.status(500).json({ error: 'Gagal mengambil data materi' })
    console.error('Gagal mengambil data materi:', error)
    next(error)
  }
}

/**
 * @desc Upload material + file to S3
 * @route POST /api/materials
 */
export const addMaterials = async (req, res, next) => {
  const { title, description, uploadedBy, subject, level } = req.body
  const file = req.file

  try {
    // Upload gambar ke S3
    const fileContent = await fs.readFile(file.path)

    const uploadResult = await s3
      .upload({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: new Date().toLocaleString() + '-' + file.originalname, // optional biar nama file unik
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
 * @desc Upload material + file to S3
 * @route POST /api/materials
 */
export const updateMaterials = async (req, res, next) => {
  const id = req.params.id
  const { title, description, uploadedBy, subject, level } = req.body
  const file = req.file

  try {
    // Upload gambar ke S3
    const fileContent = await fs.readFile(file.path)

    const uploadResult = await s3
      .upload({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: new Date().toLocaleString() + '-' + file.originalname, // optional biar nama file unik
        Body: fileContent,
        ContentType: file.mimetype,
      })
      .promise()

    // Hapus file lokal setelah berhasil upload
    await fs.unlink(file.path)

    // URL gambar di S3
    const fileUrl = uploadResult.Location

    // Simpan materi baru ke database
    await db.query(
      `UPDATE materials SET (title, description, file_url, uploaded_by, subject, level)
        VALUES ($1, $2, $3, $4, $5, $6) WHERE id = $7`,
      [title, description, fileUrl, uploadedBy, subject, level, id],
    )

    res.status(201).json({
      message: 'Berhasil memperbarui materi'
    })
  } catch (error) {
    res.status(500).json({ error: 'Gagal memperbarui materi' })
    console.error('Gagal memperbarui materi:', error)
    next(error)
  }
}
