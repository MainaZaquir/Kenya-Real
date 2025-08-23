import React, { useState } from 'react';
import { Search, Menu, X, User, Heart, MessageCircle } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '../ui/Button';
import { useAuth } from '../../contexts/AuthContext';
import { LoginModal } from '../auth/LoginModal';
import { UserMenu } from '../auth/UserMenu';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const location = useLocation();
  const { user } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50 backdrop-blur-sm bg-white/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-600 to-emerald-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">KR</span>
              </div>
              <span className="text-xl font-bold text-gray-900">KenyaReal</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/properties" 
              className={`font-medium transition-colors ${isActive('/properties') ? 'text-orange-600' : 'text-gray-700 hover:text-orange-600'}`}
            >
              Properties
            </Link>
            <Link 
              to="/agents" 
              className={`font-medium transition-colors ${isActive('/agents') ? 'text-orange-600' : 'text-gray-700 hover:text-orange-600'}`}
            >
              Agents
            </Link>
            <Link 
              to="/market-insights" 
              className={`font-medium transition-colors ${isActive('/market-insights') ? 'text-orange-600' : 'text-gray-700 hover:text-orange-600'}`}
            >
              Market Insights
            </Link>
            <Link 
              to="/tools" 
              className={`font-medium transition-colors ${isActive('/tools') ? 'text-orange-600' : 'text-gray-700 hover:text-orange-600'}`}
            >
              Tools
            </Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="p-2 text-gray-600 hover:text-orange-600 transition-colors" aria-label="Saved listings">
              <Heart className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-600 hover:text-orange-600 transition-colors" aria-label="Messages">
              <MessageCircle className="w-5 h-5" />
            </button>
            
            {user ? (
              <>
                <Link to="/dashboard">
                  <Button variant="outline" size="sm">Dashboard</Button>
                </Link>
                <UserMenu />
              </>
            ) : (
              <>
                <Button variant="outline" size="sm" onClick={() => setShowLoginModal(true)}>
                  <User className="w-4 h-4 mr-2" />
                  Sign In
                </Button>
                <Button size="sm" onClick={() => setShowLoginModal(true)}>
                  List Property
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-gray-600 hover:text-gray-900"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 py-4 space-y-4">
            {['/properties','/agents','/market-insights','/tools'].map(path => (
              <Link
                key={path}
                to={path}
                className={`block font-medium ${isActive(path) ? 'text-orange-600' : 'text-gray-700 hover:text-orange-600'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                {path === '/properties' ? 'Properties' :
                 path === '/agents' ? 'Agents' :
                 path === '/market-insights' ? 'Market Insights' : 'Tools'}
              </Link>
            ))}
            <div className="border-t pt-4 space-y-3">
              {user ? (
                <>
                  <Link to="/dashboard" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="outline" className="w-full">Dashboard</Button>
                  </Link>
                  <div className="px-1 text-sm text-gray-600">Signed in as {user.name}</div>
                </>
              ) : (
                <>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      setIsMenuOpen(false);
                      setShowLoginModal(true);
                    }}
                  >
                    <User className="w-4 h-4 mr-2" />
                    Sign In
                  </Button>
                  <Button
                    className="w-full"
                    onClick={() => {
                      setIsMenuOpen(false);
                      setShowLoginModal(true);
                    }}
                  >
                    List Property
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
    </header>
  );
};
