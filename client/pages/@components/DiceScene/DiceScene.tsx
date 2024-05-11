import { useFBX } from '@react-three/drei';
import { useLoader } from '@react-three/fiber';
import { motion } from 'framer-motion-3d';
import React, { useRef, useState } from 'react';
import { TextureLoader, type Mesh } from 'three';

type BoxProps = {
  position: [x: number, y: number, z: number];
  diceValue: number;
};

const diceValuePosition = [
  { x: 0, y: -0.5 * Math.PI, z: 1 }, //1
  { x: -0.8 * Math.PI, y: 0, z: 0 }, //2
  { x: -1, y: 0, z: 0 }, //3
  { x: -1, y: Math.PI, z: 0 }, //4
  { x: 0.2 * Math.PI, y: 0, z: 0 }, //5
  { x: 0, y: 0.5 * Math.PI, z: -1 }, //6
];

export const Dice: React.FC<BoxProps> = ({ diceValue, ...restProps }) => {
  const group = useFBX('/models/dice/dice.fbx');
  const texture = useLoader(TextureLoader, '/models/dice/dice.png');
  const mesh = useRef<Mesh>(group.children[0] as Mesh);
  const geometry = mesh.current.geometry;
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  return (
    <motion.mesh
      {...restProps}
      ref={mesh}
      scale={active ? 1 : 0.5}
      geometry={geometry}
      rotation={[
        diceValuePosition[diceValue - 1].x,
        diceValuePosition[diceValue - 1].y,
        diceValuePosition[diceValue - 1].z,
      ]}
      onClick={() => setActive(!active)}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      {/* colorは6進数指定じゃないとバグる */}
      <meshPhysicalMaterial map={texture} color={hovered ? '#64f351' : '#c3c2c2'} />
    </motion.mesh>
  );
};
