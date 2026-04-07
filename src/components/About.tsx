import styled, { keyframes } from "styled-components"

/* ================================
   About — Seção sobre mim
   Mobile-first | Estrutura base
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
    animation: ${fadeSlideUp} 0.6s ease 0.2s both;

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

/* ================================
   Componente principal
   ================================ */

export default function About() {
    return (
        <Secao id="about">
            <Container>

                {/* Título da seção */}
                <TituloContainer>
                    <Rotulo>// about me</Rotulo>
                    <Titulo>
                        A little <span>about</span> me
                    </Titulo>
                    <LinhaDivisoria />
                </TituloContainer>

                {/* Grid foto + texto */}
                <Grid>

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
                    </TextoContainer>

                </Grid>

            </Container>
        </Secao>
    )
}
