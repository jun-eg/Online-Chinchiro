import { useFBX } from '@react-three/drei';
import { useLoader } from '@react-three/fiber';
import { motion } from 'framer-motion-3d';
import type { AnimationState } from 'pages/DiceApp/index.page';
import React, { useRef, useState } from 'react';
import { TextureLoader, type Mesh } from 'three';

type DiceProps = {
  position: [x: number, y: number, z: number];
  diceValue: number;
  animationState: AnimationState;
  onClickDice: () => { newDiceValue: number };
  startAnimation: () => void;
};

const diceValuePosition = [
  { x: 0, y: -0.5 * Math.PI, z: 1 }, //1
  { x: -0.8 * Math.PI, y: 0, z: 0 }, //2
  { x: -1, y: 0, z: 0 }, //3
  { x: -1, y: Math.PI, z: 0 }, //4
  { x: 0.2 * Math.PI, y: 0, z: 0 }, //5
  { x: 0, y: 0.5 * Math.PI, z: -1 }, //6
];

export const Dice: React.FC<DiceProps> = ({
  diceValue,
  onClickDice,
  startAnimation,
  animationState,
  ...restProps
}) => {
  const group = useFBX('/models/dice/dice.fbx');
  const texture = useLoader(TextureLoader, '/models/dice/dice.png');
  const mesh = useRef<Mesh>(group.children[0] as Mesh);
  const geometry = mesh.current.geometry;
  const [hovered, setHover] = useState<boolean>(false);
  let newDiceValue: number = diceValue;

  return (
    <motion.mesh
      {...restProps}
      ref={mesh}
      scale={hovered ? 0.7 : 0.5}
      geometry={geometry}
      onClick={(): void => {
        if (animationState === 'rest') {
          const clickedResult = onClickDice();
          setHover(false);
          startAnimation();
          newDiceValue = clickedResult.newDiceValue;
        }
      }}
      rotation={[
        diceValuePosition[newDiceValue - 1].x,
        diceValuePosition[newDiceValue - 1].y,
        diceValuePosition[newDiceValue - 1].z,
      ]}
      animate={animationState}
      onPointerOver={() => {
        if (animationState === 'rest') {
          setHover(true);
        }
      }}
      onPointerOut={() => setHover(false)}
      variants={{
        rest: {
          y: 0,
          rotateX: diceValuePosition[diceValue - 1].x,
          rotateY: diceValuePosition[diceValue - 1].y,
          rotateZ: diceValuePosition[diceValue - 1].z,
        },
        rolling: {
          y: 2.5,
          rotateX: diceValuePosition[newDiceValue - 1].x + 2 * Math.PI,
          rotateY: diceValuePosition[newDiceValue - 1].y + 2 * Math.PI,
          rotateZ: diceValuePosition[newDiceValue - 1].z + 2 * Math.PI,
          transition: {
            y: {
              ease: 'circOut',
            },
            rotateX: {
              duration: 0.2,
              ease: 'linear',
              repeat: Infinity,
            },
            rotateY: {
              duration: 0.1,
              ease: 'linear',
              repeat: Infinity,
            },
            rotateZ: {
              duration: 0.3,
              ease: 'linear',
              repeat: Infinity,
            },
          },
        },
        drop: {
          y: -1,
          rotateX: diceValuePosition[diceValue - 1].x,
          rotateY: diceValuePosition[diceValue - 1].y,
          rotateZ: diceValuePosition[diceValue - 1].z,
          transition: {
            rotation: {
              duration: 0.1,
            },
            y: {
              duration: 0.5,
              ease: 'circIn',
            },
          },
        },
      }}
    >
      {/* colorは6進数指定でないとバグる */}
      <meshPhysicalMaterial map={texture} color={hovered ? '#c6c6c6' : '#a8a8a8'} />
    </motion.mesh>
  );
};
