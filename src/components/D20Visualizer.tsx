import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Edges, OrbitControls } from "@react-three/drei"
import styled, { keyframes } from "styled-components"
import * as THREE from "three"

import { FaReact, FaPython, FaJs, FaPhp, FaHtml5, FaCss3Alt, FaGithub, FaGitAlt } from "react-icons/fa"
import { SiMysql } from "react-icons/si"

/* ================================
   D20Visualizer — Elemento visual
   D20 3D + órbita de tecnologias
   Visível apenas em telas >= 992px
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
   Tecnologias na órbita
   ================================ */

const TECHS = [
    { icon: FaReact, label: "React", color: "#61DAFB" },
    { icon: FaPython, label: "Python", color: "#3776AB" },
    { icon: FaJs, label: "JavaScript", color: "#F7DF1E" },
    { icon: FaPhp, label: "PHP", color: "#777BB4" },
    { icon: SiMysql, label: "MySQL", color: "#4479A1" },
    { icon: FaHtml5, label: "HTML5", color: "#E34F26" },
    { icon: FaCss3Alt, label: "CSS3", color: "#1572B6" },
    { icon: FaGithub, label: "GitHub", color: colors.white },
    { icon: FaGitAlt, label: "Git", color: "#F05032" },
]

/* ================================
   Componente 3D — D20
   ================================ */

function D20() {
    const meshRef = useRef<THREE.Mesh>(null)

    // Rotação automática lenta
    useFrame((_, delta) => {
        if (!meshRef.current) return
        meshRef.current.rotation.x += delta * 0.18
        meshRef.current.rotation.y += delta * 0.28
    })

    return (
        <mesh ref={meshRef}>
            <icosahedronGeometry args={[1.2, 0]} />
            <meshStandardMaterial
                color="#0a2e28"
                roughness={0.85}
                metalness={0.4}
            />
            <Edges
                threshold={5}
                color={colors.caribbeanGreen}
                lineWidth={1.2}
            />
        </mesh>
    )
}

/* ================================
   Animações CSS
   ================================ */

const orbitar = keyframes`
    from { transform: rotate(0deg);   }
    to   { transform: rotate(360deg); }
`

const antiSpin = keyframes`
    from { transform: rotate(0deg);    }
    to   { transform: rotate(-360deg); }
`

const pulsoAnel = keyframes`
    0%, 100% { opacity: 0.35; }
    50%       { opacity: 0.65; }
`

const entradaVisual = keyframes`
    from { opacity: 0; transform: scale(0.85); }
    to   { opacity: 1; transform: scale(1);    }
`

/* ================================
   Styled Components
   ================================ */

const Container = styled.div`
    position: relative;
    width: 420px;
    height: 420px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    animation: ${entradaVisual} 0.9s ease 1s both;
`

/* Canvas Three.js — centralizado */
const CanvasWrapper = styled.div`
    position: absolute;
    width: 300px;  /* Aumentado de 200px para 300px */
    height: 300px; /* Aumentado de 200px para 300px */
    z-index: 2;
    cursor: grab;

    &:active {
        cursor: grabbing;
    }
`

/* Anel que orbita com os ícones */
const Anel = styled.div`
    position: absolute;
    width: 360px;
    height: 360px;
    border-radius: 50%;
    border: 1.5px dashed rgba(44, 194, 149, 0.35);
    animation:
        ${orbitar}  25s linear infinite,
        ${pulsoAnel} 4s ease-in-out infinite;
    z-index: 1;
`

/* Cada ícone posicionado no anel */
interface IconWrapperProps {
    $angulo: number
    $corHover: string
}

const IconWrapper = styled.div<IconWrapperProps>`
    position: absolute;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background: rgba(3, 34, 33, 0.85);
    border: 1px solid rgba(44, 194, 149, 0.2);
    cursor: default;
    transition: transform 0.3s ease, color 0.3s ease, border-color 0.3s ease,
                box-shadow 0.3s ease;

    /*
       Posiciona o ícone na borda do anel usando trigonometria:
       - raio de 180px (metade dos 360px do anel)
       - offset de -20px para centralizar o ícone (metade de 40px)
    */
    left: ${({ $angulo }) =>
        `calc(50% + ${Math.cos(($angulo * Math.PI) / 180) * 180}px - 20px)`};
    top: ${({ $angulo }) =>
        `calc(50% + ${Math.sin(($angulo * Math.PI) / 180) * 180}px - 20px)`};

    /* Anti-spin: cancela a rotação do anel pai para o ícone ficar sempre "em pé" */
    & > span {
        animation: ${antiSpin} 25s linear infinite;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.3rem;
        color: rgba(241, 247, 246, 0.6);
        transition: color 0.3s ease;
    }

    &:hover {
        transform: scale(1.25);
        border-color: ${({ $corHover }) => $corHover};
        box-shadow: 0 0 12px ${({ $corHover }) => $corHover}66;
    }

    &:hover > span {
        color: ${({ $corHover }) => $corHover};
    }
`

/* Brilho central atrás do canvas */
const Brilho = styled.div`
    position: absolute;
    width: 180px;
    height: 180px;
    border-radius: 50%;
    background: radial-gradient(
        circle,
        rgba(0, 223, 145, 0.08) 0%,
        transparent 70%
    );
    z-index: 0;
    pointer-events: none;
`

/* ================================
   Componente principal
   ================================ */

export default function D20Visualizer() {
    return (
        <Container>

            {/* Brilho verde atrás do D20 */}
            <Brilho />

            {/* D20 3D */}
            <CanvasWrapper>
                <Canvas
                    camera={{ position: [0, 0, 5.5], fov: 45 }} /* Eixo Z alterado de 4 para 5.5 */
                    gl={{ antialias: true, alpha: true }}
                >
                    {/* O resto continua igual... */}
                    <ambientLight intensity={0.4} />
                    <pointLight position={[5, 5, 5]} intensity={1.2} color="#ffffff" />
                    <pointLight position={[-5, -3, 2]} intensity={0.6} color={colors.caribbeanGreen} />
                    <D20 />
                    <OrbitControls enableZoom={false} enablePan={false} />
                </Canvas>
            </CanvasWrapper>

            {/* Anel com ícones de tecnologias */}
            <Anel>
                {TECHS.map((tech, index) => {
                    // Distribui os ícones igualmente ao longo do círculo
                    const angulo = (index / TECHS.length) * 360 - 90

                    return (
                        <IconWrapper
                            key={tech.label}
                            $angulo={angulo}
                            $corHover={tech.color}
                            title={tech.label}
                        >
                            <span>
                                <tech.icon />
                            </span>
                        </IconWrapper>
                    )
                })}
            </Anel>

        </Container>
    )
}
