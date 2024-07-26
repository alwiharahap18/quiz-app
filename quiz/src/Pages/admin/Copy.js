import { useParams, Link } from 'react-router-dom';
import '../../Assets/css/Login.css';

export default function Done(){
    const { quizId } = useParams();

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
            <div className='d-flex justify-content-center' style={{paddingTop: '30vw'}}>
                <div className='box d-flex justify-content-center align-items-center shadow-lg' style={{flexDirection: 'column'}}>
                    <i className="fa-solid fa-paper-plane" style={{color: "#7eccac", fontSize: "90px"}}></i>
                    <br />
                    <h3>Berhasil</h3>
                    <small style={{color: "#8a8a8a"}}>
                        <button className="btn btn-outline-success" onClick={copyToClipboard}>
                        Copy Link 
                        <i className="fa-solid fa-copy ms-2"></i>
                        </button>
                        <Link to="/admin/dashboard" className="btn btn-secondary ms-2">Kembali</Link>
                    </small>
                </div>
            </div>
        </>
    )
}