import { useState, useEffect } from "react"
import type { RefObject } from "react"
import styled, { keyframes, css } from "styled-components"

/* ================================
   Navbar — Header fixo
   Mobile-first | Logo planeta aparece
   após o loading screen terminar
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
interface NavbarProps {
    visivel: boolean
    logoRef: RefObject<HTMLImageElement | null>
}

interface ContainerProps {
    $scrolled: boolean
    $visivel: boolean
}

interface MenuMobileProps {
    $aberto: boolean
}

interface LogoProps {
    $aparecer: boolean
}

/* ================================
   Animações
   ================================ */

const fadeSlideDown = keyframes`
    from { opacity: 0; transform: translateY(-10px); }
    to   { opacity: 1; transform: translateY(0);     }
`

const logoPouso = keyframes`
    0%   { opacity: 0; transform: scale(0.45); }
    60%  { transform: scale(1.1);              }
    100% { opacity: 1; transform: scale(1);    }
`

/* ================================
   Styled Components
   ================================ */

const Header = styled.header<ContainerProps>`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 100;
    padding: 0.75rem 1rem;
    opacity: 0;
    transition: background 0.4s ease, padding 0.4s ease;

    background: ${({ $scrolled }) =>
        $scrolled ? "rgba(3, 34, 33, 0.95)" : "transparent"};

    backdrop-filter: ${({ $scrolled }) => ($scrolled ? "blur(8px)" : "none")};

    ${({ $visivel }) =>
        $visivel &&
        css`
            animation: ${fadeSlideDown} 0.6s ease forwards;
        `}

    @media (min-width: 768px) {
        padding: ${({ $scrolled }) => ($scrolled ? "0.75rem 3rem" : "1.25rem 3rem")};
    }
`

const Nav = styled.nav`
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 1200px;
    margin: 0 auto;
`

const LogoLink = styled.a<LogoProps>`
    display: flex;
    align-items: center;
    gap: 0.6rem;
    text-decoration: none;
    opacity: 0;

    ${({ $aparecer }) =>
        $aparecer &&
        css`
            animation: ${logoPouso} 0.5s ease 0.3s forwards;
        `}
`

const LogoPlaneta = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
    filter: drop-shadow(0 0 6px rgba(0, 223, 145, 0.4));

    @media (min-width: 768px) {
        width: 46px;
        height: 46px;
    }
`

const LogoNome = styled.span`
    font-family: "Press Start 2P", "Courier New", monospace;
    font-size: 0.85rem;
    color: ${colors.white};
    letter-spacing: 0.05em;

    span {
        color: ${colors.caribbeanGreen};
    }

    @media (min-width: 768px) {
        font-size: 1rem;
    }
`

const MenuDesktop = styled.ul`
    display: none;
    list-style: none;
    gap: 2.5rem;
    align-items: center;

    @media (min-width: 768px) {
        display: flex;
    }
`

const MenuItem = styled.li`
    a {
        font-family: "Share Tech Mono", "Courier New", monospace;
        font-size: 0.9rem;
        color: ${colors.white};
        text-decoration: none;
        letter-spacing: 0.05em;
        text-transform: uppercase;
        transition: color 0.3s ease;
        position: relative;

        &::after {
            content: "";
            position: absolute;
            bottom: -3px;
            left: 0;
            width: 0;
            height: 1px;
            background: ${colors.caribbeanGreen};
            transition: width 0.3s ease;
        }

        &:hover {
            color: ${colors.caribbeanGreen};
        }

        &:hover::after {
            width: 100%;
        }
    }
`

const BtnHamburguer = styled.button`
    display: flex;
    flex-direction: column;
    gap: 5px;
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 4px;
    z-index: 200;

    @media (min-width: 768px) {
        display: none;
    }
`

interface LinhaProps {
    $aberto: boolean
    $posicao: "top" | "mid" | "bot"
}

const Linha = styled.span<LinhaProps>`
    display: block;
    width: 24px;
    height: 2px;
    background: ${colors.caribbeanGreen};
    border-radius: 2px;
    transition: transform 0.3s ease, opacity 0.3s ease;

    ${({ $aberto, $posicao }) =>
        $aberto && $posicao === "top" &&
        css`transform: translateY(7px) rotate(45deg);`}

    ${({ $aberto, $posicao }) =>
        $aberto && $posicao === "mid" &&
        css`opacity: 0; transform: scaleX(0);`}

    ${({ $aberto, $posicao }) =>
        $aberto && $posicao === "bot" &&
        css`transform: translateY(-7px) rotate(-45deg);`}
`

const MenuMobile = styled.div<MenuMobileProps>`
    position: fixed;
    top: 0;
    right: 0;
    height: 100dvh;
    width: 75vw;
    max-width: 300px;
    background: rgba(3, 34, 33, 0.98);
    backdrop-filter: blur(12px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2.5rem;
    z-index: 150;
    transform: ${({ $aberto }) => ($aberto ? "translateX(0)" : "translateX(100%)")};
    transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);

    @media (min-width: 768px) {
        display: none;
    }
`

const MenuMobileItem = styled.a`
    font-family: "Press Start 2P", "Courier New", monospace;
    font-size: 1rem;
    color: ${colors.white};
    text-decoration: none;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    transition: color 0.3s ease;

    &:hover {
        color: ${colors.caribbeanGreen};
    }
`

const Backdrop = styled.div<MenuMobileProps>`
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.6);
    z-index: 140;
    opacity: ${({ $aberto }) => ($aberto ? 1 : 0)};
    pointer-events: ${({ $aberto }) => ($aberto ? "auto" : "none")};
    transition: opacity 0.4s ease;

    @media (min-width: 768px) {
        display: none;
    }
`

/* ================================
   Links de navegação
   ================================ */

const LINKS = [
    { label: "About",      href: "#about"      },
    { label: "Experience", href: "#experience"  },
    { label: "Projects",   href: "#projects"   },
    { label: "Contact",    href: "#contact"    },
]

/* ================================
   Componente principal
   ================================ */

export default function Navbar({ visivel, logoRef }: NavbarProps) {
    const [scrolled, setScrolled] = useState<boolean>(false)
    const [menuAberto, setMenuAberto] = useState<boolean>(false)

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 60)
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) setMenuAberto(false)
        }
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    const fecharMenu = () => setMenuAberto(false)

    return (
        <>
            <Header $scrolled={scrolled} $visivel={visivel}>
                <Nav>

                    {/* Logo — ref exposto para o LoadingScreen calcular destino exato */}
                    <LogoLink href="#home" $aparecer={visivel}>
                        <LogoPlaneta
                            ref={logoRef}
                            src={`${import.meta.env.BASE_URL}Logo.svg`}
                            alt="Logo Alexon"
                        />
                        <LogoNome>
                            ALEX<span>ON</span>
                        </LogoNome>
                    </LogoLink>

                    {/* Links desktop */}
                    <MenuDesktop>
                        {LINKS.map((link) => (
                            <MenuItem key={link.href}>
                                <a href={link.href}>{link.label}</a>
                            </MenuItem>
                        ))}
                    </MenuDesktop>

                    {/* Botão hamburguer — mobile */}
                    <BtnHamburguer
                        onClick={() => setMenuAberto((prev) => !prev)}
                        aria-label="Abrir menu"
                    >
                        <Linha $aberto={menuAberto} $posicao="top" />
                        <Linha $aberto={menuAberto} $posicao="mid" />
                        <Linha $aberto={menuAberto} $posicao="bot" />
                    </BtnHamburguer>

                </Nav>
            </Header>

            <Backdrop $aberto={menuAberto} onClick={fecharMenu} />

            <MenuMobile $aberto={menuAberto}>
                {LINKS.map((link) => (
                    <MenuMobileItem
                        key={link.href}
                        href={link.href}
                        onClick={fecharMenu}
                    >
                        {link.label}
                    </MenuMobileItem>
                ))}
            </MenuMobile>
        </>
    )
}