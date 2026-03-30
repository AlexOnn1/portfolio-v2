import styled, { keyframes } from "styled-components"

/* ================================
   Hero — Seção principal
   Primeira coisa que o usuário vê
   após o loading screen
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

/* ================================
   Estrelas de fundo (geradas estaticamente)
   ================================ */

const STARS_HERO = Array.from({ length: 60 }, (_, i) => ({
    id: i,
    top: Math.random() * 100,
    left: Math.random() * 100,
    size: Math.random() < 0.7 ? 1 : 2,
    delay: 2 + Math.random() * 4,
    offset: Math.random() * 5,
}))

/* ================================
   Styled Components
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
`

interface StarProps {
    $top: number
    $left: number
    $size: number
    $delay: number
    $offset: number
}

const Star = styled.span<StarProps>`
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

const Conteudo = styled.div`
    position: relative;
    z-index: 1;
    max-width: 800px;
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
`

/* "Hi, i'm" — igual ao original mas mais sutil */
const Saudacao = styled.p`
    font-family: "Share Tech Mono", "Courier New", monospace;
    font-size: clamp(0.85rem, 2.5vw, 1rem);
    color: ${colors.mountainMeadow};
    letter-spacing: 0.2em;
    text-transform: uppercase;
    opacity: 0;
    animation: ${fadeSlideUp} 0.6s ease 0.2s forwards;
`

/* Nome principal */
const Nome = styled.h1`
    font-family: "Press Start 2P", "Courier New", monospace;
    font-size: clamp(2rem, 8vw, 4.5rem);
    color: ${colors.white};
    line-height: 1.3;
    opacity: 0;
    animation: ${fadeSlideUp} 0.6s ease 0.4s forwards;

    /* Destaque no ON */
    span {
        color: ${colors.caribbeanGreen};
    }
`

/* Cursor piscando após o nome */
const Cursor = styled.span`
    display: inline-block;
    width: clamp(2px, 0.8vw, 4px);
    height: 0.85em;
    background: ${colors.caribbeanGreen};
    margin-left: 4px;
    vertical-align: middle;
    animation: ${piscarCursor} 1s step-end infinite;
`

/* Título / cargo */
const Titulo = styled.h2`
    font-family: "Share Tech Mono", "Courier New", monospace;
    font-size: clamp(1rem, 3.5vw, 1.4rem);
    color: ${colors.mountainMeadow};
    font-weight: 400;
    letter-spacing: 0.05em;
    opacity: 0;
    animation: ${fadeSlideUp} 0.6s ease 0.6s forwards;
`

/* Descrição curta */
const Descricao = styled.p`
    font-family: "Share Tech Mono", "Courier New", monospace;
    font-size: clamp(0.85rem, 2vw, 1rem);
    color: rgba(241, 247, 246, 0.65);
    line-height: 1.8;
    max-width: 520px;
    opacity: 0;
    animation: ${fadeSlideUp} 0.6s ease 0.8s forwards;

    @media (min-width: 768px) {
        font-size: 1rem;
    }
`

/* Botões de ação */
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

/* ================================
   Componente principal
   ================================ */

export default function Hero() {
    return (
        <Secao id="home">

            {/* Estrelas de fundo */}
            {STARS_HERO.map((star) => (
                <Star
                    key={star.id}
                    $top={star.top}
                    $left={star.left}
                    $size={star.size}
                    $delay={star.delay}
                    $offset={star.offset}
                />
            ))}

            <Conteudo>

                {/* Saudação */}
                <Saudacao>Hi, i'm</Saudacao>

                {/* Nome com cursor piscando */}
                <Nome>
                    ALEX<span>ON</span>
                    <Cursor />
                </Nome>

                {/* Cargo */}
                <Titulo>Front-End Developer</Titulo>

                {/* Descrição */}
                <Descricao>
                    Computer Science student passionate about building
                    intuitive and functional web experiences.
                </Descricao>

                {/* CTAs */}
                <BotoesContainer>
                    <BotaoPrimario href="#projects">
                        See my work
                    </BotaoPrimario>
                    <BotaoSecundario href="#contact">
                        Get in touch
                    </BotaoSecundario>
                </BotoesContainer>

            </Conteudo>

        </Secao>
    )
}