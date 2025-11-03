import React, { useState } from "react";
import { Home, ArrowLeft } from "lucide-react";

export function SignUpForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cpf, setCpf] = useState("");
    const [phones, setPhones] = useState("");

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        console.log({ name, email, password, cpf, phones });
    };

    return (
        <div className="flex h-screen overflow-hidden font-sans bg-[#F5F5DC]">
        
        <div className="hidden md:flex md:w-1/3 bg-[#457B9D] items-center justify-center p-12">
            <Home className="w-32 h-32 text-[#1D3557]" />
        </div>

        <div className="w-full md:w-2/3 flex items-center justify-center p-6 md:p-12 overflow-y-auto">
            <div className="w-full max-w-lg">
            <a
                href="#"
                className="flex items-center text-sm text-[#1D3557] hover:underline mb-8"
            >
                <ArrowLeft className="w-5 h-5" />
                <span className="ml-1">Voltar para o site</span>
            </a>

            <h1 className="text-4xl font-bold text-[#1D3557] mb-8">
                Bem-vindo!
            </h1>

            <form onSubmit={handleSubmit} className="w-full space-y-4">
                <div>
                <label
                    htmlFor="name"
                    className="block text-sm font-medium text-[#1D3557] mb-1 ml-4"
                >
                    Nome
                </label>
                <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="João da silva Junior"
                    className="w-full px-6 py-3 rounded-full bg-[#A8DADC] text-[#1D3557] placeholder-[#1D3557] placeholder-opacity-70 outline-none transition-all focus:ring-2 focus:ring-[#1D3557]"
                />
                </div>

                <div>
                <label
                    htmlFor="email"
                    className="block text-sm font-medium text-[#1D3557] mb-1 ml-4"
                >
                    Email
                </label>
                <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email@email.com"
                    className="w-full px-6 py-3 rounded-full bg-[#A8DADC] text-[#1D3557] placeholder-[#1D3557] placeholder-opacity-70 outline-none transition-all focus:ring-2 focus:ring-[#1D3557]"
                />
                </div>

                <div>
                <label
                    htmlFor="cpf"
                    className="block text-sm font-medium text-[#1D3557] mb-1 ml-4"
                >
                    CPF
                </label>
                <input
                    id="cpf"
                    type="text"
                    value={cpf}
                    onChange={(e) => setCpf(e.target.value)}
                    placeholder="000.000.000-00"
                    className="w-full px-6 py-3 rounded-full bg-[#A8DADC] text-[#1D3557] placeholder-[#1D3557] placeholder-opacity-70 outline-none transition-all focus:ring-2 focus:ring-[#1D3557]"
                />
                </div>

                <div>
                <label
                    htmlFor="phones"
                    className="block text-sm font-medium text-[#1D3557] mb-1 ml-4"
                >
                    Telefone
                </label>
                <input
                    id="phones"
                    type="tel"
                    value={phones}
                    onChange={(e) => setPhones(e.target.value)}
                    placeholder="+55 (61) 9 8888-wwww"
                    className="w-full px-6 py-3 rounded-full bg-[#A8DADC] text-[#1D3557] placeholder-[#1D3557] placeholder-opacity-70 outline-none transition-all focus:ring-2 focus:ring-[#1D3557]"
                />
                </div>

                <div>
                <label
                    htmlFor="password"
                    className="block text-sm font-medium text-[#1D3557] mb-1 ml-4"
                >
                    Senha
                </label>
                <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="**************"
                    className="w-full px-6 py-3 rounded-full bg-[#A8DADC] text-[#1D3557] placeholder-[#1D3557] placeholder-opacity-70 outline-none transition-all focus:ring-2 focus:ring-[#1D3557]"
                />
                </div>

                <button
                type="submit"
                className="w-full py-3 rounded-full bg-[#1D3557] text-white font-semibold text-lg hover:bg-opacity-90 transition-colors mt-6"
                >
                Cadastrar
                </button>
            </form>
            </div>
        </div>
        </div>
    );
}

