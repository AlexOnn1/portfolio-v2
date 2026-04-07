import { useRef, useEffect } from "react"
import styled, { keyframes, css } from "styled-components"
import { FaReact, FaPython, FaJs, FaPhp, FaHtml5, FaCss3Alt, FaGithub, FaGitAlt, FaWordpress } from "react-icons/fa"
import { SiMysql, SiTailwindcss, SiDjango } from "react-icons/si"

/* ================================
   About — Seção sobre mim
   Mobile-first | Animações com IntersectionObserver
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
   Animações — disparadas pelo IntersectionObserver
   ================================ */

const fadeSlideUp = keyframes`
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0);    }
`

/*
   Elementos iniciam invisíveis.
   Quando o IntersectionObserver detecta que entraram na viewport,
   adiciona a classe "visivel" que dispara o fadeSlideUp.
   Cada bloco tem um delay diferente para efeito escalonado.
*/
const animacaoBase = css`
    opacity: 0;
    transform: translateY(24px);
    transition: opacity 0.01s; /* fallback sem JS */

    &.visivel {
        animation: ${fadeSlideUp} 0.7s ease forwards;
    }
`

/* ================================
   Styled Components
   ================================ */

const Secao = styled.section`
    position: relative;
    background-color: ${colors.darkGreen};
    padding: 5rem 1.5rem;

    @media (min-width: 768px) {
        padding: 7rem 3rem;
    }
`

const Container = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 3rem;
`

/* Título da seção */
const TituloContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    ${animacaoBase}

    &.visivel {
        animation-delay: 0s;
    }
`

const Rotulo = styled.span`
    font-family: "Share Tech Mono", "Courier New", monospace;
    font-size: 0.75rem;
    color: ${colors.caribbeanGreen};
    letter-spacing: 0.3em;
    text-transform: uppercase;
`

const Titulo = styled.h2`
    font-family: "Press Start 2P", "Courier New", monospace;
    font-size: clamp(1.4rem, 4vw, 2rem);
    color: ${colors.white};
    line-height: 1.4;

    span {
        color: ${colors.caribbeanGreen};
    }
`

const LinhaDivisoria = styled.div`
    width: 60px;
    height: 2px;
    background: linear-gradient(
        90deg,
        ${colors.caribbeanGreen},
        transparent
    );
    margin-top: 0.5rem;
`

/* Grid principal — foto + texto */
const Grid = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 2.5rem;
    ${animacaoBase}

    &.visivel {
        animation-delay: 0.15s;
    }

    @media (min-width: 768px) {
        grid-template-columns: 280px 1fr;
        gap: 4rem;
        align-items: start;
    }
`

/* Coluna da foto */
const FotoContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;

    @media (min-width: 768px) {
        align-items: flex-start;
    }
`

const FotoWrapper = styled.div`
    position: relative;
    width: 200px;
    height: 200px;

    /* Borda decorativa deslocada */
    &::before {
        content: "";
        position: absolute;
        inset: 0;
        border: 2px solid ${colors.caribbeanGreen};
        border-radius: 50%;
        transform: translate(8px, 8px);
        opacity: 0.4;
        transition: transform 0.3s ease;
    }

    &:hover::before {
        transform: translate(4px, 4px);
    }

    @media (min-width: 768px) {
        width: 240px;
        height: 240px;
    }
`

/* Placeholder da foto — será substituído pela foto real */
const FotoPlaceholder = styled.div`
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: linear-gradient(
        135deg,
        ${colors.bangladeshGreen} 0%,
        ${colors.darkGreen} 100%
    );
    border: 2px solid rgba(44, 194, 149, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: "Press Start 2P", monospace;
    font-size: 3rem;
    color: ${colors.caribbeanGreen};
    opacity: 0.6;
`

/* Coluna do texto */
const TextoContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
`

const Paragrafo = styled.p`
    font-family: "Share Tech Mono", "Courier New", monospace;
    font-size: clamp(0.85rem, 1.5vw, 1rem);
    color: rgba(241, 247, 246, 0.75);
    line-height: 1.9;
`

/* Cards de resumo — "Too long? Didn't read?" */
const CardsContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 0.5rem;
    ${animacaoBase}

    &.visivel {
        animation-delay: 0.3s;
    }
`

const CardsTitulo = styled.p`
    font-family: "Press Start 2P", "Courier New", monospace;
    font-size: 0.6rem;
    color: ${colors.caribbeanGreen};
    letter-spacing: 0.05em;
    opacity: 0.8;
`

const CardsGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 0.75rem;

    @media (min-width: 480px) {
        grid-template-columns: repeat(3, 1fr);
    }
`

const Card = styled.div`
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.85rem 1rem;
    background: rgba(3, 98, 76, 0.2);
    border: 1px solid rgba(44, 194, 149, 0.15);
    border-radius: 8px;
    transition: background 0.3s ease, border-color 0.3s ease;

    &:hover {
        background: rgba(3, 98, 76, 0.35);
        border-color: rgba(44, 194, 149, 0.4);
    }
`

const CardIcone = styled.span`
    font-size: 1.3rem;
    flex-shrink: 0;
`

const CardTexto = styled.span`
    font-family: "Share Tech Mono", "Courier New", monospace;
    font-size: 0.8rem;
    color: ${colors.white};
    letter-spacing: 0.02em;
`

/* Dados dos cards */
const CARDS = [
    { icone: "⌨️", texto: "Web Developer"       },
    { icone: "📖", texto: "Front-End Enthusiast" },
    { icone: "🎲", texto: "Nerd"                 },
]

/* ================================
   Skills — tecnologias conhecidas
   ================================ */

const SKILLS = [
    { icone: FaHtml5,      label: "HTML5",      cor: "#E34F26" },
    { icone: FaCss3Alt,    label: "CSS3",        cor: "#1572B6" },
    { icone: FaJs,         label: "JavaScript",  cor: "#F7DF1E" },
    { icone: FaReact,      label: "React",       cor: "#61DAFB" },
    { icone: SiTailwindcss,label: "Tailwind",    cor: "#38BDF8" },
    { icone: FaPython,     label: "Python",      cor: "#3776AB" },
    { icone: SiDjango,     label: "Django",      cor: "#092E20" },
    { icone: FaPhp,        label: "PHP",         cor: "#777BB4" },
    { icone: SiMysql,      label: "MySQL",       cor: "#4479A1" },
    { icone: FaWordpress,  label: "WordPress",   cor: "#21759B" },
    { icone: FaGithub,     label: "GitHub",      cor: "#F1F7F6" },
    { icone: FaGitAlt,     label: "Git",         cor: "#F05032" },
]

/* Seção de skills */
const SkillsContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    ${animacaoBase}

    &.visivel {
        animation-delay: 0.1s;
    }
`

const SkillsRotulo = styled.span`
    font-family: "Share Tech Mono", "Courier New", monospace;
    font-size: 0.75rem;
    color: ${colors.caribbeanGreen};
    letter-spacing: 0.3em;
    text-transform: uppercase;
`

const SkillsTitulo = styled.h3`
    font-family: "Press Start 2P", "Courier New", monospace;
    font-size: clamp(0.9rem, 2.5vw, 1.1rem);
    color: ${colors.white};
    line-height: 1.4;
    margin-top: 0.25rem;
`

const SkillsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0.75rem;

    @media (min-width: 480px) {
        grid-template-columns: repeat(6, 1fr);
    }

    @media (min-width: 768px) {
        grid-template-columns: repeat(4, 1fr);
    }

    @media (min-width: 992px) {
        grid-template-columns: repeat(6, 1fr);
    }
`

interface SkillCardProps {
    $cor: string
}

const SkillCard = styled.div<SkillCardProps>`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.85rem 0.5rem;
    background: rgba(3, 98, 76, 0.15);
    border: 1px solid rgba(44, 194, 149, 0.12);
    border-radius: 10px;
    cursor: default;
    transition: background 0.3s ease, border-color 0.3s ease,
                transform 0.2s ease, box-shadow 0.3s ease;

    /* Ícone */
    svg {
        font-size: 1.6rem;
        color: rgba(241, 247, 246, 0.5);
        transition: color 0.3s ease;
    }

    &:hover {
        background: rgba(3, 98, 76, 0.3);
        border-color: ${({ $cor }) => $cor}55;
        transform: translateY(-3px);
        box-shadow: 0 6px 20px ${({ $cor }) => $cor}22;

        svg {
            color: ${({ $cor }) => $cor};
        }
    }
`

const SkillLabel = styled.span`
    font-family: "Share Tech Mono", "Courier New", monospace;
    font-size: 0.6rem;
    color: rgba(241, 247, 246, 0.5);
    text-align: center;
    letter-spacing: 0.03em;
    transition: color 0.3s ease;

    ${SkillCard}:hover & {
        color: rgba(241, 247, 246, 0.9);
    }
`

/* ================================
   Componente principal
   ================================ */

export default function About() {
    const tituloRef  = useRef<HTMLDivElement>(null)
    const gridRef    = useRef<HTMLDivElement>(null)
    const cardsRef   = useRef<HTMLDivElement>(null)
    const skillsRef  = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const elementos = [
            tituloRef.current,
            gridRef.current,
            cardsRef.current,
            skillsRef.current,
        ].filter(Boolean) as HTMLElement[]

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visivel")
                        observer.unobserve(entry.target)
                    }
                })
            },
            { threshold: 0.15 }
        )

        elementos.forEach((el) => observer.observe(el))

        return () => observer.disconnect()
    }, [])

    return (
        <Secao id="about">
            <Container>

                {/* Título da seção */}
                <TituloContainer ref={tituloRef}>
                    <Rotulo>// about me</Rotulo>
                    <Titulo>
                        A little <span>about</span> me
                    </Titulo>
                    <LinhaDivisoria />
                </TituloContainer>

                {/* Grid foto + texto */}
                <Grid ref={gridRef}>

                    {/* Foto */}
                    <FotoContainer>
                        <FotoWrapper>
                            {/* Placeholder — trocar por <img> quando tiver a foto */}
                            <FotoPlaceholder>A</FotoPlaceholder>
                        </FotoWrapper>
                    </FotoContainer>

                    {/* Texto */}
                    <TextoContainer>
                        <Paragrafo>
                            Hi, I'm Alex, a developer constantly involved and passionate
                            about creating intuitive and functional web experiences. I focus
                            on HTML, CSS, and responsive design, always striving to combine
                            aesthetics and efficiency in every project I work on.
                        </Paragrafo>
                        <Paragrafo>
                            My journey in programming is fueled by curiosity and a desire
                            to turn ideas into reality. I love tackling technical challenges,
                            seeing every line of code as an opportunity to learn and grow.
                        </Paragrafo>
                        <Paragrafo>
                            When I'm not coding, you'll probably find me enjoying D&amp;D,
                            exploring new design concepts, or planning my next steps in the
                            world of technology.
                        </Paragrafo>

                        {/* Cards de resumo — "Too long? Didn't read?" */}
                        <CardsContainer ref={cardsRef}>
                            <CardsTitulo>Too long? Didn't read? A summary for you:</CardsTitulo>
                            <CardsGrid>
                                {CARDS.map((card) => (
                                    <Card key={card.texto}>
                                        <CardIcone>{card.icone}</CardIcone>
                                        <CardTexto>{card.texto}</CardTexto>
                                    </Card>
                                ))}
                            </CardsGrid>
                        </CardsContainer>

                    </TextoContainer>

                </Grid>

                {/* Skills — tecnologias conhecidas */}
                <SkillsContainer ref={skillsRef}>
                    <div>
                        <SkillsRotulo>// known technologies</SkillsRotulo>
                        <SkillsTitulo>What I work with</SkillsTitulo>
                    </div>
                    <SkillsGrid>
                        {SKILLS.map((skill) => (
                            <SkillCard key={skill.label} $cor={skill.cor} title={skill.label}>
                                <skill.icone />
                                <SkillLabel>{skill.label}</SkillLabel>
                            </SkillCard>
                        ))}
                    </SkillsGrid>
                </SkillsContainer>

            </Container>
        </Secao>
    )
}