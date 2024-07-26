import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';

export default function EditForm() {
	const api = process.env.REACT_APP_API_URL
    const nav = useNavigate();
    const { quizId } = useParams();
    const user = useSelector((state) => state.auth.user);

    const [data, setData] = useState([])
    const [key, setKey] = useState([])

    useEffect(() => {
        axios.get(api + '/part/users/' + quizId, {
            headers: {
              'Access-Control-Allow-Origin': '*',
            },
          })
            .then((res) => {
                console.log(res.data.data);
                setData(res.data.data);
            });

        axios.get(api + '/quiz/show/' + quizId, {
            headers: {
              'Access-Control-Allow-Origin': '*',
            },
          })
            .then((res) => {
                console.log(res.data.data.QA);
                setKey(res.data.data.QA);
            });
    }, [])


    const copyToClipboard = () => {
      const textField = document.createElement('textarea');
      textField.innerText = 'http://localhost:3000/' + quizId;
      document.body.appendChild(textField);
      textField.select();
      document.execCommand('copy');
      textField.remove();
    };

    function formatDateAndTime(dateTimeString) {
        const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
        const formattedDate = new Date(dateTimeString).toLocaleDateString(undefined, options);
        return formattedDate;
      }

    const nilai = (user) => {
        console.log("jawaban user");
        console.log(user);
        
        const hasil = []
        if(key.length > 0){
            for (let i = 0; i < user.length; i++) {
                if(user[i] === key[i].jawaban) {
                    hasil.push(key[i].jawaban)
                }           
            }
        }

        return hasil.length + ' / ' + key.length
    }

    return (
        <>
            <nav>
                <h4>Giveaway</h4>
            </nav>
            <div className='d-flex flex-column align-items-center pt-4'>
                <header className='mb-4 d-flex align-items-center justify-content-between'>
                    <div>
                        <Link to="/admin/dashboard" className='me-4'>Dashboard</Link>
                        <Link to={"/admin/edit/" + quizId} className='me-4'>Quiz</Link>
                        <Link to={"/admin/answer/" + quizId} className='text-success pb-1 border-bottom border-success'>Jawaban</Link>
                    </div>
                </header>
                {data.map((item, i) => (
                    <div className="qbox shadow mb-3 w-75" key={i}>
                        <h6>{item.nama}</h6>
                        <a href={'https://www.instagram.com/' + item.username}>{item.username}</a>
                        <br />
                        <small className='me-2'>Nilai :</small><b className='text-success'>{nilai(item.jawaban)}</b>
                        <p className='mt-3'>{formatDateAndTime(item.createdAt)}</p>
                    </div>
                ))}
                <div className="container-content d-flex align-items-center flex-column mt-4">
                    
                </div>
            </div>
        </>
    );
}
