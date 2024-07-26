import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import '../../Assets/css/Login.css';

export default function Login(){
	const api = process.env.REACT_APP_API_URL
	const apiKey = process.env.REACT_APP_API_KEY
    const nav = useNavigate()
    const { quizId } = useParams();

    let [data, setData] = useState([])
    let [judul, setJudul] = useState('')
    let [deskripsi, setDeskripsi] = useState('')
    let [username, setUsername] = useState('')

    const show = () => {
        document.querySelector('.box-login').classList.remove('off')
    }

    const closed = () => {
        document.querySelector('.box-login').classList.add('off')
    }

    const login = (e) => {
        e.preventDefault()

        const options = {
            method: 'GET',
            url: 'https://instagram28.p.rapidapi.com/user_info',
            params: {
                user_name: username
            },
            headers: {
                'X-RapidAPI-Key': apiKey,
                'X-RapidAPI-Host': 'instagram28.p.rapidapi.com'
            }
        };
          
        axios.request(options)
            .then(response => {
                console.log(response)
            if(response.data.status  === "ok"){
                let data = {
                    foto: response.data.data.user.profile_pic_url,
                    nama: response.data.data.user.full_name,
                    username: response.data.data.user.username,
                    ig_id: response.data.data.user.id,
                    quizId
                }
                console.log(data)
                axios.post(api + '/part/add', data)
                    .then((res) => {
                        nav('/check/' + res.data.data._id)
                    });
            }else if(response.data.status === "fail"){
                Swal.fire({
                    icon: 'error',
                    title: 'Gagal',
                    text: "Akun Tidak Ditemukan"
                  })                
            }
        })
    }

    useEffect(() => {
        axios.get(api + '/quiz/show/' + quizId)
            .then((res) => {
                setJudul(res.data.data.judul);
                setDeskripsi(res.data.data.deskripsi);
            });

        axios.get(api + '/part/users/' + quizId, {
            headers: {
              'Access-Control-Allow-Origin': '*',
            },
          })
            .then((res) => {
                setData(res.data.data);
            });
    }, [])

    return (
        <>
            <div className="Login justify-content-start p-4">
                <h2>{judul}</h2>
                <span className="sub-title">
                    {deskripsi}
                </span>
                <button className='btn-login' onClick={show}>Mulai Quiz</button>
                
                <div className="box-form mt-5">
                    <h5>Partisipan : {data.length}</h5>
                    <div className="mt-3 flex-wrap d-flex gap-2">
                        {data.map(item => (
                            <div key={item._id} className='badge text-bg-success'>   
                                {/* <img crossOrigin="anonymous" src={`${item.foto}`} alt={item.username} />  */}
                                {/* <a href={item.foto}>link</a> */}
                                @{item.username}
                            </div>   
                        ))}
                    </div>
                </div>

                <div className="box-login off">
                    <div className="box-form">
                        <div className="d-flex justify-content-between">
                            <h5>instagram</h5>
                            <i className="fa-solid fa-circle-xmark" onClick={closed}></i>
                        </div>
                        <hr />
                        <form onSubmit={login}>
                            <small>Username Instagram</small><br />
                            <input type="text" className="form-input" value={username} onInput={e => setUsername(e.target.value)} /><br />
                            <button className="btn-login" style={{width: "100%"}}>Mulai</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}