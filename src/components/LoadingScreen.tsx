import { useState, useEffect, useRef, type RefObject } from "react"
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
    logoRef: RefObject<HTMLImageElement | null>
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
    $translateX: number
    $translateY: number
    $voando: boolean
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
            animation: ${fadeOut} 0.5s ease 0.7s forwards;
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

/*
   PlanetaWrapper permanece no fluxo normal — sem position fixed.
   O voo é feito inteiramente via transform: translate + scale,
   então os elementos irmãos nunca se reorganizam (zero flicker).
*/
const PlanetaWrapper = styled.div<PlanetaWrapperProps>`
    position: relative;
    width: 100px;
    height: 100px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;

    /* Anel decorativo — some antes do voo */
    &::after {
        content: "";
        position: absolute;
        width: 130%;
        height: 130%;
        border-radius: 50%;
        border: 1px solid rgba(44, 194, 149, 0.3);
        animation: ${ringRotate} 8s linear infinite;
        opacity: ${({ $voando }) => ($voando ? 0 : 1)};
        transition: opacity 0.15s ease;
    }

    ${({ $voando, $translateX, $translateY }) =>
        $voando &&
        css`
            transition:
                transform 0.85s cubic-bezier(0.4, 0, 0.2, 1),
                opacity   0.25s ease 0.6s;
            transform: translate(${$translateX}px, ${$translateY}px) scale(0.42);
            opacity: 0;
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

export default function LoadingScreen({ onCarregado, logoRef }: LoadingScreenProps) {
    const [progresso, setProgresso] = useState<number>(0)
    const [voando, setVoando] = useState<boolean>(false)
    const [saindo, setSaindo] = useState<boolean>(false)
    const [translateX, setTranslateX] = useState<number>(0)
    const [translateY, setTranslateY] = useState<number>(0)

    const planetaRef = useRef<HTMLDivElement>(null)

    /*
       Calcula o translate usando getBoundingClientRect() de ambos:
       - planetaRef: posição atual do planeta na loading screen
       - logoRef:    posição real do logo no Navbar no DOM

       A diferença entre os centros é exatamente o translate necessário.
    */
    const calcularTranslate = () => {
        if (!planetaRef.current || !logoRef.current) return

        const planeta = planetaRef.current.getBoundingClientRect()
        const logo    = logoRef.current.getBoundingClientRect()

        const planetaCentroX = planeta.left + planeta.width  / 2
        const planetaCentroY = planeta.top  + planeta.height / 2

        const logoCentroX = logo.left + logo.width  / 2
        const logoCentroY = logo.top  + logo.height / 2

        setTranslateX(logoCentroX - planetaCentroX)
        setTranslateY(logoCentroY - planetaCentroY)
    }

    // Simula progresso de carregamento
    useEffect(() => {
        const intervalo = setInterval(() => {
            setProgresso((prev) => {
                if (prev >= 100) {
                    clearInterval(intervalo)

                    setTimeout(() => {
                        // Calcula destino real no momento exato do voo
                        calcularTranslate()
                        setVoando(true)

                        // Após o voo: fade out e chama onCarregado
                        setTimeout(() => {
                            setSaindo(true)
                            setTimeout(() => onCarregado(), 600)
                        }, 550)
                    }, 300)

                    return 100
                }

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

            {/* Logo planeta — permanece no fluxo, voa via transform */}
            <PlanetaWrapper
                ref={planetaRef}
                $voando={voando}
                $translateX={translateX}
                $translateY={translateY}
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