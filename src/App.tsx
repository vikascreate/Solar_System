import { useState } from 'react'
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
function App() {
  const [worldSpeed,setWorldSpeed]=useState(0.3)

  return (
    <>
      <div style={{display:'flex'}}>
      <Speed/>
      <button onClick={()=>setWorldSpeed(0.000000019533)} style={{backgroundColor:'#00FF48',zIndex:'5'}}>Live</button>
        <Canvas camera={{ position: [-200, -1800, -1800] ,near:1,far:100000000,rotation:new Euler(300,-700,200)}} style={{display:'flex',width:'100vw',height:'100vh',position:'fixed',zIndex:'1'}} >
          <pointLight position={[0,0,0]} intensity={30} color={'yellow'}/>
          <Sun/>
          <Stars radius={1000000} depth={5000} factor={25} saturation={-20} fade/>
          <OrbitControls enablePan={false} maxDistance={1000000}  />
          {/* //Mercury /Orbit*/}
          <Planet radiusX={544.5} radiusY={544.5} circleRad={30} color={'purple'} positionOrbit={new Vector3(0,0,-0.001)} positionPlanet={new Vector3(0,544.5,-0.001)} planetName='Mercury'
          speed={(1/0.24)*worldSpeed}
         // rotation={new Euler(-0.0001,0.003)}
          />
          {/* Venus /orbit */}
          <Planet radiusX={1072} radiusY={1072}  color={'red'}  planetName='Venus'
          //rotation={new Euler(0,-.03)}
           positionOrbit={new Vector3(4.2,-8.7,1.5)} positionPlanet={new Vector3(4.2,1063.3,1.5)} circleRad={30}
           speed={(1/0.62)*worldSpeed}/>
          {/* <Circle radiusX={1072} radiusY={1072} segments={128} position={new Vector3(4.2,-8.7,1.5)}  reft={null}/> */}
          {/* //Earth */}
          <Planet radiusX={1465} radiusY={1465} color={'#4AA7D2'} positionOrbit={new Vector3(3.2,1.4,-2)} positionPlanet={new Vector3(3.2,1466.4,-2)} circleRad={30} speed={1*worldSpeed} planetName='Earth'/>
          {/* Mars /orbit */}
          <Planet radiusX={2199} radiusY={2199} color={'#D28B4A'} positionOrbit={new Vector3(-2.5,4.5,1)} positionPlanet={new Vector3(-2.5,2203.5,1)} circleRad={30} speed={1/1.88*worldSpeed} planetName='Mars'/>
          {/* //Jupiter*/}
          <Planet radiusX={7458} radiusY={7458} color={'#B0D24A'} positionOrbit={new Vector3(4,-1,-1)} positionPlanet={new Vector3(4,7454,-1)} circleRad={30} speed={(1/11.86)*worldSpeed} planetName='Jupiter'/>
          {/*  /Saturn */}
          <Planet radiusX={14600} radiusY={14600} color={'#D24A4A'} positionOrbit={new Vector3(6,7,-3)} positionPlanet={new Vector3(6,14607,-3)} circleRad={30} speed={(1/29.46)*worldSpeed} planetName='Saturn'/>
          {/* //Uranus */}
          <Planet radiusX={29300} radiusY={29300} color={'#1BE8AE'} positionOrbit={new Vector3(16,3,-2)} positionPlanet={new Vector3(16,29303,-2)} circleRad={30} speed={(1/84.02)*worldSpeed} planetName='Uranus'/>
          {/* Neptune /orbit */}
          <Planet radiusX={44700} radiusY={44700} color={'#E8591B'} positionOrbit={new Vector3(13,-8,-12)} positionPlanet={new Vector3(13,44692,-12)} circleRad={30} speed={(1/164.79)*worldSpeed} planetName='Neptune'/>
          <EffectComposer>
          <Bloom intensity={3} kernelSize={5} luminanceThreshold={0.9} luminanceSmoothing={0.08}/>
          <Bloom intensity={2} kernelSize={4} luminanceThreshold={0.9} luminanceSmoothing={0.08}/>
          <Bloom intensity={2} kernelSize={3} luminanceThreshold={0.9} luminanceSmoothing={0.08}/>
          <Bloom intensity={2} kernelSize={2} luminanceThreshold={0.9} luminanceSmoothing={0.08}/>
          <Bloom intensity={3} kernelSize={1} luminanceThreshold={0.9} luminanceSmoothing={0.08}/>
          </EffectComposer>
        </Canvas>
        </div>
    </>
  )
}

export default App
