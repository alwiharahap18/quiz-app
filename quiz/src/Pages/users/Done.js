import '../../Assets/css/Login.css';
import { Link, useParams } from 'react-router-dom';

export default function Done(){
    const { quizId } = useParams();

    return (
        <>
            <nav>
                <h4>Giveaway</h4>
            </nav>
            <div className='d-flex justify-content-center' style={{paddingTop: '30vw'}}>
                <div className='box d-flex justify-content-center align-items-center shadow-lg' style={{flexDirection: 'column'}}>
                    <i className="fa-solid fa-circle-check" style={{color: "#7eccac", fontSize: "90px"}}></i>
                    <br />
                    <small>Tunggu Hasilnya di halaman awal</small>
                    <Link to={"/" + quizId} className="btn btn-success mt-3">
                        Ke halaman awal
                    </Link>
                </div>
            </div>
        </>
    )
}