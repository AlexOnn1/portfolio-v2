import { useState, useRef, useEffect } from "react"
import styled, { keyframes, css } from "styled-components"
import { FaLinkedinIn, FaInstagram, FaGithub, FaEnvelope, FaCheckCircle, FaExclamationCircle, FaPaperPlane} from "react-icons/fa"
import { BsRocket } from "react-icons/bs"

/* ================================
   Contact — Seção de contato
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
   Redes sociais
   ================================ */

const SOCIAIS = [
    {
        icone: FaLinkedinIn,
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/alexsander-albino-dev/",
        cor: "#0A66C2",
    },
    {
        icone: FaInstagram,
        label: "Instagram",
        cor: "#E1306C",
        href: "https://www.instagram.com/alexon_dev/",
    },
    {
        icone: FaGithub,
        label: "GitHub",
        cor: "#F1F7F6",
        href: "https://github.com/AlexOnn1",
    },
    {
        icone: FaEnvelope,
        label: "Email",
        cor: colors.caribbeanGreen,
        href: "mailto:alexsander.santos.contato@gmail.com",
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
    background-color: ${colors.richBlack};
    padding: 5rem 1.5rem 0;

    @media (min-width: 768px) {
        padding: 7rem 3rem 0;
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

/* Grid principal — formulário + sociais */
const Grid = styled.div`
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
        align-items: start;
    }
`

/* ================================
   Coluna esquerda — formulário
   ================================ */

const FormContainer = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
`

const CampoGrupo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
`

const Label = styled.label`
    font-family: "Share Tech Mono", "Courier New", monospace;
    font-size: 0.75rem;
    color: ${colors.caribbeanGreen};
    letter-spacing: 0.15em;
    text-transform: uppercase;
`

const Input = styled.input`
    font-family: "Share Tech Mono", "Courier New", monospace;
    font-size: 0.88rem;
    color: ${colors.white};
    background: rgba(3, 98, 76, 0.12);
    border: 1px solid rgba(44, 194, 149, 0.2);
    border-radius: 6px;
    padding: 0.75rem 1rem;
    outline: none;
    transition: border-color 0.3s ease, background 0.3s ease;

    &::placeholder {
        color: rgba(241, 247, 246, 0.25);
    }

    &:focus {
        border-color: ${colors.caribbeanGreen};
        background: rgba(3, 98, 76, 0.2);
    }
`

const Textarea = styled.textarea`
    font-family: "Share Tech Mono", "Courier New", monospace;
    font-size: 0.88rem;
    color: ${colors.white};
    background: rgba(3, 98, 76, 0.12);
    border: 1px solid rgba(44, 194, 149, 0.2);
    border-radius: 6px;
    padding: 0.75rem 1rem;
    outline: none;
    resize: vertical;
    min-height: 140px;
    transition: border-color 0.3s ease, background 0.3s ease;

    &::placeholder {
        color: rgba(241, 247, 246, 0.25);
    }

    &:focus {
        border-color: ${colors.caribbeanGreen};
        background: rgba(3, 98, 76, 0.2);
    }
`

const BotaoEnviar = styled.button<{ $enviando: boolean }>`
    font-family: "Share Tech Mono", "Courier New", monospace;
    font-size: 0.88rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: ${colors.richBlack};
    background: ${({ $enviando }) =>
        $enviando ? colors.bangladeshGreen : colors.caribbeanGreen};
    border: none;
    border-radius: 6px;
    padding: 0.9rem 1.75rem;
    cursor: ${({ $enviando }) => ($enviando ? "not-allowed" : "pointer")};
    align-self: flex-start;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    transition: background 0.3s ease, transform 0.2s ease;

    svg {
        font-size: 0.85rem;
    }

    &:hover:not(:disabled) {
        background: ${colors.mountainMeadow};
        transform: translateY(-2px);
    }

    &:active:not(:disabled) {
        transform: translateY(0);
    }
`

/* Feedback de erro por campo */
const ErroCampo = styled.span`
    font-family: "Share Tech Mono", "Courier New", monospace;
    font-size: 0.7rem;
    color: #ff6b6b;
    display: flex;
    align-items: center;
    gap: 0.3rem;

    svg {
        font-size: 0.75rem;
        flex-shrink: 0;
    }
`

/* Input com estado de erro */
interface InputEstadoProps {
    $erro: boolean
}

const InputComEstado = styled(Input)<InputEstadoProps>`
    border-color: ${({ $erro }) =>
        $erro ? "#ff6b6b" : "rgba(44, 194, 149, 0.2)"};

    &:focus {
        border-color: ${({ $erro }) =>
            $erro ? "#ff6b6b" : colors.caribbeanGreen};
    }
`

const TextareaComEstado = styled(Textarea)<InputEstadoProps>`
    border-color: ${({ $erro }) =>
        $erro ? "#ff6b6b" : "rgba(44, 194, 149, 0.2)"};

    &:focus {
        border-color: ${({ $erro }) =>
            $erro ? "#ff6b6b" : colors.caribbeanGreen};
    }
`

/* Banner de sucesso após envio */
const BannerSucesso = styled.div`
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1rem 1.25rem;
    background: rgba(0, 223, 145, 0.08);
    border: 1px solid rgba(0, 223, 145, 0.3);
    border-radius: 8px;
    font-family: "Share Tech Mono", "Courier New", monospace;
    font-size: 0.82rem;
    color: ${colors.caribbeanGreen};

    svg {
        font-size: 1.1rem;
        flex-shrink: 0;
    }
`

/* ================================
   Coluna direita — sociais + info
   ================================ */

const InfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;
`

const InfoTexto = styled.p`
    font-family: "Share Tech Mono", "Courier New", monospace;
    font-size: 0.88rem;
    color: rgba(241, 247, 246, 0.6);
    line-height: 1.8;
`

const SociaisGrid = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
`

interface SocialItemProps {
    $cor: string
}

const SocialItem = styled.a<SocialItemProps>`
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.85rem 1rem;
    background: rgba(3, 98, 76, 0.1);
    border: 1px solid rgba(44, 194, 149, 0.1);
    border-radius: 8px;
    text-decoration: none;
    transition: background 0.3s ease, border-color 0.3s ease,
                transform 0.2s ease;

    svg {
        font-size: 1.1rem;
        color: rgba(241, 247, 246, 0.5);
        transition: color 0.3s ease;
        flex-shrink: 0;
    }

    &:hover {
        background: rgba(3, 98, 76, 0.22);
        border-color: ${({ $cor }) => $cor}44;
        transform: translateX(4px);

        svg {
            color: ${({ $cor }) => $cor};
        }
    }
`

const SocialLabel = styled.span`
    font-family: "Share Tech Mono", "Courier New", monospace;
    font-size: 0.82rem;
    color: rgba(241, 247, 246, 0.6);
    transition: color 0.3s ease;

    ${SocialItem}:hover & {
        color: ${colors.white};
    }
`

/* ================================
   Footer — polimento final
   ================================ */

const pulsoVerde = keyframes`
    0%, 100% { box-shadow: 0 0 0 0 rgba(0, 223, 145, 0.4); }
    50%       { box-shadow: 0 0 0 6px rgba(0, 223, 145, 0);  }
`

const subirRocket = keyframes`
    0%   { transform: translateY(0);    opacity: 0.6; }
    50%  { transform: translateY(-5px); opacity: 1;   }
    100% { transform: translateY(0);    opacity: 0.6; }
`

const Footer = styled.footer`
    margin-top: 5rem;
    padding: 2rem 1.5rem;
    border-top: 1px solid rgba(44, 194, 149, 0.1);
    display: flex; /* Mobile continua como flexbox normal */
    flex-direction: column;
    align-items: center;
    gap: 1.25rem;
    text-align: center;

    @media (min-width: 768px) {
        padding: 2rem 3rem;
        display: grid; /* No desktop, vira um Grid de 3 colunas */
        grid-template-columns: 1fr auto 1fr;
        align-items: center; /* Alinhamento vertical */
        text-align: left;
    }
`

/* Status de disponibilidade */
const StatusContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 0.6rem;

    @media (min-width: 768px) {
        justify-self: start; /* Joga para a ponta esquerda */
    }
`

const StatusDot = styled.span`
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${colors.caribbeanGreen};
    flex-shrink: 0;
    animation: ${pulsoVerde} 2s ease-in-out infinite;
`

const StatusTexto = styled.span`
    font-family: "Share Tech Mono", "Courier New", monospace;
    font-size: 0.72rem;
    color: rgba(241, 247, 246, 0.5);
    letter-spacing: 0.05em;

    span {
        color: ${colors.caribbeanGreen};
    }
`

/* Textos centrais */
const FooterCentro = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.3rem;

    @media (min-width: 768px) {
        justify-self: center; /* Fica cravado no centro da tela */
    }
`

const FooterTexto = styled.p`
    font-family: "Share Tech Mono", "Courier New", monospace;
    font-size: 0.72rem;
    color: rgba(241, 247, 246, 0.25);
    letter-spacing: 0.05em;

    span {
        color: ${colors.caribbeanGreen};
    }
`

/* Botão voltar ao topo — referência ao foguete do V1 */
const VoltarTopo = styled.a`
    display: flex;
    flex-direction: column;
    align-items: center; /* O SEGREDO: Mantém o foguete e o texto alinhados pelo centro deles mesmos */
    gap: 0.3rem;
    text-decoration: none;
    cursor: pointer;

    @media (min-width: 768px) {
        justify-self: end; /* Joga todo o bloco perfeitamente para a borda direita */
    }
`

const RocketIcon = styled(BsRocket)`
    font-size: 1.8rem; /* Aumentamos um pouco para dar mais destaque */
    display: block;
    color: rgba(241, 247, 246, 0.4); /* Cor neutra inicial */
    animation: ${subirRocket} 1.8s ease-in-out infinite;
    transition: color 0.3s ease, transform 0.3s ease;

    /* Muda a cor para o verde da sua paleta ao passar o mouse */
    ${VoltarTopo}:hover & {
        color: ${colors.caribbeanGreen};
    }
`

const VoltarTexto = styled.span`
    font-family: "Share Tech Mono", "Courier New", monospace;
    font-size: 0.62rem;
    color: rgba(241, 247, 246, 0.25);
    letter-spacing: 0.08em;
    text-transform: uppercase;
    transition: color 0.3s ease;

    ${VoltarTopo}:hover & {
        color: ${colors.caribbeanGreen};
    }
`

/* ================================
   Tipos do formulário
   ================================ */

interface CamposForm {
    nome: string
    email: string
    mensagem: string
}

interface ErrosForm {
    nome?: string
    email?: string
    mensagem?: string
}

/* ================================
   Componente principal
   ================================ */

export default function Contact() {
    const [campos, setCampos] = useState<CamposForm>({
        nome: "",
        email: "",
        mensagem: "",
    })
    const [erros, setErros]       = useState<ErrosForm>({})
    const [enviando, setEnviando] = useState<boolean>(false)
    const [enviado, setEnviado]   = useState<boolean>(false)

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

    // Atualiza o campo e limpa o erro ao digitar
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target
        setCampos((prev) => ({ ...prev, [name]: value }))
        setErros((prev) => ({ ...prev, [name]: undefined }))
    }

    // Validação dos campos antes do envio
    const validar = (): boolean => {
        const novosErros: ErrosForm = {}

        if (!campos.nome.trim()) {
            novosErros.nome = "Name is required."
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!campos.email.trim()) {
            novosErros.email = "Email is required."
        } else if (!emailRegex.test(campos.email)) {
            novosErros.email = "Please enter a valid email."
        }

        if (!campos.mensagem.trim()) {
            novosErros.mensagem = "Message is required."
        } else if (campos.mensagem.trim().length < 10) {
            novosErros.mensagem = "Message must be at least 10 characters."
        }

        setErros(novosErros)
        return Object.keys(novosErros).length === 0
    }

    /*
       Envio via FormSubmit — mesmo serviço do V1.
       Faz fetch em vez de submit nativo para manter o SPA
       sem redirecionar para outra página.
    */
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!validar()) return

        setEnviando(true)

        try {
            await fetch("https://formsubmit.co/ajax/3c01685e80d4102e15118937002fedab", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    name: campos.nome,
                    email: campos.email,
                    message: campos.mensagem,
                }),
            })

            setEnviado(true)
            setCampos({ nome: "", email: "", mensagem: "" })
        } catch {
            setErros({ mensagem: "Something went wrong. Please try again." })
        } finally {
            setEnviando(false)
        }
    }

    return (
        <Secao id="contact">
            <Container>

                {/* Título da seção */}
                <TituloContainer ref={tituloRef}>
                    <Rotulo>// get in touch</Rotulo>
                    <Titulo>
                        Contact <span>Me</span>
                    </Titulo>
                    <LinhaDivisoria />
                </TituloContainer>

                {/* Grid formulário + sociais */}
                <Grid ref={gridRef}>

                    {/* Formulário */}
                    <FormContainer onSubmit={handleSubmit} noValidate>

                        {/* Banner de sucesso — aparece após envio */}
                        {enviado && (
                            <BannerSucesso>
                                <FaCheckCircle />
                                Thank you! Your message has been sent successfully.
                            </BannerSucesso>
                        )}

                        <CampoGrupo>
                            <Label htmlFor="nome">Name</Label>
                            <InputComEstado
                                id="nome"
                                name="nome"
                                type="text"
                                placeholder="Your name"
                                value={campos.nome}
                                onChange={handleChange}
                                $erro={!!erros.nome}
                            />
                            {erros.nome && (
                                <ErroCampo>
                                    <FaExclamationCircle />
                                    {erros.nome}
                                </ErroCampo>
                            )}
                        </CampoGrupo>

                        <CampoGrupo>
                            <Label htmlFor="email">Email</Label>
                            <InputComEstado
                                id="email"
                                name="email"
                                type="email"
                                placeholder="your@email.com"
                                value={campos.email}
                                onChange={handleChange}
                                $erro={!!erros.email}
                            />
                            {erros.email && (
                                <ErroCampo>
                                    <FaExclamationCircle />
                                    {erros.email}
                                </ErroCampo>
                            )}
                        </CampoGrupo>

                        <CampoGrupo>
                            <Label htmlFor="mensagem">Message</Label>
                            <TextareaComEstado
                                id="mensagem"
                                name="mensagem"
                                placeholder="What's on your mind?"
                                value={campos.mensagem}
                                onChange={handleChange}
                                $erro={!!erros.mensagem}
                            />
                            {erros.mensagem && (
                                <ErroCampo>
                                    <FaExclamationCircle />
                                    {erros.mensagem}
                                </ErroCampo>
                            )}
                        </CampoGrupo>

                        <BotaoEnviar
                            type="submit"
                            disabled={enviando}
                            $enviando={enviando}
                        >
                            <FaPaperPlane />
                            {enviando ? "Sending..." : "Send Message"}
                        </BotaoEnviar>

                    </FormContainer>

                    {/* Informações e redes sociais */}
                    <InfoContainer>
                        <InfoTexto>
                            I'm always open to fresh ideas, collaborations,
                            and opportunities to learn. Feel free to reach out
                            through the form or any of the links below.
                            Let's build something amazing together! 😁
                        </InfoTexto>

                        <SociaisGrid>
                            {SOCIAIS.map((social) => (
                                <SocialItem
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    $cor={social.cor}
                                    aria-label={social.label}
                                >
                                    <social.icone />
                                    <SocialLabel>{social.label}</SocialLabel>
                                </SocialItem>
                            ))}
                        </SociaisGrid>
                    </InfoContainer>

                </Grid>

            </Container>

            {/* Footer */}
            <Footer>

                {/* Status de disponibilidade */}
                <StatusContainer>
                    <StatusDot />
                    <StatusTexto>
                        <span>Available</span> for new opportunities
                    </StatusTexto>
                </StatusContainer>

                {/* Copyright e stack */}
                <FooterCentro>
                    <FooterTexto>
                        © 2026 <span>Alexsander Albino</span>. All rights reserved.
                    </FooterTexto>
                    <FooterTexto>
                        Built with <span>React</span> + <span>TypeScript</span> + <span>Vite</span>
                    </FooterTexto>
                </FooterCentro>

                {/* Voltar ao topo — referência ao foguete do V1 */}
                <VoltarTopo href="#home">
                    <RocketIcon />
                    <VoltarTexto>Send me up!</VoltarTexto>
                </VoltarTopo>

            </Footer>

        </Secao>
    )
}