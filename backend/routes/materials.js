import multer from 'multer'
import express from 'express'
const router = express.Router()

import {
  getMaterials,
  getSingleMaterial,
  addMaterial,
  updateMaterial,
  deleteMaterial,
} from '../controllers/materialController.js'
import { authenticateToken, authorizeRole } from '../middlewares/authMiddleware.js'

const upload = multer({
  dest: 'backend/temp-uploads/',
  limits: { fileSize: 10 * 1024 * 1024 }, // Maksimal 10MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/') || file.mimetype === 'application/pdf') {
      cb(null, true)
    } else {
      cb(new Error('Hanya file gambar atau PDF yang diizinkan'), false)
    }
  },
})

//? Route untuk List semua materi
router.get('/materials', getMaterials)

//? Route untuk Detail satu materi
router.get('/materials/:id', getSingleMaterial)

//? Route untuk Upload materi (teacher only)
router.post(
  '/materials',
  authenticateToken, // Cek token JWT
  authorizeRole(['admin', 'teacher']), // Hanya admin/teacher yang boleh add
  upload.single('file'), // Jika mengunggah file materi baru
  addMaterial, // Handler untuk add
)

//? Route untuk Update materi
router.put(
  '/materials/:id',
  authenticateToken, // Cek token JWT
  authorizeRole(['admin', 'teacher']), // Hanya admin/teacher yang boleh update
  upload.single('file'), // Jika mengunggah file materi baru
  updateMaterial, // Handler untuk update
)

//? Route untuk Hapus materi
router.delete(
  '/materials/:id',
  authenticateToken, // Cek token JWT
  authorizeRole(['admin', 'teacher']), // Hanya admin/teacher yang boleh delete
  deleteMaterial, // Handler untuk delete
)

export default router
