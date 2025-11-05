import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Home, Heart, UserRound, Menu, X } from "lucide-react";

export function Header() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        setIsLoggedIn(!!token);

        const handleStorageChange = () => {
            const token = localStorage.getItem("authToken");
            setIsLoggedIn(!!token);
        };

        window.addEventListener("storage", handleStorageChange);

        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []); 

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        setIsLoggedIn(false);
        setIsMenuOpen(false); 
        navigate("/");
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <header className="w-full bg-[#1D3557] text-white p-4 shadow-md sticky top-0 z-50 relative">
        
            <nav className="container mx-auto flex justify-between items-center px-4">
                
                <Link to="/" className="flex items-center gap-2" onClick={closeMenu}>
                    <Home className="w-7 h-7 text-[#F1FAEE]" />
                    <span className="text-2xl font-bold text-[#F1FAEE]">Estadia Já</span>
                </Link>

                <div className="flex items-center gap-4">
                
                    <div className="hidden md:flex items-center gap-4">
                        {isLoggedIn ? (
                        <>
                            <Link
                                to="/favoritos"
                                className="flex items-center gap-2 bg-[#457B9D] text-[#F1FAEE] px-4 py-2 rounded-full font-semibold hover:bg-opacity-90 transition-colors"
                            >
                                <Heart className="w-5 h-5" />
                                <span>Favoritos</span>
                            </Link>
                            <button
                                onClick={handleLogout}
                                title="Sair"
                                className="bg-[#457B9D] text-[#F1FAEE] p-2 rounded-full hover:bg-opacity-90 transition-colors"
                            >
                                <UserRound className="w-6 h-6" />
                            </button>
                        </>
                        ) : (
                        <>
                            <Link
                                to="/cadastro"
                                className="bg-[#457B9D] text-[#F1FAEE] px-4 py-2 rounded-full font-semibold hover:bg-opacity-90 transition-colors"
                            >
                                Cadastro
                            </Link>
                            <Link
                                to="/login"
                                className="bg-[#457B9D] text-[#F1FAEE] px-4 py-2 rounded-full font-semibold hover:bg-opacity-90 transition-colors"
                            >
                                Login
                            </Link>
                        </>
                        )}
                    </div>

                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden p-2 rounded-lg hover:bg-[#457B9D] transition-colors"
                        aria-label="Abrir menu"
                    >
                        {isMenuOpen ? (
                            <X className="w-6 h-6" />
                        ) : (
                            <Menu className="w-6 h-6" />
                        )}
                    </button>
                </div>
            </nav>

            {isMenuOpen && (
                <div className="md:hidden absolute top-full left-0 right-0 bg-[#1D3557] shadow-lg p-6">
                    <div className="container mx-auto flex flex-col items-center gap-4">
                        {isLoggedIn ? (
                        <>
                            <Link
                                to="/favoritos"
                                onClick={closeMenu}
                                className="w-full text-center bg-[#457B9D] text-[#F1FAEE] px-4 py-3 rounded-full font-semibold hover:bg-opacity-90 transition-colors"
                            >
                                Favoritos
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="w-full text-center bg-[#457B9D] text-[#F1FAEE] px-4 py-3 rounded-full font-semibold hover:bg-opacity-90 transition-colors"
                            >
                                Sair
                            </button>
                        </>
                        ) : (
                        <>
                            <Link
                                to="/cadastro"
                                onClick={closeMenu}
                                className="w-full text-center bg-[#457B9D] text-[#F1FAEE] px-4 py-3 rounded-full font-semibold hover:bg-opacity-90 transition-colors"
                            >
                                Cadastro
                            </Link>
                            <Link
                                to="/login"
                                onClick={closeMenu}
                                className="w-full text-center bg-[#457B9D] text-[#F1FAEE] px-4 py-3 rounded-full font-semibold hover:bg-opacity-90 transition-colors"
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