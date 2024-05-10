import { Canvas } from '@react-three/fiber';
import { userAtom } from 'atoms/user';
import { Loading } from 'components/Loading/Loading';
import { useAtom } from 'jotai';
import { BasicHeader } from 'pages/@components/BasicHeader/BasicHeader';
import { DiceScene } from 'pages/@components/DiceScene/DiceScene';

const DideApp = () => {
  const [user] = useAtom(userAtom);
  if (!user) return <Loading visible />;
  return (
    <>
      <BasicHeader user={user} />
      <div style={{ width: '100vw', height: '100vh' }}>
        <Canvas>
          <ambientLight />
          <pointLight position={[0, 10, 0]} />
          <DiceScene position={[-3, 0, 0]} />
          <DiceScene position={[0, 0, 0]} />
          <DiceScene position={[3, 0, 0]} />
        </Canvas>
      </div>
    </>
  );
};

export default DideApp;
