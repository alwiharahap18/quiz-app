import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';

export default function Quest() {
	const api = process.env.REACT_APP_API_URL
    const nav = useNavigate();
    const user = useSelector((state) => state.auth.user);

    
    const [judul, setJudul] = useState("");
    const [deskripsi, setDeskripsi] = useState("");
    const [tempQA, setTempQA] = useState([]); // Temporary storage for questions and answers
    const [questionFields, setQuestionFields] = useState([]);

    const done = (e) => {
        e.preventDefault();
        
        let data = {
            judul,
            deskripsi,
            userId: user.id,
            QA: tempQA, // Use tempQA to send data
        };

        axios.post(api + '/quiz/add', data)
            .then((res) => {
                nav('/admin/share/' + res.data.quiz._id);
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

    return (
        <>
            <nav>
                <h4>Giveaway</h4>
            </nav>
            <div className='d-flex flex-column align-items-center pt-4'>
                <header className='mb-4 d-flex align-items-center justify-content-between'>
                    <div>
                        <Link to="/admin/dashboard" className='me-4'>Dashboard</Link>
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
                            <h5 className='mb-3'><input type={'text'} className="radio-input ms-3" onChange={e => (item.pertanyaan = e.target.value)} placeholder='Pertanyaan...' required/></h5>
                            {["a", "b", "c"].map((choice, choiceIndex) => (
                                <div className='mb-3 d-flex align-items-center' key={choice}>
                                    <input value={choice} id={`q-${choice}-${index}`} type="radio" name={`question-${index}`} onChange={e => (item.jawaban = e.target.value)} required/>
                                    <input type={'text'} className="radio-input ms-3" onChange={e => (item.options[choiceIndex] = e.target.value)} placeholder={`Option ${choiceIndex + 1}`} />
                                </div>
                            ))}
                        </div>
                    ))}
                    <br />
                    <button className="btn btn-success" onClick={addQuestionsToQA}>Submit</button>
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
