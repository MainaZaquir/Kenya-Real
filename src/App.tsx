import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { PropertiesPage } from './pages/PropertiesPage';
import { AgentsPage } from './pages/AgentsPage';
import { MarketInsightsPage } from './pages/MarketInsightsPage';
import { ToolsPage } from './pages/ToolsPage';
import { PropertyDetail } from './components/properties/PropertyDetail';
import usePageTracking from './hooks/usePageTracking';
import { Analytics } from '@vercel/analytics/react';

function App() {
  usePageTracking();

  return (
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
        </Routes>
        <Footer />

        <Analytics />
      </div>
    </Router>
  );
}

export default App;
