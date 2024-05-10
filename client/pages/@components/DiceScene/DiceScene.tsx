import { useFBX } from '@react-three/drei';
import { useLoader } from '@react-three/fiber';
import { motion } from 'framer-motion-3d';
import { TextureLoader, type Mesh } from 'three';

export const DiceScene = () => {
  const group = useFBX('/models/dice/dice.fbx');
  const mesh = group.children[0] as Mesh;
  const geometry = mesh.geometry;
  const texture = useLoader(TextureLoader, '/models/dice/dice.png');

  return (
    <motion.mesh scale={[1, 1, 1]} geometry={geometry} position={[0, -2, 0]}>
      <meshPhysicalMaterial map={texture} />
    </motion.mesh>
  );
};
