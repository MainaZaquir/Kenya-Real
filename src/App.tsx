import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { PropertiesPage } from './pages/PropertiesPage';
import { AgentsPage } from './pages/AgentsPage';
import { MarketInsightsPage } from './pages/MarketInsightsPage';
import { ToolsPage } from './pages/ToolsPage';
import { PropertyDetail } from './components/properties/PropertyDetail';
import { DashboardPage } from './pages/DashboardPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-white">
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/properties" element={<PropertiesPage />} />
            <Route path="/properties/:id" element={<PropertyDetail />} />
            <Route path="/agents" element={<AgentsPage />} />
            <Route path="/market-insights" element={<MarketInsightsPage />} />
            <Route path="/tools" element={<ToolsPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;