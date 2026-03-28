import { useState, useEffect, useRef } from "react"
import styled, { keyframes, css } from "styled-components"

/* ================================
   LoadingScreen — Tela de carregamento
   Exibe antes do portfólio principal
   O planeta voa para o header ao terminar
   ================================ */

// Paleta de cores
const colors = {
    richBlack: "#000F08",
    darkGreen: "#032221",
    bangladeshGreen: "#03624C",
    mountainMeadow: "#2CC295",
    caribbeanGreen: "#00DF91",
    white: "#F1F7F6",
}

// Tipos
interface LoadingScreenProps {
    onCarregado: () => void
}

interface StarProps {
    $top: number
    $left: number
    $size: number
    $delay: number
    $offset: number
}

interface LetraProps {
    $index: number
    $destaque: boolean
}

interface OverlayProps {
    $saindo: boolean
}

interface ProgressoProps {
    $pct: number
}

interface PlanetaWrapperProps {
    $voando: boolean
    $destinoX: number
    $destinoY: number
}

/* ================================
   Animações
   ================================ */

const blink = keyframes`
    0%, 100% { opacity: 1; }
    50%       { opacity: 0; }
`

const fadeInLetter = keyframes`
    from { opacity: 0; transform: translateY(8px); }
    to   { opacity: 1; transform: translateY(0);   }
`

const pulseGlow = keyframes`
    0%, 100% {
        text-shadow:
            0 0 10px rgba(0, 223, 145, 0.4),
            0 0 20px rgba(0, 223, 145, 0.2);
    }
    50% {
        text-shadow:
            0 0 20px rgba(0, 223, 145, 0.8),
            0 0 40px rgba(0, 223, 145, 0.4),
            0 0 60px rgba(0, 223, 145, 0.2);
    }
`

const fadeOut = keyframes`
    from { opacity: 1; }
    to   { opacity: 0; pointer-events: none; }
`

const starTwinkle = keyframes`
    0%, 100% { opacity: 0.2; }
    50%       { opacity: 1;   }
`

const ringRotate = keyframes`
    from { transform: rotate(0deg);   }
    to   { transform: rotate(360deg); }
`

/* ================================
   Styled Components
   ================================ */

const Overlay = styled.div<OverlayProps>`
    position: fixed;
    inset: 0;
    background: radial-gradient(
        ellipse at 60% 70%,
        ${colors.darkGreen} 0%,
        ${colors.richBlack} 60%,
        #000 100%
    );
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    gap: 1.5rem;

    ${({ $saindo }) =>
        $saindo &&
        css`
            animation: ${fadeOut} 0.6s ease 0.9s forwards;
        `}
`

const StarsCanvas = styled.div`
    position: absolute;
    inset: 0;
    overflow: hidden;
    pointer-events: none;
`

const Star = styled.span<StarProps>`
    position: absolute;
    width: ${({ $size }) => $size}px;
    height: ${({ $size }) => $size}px;
    border-radius: 50%;
    background: ${colors.white};
    top: ${({ $top }) => $top}%;
    left: ${({ $left }) => $left}%;
    animation: ${starTwinkle} ${({ $delay }) => $delay}s infinite ease-in-out;
    animation-delay: ${({ $offset }) => $offset}s;
`

/* Wrapper do planeta — vira position:fixed quando voa */
const PlanetaWrapper = styled.div<PlanetaWrapperProps>`
    position: relative;
    width: 100px;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;

    /* Anel decorativo */
    &::after {
        content: "";
        position: absolute;
        width: 130%;
        height: 130%;
        border-radius: 50%;
        border: 1px solid rgba(44, 194, 149, 0.3);
        animation: ${ringRotate} 8s linear infinite;
    }

    /* Quando voando: sai do fluxo e anima até o destino */
    ${({ $voando, $destinoX, $destinoY }) =>
        $voando &&
        css`
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            animation: voarParaHeader 0.9s cubic-bezier(0.4, 0, 0.2, 1) forwards;

            @keyframes voarParaHeader {
                0% {
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%) scale(1);
                    opacity: 1;
                }
                60% {
                    opacity: 1;
                }
                100% {
                    top: ${$destinoY}px;
                    left: ${$destinoX}px;
                    transform: translate(0, 0) scale(0.45);
                    opacity: 0;
                }
            }

            &::after {
                display: none;
            }
        `}
`

const LogoImagem = styled.img`
    width: 100%;
    height: 100%;
    border-radius: 50%;
    filter: drop-shadow(0 0 16px rgba(0, 223, 145, 0.5));
    object-fit: cover;
`

const NomeContainer = styled.div`
    display: flex;
    gap: 0.12rem;
    align-items: center;
`

const Letra = styled.span<LetraProps>`
    font-family: "Press Start 2P", "Courier New", monospace;
    font-size: clamp(1.8rem, 7vw, 3.5rem);
    color: ${({ $destaque }) => ($destaque ? colors.caribbeanGreen : colors.white)};
    opacity: 0;
    animation:
        ${fadeInLetter} 0.4s ease forwards,
        ${({ $destaque }) => ($destaque ? blink : pulseGlow)}
        ${({ $destaque }) => ($destaque ? "1.2s" : "3s")}
        ease-in-out infinite;
    animation-delay:
        ${({ $index }) => $index * 0.1}s,
        ${({ $index }) => $index * 0.3}s;
`

const Subtitulo = styled.p`
    font-family: "Share Tech Mono", "Courier New", monospace;
    font-size: clamp(0.65rem, 2.5vw, 0.9rem);
    color: ${colors.mountainMeadow};
    letter-spacing: 0.3em;
    text-transform: uppercase;
    opacity: 0;
    animation: ${fadeInLetter} 0.6s ease forwards;
    animation-delay: 0.9s;
`

const BarraProgresso = styled.div`
    width: min(200px, 60vw);
    height: 2px;
    background: rgba(44, 194, 149, 0.15);
    border-radius: 2px;
    overflow: hidden;
    margin-top: 0.5rem;
`

const Progresso = styled.div<ProgressoProps>`
    height: 100%;
    background: linear-gradient(
        90deg,
        ${colors.bangladeshGreen},
        ${colors.caribbeanGreen}
    );
    width: ${({ $pct }) => $pct}%;
    transition: width 0.1s linear;
    border-radius: 2px;
`

/* ================================
   Dados estáticos
   ================================ */

// Estrelas geradas uma única vez (evita re-render)
const STARS = Array.from({ length: 80 }, (_, i) => ({
    id: i,
    top: Math.random() * 100,
    left: Math.random() * 100,
    size: Math.random() < 0.7 ? 1 : 2,
    delay: 2 + Math.random() * 3,
    offset: Math.random() * 4,
}))

const LETRAS = ["A", "L", "E", "X", "O", "N"]
const LETRAS_DESTAQUE = [4, 5] // O e N em verde caribenho

/* ================================
   Componente principal
   ================================ */

export default function LoadingScreen({ onCarregado }: LoadingScreenProps) {
    const [progresso, setProgresso] = useState<number>(0)
    const [voando, setVoando] = useState<boolean>(false)
    const [saindo, setSaindo] = useState<boolean>(false)

    // Destino do planeta no header (posição do logo)
    const [destinoX, setDestinoX] = useState<number>(16)
    const [destinoY, setDestinoY] = useState<number>(12)

    const planetaRef = useRef<HTMLDivElement>(null)

    // Calcula o destino baseado no tamanho real da tela
    useEffect(() => {
        const calcularDestino = () => {
            // Padding do navbar: 16px da esquerda, 12px do topo
            setDestinoX(16)
            setDestinoY(12)
        }
        calcularDestino()
        window.addEventListener("resize", calcularDestino)
        return () => window.removeEventListener("resize", calcularDestino)
    }, [])

    // Simula progresso de carregamento
    useEffect(() => {
        const intervalo = setInterval(() => {
            setProgresso((prev) => {
                if (prev >= 100) {
                    clearInterval(intervalo)

                    // Pequena pausa → inicia voo do planeta
                    setTimeout(() => {
                        setVoando(true)

                        // Após o voo: fade out + chama onCarregado
                        setTimeout(() => {
                            setSaindo(true)
                            setTimeout(() => onCarregado(), 700)
                        }, 600)
                    }, 300)

                    return 100
                }

                // Velocidade variável — parece mais natural
                const incremento = prev < 70 ? 2 : prev < 90 ? 1 : 0.5
                return Math.min(prev + incremento, 100)
            })
        }, 40)

        return () => clearInterval(intervalo)
    }, [onCarregado])

    return (
        <Overlay $saindo={saindo}>

            {/* Estrelas de fundo */}
            <StarsCanvas>
                {STARS.map((star) => (
                    <Star
                        key={star.id}
                        $top={star.top}
                        $left={star.left}
                        $size={star.size}
                        $delay={star.delay}
                        $offset={star.offset}
                    />
                ))}
            </StarsCanvas>

            {/* Logo planeta */}
            <PlanetaWrapper
                ref={planetaRef}
                $voando={voando}
                $destinoX={destinoX}
                $destinoY={destinoY}
            >
                <LogoImagem
                    src={`${import.meta.env.BASE_URL}Logo.svg`}
                    alt="Logo Alexon"
                />
            </PlanetaWrapper>

            {/* Nome ALEXON com letras animadas */}
            <NomeContainer>
                {LETRAS.map((letra, index) => (
                    <Letra
                        key={letra + index}
                        $index={index}
                        $destaque={LETRAS_DESTAQUE.includes(index)}
                    >
                        {letra}
                    </Letra>
                ))}
            </NomeContainer>

            {/* Subtítulo */}
            <Subtitulo>Front-End Developer</Subtitulo>

            {/* Barra de progresso */}
            <BarraProgresso>
                <Progresso $pct={progresso} />
            </BarraProgresso>

        </Overlay>
    )
}
