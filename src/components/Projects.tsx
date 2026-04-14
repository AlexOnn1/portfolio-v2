import { useState, useRef, useEffect } from "react"
import styled, { keyframes, css } from "styled-components"
import { FaGithub, FaExternalLinkAlt, FaTimes, FaSearch } from "react-icons/fa"

/* ================================
   Projects — Seção de projetos
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
   Dados — Projetos (mais recente primeiro)
   ================================ */

const PROJETOS = [
    {
        id: 1,
        titulo: "Django Task Manager",
        descricao: "A functional task management system featuring full CRUD capabilities for personal organization. Developed with Python using the Django framework with a clean MVT architecture. Fully responsive interface with modern CSS and media queries.",
        tecnologias: ["Python", "Django", "SQLite", "CSS"],
        linkSite: "https://primeiro-projeto-django-ke1o.onrender.com/",
        linkGithub: "https://github.com/AlexOnn1/Primeiro-projeto-django",
        imagem: null,
    },
    {
        id: 2,
        titulo: "Shopping Cart",
        descricao: "A simple sales system featuring a shopping cart, product, customer and order registration. Developed with pure Python using Streamlit. Allows adding products to the cart, calculating totals, removing items, finalizing orders and viewing history.",
        tecnologias: ["Python", "Streamlit"],
        linkSite: "https://sistema-de-vendas.streamlit.app/",
        linkGithub: "https://github.com/AlexOnn1/Sistema-de-vendas",
        imagem: null,
    },
    {
        id: 3,
        titulo: "Huddle Base",
        descricao: "A responsive landing page based on the Frontend Mentor challenge. Focus on creating a pixel-perfect design that adapts seamlessly to different screen sizes, refining HTML and CSS skills while implementing best practices for accessibility.",
        tecnologias: ["HTML5", "CSS3"],
        linkSite: "https://alexonn1.github.io/projeto-huddle-base/",
        linkGithub: "https://github.com/AlexOnn1/projeto-huddle-base",
        imagem: null,
    },
    {
        id: 4,
        titulo: "Landing Page",
        descricao: "A project made to finish the HTML5 and CSS3 advanced module from the DevQuest course. Applied all concepts of Flexbox and Grid learned in the module, combining them to build a fully responsive and modern layout.",
        tecnologias: ["HTML5", "CSS3"],
        linkSite: "https://alexonn1.github.io/landing-page-com-grid/",
        linkGithub: "https://github.com/AlexOnn1/landing-page-com-grid",
        imagem: null,
    },
    {
        id: 5,
        titulo: "Sieg's Portfolio",
        descricao: "My first big project — a portfolio for a graphic designer with 3 pages showing his Work, Studies and a page about him. Built with HTML5 and CSS3 only, before studying JavaScript, as a great opportunity to test my knowledge.",
        tecnologias: ["HTML5", "CSS3"],
        linkSite: "https://alexonn1.github.io/Sieg/",
        linkGithub: "https://github.com/AlexOnn1/Sieg",
        imagem: null,
    },
]

/* ================================
   Animações — disparadas pelo IntersectionObserver
   ================================ */

const fadeSlideUp = keyframes`
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0);    }
`

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
    background: linear-gradient(90deg, ${colors.caribbeanGreen}, transparent);
    margin-top: 0.5rem;
`

/* Grid de cards */
const Grid = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;
    ${animacaoBase}

    &.visivel {
        animation-delay: 0.2s;
    }

    @media (min-width: 640px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media (min-width: 1024px) {
        grid-template-columns: repeat(3, 1fr);
    }
`

/* Card do projeto */
const Card = styled.button`
    display: flex;
    flex-direction: column;
    background: rgba(3, 15, 8, 0.6);
    border: 1px solid rgba(44, 194, 149, 0.12);
    border-radius: 12px;
    overflow: hidden;
    cursor: pointer;
    text-align: left;
    width: 100%;
    transition: border-color 0.35s ease, transform 0.35s ease,
                box-shadow 0.35s ease;

    &:hover {
        border-color: rgba(44, 194, 149, 0.45);
        transform: translateY(-5px);
        box-shadow: 0 12px 32px rgba(0, 223, 145, 0.08);
    }
`

/* Overlay da imagem que aparece no hover com ícone de lupa */
const CardImagemOverlay = styled.div`
    position: absolute;
    inset: 0;
    background: rgba(0, 223, 145, 0.08);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.35s ease;
    z-index: 2;

    svg {
        font-size: 2rem;
        color: ${colors.caribbeanGreen};
        filter: drop-shadow(0 0 8px rgba(0, 223, 145, 0.6));
    }

    ${Card}:hover & {
        opacity: 1;
    }
`

/* Área da imagem — placeholder por enquanto */
const CardImagem = styled.div`
    position: relative;
    width: 100%;
    aspect-ratio: 16 / 9;
    background: linear-gradient(
        135deg,
        ${colors.bangladeshGreen} 0%,
        ${colors.richBlack} 100%
    );
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;

    /* Padrão decorativo de grade */
    &::before {
        content: "";
        position: absolute;
        inset: 0;
        background-image:
            linear-gradient(rgba(44, 194, 149, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(44, 194, 149, 0.05) 1px, transparent 1px);
        background-size: 24px 24px;
    }
`

const CardImagemTexto = styled.span`
    font-family: "Press Start 2P", monospace;
    font-size: 0.55rem;
    color: rgba(44, 194, 149, 0.3);
    letter-spacing: 0.1em;
    position: relative;
    z-index: 1;
`

/* Conteúdo do card */
const CardCorpo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    padding: 1.25rem;
    flex: 1;
`

const CardTitulo = styled.h3`
    font-family: "Press Start 2P", "Courier New", monospace;
    font-size: 0.65rem;
    color: ${colors.white};
    line-height: 1.6;
`

const CardDescricao = styled.p`
    font-family: "Share Tech Mono", "Courier New", monospace;
    font-size: 0.78rem;
    color: rgba(241, 247, 246, 0.55);
    line-height: 1.7;

    /* Limita a 3 linhas no card */
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
`

/* Tags de tecnologias */
const TagsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
    margin-top: auto;
`

const Tag = styled.span`
    font-family: "Share Tech Mono", "Courier New", monospace;
    font-size: 0.65rem;
    color: ${colors.caribbeanGreen};
    background: rgba(0, 223, 145, 0.08);
    border: 1px solid rgba(0, 223, 145, 0.2);
    padding: 0.2rem 0.55rem;
    border-radius: 20px;
    letter-spacing: 0.05em;
`

/* ================================
   Tipo do projeto
   ================================ */

interface Projeto {
    id: number
    titulo: string
    descricao: string
    tecnologias: string[]
    linkSite: string
    linkGithub: string
    imagem: string | null
}

/* ================================
   Modal de detalhes do projeto
   ================================ */

const fadeIn = keyframes`
    from { opacity: 0; }
    to   { opacity: 1; }
`

const slideUp = keyframes`
    from { opacity: 0; transform: translateY(32px) scale(0.97); }
    to   { opacity: 1; transform: translateY(0)    scale(1);    }
`

const Overlay = styled.div`
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.85);
    backdrop-filter: blur(4px);
    z-index: 500;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1.5rem;
    animation: ${fadeIn} 0.25s ease forwards;
`

const ModalBox = styled.div`
    position: relative;
    background: ${colors.darkGreen};
    border: 1px solid rgba(44, 194, 149, 0.2);
    border-radius: 16px;
    width: 100%;
    max-width: 580px;
    max-height: 85dvh;
    overflow-y: auto;
    animation: ${slideUp} 0.3s ease forwards;

    /* Scrollbar personalizada dentro do modal */
    scrollbar-width: thin;
    scrollbar-color: ${colors.bangladeshGreen} transparent;
`

const ModalImagem = styled.div`
    width: 100%;
    aspect-ratio: 16 / 9;
    background: linear-gradient(
        135deg,
        ${colors.bangladeshGreen} 0%,
        ${colors.richBlack} 100%
    );
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 16px 16px 0 0;
    overflow: hidden;
    position: relative;
    flex-shrink: 0;

    &::before {
        content: "";
        position: absolute;
        inset: 0;
        background-image:
            linear-gradient(rgba(44, 194, 149, 0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(44, 194, 149, 0.06) 1px, transparent 1px);
        background-size: 24px 24px;
    }
`

const ModalImagemTexto = styled.span`
    font-family: "Press Start 2P", monospace;
    font-size: 0.6rem;
    color: rgba(44, 194, 149, 0.25);
    letter-spacing: 0.12em;
    position: relative;
    z-index: 1;
`

const ModalCorpo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    padding: 1.75rem;
`

const ModalTitulo = styled.h3`
    font-family: "Press Start 2P", "Courier New", monospace;
    font-size: clamp(0.7rem, 2vw, 0.9rem);
    color: ${colors.white};
    line-height: 1.6;
    padding-right: 2rem;
`

const ModalDescricao = styled.p`
    font-family: "Share Tech Mono", "Courier New", monospace;
    font-size: 0.85rem;
    color: rgba(241, 247, 246, 0.7);
    line-height: 1.8;
`

const ModalTagsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
`

const ModalBotoes = styled.div`
    display: flex;
    gap: 0.75rem;
    flex-wrap: wrap;
    margin-top: 0.25rem;
`

const BotaoLink = styled.a`
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-family: "Share Tech Mono", "Courier New", monospace;
    font-size: 0.82rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    text-decoration: none;
    padding: 0.7rem 1.25rem;
    border-radius: 6px;
    transition: background 0.3s ease, transform 0.2s ease;

    svg {
        font-size: 0.85rem;
    }
`

const BotaoPrimario = styled(BotaoLink)`
    background: ${colors.caribbeanGreen};
    color: ${colors.richBlack};

    &:hover {
        background: ${colors.mountainMeadow};
        transform: translateY(-2px);
    }
`

const BotaoSecundario = styled(BotaoLink)`
    background: transparent;
    color: ${colors.caribbeanGreen};
    border: 1px solid ${colors.caribbeanGreen};

    &:hover {
        background: rgba(0, 223, 145, 0.08);
        transform: translateY(-2px);
    }
`

/* Botão fechar modal */
const BtnFechar = styled.button`
    position: absolute;
    top: 1rem;
    right: 1rem;
    width: 34px;
    height: 34px;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.4);
    border: 1px solid rgba(44, 194, 149, 0.2);
    color: ${colors.white};
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.85rem;
    cursor: pointer;
    transition: background 0.2s ease, border-color 0.2s ease;
    z-index: 10;

    &:hover {
        background: rgba(0, 223, 145, 0.15);
        border-color: ${colors.caribbeanGreen};
    }
`

/* ================================
   Subcomponente Modal
   ================================ */

function Modal({
    projeto,
    onFechar,
}: {
    projeto: Projeto
    onFechar: () => void
}) {
    // Fecha ao clicar no overlay fora do ModalBox
    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) onFechar()
    }

    return (
        <Overlay onClick={handleOverlayClick}>
            <ModalBox>

                {/* Botão de fechar */}
                <BtnFechar onClick={onFechar} aria-label="Fechar modal">
                    <FaTimes />
                </BtnFechar>

                {/* Imagem / placeholder */}
                <ModalImagem>
                    <ModalImagemTexto>
                        {projeto.titulo.toUpperCase()}
                    </ModalImagemTexto>
                </ModalImagem>

                <ModalCorpo>

                    {/* Título */}
                    <ModalTitulo>{projeto.titulo}</ModalTitulo>

                    {/* Descrição completa */}
                    <ModalDescricao>{projeto.descricao}</ModalDescricao>

                    {/* Tags */}
                    <ModalTagsContainer>
                        {projeto.tecnologias.map((tech) => (
                            <Tag key={tech}>{tech}</Tag>
                        ))}
                    </ModalTagsContainer>

                    {/* Botões de ação */}
                    <ModalBotoes>
                        <BotaoPrimario
                            href={projeto.linkSite}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <FaExternalLinkAlt />
                            View Project
                        </BotaoPrimario>
                        <BotaoSecundario
                            href={projeto.linkGithub}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <FaGithub />
                            View Source
                        </BotaoSecundario>
                    </ModalBotoes>

                </ModalCorpo>
            </ModalBox>
        </Overlay>
    )
}

/* ================================
   Componente principal
   ================================ */

export default function Projects() {
    const [projetoAtivo, setProjetoAtivo] = useState<Projeto | null>(null)
    const tituloRef = useRef<HTMLDivElement>(null)
    const gridRef   = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const elementos = [
            tituloRef.current,
            gridRef.current,
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

    const abrirModal  = (projeto: Projeto) => {
        setProjetoAtivo(projeto)
        document.body.style.overflow = "hidden"
    }

    const fecharModal = () => {
        setProjetoAtivo(null)
        document.body.style.overflow = ""
    }

    return (
        <Secao id="projects">
            <Container>

                {/* Título da seção */}
                <TituloContainer ref={tituloRef}>
                    <Rotulo>// what i've built</Rotulo>
                    <Titulo>
                        My <span>Projects</span>
                    </Titulo>
                    <LinhaDivisoria />
                </TituloContainer>

                {/* Grid de cards */}
                <Grid ref={gridRef}>
                    {PROJETOS.map((projeto) => (
                        <Card key={projeto.id} onClick={() => abrirModal(projeto)}>

                            {/* Imagem — placeholder enquanto não tem screenshot */}
                            <CardImagem>
                                <CardImagemTexto>
                                    {projeto.titulo.toUpperCase()}
                                </CardImagemTexto>
                                <CardImagemOverlay>
                                    <FaSearch />
                                </CardImagemOverlay>
                            </CardImagem>

                            {/* Conteúdo */}
                            <CardCorpo>
                                <CardTitulo>{projeto.titulo}</CardTitulo>
                                <CardDescricao>{projeto.descricao}</CardDescricao>
                                <TagsContainer>
                                    {projeto.tecnologias.map((tech) => (
                                        <Tag key={tech}>{tech}</Tag>
                                    ))}
                                </TagsContainer>
                            </CardCorpo>

                        </Card>
                    ))}
                </Grid>

            </Container>

            {/* Modal — renderiza quando há um projeto ativo */}
            {projetoAtivo && (
                <Modal projeto={projetoAtivo} onFechar={fecharModal} />
            )}

        </Secao>
    )
}