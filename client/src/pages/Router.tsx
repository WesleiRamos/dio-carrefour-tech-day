import Inicio from './Inicio'
import Produto from './Produto'
import { Routes, Route } from 'react-router-dom'

const Router = () => (
  <div className='container'>
    <Routes>
      <Route path="/" element={<Inicio />} />
      <Route path="/produto/:id" element={<Produto />} />
    </Routes>
  </div>
)

export default Router
