import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Home, Heart, UserRound, Menu, X, LogOut, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export function Header() {
  const { isLoggedIn, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [profileRef]);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    closeMenu();
    setIsProfileOpen(false);
    logout();
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
                  to='/'
                  className='flex items-center gap-2 rounded-full bg-transparent border border-white/50 px-4 py-2 font-semibold text-[#F1FAEE] transition-colors hover:bg-white/10'
                >
                  <Heart className='h-5 w-5' />
                  <span>Favoritos</span>
                </Link>
                
                <div className="relative" ref={profileRef}>
                  <button
                    onClick={() => setIsProfileOpen(prev => !prev)}
                    title='Perfil'
                    className='rounded-full bg-[#457B9D] p-2 text-[#F1FAEE] transition-colors hover:bg-opacity-90'
                  >
                    <UserRound className='h-6 w-6' />
                  </button>

                  {isProfileOpen && (
                    <div className="absolute right-0 top-12 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                      <Link
                        to="/perfil"
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <User className="w-4 h-4" />
                        Meu Perfil
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                      >
                        <LogOut className="w-4 h-4" />
                        Sair
                      </button>
                    </div>
                  )}
                </div>
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
                  to='/'
                  onClick={closeMenu}
                  className='w-full rounded-full bg-transparent border border-white/50 px-4 py-3 text-center font-semibold text-[#F1FAEE] transition-colors hover:bg-white/10'
                >
                  Favoritos
                </Link>
                <Link
                  to='/perfil'
                  onClick={closeMenu}
                  className='w-full rounded-full bg-[#457B9D] px-4 py-3 text-center font-semibold text-[#F1FAEE] transition-colors hover:bg-opacity-90'
                >
                  Meu Perfil
                </Link>
                <button
                  onClick={handleLogout}
                  className='w-full rounded-full bg-red-600 px-4 py-3 text-center font-semibold text-white transition-colors hover:bg-red-700'
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