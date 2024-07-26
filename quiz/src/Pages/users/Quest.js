import { useNavigate, useParams } from 'react-router-dom';
import '../../Assets/css/Login.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Quest(){
	const api = process.env.REACT_APP_API_URL
    const nav = useNavigate()
    const { partId } = useParams();
    
    let [nama, setNama] = useState('')
    let [QA, setQA] = useState([])
    let [id, setId] = useState('')
    let [selectedAnswers, setSelectedAnswers] = useState([]);

    const selectAnswer = (questionIndex, answerIndex) => {
        // Salin array jawaban yang sudah ada
        let newSelectedAnswers = [...selectedAnswers];
        // Perbarui jawaban yang dipilih untuk pertanyaan tertentu
        newSelectedAnswers[questionIndex] = answerIndex;
        // Setel state dengan jawaban yang baru
        setSelectedAnswers(newSelectedAnswers);
    }

    const done = (e) => {
        e.preventDefault();

        let jawaban = []
        selectedAnswers.map(item => {
            if(item === 0){
                jawaban.push('a')
            }else if(item === 1){
                jawaban.push('b')
            }else if(item === 2){
                jawaban.push('c')
            }else {
                jawaban.push('d')
            }
        })
        // Kirim jawaban yang dipilih ke server
        axios.post(api + '/part/update/' + partId, { jawaban })
            .then((resp) => {
            // Navigasi ke halaman selanjutnya atau lakukan sesuai kebutuhan
            nav('/done/' + id);
            // console.log(resp);
            });
    }

    useEffect(() => {
        axios.get(api + '/part/show/' + partId)
            .then((resp) => {
                console.log(resp.data);
                setNama(resp.data.data.nama);
                axios.get(api + '/quiz/show/' + resp.data.data.quizId)
                    .then((res) => {
                        setQA(res.data.data.QA);
                        console.log(res.data.data.QA);
                        setId(res.data.data._id);
                    });
            });
    }, [])

    return (
        <>
            <nav>
                <h4>Giveaway</h4>
            </nav>
            <h6 className='px-4 pt-3 text-center'>{nama}</h6>
            <div className='d-flex justify-content-center pt-4'>
                <form onSubmit={done} className='w-75'>
                {QA.map((item, questionIndex) => (
                    <div className='box shadow mb-3 w-100' key={questionIndex}>
                        <h5 className='mb-3'>{item.pertanyaan} ...</h5>
                        {item.options.map((option, answerIndex) => (
                        <div className='mb-3 d-flex align-items-center' key={answerIndex}>
                            <input
                            type="radio"
                            name={`question_${questionIndex}`}
                            id={`q_${questionIndex}_a_${answerIndex}`}
                            required
                            onChange={() => selectAnswer(questionIndex, answerIndex)}
                            checked={selectedAnswers[questionIndex] === answerIndex}
                            />
                            <label htmlFor={`q_${questionIndex}_a_${answerIndex}`} className='ms-3'>{option}</label>
                        </div>
                        ))}
                    </div>
                    ))}
                <div className='d-flex justify-content-center pt-2 pb-5'>
                    <button className="btn btn-success">
                        Selanjutnya
                    </button>
                </div>
                </form>
            </div>
        </>
    )
}