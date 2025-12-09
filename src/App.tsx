import './App.css'
import { Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CommentsPage from './pages/CommentsPage';

function App() {

  return (
    <div className='p-5'>
      <nav className='mb-10'>
        <Link to="/">Home</Link> | <Link to="/comments/test-page">Comments (test-page)</Link>
      </nav>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/comments/:pageId" element={<CommentsPage />} />
      </Routes>
    </div>
  )
}

export default App
