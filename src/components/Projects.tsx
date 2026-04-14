import styled, { keyframes } from "styled-components"

/* ================================
   Projects — Seção de projetos
   Mobile-first | Estrutura base com grid de cards
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
   Animações
   ================================ */

const fadeSlideUp = keyframes`
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0);    }
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
    animation: ${fadeSlideUp} 0.6s ease forwards;
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
    transition: border-color 0.3s ease, transform 0.3s ease;

    &:hover {
        border-color: rgba(44, 194, 149, 0.4);
        transform: translateY(-4px);
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
   Componente principal
   ================================ */

export default function Projects() {
    return (
        <Secao id="projects">
            <Container>

                {/* Título da seção */}
                <TituloContainer>
                    <Rotulo>// what i've built</Rotulo>
                    <Titulo>
                        My <span>Projects</span>
                    </Titulo>
                    <LinhaDivisoria />
                </TituloContainer>

                {/* Grid de cards */}
                <Grid>
                    {PROJETOS.map((projeto) => (
                        <Card key={projeto.id}>

                            {/* Imagem — placeholder enquanto não tem screenshot */}
                            <CardImagem>
                                <CardImagemTexto>
                                    {projeto.titulo.toUpperCase()}
                                </CardImagemTexto>
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
        </Secao>
    )
}
