import React, { useEffect, useRef, useState } from 'react';
import { X, Eye, EyeOff, Mail, Lock, User as UserIcon, Phone as PhoneIcon } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { useAuth } from '../../contexts/AuthContext';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const initialForm = {
  name: '',
  email: '',
  password: '',
  phone: '',
  role: 'buyer' as 'buyer' | 'agent',
};

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const { login, signup, isLoading } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(initialForm);
  const [error, setError] = useState('');
  const panelRef = useRef<HTMLDivElement>(null);

  // Close on ESC
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  // Reset when closed
  useEffect(() => {
    if (!isOpen) {
      setIsLogin(true);
      setFormData(initialForm);
      setError('');
      setShowPassword(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) return 'Enter a valid email.';
    if (formData.password.length < 6) return 'Password must be at least 6 characters.';
    if (!isLogin) {
      if (!formData.name.trim()) return 'Full name is required.';
      if (!formData.phone.match(/^\+254\d{9}$/)) return 'Phone must be in +254XXXXXXXXX format.';
    }
    return '';
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const v = validate();
    if (v) return setError(v);

    if (isLogin) {
      const res = await login(formData.email, formData.password);
      if (!res.success) return setError(res.error || 'Invalid email or password.');
      onClose();
      return;
    }

    const res = await signup(formData);
    if (!res.success) return setError(res.error || 'Could not create account.');
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setError('');
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const switchMode = () => {
    // preserve email when toggling modes
    setIsLogin(!isLogin);
    setError('');
    setFormData(f => ({ ...initialForm, email: f.email }));
  };

  const onBackdrop = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={onBackdrop}
      aria-modal="true"
      role="dialog"
    >
      <div
        ref={panelRef}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {!isLogin && (
            <>
              <div className="relative">
                <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  aria-label="Full name"
                  className="pl-10"
                />
              </div>

              <div className="relative">
                <PhoneIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number (+254XXXXXXXXX)"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  aria-label="Phone number"
                  className="pl-10"
                />
              </div>

              <div>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  aria-label="Select role"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                >
                  <option value="buyer">I'm looking to buy/rent</option>
                  <option value="agent">I'm a real estate agent</option>
                </select>
              </div>
            </>
          )}

          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
              aria-label="Email address"
              className="pl-10"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              aria-label="Password"
              className="pl-10 pr-12"
            />
            <button
              type="button"
              aria-label="Toggle password visibility"
              aria-pressed={showPassword}
              onClick={() => setShowPassword(s => !s)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          <Button type="submit" className="w-full py-3" disabled={isLoading}>
            {isLoading ? 'Please wait...' : isLogin ? 'Sign In' : 'Create Account'}
          </Button>

          <div className="text-center">
            <button
              type="button"
              onClick={switchMode}
              className="text-orange-600 hover:text-orange-700 font-medium"
            >
              {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
            </button>
          </div>

          {/* Demo Credentials (only show in dev mode) */}
          {import.meta.env.MODE === 'development' && (
            <div className="bg-gray-50 rounded-lg p-4 text-sm">
              <div className="font-medium text-gray-700 mb-2">Demo Credentials:</div>
              <div className="space-y-1 text-gray-600">
                <div><strong>Buyer:</strong> buyer@example.com / password123</div>
                <div><strong>Agent:</strong> agent@example.com / password123</div>
                <div><strong>Admin:</strong> admin@kenyareal.co.ke / admin123</div>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
