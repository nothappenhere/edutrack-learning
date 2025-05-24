import db from '../config/db.js'
import express from 'express'
import dotenv from 'dotenv'
import multer from 'multer'
import fs from 'fs/promises'

import s3 from '../aws-s3.js'

dotenv.config()
const router = express.Router()

const upload = multer({
  dest: 'express/uploads/',
  limits: { fileSize: 10 * 1024 * 1024 }, // Maksimal 10MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true)
    } else {
      cb(new Error('Hanya file gambar yang diizinkan'), false)
    }
  },
})

// //* GET product
// router.get('/product', async (req, res) => {
//   try {
//     const result = await client.query('SELECT * FROM produk')

//     if (result.rows.length === 0) {
//       return res.status(404).json({ message: 'Tidak ada produk ditemukan' })
//     }

//     res.json(result.rows) // Kirim data sebagai JSON ke frontend
//   } catch (err) {
//     console.error('Error mengambil data:', err)
//     res.status(500).json({ error: 'Terjadi kesalahan server' })
//   }
// })

//* POST product + upload image
router.post('/product/add', upload.single('image'), async (req, res) => {
  const { name, description, category, price, stock } = req.body
  const file = req.file

  if (!name || !description || !category || !price || !stock || !file) {
    return res.status(400).json({ error: 'Semua field harus diisi dan file harus ada' })
  }

  try {
    // Upload gambar ke S3
    const fileContent = await fs.readFile(file.path)

    const params = {
      Bucket: process.env.AWS_BUCKET,
      Key: Date.now() + '-' + file.originalname, // optional biar nama file unik
      Body: fileContent,
      ContentType: file.mimetype,
    }

    const uploadResult = await s3.upload(params).promise()

    // Hapus file lokal setelah berhasil upload
    await fs.unlink(file.path)

    const imageUrl = uploadResult.Location // URL gambar di S3

    // Insert produk ke database
    const insertQuery = `
      INSERT INTO produk (nama, deskripsi, kategori, harga, stok, gambar_url)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *`
    const values = [name, description, category, price, stock, imageUrl]

    const dbResult = await client.query(insertQuery, values)

    res.status(201).json({ message: 'Produk berhasil ditambahkan', data: dbResult.rows[0] })
  } catch (err) {
    console.error('Error saat upload dan insert:', err)
    res.status(500).json({ error: 'Gagal upload atau simpan produk' })
  }
})

//* GET files dari S3 (optional kalau mau liat daftar gambar di S3)
router.get('/files', async (req, res) => {
  try {
    const params = { Bucket: process.env.AWS_BUCKET }
    const data = await s3.listObjectsV2(params).promise()

    const files = data.Contents.map((file) => ({
      key: file.Key,
      url: `https://${process.env.AWS_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${file.Key}`,
      lastModified: file.LastModified,
      size: file.Size,
    }))

    res.json(files)
  } catch (error) {
    console.error('Error fetching files:', error)
    res.status(500).json({ message: 'Failed to retrieve file list.' })
  }
})

export default router
