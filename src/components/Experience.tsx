import { useRef, useEffect } from "react"
import styled, { keyframes, css } from "styled-components"
import { FaBriefcase, FaGraduationCap, FaMapMarkerAlt, FaDownload } from "react-icons/fa"

/* ================================
   Experience — Seção de experiências
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
   Dados — Experiências e Formação
   ================================ */

const EXPERIENCIAS = [
    {
        cargo: "Programming Instructor Intern",
        empresa: "Microlins",
        local: "Maceió, AL",
        periodo: "Jun/2025 — Present",
        atual: true,
        descricao: [
            "Support for theoretical and practical classes, ensuring alignment with the teaching plan.",
            "Individual student assistance, resolving doubts and monitoring academic progress.",
            "Application of exercises and practical activities to reinforce content.",
            "Collaboration in preparation and organization of teaching materials.",
            "Development of communication, teaching and interpersonal relationship skills.",
        ],
    },
    {
        cargo: "Front-End Developer",
        empresa: "Freelancer — siegvfx.com",
        local: "Remote",
        periodo: "Aug/2024 — Sep/2024",
        atual: false,
        descricao: [
            "Development of siegvfx.com with focus on responsive design and user experience.",
            "Application of coding best practices, ensuring performance and maintainability.",
            "Implementation of adaptive layouts and cross-browser compatibility.",
            "Versioning with Git and GitHub, demonstrating code control and best practices.",
        ],
    },
    {
        cargo: "Customer Service Representative",
        empresa: "AlmaViva do Brasil",
        local: "Maceió, AL",
        periodo: "Jun/2023 — Apr/2024",
        atual: false,
        descricao: [
            "Receptive customer service focused on problem resolution and satisfaction.",
            "Strategic customer retention using argumentation and negotiation techniques.",
            "Service sales, contributing to revenue growth and goal achievement.",
            "Recording and tracking calls, ensuring quality and assertiveness in service.",
        ],
    },
]

const FORMACAO = [
    {
        curso: "Bachelor's in Computer Science",
        instituicao: "Uninassau",
        local: "Maceió, AL",
        periodo: "2025 — Present",
        atual: true,
    },
    {
        curso: "Technical Degree in Internet IT",
        instituicao: "SENAI",
        local: "Maceió, AL",
        periodo: "2019 — 2021",
        atual: false,
    },
]

/* ================================
   Animações — disparadas pelo IntersectionObserver
   ================================ */

const fadeSlideUp = keyframes`
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0);    }
`

/*
   Mesmo padrão do About:
   elementos iniciam invisíveis e animam ao entrar na viewport.
*/
const animacaoBase = css`
    opacity: 0;
    transform: translateY(24px);

    &.visivel {
        animation: ${fadeSlideUp} 0.7s ease forwards;
    }
`

/* ================================
   Styled Components
   ================================ */

const Secao = styled.section`
    position: relative;
    background-color: ${colors.richBlack};
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
    gap: 4rem;
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
    background: linear-gradient(90deg, ${colors.caribbeanGreen}, transparent);
    margin-top: 0.5rem;
`

/* Grid de duas colunas no desktop */
const ColunasGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 3rem;
    ${animacaoBase}

    &.visivel {
        animation-delay: 0.2s;
    }

    @media (min-width: 768px) {
        grid-template-columns: 1fr 1fr;
        gap: 5rem;
    }
`

/* Cada coluna (experiências / formação) */
const Coluna = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`

const ColunaTitulo = styled.h3`
    display: flex;
    align-items: center;
    gap: 0.6rem;
    font-family: "Press Start 2P", "Courier New", monospace;
    font-size: 0.75rem;
    color: ${colors.mountainMeadow};
    letter-spacing: 0.1em;
    text-transform: uppercase;
    margin-bottom: 1.5rem;

    /* Ícone da coluna */
    svg {
        font-size: 1rem;
        color: ${colors.caribbeanGreen};
        flex-shrink: 0;
    }
`

/* Badge "Current" para posições ativas */
const BadgeAtual = styled.span`
    display: inline-block;
    font-family: "Share Tech Mono", "Courier New", monospace;
    font-size: 0.6rem;
    letter-spacing: 0.08em;
    color: ${colors.richBlack};
    background: ${colors.caribbeanGreen};
    padding: 0.2rem 0.55rem;
    border-radius: 20px;
    margin-left: 0.5rem;
    vertical-align: middle;
    text-transform: uppercase;
`

/* Localização com ícone */
const ItemLocal = styled.span`
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    font-family: "Share Tech Mono", "Courier New", monospace;
    font-size: 0.7rem;
    color: rgba(241, 247, 246, 0.4);
    margin-bottom: 0.75rem;

    svg {
        font-size: 0.65rem;
    }
`

/* Timeline vertical */
const Timeline = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 0;

    /* Linha vertical */
    &::before {
        content: "";
        position: absolute;
        left: 7px;
        top: 8px;
        bottom: 0;
        width: 1px;
        background: linear-gradient(
            to bottom,
            ${colors.caribbeanGreen},
            transparent
        );
    }
`

/* Item da timeline */
const TimelineItem = styled.div`
    position: relative;
    padding-left: 2.5rem;
    padding-bottom: 2.5rem;

    /* Ponto na timeline */
    &::before {
        content: "";
        position: absolute;
        left: 0;
        top: 8px;
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background: ${colors.bangladeshGreen};
        border: 2px solid ${colors.caribbeanGreen};
        z-index: 1;
    }

    &:last-child {
        padding-bottom: 0;
    }
`

const ItemPeriodo = styled.span`
    font-family: "Share Tech Mono", "Courier New", monospace;
    font-size: 0.7rem;
    color: ${colors.caribbeanGreen};
    letter-spacing: 0.1em;
    display: block;
    margin-bottom: 0.4rem;
`

const ItemCargo = styled.h4`
    font-family: "Press Start 2P", "Courier New", monospace;
    font-size: 0.65rem;
    color: ${colors.white};
    line-height: 1.6;
    margin-bottom: 0.25rem;
`

const ItemEmpresa = styled.span`
    font-family: "Share Tech Mono", "Courier New", monospace;
    font-size: 0.8rem;
    color: ${colors.mountainMeadow};
    display: block;
    margin-bottom: 0.75rem;
`

const ItemDescricao = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    list-style: none;
`

const ItemDescricaoItem = styled.li`
    font-family: "Share Tech Mono", "Courier New", monospace;
    font-size: 0.78rem;
    color: rgba(241, 247, 246, 0.6);
    line-height: 1.7;
    padding-left: 1rem;
    position: relative;

    &::before {
        content: "›";
        position: absolute;
        left: 0;
        color: ${colors.caribbeanGreen};
    }
`

/* ================================
   Bloco de download do currículo
   ================================ */

const DownloadContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.25rem;
    padding: 2.5rem;
    border: 1px solid rgba(44, 194, 149, 0.15);
    border-radius: 12px;
    background: rgba(3, 98, 76, 0.08);
    text-align: center;
    ${animacaoBase}

    &.visivel {
        animation-delay: 0.3s;
    }

    @media (min-width: 768px) {
        flex-direction: row;
        justify-content: space-between;
        text-align: left;
    }
`

const DownloadTexto = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
`

const DownloadTitulo = styled.p`
    font-family: "Press Start 2P", "Courier New", monospace;
    font-size: 0.7rem;
    color: ${colors.white};
    line-height: 1.6;
`

const DownloadSubtitulo = styled.p`
    font-family: "Share Tech Mono", "Courier New", monospace;
    font-size: 0.8rem;
    color: rgba(241, 247, 246, 0.5);
`

const BotaoDownload = styled.a`
    display: inline-flex;
    align-items: center;
    gap: 0.6rem;
    font-family: "Share Tech Mono", "Courier New", monospace;
    font-size: 0.85rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: ${colors.richBlack};
    background: ${colors.caribbeanGreen};
    padding: 0.85rem 1.75rem;
    border-radius: 4px;
    text-decoration: none;
    white-space: nowrap;
    flex-shrink: 0;
    transition: background 0.3s ease, transform 0.2s ease;

    svg {
        font-size: 0.9rem;
    }

    &:hover {
        background: ${colors.mountainMeadow};
        transform: translateY(-2px);
    }
`

/* ================================
   Componente principal
   ================================ */

export default function Experience() {
    const tituloRef   = useRef<HTMLDivElement>(null)
    const colunasRef  = useRef<HTMLDivElement>(null)
    const downloadRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const elementos = [
            tituloRef.current,
            colunasRef.current,
            downloadRef.current,
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
            { threshold: 0.1 }
        )

        elementos.forEach((el) => observer.observe(el))

        return () => observer.disconnect()
    }, [])

    return (
        <Secao id="experience">
            <Container>

                {/* Título da seção */}
                <TituloContainer ref={tituloRef}>
                    <Rotulo>// my journey</Rotulo>
                    <Titulo>
                        Experience &amp; <span>Education</span>
                    </Titulo>
                    <LinhaDivisoria />
                </TituloContainer>

                {/* Duas colunas: experiências + formação */}
                <ColunasGrid ref={colunasRef}>

                    {/* Coluna de experiências */}
                    <Coluna>
                        <ColunaTitulo>
                            <FaBriefcase />
                            Work Experience
                        </ColunaTitulo>
                        <Timeline>
                            {EXPERIENCIAS.map((exp) => (
                                <TimelineItem key={exp.empresa}>
                                    <ItemPeriodo>
                                        {exp.periodo}
                                        {exp.atual && <BadgeAtual>Current</BadgeAtual>}
                                    </ItemPeriodo>
                                    <ItemCargo>{exp.cargo}</ItemCargo>
                                    <ItemEmpresa>{exp.empresa}</ItemEmpresa>
                                    <ItemLocal>
                                        <FaMapMarkerAlt />
                                        {exp.local}
                                    </ItemLocal>
                                    <ItemDescricao>
                                        {exp.descricao.map((item, i) => (
                                            <ItemDescricaoItem key={i}>
                                                {item}
                                            </ItemDescricaoItem>
                                        ))}
                                    </ItemDescricao>
                                </TimelineItem>
                            ))}
                        </Timeline>
                    </Coluna>

                    {/* Coluna de formação */}
                    <Coluna>
                        <ColunaTitulo>
                            <FaGraduationCap />
                            Education
                        </ColunaTitulo>
                        <Timeline>
                            {FORMACAO.map((form) => (
                                <TimelineItem key={form.instituicao}>
                                    <ItemPeriodo>
                                        {form.periodo}
                                        {form.atual && <BadgeAtual>Current</BadgeAtual>}
                                    </ItemPeriodo>
                                    <ItemCargo>{form.curso}</ItemCargo>
                                    <ItemEmpresa>{form.instituicao}</ItemEmpresa>
                                    <ItemLocal>
                                        <FaMapMarkerAlt />
                                        {form.local}
                                    </ItemLocal>
                                </TimelineItem>
                            ))}
                        </Timeline>
                    </Coluna>

                </ColunasGrid>

                {/* Bloco de download do currículo */}
                <DownloadContainer ref={downloadRef}>
                    <DownloadTexto>
                        <DownloadTitulo>Want to know more?</DownloadTitulo>
                        <DownloadSubtitulo>
                            Download my full resume for more details.
                        </DownloadSubtitulo>
                    </DownloadTexto>
                    <BotaoDownload
                        href={`${import.meta.env.BASE_URL}resume.pdf`}
                        download="Alexsander_Albino_Resume.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <FaDownload />
                        Grab a copy
                    </BotaoDownload>
                </DownloadContainer>

            </Container>
        </Secao>
    )
}