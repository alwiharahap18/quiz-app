import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';

export default function EditForm() {
	const api = process.env.REACT_APP_API_URL
    const nav = useNavigate();
    const { quizId } = useParams();
    const user = useSelector((state) => state.auth.user);

    const [judul, setJudul] = useState("");
    const [deskripsi, setDeskripsi] = useState("");
    const [tempQA, setTempQA] = useState([]); // Temporary storage for questions and answers
    const [questionFields, setQuestionFields] = useState([]);

    useEffect(() => {
        axios.get(api + '/quiz/show/' + quizId)
            .then((res) => {
                setJudul(res.data.data.judul);
                setDeskripsi(res.data.data.deskripsi);
                setQuestionFields(res.data.data.QA);

                console.log(res.data.data);
            });
    }, [])

    const done = (e) => {
        e.preventDefault();
        
        let data = {
            judul,
            deskripsi,
            userId: user.id,
            QA: tempQA, // Use tempQA to send data
        };

        axios.put(api + '/quiz/edit/' + quizId, data)
            .then((res) => {
                nav('/admin/share/' + quizId);
            });
    };

    const addQuestionField = () => {
        setQuestionFields([...questionFields, {
            pertanyaan: "",
            jawaban: "",
            options: ["", "", ""],
        }]);
    };

    const removeQuestionField = () => {
        if (questionFields.length > 0) {
          const updatedFields = [...questionFields];
          updatedFields.pop(); // Menghapus soal terakhir
          setQuestionFields(updatedFields);
        }
      };

    // Pemanggilan setQA di luar loop
    const addQuestionsToQA = () => {
        // Collect questions and answers from questionFields
        const updatedQA = questionFields.map((item) => ({
            pertanyaan: item.pertanyaan,
            jawaban: item.jawaban,
            options: item.options,
        }));

        // Update the tempQA state with the collected questions and answers
        setTempQA(updatedQA);
    };

    const copyToClipboard = () => {
      const textField = document.createElement('textarea');
      textField.innerText = 'http://localhost:3000/' + quizId;
      document.body.appendChild(textField);
      textField.select();
      document.execCommand('copy');
      textField.remove();
    };

    return (
        <>
            <nav>
                <h4>Giveaway</h4>
            </nav>
            <div className='d-flex flex-column align-items-center pt-4'>
                <header className='mb-4 d-flex align-items-center justify-content-between'>
                    <div>
                        <Link to="/admin/dashboard" className='me-4'>Dashboard</Link>
                        <Link to={"/admin/edit/" + quizId} className='me-4 text-success pb-1 border-bottom border-success'>Quiz</Link>
                        <Link to={"/admin/answer/" + quizId}>Jawaban</Link>
                    </div>
                </header>
                <form className='quiz-form' onSubmit={done}>
                    <div className="qbox shadow mb-3">
                        <div className="mb-3">
                            <label htmlFor="judul" className="form-label">Judul</label>
                            <input type="text" className="form-control" id="judul" value={judul} onChange={e => setJudul(e.target.value)} required/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="desc" className="form-label">Deskripsi</label>
                            <input type="text" className="form-control" id="desc" value={deskripsi} onChange={e => setDeskripsi(e.target.value)} required/>
                        </div>
                        <div>
                            <label htmlFor="soal" className="form-label">Jumlah Soal</label><br />              
                            <button type="button" className="btn btn-primary me-2" onClick={addQuestionField}>Tambah Soal</button>
                            <button type="button" className="btn btn-danger" onClick={removeQuestionField}>
                            Hapus Soal
                            </button>
                        </div>
                    </div>
                    {questionFields.map((item, index) => (
                        <div className="qbox shadow mb-3" key={index}>
                            <h5 className='mb-3'><input type={'text'} className="radio-input ms-3" value={item.pertanyaan} onChange={e => (item.pertanyaan = e.target.value)} placeholder='Pertanyaan...' required/></h5>
                            {["a", "b", "c"].map((choice, choiceIndex) => (
                                <div className='mb-3 d-flex align-items-center' key={choice}>
                                    <input value={choice} id={`q-${choice}-${index}`} type="radio" name={`question-${index}`} onChange={e => (item.jawaban = e.target.value)} checked={item.jawaban === choice} required/>
                                    <input type={'text'} className="radio-input ms-3" value={item.options[choiceIndex]}  onChange={e => (item.options[choiceIndex] = e.target.value)} placeholder={`Option ${choiceIndex + 1}`} />
                                </div>
                            ))}
                        </div>
                    ))}
                    <br />
                    <button className="btn btn-success me-2" onClick={addQuestionsToQA}>Submit</button>
                    
                    <button className="btn btn-outline-success" type='button' onClick={copyToClipboard}>
                        Copy Link 
                        <i className="fa-solid fa-copy ms-2"></i>
                    </button>
                </form>
                <div className="container-content d-flex align-items-center flex-column mt-4">
                    <div className="d-flex align-items-center flex-column">
                        <i className="fa-solid fa-circle-plus mb-3" style={{ color: "#d9d9d9", fontSize: "48px" }}></i>
                        <i style={{ color: "#d9d9d9" }}>Tambah Quiz</i>
                    </div>
                </div>
            </div>
        </>
    );
}
