import { Canvas } from '@react-three/fiber';
import { userAtom } from 'atoms/user';
import { Loading } from 'components/Loading/Loading';
import { useAtom } from 'jotai';
import { BasicHeader } from 'pages/@components/BasicHeader/BasicHeader';
import { Dice } from 'pages/@components/DiceScene/DiceScene';
import { useState } from 'react';

const DideApp = () => {
  const [user] = useAtom(userAtom);
  const [dicevalue, setDiceValue] = useState<number>(1);

  const clickDice = () => {
    const newDiceValue = Math.floor(Math.random() * 6 + 1);
    setDiceValue(newDiceValue);
  };
  if (!user) return <Loading visible />;
  return (
    <>
      <BasicHeader user={user} />
      <div style={{ width: '100vw', height: '100vh' }}>
        <Canvas>
          <ambientLight intensity={1} />
          <pointLight position={[0, 10, 0]} intensity={200} />
          <Dice position={[-3, 0, 0]} diceValue={dicevalue} />
          <Dice position={[0, 0, 0]} diceValue={dicevalue} />
          <Dice position={[3, 0, 0]} diceValue={dicevalue} />
        </Canvas>
      </div>
    </>
  );
};

export default DideApp;
