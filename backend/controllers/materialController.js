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

/**
 * @desc Uploaded material + file to S3
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
      message: 'Materi baru berhasil ditambahkan',
      material_id: result.rows[0].id,
    })
  } catch (error) {
    res.status(500).json({ error: 'Gagal menambahkan materi baru' })
    next(error)
  }
}

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

export const getMaterials = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM materials ORDER BY created_at DESC')

    res.json(result.rows)
  } catch (err) {
    console.error('Gagal mengambil materi:', err)
    res.status(500).json({ error: 'Terjadi kesalahan saat mengambil materi' })
  }
}
