import React from "react"

export function Banner () {
    return (
        <div className="relative w-full min-h-[400px] md:min-h-[600px] flex items-center justify-center">
            <img
                src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=1974&auto=format&fit=crop"
                alt="Varanda de resort de frente para o mar"
                className="absolute inset-0 w-full h-full object-cover -z-10"
            />

            <div className="absolute inset-0 bg-black/50" />

            <div className="relative z-10 text-center p-4">
                <h1 className="text-4xl md:text-6xl text-white font-bold leading-tight shadow-text">
                    Mais do que uma estadia,<br />uma experiência inesquecível.
                </h1>
            </div>
        </div>
    );
}