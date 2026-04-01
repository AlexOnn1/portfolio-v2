import { useState, useEffect, useRef, memo } from "react"
import styled, { keyframes } from "styled-components"
import D20Visualizer from "./D20Visualizer"

/* ================================
   Hero — Seção principal
   ================================ */

const colors = {
    richBlack: "#000F08",
    darkGreen: "#032221",
    bangladeshGreen: "#03624C",
    mountainMeadow: "#2CC295",
    caribbeanGreen: "#00DF91",
    white: "#F1F7F6",
}

/* ================================
   Animações
   ================================ */

const fadeSlideUp = keyframes`
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0);    }
`

const piscarCursor = keyframes`
    0%, 100% { opacity: 1; }
    50%       { opacity: 0; }
`

const starTwinkle = keyframes`
    0%, 100% { opacity: 0.15; }
    50%       { opacity: 0.8;  }
`

const descerSeta = keyframes`
    0%   { opacity: 0; transform: translateY(-6px) rotate(45deg) translate(-2px, -2px); }
    50%  { opacity: 1; transform: translateY(0) rotate(45deg) translate(-2px, -2px);    }
    100% { opacity: 0; transform: translateY(6px) rotate(45deg) translate(-2px, -2px);  }
`

/* ================================
   Estrelas — em memo para nunca re-renderizar
   ================================ */

const STARS_HERO = Array.from({ length: 60 }, (_, i) => ({
    id: i,
    top: Math.random() * 100,
    left: Math.random() * 100,
    size: Math.random() < 0.7 ? 1 : 2,
    delay: 2 + Math.random() * 4,
    offset: Math.random() * 5,
}))

interface StarProps {
    $top: number
    $left: number
    $size: number
    $delay: number
    $offset: number
}

const StarEl = styled.span<StarProps>`
    position: absolute;
    width: ${({ $size }) => $size}px;
    height: ${({ $size }) => $size}px;
    border-radius: 50%;
    background: ${colors.white};
    top: ${({ $top }) => $top}%;
    left: ${({ $left }) => $left}%;
    pointer-events: none;
    animation: ${starTwinkle} ${({ $delay }) => $delay}s infinite ease-in-out;
    animation-delay: ${({ $offset }) => $offset}s;
`

// Memo: as estrelas nunca mudam, não precisam re-renderizar
const StarField = memo(function StarField() {
    return (
        <>
            {STARS_HERO.map((star) => (
                <StarEl
                    key={star.id}
                    $top={star.top}
                    $left={star.left}
                    $size={star.size}
                    $delay={star.delay}
                    $offset={star.offset}
                />
            ))}
        </>
    )
})

/* ================================
   Typewriter — componente isolado
   FIX PERFORMANCE: o state de texto fica aqui dentro.
   Quando a letra muda, só este componente re-renderiza,
   não o Hero inteiro (e não o D20Visualizer).
   ================================ */

const TEXTO_PRINCIPAL = "Front-End Developer"

const TEXTOS_SECUNDARIOS = [
    "A good Front-End Developer",
    "Nerd 🤓",
    "Future Fullstack Developer",
    "DungeonMaster 🎲🐲",
    "Hardworking Programmer! 🚀",
    "A awesome person! (i try...)",
]

const VELOCIDADE_DIGITAR    = 120
const VELOCIDADE_APAGAR     = 60
const PAUSA_ANTES_APAGAR    = 1500
const PAUSA_ANTES_DIGITAR   = 400
const PAUSA_TEXTO_PRINCIPAL = 15000

const TituloContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2px;
    min-height: 2rem;
    opacity: 0;
    animation: ${fadeSlideUp} 0.6s ease 0.6s forwards;

    @media (min-width: 768px) {
        justify-content: flex-start;
    }
`

const TituloTexto = styled.h2`
    font-family: "Share Tech Mono", "Courier New", monospace;
    font-size: clamp(1rem, 3.5vw, 1.4rem);
    color: ${colors.mountainMeadow};
    font-weight: 400;
    letter-spacing: 0.05em;
`

const Cursor = styled.span`
    display: inline-block;
    width: clamp(2px, 0.8vw, 3px);
    height: 1.2em;
    background: ${colors.caribbeanGreen};
    vertical-align: middle;
    animation: ${piscarCursor} 1s step-end infinite;
`

function Typewriter() {
    const [textoAtual, setTextoAtual] = useState<string>("")
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    useEffect(() => {
        const tickSecundario = (
            textoCorrente: string,
            estaApagando: boolean,
            indice: number
        ) => {
            const textoAlvo = TEXTOS_SECUNDARIOS[indice]

            if (estaApagando) {
                const proximo = textoCorrente.slice(0, textoCorrente.length - 1)
                setTextoAtual(proximo)

                if (proximo === "") {
                    const proximoIndice = indice + 1
                    if (proximoIndice < TEXTOS_SECUNDARIOS.length) {
                        timeoutRef.current = setTimeout(
                            () => tickSecundario("", false, proximoIndice),
                            PAUSA_ANTES_DIGITAR
                        )
                    } else {
                        timeoutRef.current = setTimeout(
                            () => tickPrincipal("", false),
                            PAUSA_ANTES_DIGITAR
                        )
                    }
                } else {
                    timeoutRef.current = setTimeout(
                        () => tickSecundario(proximo, true, indice),
                        VELOCIDADE_APAGAR
                    )
                }
            } else {
                const proximo = textoAlvo.slice(0, textoCorrente.length + 1)
                setTextoAtual(proximo)

                if (proximo === textoAlvo) {
                    timeoutRef.current = setTimeout(
                        () => tickSecundario(proximo, true, indice),
                        PAUSA_ANTES_APAGAR
                    )
                } else {
                    timeoutRef.current = setTimeout(
                        () => tickSecundario(proximo, false, indice),
                        VELOCIDADE_DIGITAR
                    )
                }
            }
        }

        const tickPrincipal = (textoCorrente: string, estaApagando: boolean) => {
            if (estaApagando) {
                const proximo = textoCorrente.slice(0, textoCorrente.length - 1)
                setTextoAtual(proximo)

                if (proximo === "") {
                    timeoutRef.current = setTimeout(
                        () => tickSecundario("", false, 0),
                        PAUSA_ANTES_DIGITAR
                    )
                } else {
                    timeoutRef.current = setTimeout(
                        () => tickPrincipal(proximo, true),
                        VELOCIDADE_APAGAR
                    )
                }
            } else {
                const proximo = TEXTO_PRINCIPAL.slice(0, textoCorrente.length + 1)
                setTextoAtual(proximo)

                if (proximo === TEXTO_PRINCIPAL) {
                    timeoutRef.current = setTimeout(
                        () => tickPrincipal(proximo, true),
                        PAUSA_TEXTO_PRINCIPAL
                    )
                } else {
                    timeoutRef.current = setTimeout(
                        () => tickPrincipal(proximo, false),
                        VELOCIDADE_DIGITAR
                    )
                }
            }
        }

        timeoutRef.current = setTimeout(
            () => tickPrincipal("", false),
            VELOCIDADE_DIGITAR
        )

        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current)
        }
    }, [])

    return (
        <TituloContainer>
            <TituloTexto>{textoAtual}</TituloTexto>
            <Cursor />
        </TituloContainer>
    )
}

/* ================================
   Styled Components do Hero
   ================================ */

const Secao = styled.section`
    position: relative;
    min-height: 100dvh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 6rem 1.5rem 3rem;
    overflow: hidden;
    background: radial-gradient(
        ellipse at 50% 80%,
        ${colors.darkGreen} 0%,
        ${colors.richBlack} 55%,
        #000 100%
    );

    @media (min-width: 768px) {
        padding: 8rem 3rem 4rem;
        text-align: left;
        align-items: flex-start;
    }

    @media (min-width: 992px) {
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }
`

const LadoDireito = styled.div`
    display: none;

    @media (min-width: 992px) {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
    }
`

const Conteudo = styled.div`
    position: relative;
    z-index: 1;
    max-width: 800px;
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
`

const Saudacao = styled.p`
    font-family: "Share Tech Mono", "Courier New", monospace;
    font-size: clamp(0.85rem, 2.5vw, 1rem);
    color: ${colors.mountainMeadow};
    letter-spacing: 0.2em;
    text-transform: uppercase;
    opacity: 0;
    animation: ${fadeSlideUp} 0.6s ease 0.2s forwards;
`

const Nome = styled.h1`
    font-family: "Press Start 2P", "Courier New", monospace;
    font-size: clamp(2rem, 8vw, 4.5rem);
    color: ${colors.white};
    line-height: 1.3;
    opacity: 0;
    animation: ${fadeSlideUp} 0.6s ease 0.4s forwards;

    span {
        color: ${colors.caribbeanGreen};
    }
`

const Descricao = styled.p`
    font-family: "Share Tech Mono", "Courier New", monospace;
    font-size: clamp(0.85rem, 2vw, 1rem);
    color: rgba(241, 247, 246, 0.65);
    line-height: 1.8;
    max-width: 520px;
    opacity: 0;
    animation: ${fadeSlideUp} 0.6s ease 0.8s forwards;
`

const BotoesContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 0.5rem;
    opacity: 0;
    animation: ${fadeSlideUp} 0.6s ease 1s forwards;

    @media (min-width: 480px) {
        flex-direction: row;
        align-items: center;
    }
`

const BotaoPrimario = styled.a`
    font-family: "Share Tech Mono", "Courier New", monospace;
    font-size: 0.9rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: ${colors.richBlack};
    background: ${colors.caribbeanGreen};
    padding: 0.85rem 1.75rem;
    border-radius: 4px;
    text-decoration: none;
    text-align: center;
    transition: background 0.3s ease, transform 0.2s ease;

    &:hover {
        background: ${colors.mountainMeadow};
        transform: translateY(-2px);
    }
`

const BotaoSecundario = styled.a`
    font-family: "Share Tech Mono", "Courier New", monospace;
    font-size: 0.9rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: ${colors.caribbeanGreen};
    border: 1px solid ${colors.caribbeanGreen};
    padding: 0.85rem 1.75rem;
    border-radius: 4px;
    text-decoration: none;
    text-align: center;
    transition: background 0.3s ease, color 0.3s ease, transform 0.2s ease;

    &:hover {
        background: rgba(0, 223, 145, 0.08);
        transform: translateY(-2px);
    }
`

const ScrollIndicator = styled.a`
    position: absolute;
    bottom: 2rem;
    left: 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.4rem;
    text-decoration: none;
    opacity: 0;
    animation: ${fadeSlideUp} 0.6s ease 1.4s forwards;
    z-index: 1;
`

const ScrollTexto = styled.span`
    font-family: "Share Tech Mono", "Courier New", monospace;
    font-size: 0.65rem;
    color: rgba(44, 194, 149, 0.5);
    letter-spacing: 0.2em;
    text-transform: uppercase;
`

const ChevronWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    overflow: visible;
    padding: 4px;
`

const Chevron = styled.span<{ $delay: number }>`
    display: block;
    width: 10px;
    height: 10px;
    border-right: 2px solid ${colors.mountainMeadow};
    border-bottom: 2px solid ${colors.mountainMeadow};
    transform: rotate(45deg) translate(-2px, -2px);
    animation: ${descerSeta} 1.4s ease-in-out infinite;
    animation-delay: ${({ $delay }) => $delay}s;
`

/* ================================
   Componente principal
   ================================ */

export default function Hero() {
    return (
        <Secao id="home">

            {/* Estrelas em memo — nunca re-renderizam */}
            <StarField />

            {/* Conteúdo textual */}
            <Conteudo>
                <Saudacao>Hi, i'm</Saudacao>

                <Nome>
                    ALEX<span>ON</span>
                </Nome>

                {/*
                 * FIX PERFORMANCE: Typewriter isolado em componente próprio.
                 * O state de texto fica confinado aqui — o Hero e o D20Visualizer
                 * NÃO re-renderizam a cada letra digitada.
                 */}
                <Typewriter />

                <Descricao>
                    Computer Science student passionate about building
                    intuitive and functional web experiences.
                </Descricao>

                <BotoesContainer>
                    <BotaoPrimario href="#projects">
                        See my work
                    </BotaoPrimario>
                    <BotaoSecundario href="#contact">
                        Get in touch
                    </BotaoSecundario>
                </BotoesContainer>
            </Conteudo>

            {/* D20 + órbita — desktop only */}
            <LadoDireito>
                <D20Visualizer />
            </LadoDireito>

            <ScrollIndicator href="#about">
                <ScrollTexto>scroll</ScrollTexto>
                <ChevronWrapper>
                    <Chevron $delay={0}   />
                    <Chevron $delay={0.2} />
                    <Chevron $delay={0.4} />
                </ChevronWrapper>
            </ScrollIndicator>

        </Secao>
    )
}