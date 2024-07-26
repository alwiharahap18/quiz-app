import Swal from 'sweetalert2';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import logo from '../../Assets/img/logo.svg';
import '../../Assets/css/Login.css';

export default function LoginAdmin(){
	const api = process.env.REACT_APP_API_URL
    const nav = useNavigate()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const show = () => {
        document.querySelector('.box-login').classList.remove('off')
    }

    const closed = () => {
        document.querySelector('.box-login').classList.add('off')
    }

    const login = (e) => {
        e.preventDefault();
        axios.post(api + '/auth/login', {
            email, password
        }, { withCredentials: true })
            .then(res => {
                Swal.fire({
                    icon: 'success',
                    title: 'Berhasil',
                    text: res.data.message
                  })
                  nav('/admin/dashboard')
            })
    }

    return (
        <>
            <div className="Login">
                <img src={logo} alt="instagram" />
                <br />
                <span className="sub-title">
                    instagram
                </span>
                <h2>Admin</h2>
                <button className='btn-login' onClick={show}>Login</button>

                <div className="box-login flex-column off">
                    <div className="box-form">
                        <div className="d-flex justify-content-between">
                            <h5>Login Admin</h5>
                            <i className="fa-solid fa-circle-xmark" onClick={closed}></i>
                        </div>
                        <hr />
                        <form onSubmit={login}>
                            <small>Email</small><br />
                            <input type="email" className="form-input" onInput={e => setEmail(e.target.value)} /><br />
                            <small>Password</small><br />
                            <input type="password" className="form-input" onInput={e => setPassword(e.target.value)} /><br /><br />
                            <div className="flexY-center">
                            <input className="form-check" type="checkbox" required/>
                            <small style={{marginLeft: "6px"}}>Ingat aku</small>
                            </div>
                            <button className="btn-login" style={{width: "100%"}}>Masuk</button>
                        </form>
                    </div>
                    <br />
                    <p>Belum Punya Akun? <Link to={'/admin/daftar'} style={{textDecoration: 'none', color:"#00FFF0"}}><b>Daftar</b></Link></p>
                </div>
            </div>
        </>
    )
}