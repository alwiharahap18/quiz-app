import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import '../../Assets/css/Login.css';
import jwt_decode from 'jwt-decode';

import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../Store/authSlice';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';


export default function Quest(){
	const api = process.env.REACT_APP_API_URL
    const [data, setData] = useState([]);
    const refreshTokenCookie = Cookies.get('refreshToken'); // Mendapatkan nilai cookie refreshToken

    const axiosConfig = {
        headers: {
            Authorization: `Bearer ${refreshTokenCookie}`
        },
        withCredentials: true
    };

	const nav = useNavigate()
	const dispatch = useDispatch();
	const user = useSelector((state) => state.auth.user);
  
	const handleUpdateName = (value) => {
	  dispatch(updateUser({ name: value }));
	};
  
	const handleUpdateEmail = (value) => {
	  dispatch(updateUser({ email: value }));
	};
  
	const handleUpdateId = (value) => {
	  dispatch(updateUser({ id: value }));
	};
  
	const handleUpdateToken = (value) => {
	  dispatch(updateUser({ token: value }));
	};
  
	const handleUpdateExp = (value) => {
	  dispatch(updateUser({ exp: value }));
	};
  
	useEffect(() => {
		refreshToken()
	}, []);
  
	const refreshToken = () => {
	  axios.get(api + '/auth/token', axiosConfig)
	  .then(res => {
		  handleUpdateToken(res.data.accessToken);
		  const decoded = jwt_decode(res.data.accessToken);  
  
		  handleUpdateName(decoded.name);
		  handleUpdateEmail(decoded.email);
		  handleUpdateId(decoded.id);
		  handleUpdateExp(decoded.exp);

		  axios.get(api + '/quiz/list/' + decoded.id)
			  .then(res => setData(res.data.data))
	  })
	  .catch(() => {
		  nav('/')
	  })


	}
  
	const axiosJWT = axios.create();
  
	axiosJWT.interceptors.request.use((config) => {
	  const currentDate = new Date();
  
	  if (user.exp * 1000 < currentDate.getTime()) {
		  axios.get(api + '/auth/token', axiosConfig)
			  .then(res => {
				  config.headers.Authorization = `Bearer ${res.data.accessToken}`;
				  handleUpdateToken(res.data.accessToken);
  
				  const decoded = jwt_decode(res.data.accessToken);
  
				  handleUpdateName(decoded.name);
				  handleUpdateExp(decoded.exp);
			  })
	  }
  
	  return config;
  
	}, (error) => {
	  return Promise.reject(error);
	});

	let hapus = (id) => {
		axios.delete(api + '/quiz/del/' + id)
			.then(res => {
                Swal.fire({
                    icon: 'success',
                    title: 'Berhasil',
                    text: res.data.message
                  })

				  axios.get(api + '/quiz/list/' + user.id)
			  		.then(res => setData(res.data.data))
			})
	}

	let logout = () => {
		axios.delete(api + '/auth/logout')
			.then(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'Logout',
                  })

				  nav('/')
			})
	}

    return (
        <>
            <nav className='d-flex justify-content-between'>
                <h4>Giveaway</h4>
                <button className='btn btn-outline-light' onClick={logout}>Logout</button>
            </nav>
            <div className='d-flex flex-column align-items-center pt-4'>
                <header className='mb-4 d-flex align-items-center justify-content-between'>
                    {/* <div>
                        <Link to="/admin/dashboard" className='me-4'>Quiz</Link>
                        <Link to="/admin/dashboard">Jawaban</Link>
                    </div> */}
                    <Link to='/admin/quiz-form' className="btn btn-outline-success">Tambah</Link>
                </header>
                <div className="container-content d-flex align-items-center flex-column mt-4">
                    {
                        data.map(item =>
                            <div className='quiz-card mb-2 shadow d-flex justify-content-between align-items-center' key={item._id}>
                                <div>
                                    <h6>{item.judul}</h6>
                                    <small>{item.deskripsi.slice(0, 20) + '...'}</small>
                                </div>
								<div>
									<Link to={"/admin/edit/" + item._id} className='btn btn-primary me-1'><i class="fa-solid fa-eye"></i></Link>
									<button className='btn btn-danger' onClick={() => hapus(item._id)}><i class="fa-solid fa-trash"></i></button>
								</div>
                            </div>
                        )
                    }
                    <br /><br />
                    <div className="d-flex align-items-center flex-column">
                        <i className="fa-solid fa-circle-plus mb-3" style={{color: "#d9d9d9", fontSize:"48px"}}></i>
                        <i style={{color: "#d9d9d9"}}>Tambah Quiz</i>
                    </div>
                </div>
            </div>
        </>
    )
}