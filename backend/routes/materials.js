import multer from 'multer'
import express from 'express'
const router = express.Router()

import { getMaterials, getSingleMaterial, addMaterials, updateMaterials } from '../controllers/materialController.js'

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
router.post('/materials', upload.single('file'), addMaterials)

//? Route untuk Update materi
router.put('/materials/:id', updateMaterials)

//? Route untuk Hapus materi
// router.delete('/materials/:id', '???')

export default router
