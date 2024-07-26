import Swal from 'sweetalert2';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import '../../Assets/css/Login.css';

export default function DaftarAdmin(){
    const api = process.env.REACT_APP_API_URL
    const nav = useNavigate()
    const [name, setNama] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repassword, setRepassword] = useState('');

    const daftar = (e) => {
        e.preventDefault();
        axios.post(api + '/auth/register', {
            name, email, password, repassword, role: 'admin'
        })
            .then(res => {
                Swal.fire({
                    icon: 'success',
                    title: 'Berhasil',
                    text: res.data.message
                  })
                  nav('/')
            })
    }

    return (
        <>
            <div className="Login">
                <div className="box-login flex-column">
                    <div className="box-form">
                        <div className="d-flex justify-content-between">
                            <h5>Daftar Admin</h5>
                        </div>
                        <hr />
                        <form onSubmit={daftar}>
                            <small>Username Instagram</small><br />
                            <input type="text" className="form-input" onInput={e => setNama(e.target.value)} /><br />
                            <small>Email</small><br />
                            <input type="email" className="form-input" onInput={e => setEmail(e.target.value)} /><br />
                            <small>Password</small><br />
                            <input type="password" className="form-input" onInput={e => setPassword(e.target.value)} /><br />
                            <small>Confirm Password</small><br />
                            <input type="password" className="form-input" onInput={e => setRepassword(e.target.value)} /><br /><br />
                            <div className="flexY-center">
                            <input className="form-check" type="checkbox" required/>
                            <small style={{marginLeft: "6px"}}>I Agree</small>
                            </div>
                            <button className="btn-login" style={{width: "100%"}}>Masuk</button>
                        </form>
                    </div>
                    <br />
                    <p>Sudah Punya Akun? <Link to={'/'} style={{textDecoration: 'none', color:"#00FFF0"}}><b>Login</b></Link></p>
                </div>
            </div>
        </>
    )
}