import { useFBX } from '@react-three/drei';
import { useFrame, useLoader } from '@react-three/fiber';
import { motion } from 'framer-motion-3d';
import React, { useRef, useState } from 'react';
import { TextureLoader, type Mesh } from 'three';

type BoxProps = {
  position: [x: number, y: number, z: number];
};

export const DiceScene: React.FC<BoxProps> = (props) => {
  const group = useFBX('/models/dice/dice.fbx');
  const texture = useLoader(TextureLoader, '/models/dice/dice.png');
  const mesh = useRef<Mesh>(group.children[0] as Mesh);
  const geometry = mesh.current.geometry;
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  useFrame(() => (mesh.current.rotation.x += 0.01));

  return (
    <motion.mesh
      {...props}
      ref={mesh}
      scale={active ? 1 : 0.5}
      geometry={geometry}
      onClick={() => setActive(!active)}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      {/* colorは6進数指定じゃないとバグる */}
      <meshPhysicalMaterial map={texture} color={hovered ? '#64f351' : '#c3c2c2'} />
    </motion.mesh>
  );
};
