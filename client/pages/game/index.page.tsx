import { Canvas } from '@react-three/fiber';
import type { NextPage } from 'next';
import { Box } from 'pages/@components/TestBox';

const Home: NextPage = () => (
  <div style={{ width: '100vw', height: '100vh' }}>
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Box position={[-3.2, 0, 0]} />
      <Box position={[0, 0, 0]} />
      <Box position={[3.2, 0, 0]} />
    </Canvas>
  </div>
);

export default Home;
