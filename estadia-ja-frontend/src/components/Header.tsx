import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home, Heart, UserRound, Menu, X } from 'lucide-react';

export function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const token = localStorage.getItem('authToken');
    return !!token;
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleStorageChange = () => {
      const token = localStorage.getItem('authToken');
      setIsLoggedIn(!!token);
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
    setIsMenuOpen(false);
    navigate('/');
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className='relative sticky top-0 z-50 w-full bg-[#1D3557] p-4 text-white shadow-md'>
      <nav className='container mx-auto flex items-center justify-between px-4'>
        <Link to='/' className='flex items-center gap-2' onClick={closeMenu}>
          <Home className='h-7 w-7 text-[#F1FAEE]' />
          <span className='text-2xl font-bold text-[#F1FAEE]'>Estadia Já</span>
        </Link>

        <div className='flex items-center gap-4'>
          <div className='hidden items-center gap-4 md:flex'>
            {isLoggedIn ? (
              <>
                <Link
                  to='/favoritos'
                  className='flex items-center gap-2 rounded-full bg-[#457B9D] px-4 py-2 font-semibold text-[#F1FAEE] transition-colors hover:bg-opacity-90'
                >
                  <Heart className='h-5 w-5' />
                  <span>Favoritos</span>
                </Link>
                <button
                  onClick={handleLogout}
                  title='Sair'
                  className='rounded-full bg-[#457B9D] p-2 text-[#F1FAEE] transition-colors hover:bg-opacity-90'
                >
                  <UserRound className='h-6 w-6' />
                </button>
              </>
            ) : (
              <>
                <Link
                  to='/cadastro'
                  className='rounded-full bg-[#457B9D] px-4 py-2 font-semibold text-[#F1FAEE] transition-colors hover:bg-opacity-90'
                >
                  Cadastro
                </Link>
                <Link
                  to='/login'
                  className='rounded-full bg-[#457B9D] px-4 py-2 font-semibold text-[#F1FAEE] transition-colors hover:bg-opacity-90'
                >
                  Login
                </Link>
              </>
            )}
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className='rounded-lg p-2 transition-colors hover:bg-[#457B9D] md:hidden'
            aria-label='Abrir menu'
          >
            {isMenuOpen ? (
              <X className='h-6 w-6' />
            ) : (
              <Menu className='h-6 w-6' />
            )}
          </button>
        </div>
      </nav>

      {isMenuOpen && (
        <div className='absolute left-0 right-0 top-full bg-[#1D3557] p-6 shadow-lg md:hidden'>
          <div className='container mx-auto flex flex-col items-center gap-4'>
            {isLoggedIn ? (
              <>
                <Link
                  to='/favoritos'
                  onClick={closeMenu}
                  className='w-full rounded-full bg-[#457B9D] px-4 py-3 text-center font-semibold text-[#F1FAEE] transition-colors hover:bg-opacity-90'
                >
                  Favoritos
                </Link>
                <button
                  onClick={handleLogout}
                  className='w-full rounded-full bg-[#457B9D] px-4 py-3 text-center font-semibold text-[#F1FAEE] transition-colors hover:bg-opacity-90'
                >
                  Sair
                </button>
              </>
            ) : (
              <>
                <Link
                  to='/cadastro'
                  onClick={closeMenu}
                  className='w-full rounded-full bg-[#457B9D] px-4 py-3 text-center font-semibold text-[#F1FAEE] transition-colors hover:bg-opacity-90'
                >
                  Cadastro
                </Link>
                <Link
                  to='/login'
                  onClick={closeMenu}
                  className='w-full rounded-full bg-[#457B9D] px-4 py-3 text-center font-semibold text-[#F1FAEE] transition-colors hover:bg-opacity-90'
                >
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
