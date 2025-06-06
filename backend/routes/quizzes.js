import express from 'express'
const router = express.Router()

import {
  getQuizzes,
  getQuizzesById,
  getSingleQuiz,
  addQuiz,
  updateQuiz,
  deleteQuiz,
  submitQuiz,
} from '../controllers/quizController.js'
import { authenticateToken, authorizeRole } from '../middlewares/authMiddleware.js'

//? Route untuk List semua kuis
router.get('/quizzes', getQuizzes)

//? Route untuk List semua kuis berdasarkan id
router.get('/quizzes/:id', getQuizzesById)

//? Route untuk Detail satu kuis
router.get('/quiz/:id', getSingleQuiz)

//? Route untuk Upload kuis (teacher only)
router.post(
  '/quiz',
  authenticateToken, // Cek token JWT
  authorizeRole(['admin', 'teacher']), // Hanya admin/teacher yang boleh add
  addQuiz, // Handler untuk add
)

//? Route untuk Update kuis
router.put(
  '/quiz/:id',
  authenticateToken, // Cek token JWT
  authorizeRole(['admin', 'teacher']), // Hanya admin/teacher yang boleh update
  updateQuiz, // Handler untuk update
)

//? Route untuk Hapus kuis
router.delete(
  '/quiz/:id',
  authenticateToken, // Cek token JWT
  authorizeRole(['admin', 'teacher']), // Hanya admin/teacher yang boleh delete
  deleteQuiz, // Handler untuk delete
)

//? Route untuk submit kuis (student only)
router.post(
  '/quiz/:id/submit',
  authenticateToken, // Cek token JWT
  authorizeRole(['admin', 'student']), // Hanya admin/student yang boleh submit
  submitQuiz, // Handler untuk add
)

export default router
