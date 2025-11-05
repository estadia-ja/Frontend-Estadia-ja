import React from "react";
import { Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
    return (
        <footer className="w-full bg-[#1D3557] text-white p-4 shadow-md mt-auto">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4 gap-4">
                <div className="text-center md:text-left">
                    <span className="text-lg font-semibold">
                        © 2025 Estadia Já
                    </span>
                </div>

                <div className="flex items-center gap-6">
                    <a 
                        href="mailto:cabeceira2003@gmail.com.com" 
                        title="Email"
                        className="hover:text-[#F1FAEE] transition-colors"
                    >
                        <Mail className="w-6 h-6" />
                    </a>
                    <a 
                        href="#" 
                        title="Localização"
                        className="hover:text-[#F1FAEE] transition-colors"
                    >
                        <MapPin className="w-6 h-6" />
                    </a>
                    <a 
                        href="tel:+5561983749069" 
                        title="Telefone"
                        className="hover:text-[#F1FAEE] transition-colors"
                    >
                        <Phone className="w-6 h-6" />
                    </a>
                </div>
            </div>
        </footer>
    );
}