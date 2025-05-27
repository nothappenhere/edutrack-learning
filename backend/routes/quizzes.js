import express from 'express'
const router = express.Router()

import { getQuizzes, getSingleQuiz, addQuiz, deleteQuiz } from '../controllers/quizController.js'
import { authenticateToken, authorizeRole } from '../middlewares/authMiddleware.js'

//? Route untuk List semua kuis
router.get('/quizzes', getQuizzes)

//? Route untuk Detail satu kuis
router.get('/quizzes/:id', getSingleQuiz)

//? Route untuk Upload kuis (teacher only)
router.post(
  '/quizzes',
  authenticateToken, // Cek token JWT
  authorizeRole(['admin', 'teacher']), // Hanya admin/teacher yang boleh add
  addQuiz, // Handler untuk add
)

//? Route untuk Hapus kuis
router.delete(
  '/quizzes/:id',
  authenticateToken, // Cek token JWT
  authorizeRole(['admin', 'teacher']), // Hanya admin/teacher yang boleh delete
  deleteQuiz, // Handler untuk delete
)

export default router
