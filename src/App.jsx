
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import { AuthProvider } from './contexts/AuthContext'

import ParentDashboard from './pages/parent/ParentDashboard'
import EnfantDashboard from './pages/enfant/EnfantDashboard'
import AdminDashboard from './pages/admin/AdminDashboard'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/parent" replace />} />

          <Route path="/parent" element={<ParentDashboard />} />
          <Route path="/enfant" element={<EnfantDashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />

          <Route path="*" element={<Navigate to="/parent" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
