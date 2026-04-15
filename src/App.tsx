import { useState, useRef } from "react"
import LoadingScreen from "./components/LoadingScreen"
import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import About from "./components/About"
import Experience from "./components/Experience"
import Projects from "./components/Projects"
import Contact from "./components/Contact"

/* ================================
   App — Componente raiz
   Controla o fluxo de carregamento
   e renderiza as seções do portfólio
   ================================ */

export default function App() {
    const [carregado, setCarregado] = useState<boolean>(false)

    // Ref do logo no Navbar — usada pelo LoadingScreen para
    // calcular o destino exato do planeta ao voar
    const logoRef = useRef<HTMLImageElement | null>(null)

    return (
        <>
            {/* Tela de carregamento — some após o progresso completar */}
            {!carregado && (
                <LoadingScreen
                    onCarregado={() => setCarregado(true)}
                    logoRef={logoRef}
                />
            )}

            {/* Navbar — expõe o ref do logo para o LoadingScreen mirar */}
            <Navbar visivel={carregado} logoRef={logoRef} />

            {/* Portfólio principal */}
            <main>
                <Hero />
                <About />
                <Experience />
                <Projects />
            </main>

            {/* Contact age como footer também — sem padding bottom na Secao */}
            <Contact />
        </>
    )
}