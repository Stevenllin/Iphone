import * as THREE from 'three';
import { View, Html, PerspectiveCamera, OrbitControls } from '@react-three/drei';
import { Suspense } from 'react';
import Lights from '../Lights/Lights';
import IPhone from '../IPhone/IPhone';
import Loader from '../Loader/Loader';

const ModelView = ({ index, groupRef, gsapType, controlRef, setRotationState, size, item }) => {
  
  return (
    <View
      index={index}
      id={gsapType}
      className={`w-full h-full absolute ${index === 2 ? 'right-[-100%]' : ''}`}
    >
      {/** 環境光 */}
      <ambientLight intensity={0.3} />
      {/** 相機 */}
      <PerspectiveCamera makeDefault position={[0, 0, 4]} />
      {/** 聚光燈 */}
      <Lights />
      {/** Orbit */}
      <OrbitControls
        makeDefault
        ref={controlRef}
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.4}
        target={new THREE.Vector3(0, 0, 0)}
        onEnd={() => setRotationState(controlRef.current.getAzimuthalAngle())}
      />
      {/** IPhone */}
      <group ref={groupRef} name={`${index === 1} ? 'small' : 'large`} position={[0, 0 ,0]}>
        <Suspense fallback={<Loader />}>
          <IPhone
            scale={index === 1 ? [15, 15, 15] : [17, 17, 17]}
            item={item}
            size={size}
          />
        </Suspense>
      </group>
    </View>
  )
}

export default ModelView
