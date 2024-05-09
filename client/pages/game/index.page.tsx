import { DiceScene } from 'pages/@components/DiceScene/DiceScene';
import { useState } from 'react';

export type AnimateState = 'rest' | 'rolling' | 'drop';

export default function LikePage() {
  const [sum, setSum] = useState<number>(0);
  const [diceValue, setDiceValue] = useState<number>(1);
  const [animateState, setAnimateState] = useState<AnimateState>('rest');

  const onClickDice = () => {
    const newDiceValue = Math.floor(Math.random() * 6) + 1;
    const newSum = sum + newDiceValue;

    setDiceValue(newDiceValue);

    return { newDiceValue, newSum };
  };

  return (
    <>
      <DiceScene />
    </>
  );
}
