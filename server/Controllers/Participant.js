const ParticipantPost = require('../Models/Participant');

exports.store = (req, res, next) => {
  const { nama, username, quizId, ig_id, foto } = req.body;

  const baru = new ParticipantPost({
    nama,
    foto,
    username,
    quizId,
    ig_id,
  });

  baru.save()
    .then((result) => {
      res.status(201).json({
        message: 'Berhasil join',
        data: result
      });
    })
    .catch(err => next(err));
};

exports.show = (req, res, next) => {
  const partId = req.params.getId;

  ParticipantPost.findById(partId)
    .then(result => {
      if (!result) {
        const error = new Error('Data Partisipan Tidak Ditemukan!');
        error.errorStatus = 404;
        throw error;
      }

      res.status(200).json({
        message: "Data Partisipan Berhasil Dipanggil",
        data: result
      });
    })
    .catch(err => next(err));
};

exports.users = (req, res, next) => {
  const partId = req.params.getId;

  ParticipantPost.find({quizId : partId})
    .then(result => {
      if (!result) {
        const error = new Error('Data Partisipan Tidak Ditemukan!');
        error.errorStatus = 404;
        throw error;
      }

      res.status(200).json({
        message: "Data Partisipan Berhasil Dipanggil",
        data: result
      });
    })
    .catch(err => next(err));
};

exports.index = (req, res, next) => {
  ParticipantPost.find()
    .then(result => {
      res.status(200).json({
        message: "Data Partisipan Berhasil Dipanggil",
        data: result
      });
    })
    .catch(err => next(err));
};

exports.destroy = (req, res, next) => {
  const partId = req.params.getId;

  ParticipantPost.findByIdAndRemove(partId)
    .then(result => {
      if (!result) {
        const error = new Error('Data Partisipan Tidak Ditemukan!');
        error.errorStatus = 404;
        throw error;
      }

      res.status(200).json({
        message: "Data Partisipan Berhasil Dihapus",
      });
    })
    .catch(err => next(err));
};

exports.updateAnswers = (req, res, next) => {
  const partId = req.params.getId;
  const updatedAnswers = req.body.jawaban; // Ambil jawaban dari body permintaan
  
  ParticipantPost.findByIdAndUpdate(partId, { jawaban: updatedAnswers }, { new: true })
    .then((result) => {
      if (!result) {
        const error = new Error('Data Partisipan Tidak Ditemukan!');
        error.errorStatus = 404;
        throw error;
      }

      res.status(200).json({
        message: 'Jawaban Partisipan Berhasil Diperbarui',
        data: result,
      });
    })
    .catch((err) => next(err));
};