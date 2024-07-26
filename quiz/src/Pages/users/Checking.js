import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import '../../Assets/css/Checking.css';
import axios from 'axios';
import Swal from 'sweetalert2';

export default function Checking(){
	const api = process.env.REACT_APP_API_URL
	const apiKey = process.env.REACT_APP_API_KEY
    // http://localhost:3000/check/64f83e1b2fd0f158e64b9f5a
    const nav = useNavigate()
    const { partId } = useParams();

    const [panitia, setPanitia] = useState('')
    const [part, setPart] = useState('')
    const [quiz, setQuiz] = useState('')

    useEffect(() => {
        axios.get(api + "/part/show/" + partId)
            .then(resp => {
                setPart(resp.data.data.ig_id)
                setQuiz(resp.data.data.quizId)
                axios.get(api + "/quiz/show/" + resp.data.data.quizId)
                    .then(res => {
                        axios.get(api + "/auth/show/" + res.data.data.userId)
                            .then(res => {
                                setPanitia(res.data.username)
                            })
                    })
            })
    }, []);

    useEffect(() => {
        

        const options = {
            method: 'GET',
            url: 'https://instagram28.p.rapidapi.com/search_following',
            params: {
                user_id: part,
                query: panitia
            },
            headers: {
                'X-RapidAPI-Key': apiKey,
                'X-RapidAPI-Host': 'instagram28.p.rapidapi.com'
            }
        };

        console.log(options);

        if(part != "" && panitia != ""){
            axios.request(options)
                .then(response => {
                    console.log(response.data)
                    if(response.data.users.length > 0){
                        nav('/quest/' + partId)
                    }else if(response.data.users.length <= 0){
                        Swal.fire({
                            icon: 'error',
                            title: 'Belum Memenuhi Syarat',
                            text: "Cek Lagi syarat di instagram kami"
                        })     
                        nav('/quest/' + quiz)           
                    }
            })
        }
          
    }, [panitia])

    return (
        <>
            <div className="Login">
                <div className="load flexY-center">
                <i className="fa-solid fa-gear loading" style={{fontSize: "35px"}}></i>
                <small>Checking ...</small>
                </div>
            </div>
        </>
    )
}