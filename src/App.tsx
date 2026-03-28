import { useState } from "react"
import LoadingScreen from "./components/LoadingScreen"
import Navbar from "./components/Navbar"

// Seções do portfólio (serão importadas conforme formos construindo)
// import Hero from "./components/Hero"
// import About from "./components/About"
// import Experience from "./components/Experience"
// import Projects from "./components/Projects"
// import Contact from "./components/Contact"

/* ================================
   App — Componente raiz
   Controla o fluxo de carregamento
   e renderiza as seções do portfólio
   ================================ */

export default function App() {
    const [carregado, setCarregado] = useState<boolean>(false)

    return (
        <>
            {/* Tela de carregamento — some após o progresso completar */}
            {!carregado && (
                <LoadingScreen onCarregado={() => setCarregado(true)} />
            )}

            {/* Navbar — recebe visivel para animar o logo planeta */}
            <Navbar visivel={carregado} />

            {/* Portfólio principal */}
            <main>
                {/* <Hero /> */}
                {/* <About /> */}
                {/* <Experience /> */}
                {/* <Projects /> */}
            </main>

            {/* <Contact /> */}
        </>
    )
}
