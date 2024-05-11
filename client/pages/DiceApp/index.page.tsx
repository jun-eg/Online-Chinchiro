import { Canvas } from '@react-three/fiber';
import { userAtom } from 'atoms/user';
import { Loading } from 'components/Loading/Loading';
import { useAtom } from 'jotai';
import { BasicHeader } from 'pages/@components/BasicHeader/BasicHeader';
import { Dice } from 'pages/@components/DiceScene/DiceScene';
import { useState } from 'react';

export type AnimationState = 'rest' | 'rolling' | 'drop';

const DideApp = () => {
  const [user] = useAtom(userAtom);
  const [dicevalue, setDiceValue] = useState<number>(1);
  const [animatinState, setAnimationState] = useState<AnimationState>('rest');

  const sleep = (ms: number): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  };

  const startAnimation = async (): Promise<void> => {
    setAnimationState('rolling');
    await sleep(1000);
    setAnimationState('drop');
    await sleep(500);
    setAnimationState('rest');
  };

  const onClickDice = (): { newDiceValue: number } => {
    const newDiceValue = Math.floor(Math.random() * 6 + 1);
    setDiceValue(newDiceValue);

    return { newDiceValue };
  };
  if (!user) return <Loading visible />;
  return (
    <>
      <BasicHeader user={user} />
      <div style={{ width: '100vw', height: '100vh' }}>
        <Canvas>
          <ambientLight intensity={1} />
          <pointLight position={[0, 10, 0]} intensity={200} />
          <Dice
            position={[-3, 0, 0]}
            diceValue={dicevalue}
            onClickDice={onClickDice}
            startAnimation={startAnimation}
            animationState={animatinState}
          />
          <Dice
            position={[0, 0, 0]}
            diceValue={dicevalue}
            onClickDice={onClickDice}
            startAnimation={startAnimation}
            animationState={animatinState}
          />
          <Dice
            position={[3, 0, 0]}
            diceValue={dicevalue}
            onClickDice={onClickDice}
            startAnimation={startAnimation}
            animationState={animatinState}
          />
        </Canvas>
      </div>
    </>
  );
};

export default DideApp;
