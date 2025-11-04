import React, { useState } from "react";
import { Home, ArrowLeft } from "lucide-react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export function SignUpForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cpf, setCpf] = useState("");
    const [phones, setPhones] = useState("");

    const [nameError, setNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [cpfError, setCpfError] = useState("");
    const [phoneError, setPhoneError] = useState("");

    const [isLoading, setIsLoading] = useState(false);
    const [apiMessage, setApiMessage] = useState({ type: "", text: "" });

    const validateForm = () => {
        setNameError("");
        setEmailError("");
        setPasswordError("");
        setCpfError("");
        setPhoneError("");
        setApiMessage({ type: "", text: "" });
        let isValid = true;

        if (!name) {
            setNameError("Nome é obrigatório.");
            isValid = false;
        }
        if (!email) {
            setEmailError("Email é obrigatório.");
            isValid = false;
        }

        const unmaskedCpf = cpf.replace(/\D/g, "");
        if (unmaskedCpf.length !== 11) {
            setCpfError("CPF deve ter 11 dígitos.");
            isValid = false;
        }

        const unmaskedPhone = phones.replace(/\D/g, "");
        if (unmaskedPhone.length !== 11) {
            setPhoneError("Telefone deve ter DDD + 9 dígitos.");
            isValid = false;
        }

        const passRegex =
        /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
        if (!passRegex.test(password)) {
            setPasswordError(
                "Senha: 8+ dígitos, 1 maiúscula, 1 número, 1 especial."
            );
            isValid = false;
        }
        return isValid;
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!validateForm()) {
            return;
        }
        setIsLoading(true);
        const payload = {
            name,
            email,
            cpf,
            password,
            phones: [phones],
        };
        const apiUrl = import.meta.env.VITE_API_BASE_URL + "/user";
        try {
            const response = await axios.post(apiUrl, payload);
            console.log("Usuário criado:", response.data);
            setApiMessage({
                type: "success",
                text: "Usuário criado com sucesso!",
            });
            setName("");
            setEmail("");
            setPassword("");
            setCpf("");
            setPhones("");
        } catch (error) {
            console.error("Erro ao criar usuário:", error);
            let errorMessage = "Erro ao criar usuário. Tente novamente.";
            if (axios.isAxiosError(error) && error.response?.data?.message) {
                errorMessage = error.response.data.message;
            }
            setApiMessage({ type: "error", text: errorMessage });
        } finally {
            setIsLoading(false);
        }
    };

    const getErrorClasses = (hasError: boolean) => {
        return hasError
        ? "ring-2 ring-red-500 border-red-500"
        : "focus:ring-2 focus:ring-[#1D3557]";
    };
    const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, "").slice(0, 11);
        value = value.replace(/(\d{3})(\d)/, "$1.$2");
        value = value.replace(/(\d{3})(\d)/, "$1.$2");
        value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
        setCpf(value);
        setCpfError(""); 
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, "").slice(0, 11);
        value = value.replace(/^(\d{2})(\d)/, "($1) $2");
        value = value.replace(/(\s\d{5})(\d)/, "$1-$2");
        setPhones(value);
        setPhoneError(""); 
    };

    return (
        <div className="flex h-screen overflow-hidden font-sans bg-[#F5F5DC]">
            <div className="hidden md:flex md:w-1/3 bg-[#457B9D] items-center justify-center p-12">
                <Home className="w-32 h-32 text-[#1D3557]" />
            </div>

            <div className="w-full md:w-2/3 flex items-center justify-center p-6 md:p-12 overflow-y-auto">
                <div className="w-full max-w-lg">
                    <Link 
                        to="/" 
                        className="hover:underline flex items-center text-sm text-[#1D3557] hover:underline mb-8"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        <span className="ml-1">Voltar para o site</span>
                    </Link>

                    <h1 className="text-4xl font-bold text-[#1D3557] mb-8">
                        Bem-vindo!
                    </h1>

                    <form onSubmit={handleSubmit} className="w-full space-y-2">
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
                            onChange={(e) => {
                                setName(e.target.value);
                                setNameError("");
                            }}
                            placeholder="Nome"
                            className={`w-full px-6 py-3 rounded-full bg-[#A8DADC] text-[#1D3557] placeholder-[#1D3557] placeholder-opacity-70 outline-none transition-all ${getErrorClasses(
                                !!nameError
                            )}`}
                        />
                        {nameError && (
                            <p className="text-xs text-red-600 ml-4 mt-1">{nameError}</p>
                        )}
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
                            onChange={(e) => {
                                setEmail(e.target.value);
                                setEmailError("");
                            }}
                            placeholder="Email"
                            className={`w-full px-6 py-3 rounded-full bg-[#A8DADC] text-[#1D3557] placeholder-[#1D3557] placeholder-opacity-70 outline-none transition-all ${getErrorClasses(
                                !!emailError
                            )}`}
                        />
                        {emailError && (
                            <p className="text-xs text-red-600 ml-4 mt-1">{emailError}</p>
                        )}
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
                            onChange={handleCpfChange} 
                            placeholder="CPF"
                            className={`w-full px-6 py-3 rounded-full bg-[#A8DADC] text-[#1D3557] placeholder-[#1D3557] placeholder-opacity-70 outline-none transition-all ${getErrorClasses(
                                !!cpfError
                            )}`}
                        />
                        {cpfError && (
                            <p className="text-xs text-red-600 ml-4 mt-1">{cpfError}</p>
                        )}
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
                            onChange={handlePhoneChange} 
                            placeholder="Telefone"
                            className={`w-full px-6 py-3 rounded-full bg-[#A8DADC] text-[#1D3557] placeholder-[#1D3557] placeholder-opacity-70 outline-none transition-all ${getErrorClasses(
                                !!phoneError
                            )}`}
                        />
                        {phoneError && (
                            <p className="text-xs text-red-600 ml-4 mt-1">{phoneError}</p>
                        )}
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
                            onChange={(e) => {
                            setPassword(e.target.value);
                            setPasswordError("");
                            }}
                            placeholder="Senha"
                            className={`w-full px-6 py-3 rounded-full bg-[#A8DADC] text-[#1D3557] placeholder-[#1D3557] placeholder-opacity-70 outline-none transition-all ${getErrorClasses(
                                !!passwordError
                            )}`}
                        />
                        {passwordError && (
                            <p className="text-xs text-red-600 ml-4 mt-1">
                            {passwordError}
                            </p>
                        )}
                        </div>

                        {apiMessage.text && (
                        <p
                            className={`text-center text-sm pt-2 ${
                            apiMessage.type === "success"
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                        >
                            {apiMessage.text}
                        </p>
                        )}

                        <button
                            type="submit"
                            className="w-full py-3 rounded-full bg-[#1D3557] text-white font-semibold text-lg hover:bg-opacity-90 transition-colors mt-6 disabled:opacity-50"
                            disabled={isLoading}
                        >
                            {isLoading ? "Cadastrando..." : "Cadastrar"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}