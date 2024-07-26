import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { Answer, Login, Checking, Quest, Done, LoginAdmin, DaftarAdmin, Dashboard, QuizForm, EditForm, Copy } from '.'
import '../Assets/css/App.css';
import '../Assets/css/Nav.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/:quizId" element={<Login />} />
        <Route path="/check/:partId" element={<Checking />} />
        <Route path="/quest/:partId" element={<Quest />} />
        <Route path="/done/:quizId" element={<Done />} />
        <Route path="/" element={<LoginAdmin />} />
        <Route path="/admin/daftar" element={<DaftarAdmin />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/quiz-form" element={<QuizForm />} />
        <Route path="/admin/edit/:quizId" element={<EditForm />} />
        <Route path="/admin/share/:quizId" element={<Copy />} />
        <Route path="/admin/answer/:quizId" element={<Answer />} />
      </Routes>
    </Router>
  );
}

export default App;
