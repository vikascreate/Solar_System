import {Suspense, useState} from 'react'
import { Canvas } from '@react-three/fiber'
import './App.css'
import {
   OrbitControls, 
   Stars} from '@react-three/drei'
import { Bloom, EffectComposer } from '@react-three/postprocessing'
import { 
  Euler,
 // Euler,
  Vector3 } from 'three'
import Planet from './Orbit/Planet'
import Speed from './Component/Speed'
import Sun from './Orbit/Sun'

// --- NEW: Radii defined in a constant object ---
const PLANET_RADII = {
    mercury: 544.5,
    venus: 1072,
    earth: 1465,
    mars: 2199,
    jupiter: 7458,
    saturn: 14600,
    uranus: 29300,
    neptune: 44700,
};

const ANIMATION_SCALING_FACTOR = .00000020;

function App() {
  const [worldSpeed,setWorldSpeed]=useState(0.00005)

  const Loader = () => (<div>Loading...</div>);
  return (
    <>
      <Suspense fallback={<Loader />}>
      <div style={{display:'flex'}}>
        <Canvas camera={{ position: [0, 0, 500]  ,near:1,far:100000000,rotation:new Euler(300,-700,200)}} style={{display:'flex',width:'100vw',height:'100vh',position:'fixed',zIndex:'1'}} >
          <pointLight position={[0,0,0]} intensity={30} color={'yellow'}/>
          <Sun/>
          <Stars radius={1000000} depth={5000} factor={25} saturation={-20} fade/>
          <OrbitControls enablePan={false} maxDistance={1000000}  />
          {/* //Mercury /Orbit*/}
          <Planet radiusX={PLANET_RADII.mercury} radiusY={PLANET_RADII.mercury} circleRad={30} color={'purple'} positionOrbit={new Vector3(0,0,-0.001)} positionPlanet={new Vector3(0,544.5,-0.001)} planetName='Mercury'
          speed={((1/0.24)* worldSpeed * ANIMATION_SCALING_FACTOR)}

              // rotation={new Euler(-0.0001,0.003)}
          />
          {/* Venus /orbit */}
          <Planet radiusX={PLANET_RADII.venus} radiusY={PLANET_RADII.venus}  color={'red'}  planetName='Venus'
          //rotation={new Euler(0,-.03)}
           positionOrbit={new Vector3(4.2,-8.7,1.5)} positionPlanet={new Vector3(4.2,1063.3,1.5)} circleRad={30}
           speed={((1/0.62)* worldSpeed * ANIMATION_SCALING_FACTOR)}/>
          {/* //Earth */}
          <Planet radiusX={PLANET_RADII.earth} radiusY={PLANET_RADII.earth} color={'#4AA7D2'}
                  positionOrbit={new Vector3(3.2,1.4,-2)}
                  positionPlanet={new Vector3(3.2,1466.4,-2)} circleRad={30}
                  speed={( worldSpeed * ANIMATION_SCALING_FACTOR)} planetName='Earth'/>
          {/* Mars /orbit */}
          <Planet radiusX={PLANET_RADII.mars} radiusY={PLANET_RADII.mars} color={'#D28B4A'}
                  positionOrbit={new Vector3(-2.5,4.5,1)}
                  positionPlanet={new Vector3(-2.5,2203.5,1)} circleRad={30}
                  speed={((1/1.88)* worldSpeed * ANIMATION_SCALING_FACTOR) } planetName='Mars'/>
          {/* //Jupiter*/}
          <Planet radiusX={PLANET_RADII.jupiter} radiusY={PLANET_RADII.jupiter} color={'#B0D24A'}
                  positionOrbit={new Vector3(4,-1,-1)}
                  positionPlanet={new Vector3(4,7454,-1)} circleRad={30}
                  speed={((1/11.86)* worldSpeed * ANIMATION_SCALING_FACTOR) } planetName='Jupiter'/>
          {/*  /Saturn */}
          <Planet radiusX={PLANET_RADII.saturn} radiusY={PLANET_RADII.saturn} color={'#D24A4A'}
                  positionOrbit={new Vector3(6,7,-3)}
                  positionPlanet={new Vector3(6,14607,-3)} circleRad={30}
                  speed={((1/29.46)* worldSpeed * ANIMATION_SCALING_FACTOR) }  planetName='Saturn'/>
          {/* //Uranus */}
          <Planet radiusX={PLANET_RADII.uranus} radiusY={PLANET_RADII.uranus} color={'#1BE8AE'}
                  positionOrbit={new Vector3(16,3,-2)}
                  positionPlanet={new Vector3(16,29303,-2)} circleRad={30}
                  speed={((1/84.02)* worldSpeed * ANIMATION_SCALING_FACTOR)}
                  planetName='Uranus'/>
          {/* Neptune /orbit */}
          <Planet radiusX={PLANET_RADII.neptune}
                  radiusY={PLANET_RADII.neptune} color={'#E8591B'}
                  positionOrbit={new Vector3(13,-8,-12)}
                  positionPlanet={new Vector3(13,44692,-12)} circleRad={30}
                  speed={((1/164.79)* worldSpeed * ANIMATION_SCALING_FACTOR) }
                  planetName='Neptune'/>
          <EffectComposer>
          <Bloom intensity={3} kernelSize={5} luminanceThreshold={0.9} luminanceSmoothing={0.08}/>
          <Bloom intensity={2} kernelSize={4} luminanceThreshold={0.9} luminanceSmoothing={0.08}/>
          <Bloom intensity={2} kernelSize={3} luminanceThreshold={0.9} luminanceSmoothing={0.08}/>
          <Bloom intensity={2} kernelSize={2} luminanceThreshold={0.9} luminanceSmoothing={0.08}/>
          <Bloom intensity={3} kernelSize={1} luminanceThreshold={0.9} luminanceSmoothing={0.08}/>
          </EffectComposer>
        </Canvas>


        {/* UI elements positioned on top */}
        <div style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '15px'
        }}>
          {/* Pass the state and setter to the Speed component */}
          <Speed worldSpeed={worldSpeed} setWorldSpeed={setWorldSpeed} />

          {/* The "Live" button is still useful for jumping directly to the exact live speed */}
          <button
              onClick={() => setWorldSpeed(0.000000019533)}
              style={{
                backgroundColor: '#00FF48',
                zIndex: '5',
                border: 'none',
                padding: '10px 15px',
                borderRadius: '5px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
          >
            Live
          </button>
        </div>
        </div>
      </Suspense>
    </>
  )
}

export default App
