import db from '../config/db.js'

/**
 * @desc   Getting all quizzes
 * @route  GET /api/quizzes
 */
export const getQuizzes = async (req, res, next) => {
  const id = req.params.id

  try {
    const result = await db.query(
      `
      SELECT
        quizzes.*,
        users.full_name
      FROM
        quizzes
      INNER JOIN
        users ON users.id = quizzes.created_by
      ORDER BY
        quizzes.created_at DESC
    `,
    )

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
 * @desc   Getting all quizzes
 * @route  GET /api/quizzes/:id
 */
export const getQuizzesById = async (req, res, next) => {
  const id = req.params.id

  try {
    const result = await db.query(
      `
      SELECT
        quizzes.*,
        users.full_name
      FROM
        quizzes
      INNER JOIN
        users ON users.id = quizzes.created_by
      WHERE
        quizzes.created_by = $1
      ORDER BY
        quizzes.created_at DESC
    `,
      [id],
    )

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
 * @desc   Getting single quiz and its questions
 * @route  GET /api/quiz/:id
 */
export const getSingleQuiz = async (req, res, next) => {
  const id = req.params.id

  try {
    // Ambil data quiz + pembuatnya
    const result = await db.query(
      `
      SELECT
        quizzes.*,
        users.full_name AS teacher_name,
        users.email AS teacher_email
      FROM
        quizzes
      INNER JOIN
        users ON users.id = quizzes.created_by
      WHERE
        quizzes.id = $1
      `,
      [id],
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Quiz tidak ditemukan' })
    }

    const quiz = result.rows[0] // Ambil sebagai objek tunggal

    // Ambil semua pertanyaan dari quiz ini
    const questionResult = await db.query(`SELECT * FROM questions WHERE quiz_id = $1`, [quiz.id])

    const questions = questionResult.rows

    return res.status(200).json({
      message: 'Berhasil mendapatkan data quiz',
      quiz,
      questions,
    })
  } catch (error) {
    res.status(500).json({ error: 'Gagal mengambil data quiz' })
    console.error('Gagal mengambil data quiz:', error)
    next(error)
  }
}

/**
 * @desc Upload quiz
 * @route POST /api/quiz
 */
export const addQuiz = async (req, res, next) => {
  const { title, subject, level, created_by, questions } = req.body

  try {
    // Simpan quiz baru ke database
    const result = await db.query(
      `INSERT INTO quizzes (title, subject, level, created_by)
        VALUES ($1, $2, $3, $4) RETURNING id`,
      [title, subject, level, created_by],
    )

    const quizId = result.rows[0].id

    // Simpan semua soal
    for (const q of questions) {
      await db.query(
        `INSERT INTO questions (quiz_id, question_text, option_a, option_b, option_c, option_d, correct_answer)
          VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [
          quizId,
          q.question_text,
          q.option_a,
          q.option_b,
          q.option_c,
          q.option_d,
          q.correct_answer.toUpperCase(),
        ],
      )
    }

    res.status(201).json({
      message: 'Berhasil menambahkan quiz baru',
      quiz_id: quizId,
    })
  } catch (error) {
    console.error('Gagal menambahkan quiz baru:', error)
    res.status(500).json({ error: 'Gagal menambahkan quiz baru' })
    next(error)
  }
}

/**
 * @desc Update quiz
 * @route PUT /api/quiz/:id
 */
export const updateQuiz = async (req, res, next) => {
  const id = req.params.id
  const { title, subject, level, created_by, questions } = req.body

  try {
    // Update quiz utama
    await db.query(
      `UPDATE quizzes
       SET title = $1, subject = $2, level = $3, created_by = $4
       WHERE id = $5`,
      [title, subject, level, created_by, id],
    )

    // Hapus soal-soal lama dari quiz ini
    await db.query(`DELETE FROM questions WHERE quiz_id = $1`, [id])

    // Insert soal-soal baru
    for (const q of questions) {
      const { question_text, option_a, option_b, option_c, option_d, correct_answer } = q
      await db.query(
        `INSERT INTO questions (quiz_id, question_text, option_a, option_b, option_c, option_d, correct_answer)
         VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [id, question_text, option_a, option_b, option_c, option_d, correct_answer],
      )
    }

    res.status(200).json({ message: 'Berhasil memperbarui quiz', quiz_id: id })
  } catch (error) {
    console.error('Gagal memperbarui quiz:', error)
    res.status(500).json({ error: 'Gagal memperbarui quiz' })
    next(error)
  }
}

/**
 * @desc   Delete quiz by ID (automatic cascade delete for questions & submissions)
 * @route  DELETE /api/quiz/:id
 */
export const deleteQuiz = async (req, res, next) => {
  const id = req.params.id

  try {
    // Periksa apakah quiz dengan ID tersebut ada
    const checkquiz = await db.query('SELECT * FROM quizzes WHERE id = $1', [id])

    if (checkquiz.rows.length === 0) {
      return res.status(404).json({ error: 'Quiz tidak ditemukan' })
    }

    // Hapus quiz (questions & submissions akan ikut terhapus karena ON DELETE CASCADE)
    const result = await db.query('DELETE FROM quizzes WHERE id = $1', [id])

    res
      .status(200)
      .json({ message: 'Quiz berhasil dihapus beserta pertanyaan dan submissions-nya' })
  } catch (error) {
    console.error('Gagal menghapus quiz:', error)
    next(error)
  }
}
