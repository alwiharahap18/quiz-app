const QuizPost = require('../Models/Quiz');

exports.addQuiz = (req, res, next) => {
  const judul = req.body.judul;
  const userId = req.body.userId;
  const deskripsi = req.body.deskripsi;
  const QA = req.body.QA;  // Menggunakan req.body.QA sebagai array

  // Membuat instance model Quiz dengan data yang diberikan
  const newQuiz = new QuizPost({
    judul: judul,
    deskripsi: deskripsi,
    userId: userId,
    QA: QA  // Menyimpan array QA ke dalam field QA model
  });

  // Menyimpan data quiz ke dalam database
  newQuiz.save()
    .then(result => {
      res.status(201).json({
        message: 'Quiz berhasil ditambahkan',
        quiz: result
      });
    })
    .catch(err => {
      res.status(500).json({
        message: 'Terjadi kesalahan saat menambahkan quiz',
        error: err
      });
    });
};


exports.quiz = (req, res, next) => {
  const quizId = req.params.getId;

  QuizPost.findById(quizId)
    .then(result => {
      if (!result) {
        const error = new Error('Data Quiz Tidak Ditemukan!');
        error.errorStatus = 404;
        throw error;
      }

      res.status(200).json({
        message: "Data Quiz Berhasil Dipanggil",
        data: result
      });
    })
    .catch(err => next(err));
};

exports.quizzes = (req, res, next) => {
  const userId = req.params.userId;

  QuizPost.find({userId})
    .then(result => {
      if (!result) {
        const error = new Error('Data Quiz Tidak Ditemukan!');
        error.errorStatus = 404;
        throw error;
      }

      res.status(200).json({
        message: "Data Quiz Berhasil Dipanggil",
        data: result
      });
    })
    .catch(err => next(err));
};

exports.deleteQuiz = (req, res, next) => {
  const quizId = req.params.getId;
  QuizPost.findById(quizId)
    .then(result => {
      if(!result){
        const error = new Error('Data Quiz Tidak Ditemukan!');
        error.errorStatus(404);
        throw error;
      }
      
      return QuizPost.findByIdAndRemove(quizId)
    })
    .then(result => {      
      res.status(200).json({
        message: "Data Quiz Berhasil Dihapus",
      })
    })
    .catch(err => next(err))
};

exports.editQuiz = (req, res, next) => {
  const quizId = req.params.getId;
  const updatedData = {
    judul: req.body.judul,
    deskripsi: req.body.deskripsi,
    QA: req.body.QA,
  };

  QuizPost.findByIdAndUpdate(quizId, updatedData, { new: true })
    .then((result) => {
      if (!result) {
        const error = new Error('Data Quiz Tidak Ditemukan!');
        error.errorStatus = 404;
        throw error;
      }

      res.status(200).json({
        message: 'Data Quiz Berhasil Diperbarui',
        data: result,
      });
    })
    .catch((err) => next(err));
};