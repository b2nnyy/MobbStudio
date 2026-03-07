import { HashRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Admin } from './routes/Admin'
import { AdminApprovals } from './routes/AdminApprovals'
import { Beats } from './routes/Beats'
import { Book } from './routes/Book'
import { Contact } from './routes/Contact'
import { Gear } from './routes/Gear'
import { Home } from './routes/Home'
import { Location } from './routes/Location'
import { Policies } from './routes/Policies'
import { Rates } from './routes/Rates'
import { Services } from './routes/Services'

function AppFrame() {
  const location = useLocation()
  const isAdminRoute = location.pathname.startsWith('/admin')

  return (
    <>
      {isAdminRoute ? null : <Header />}
      <main id="main" className={isAdminRoute ? 'min-h-screen' : 'min-h-[calc(100vh-8rem)]'}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/book" element={<Book />} />
          <Route path="/beats" element={<Beats />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/approvals" element={<AdminApprovals />} />
          <Route path="/services" element={<Services />} />
          <Route path="/rates" element={<Rates />} />
          <Route path="/policies" element={<Policies />} />
          <Route path="/gear" element={<Gear />} />
          <Route path="/location" element={<Location />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      {isAdminRoute ? null : <Footer />}
    </>
  )
}

export default function App() {
  return (
    <HashRouter>
      <AppFrame />
    </HashRouter>
  )
}
