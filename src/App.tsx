import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Book } from './routes/Book'
import { Contact } from './routes/Contact'
import { Gear } from './routes/Gear'
import { Home } from './routes/Home'
import { Location } from './routes/Location'
import { Policies } from './routes/Policies'
import { Rates } from './routes/Rates'
import { Services } from './routes/Services'

export default function App() {
  return (
    <HashRouter>
      <Header />
      <main id="main" className="min-h-[calc(100vh-8rem)]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/book" element={<Book />} />
          <Route path="/services" element={<Services />} />
          <Route path="/rates" element={<Rates />} />
          <Route path="/policies" element={<Policies />} />
          <Route path="/gear" element={<Gear />} />
          <Route path="/location" element={<Location />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </HashRouter>
  )
}
