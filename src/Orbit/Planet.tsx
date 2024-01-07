
//import { Html } from '@react-three/drei'
import { 
  //useEffect,
   useRef
   //, useState 
  } from 'react';
import { useFrame } from '@react-three/fiber';
import Circle from './Circle';
import { Vector3,
 // Euler 
} from 'three';
import { Line2 } from 'three/examples/jsm/Addons.js';
//import Orbit from './Orbit';
interface PlanetProps{
  radiusX:number,
  radiusY:number,
  circleRad:number,
  color:string,
  positionPlanet:Vector3,
  positionOrbit:Vector3,
  speed:number,
  planetName:string,
 // rotation:Euler,
}
function Planet({radiusX,radiusY,circleRad,color,positionPlanet,positionOrbit,speed,
  //planetName
//  rotation
}:PlanetProps) {
    const PlanetRef=useRef<Line2>(null)
   // const [coords,setcoords] =useState<THREE.Vector3>(positionPlanet)
    // useEffect(()=>{
    //   if(PlanetRef.current)
    //   {setcoords(PlanetRef.current.position)
    // console.log(coords)}
    // },[PlanetRef.current?.position])
    useFrame(({clock,camera }) => {
        // Make the circle always face the camera
        const delta= clock.getElapsedTime()*speed;
        const x = Math.cos(delta) * radiusX;
    const y = Math.sin(delta) * radiusY;
        if (PlanetRef.current) {
          const distance = camera.position.distanceTo(PlanetRef.current.position);
          const scaleFactor =  distance*0.0005;// Adjust the denominator to control the size

      PlanetRef.current.scale.set(scaleFactor, scaleFactor, scaleFactor);
           PlanetRef.current.lookAt(camera.position);
           PlanetRef.current.position.set(x,y,positionOrbit.z)
       //    setcoords(PlanetRef.current.position)
         // PlanetRef.current.rotateY(camera.rotation.y);
         // PlanetRef.current.rotateZ(camera.rotation.z);
        }
      })
  return (
    <>
          <Circle  radiusX={circleRad} radiusY={circleRad} segments={128} color={color} position={positionPlanet} 
       //   rotation={new Eu}
           reft={PlanetRef}/>
           {/* <Orbit position={positionPlanet} color={color}/> */}
          <Circle radiusX={radiusX} radiusY={radiusX} segments={128} color={color} position={positionOrbit} 
          // rotation={rotation}
           reft={null}/>
           {/* <Html position={coords}>
             <div style={{ position: 'absolute', color: 'white',top:2,left:0}}>
           <h4>{planetName}</h4>
      </div>
    </Html> */}
    </>
  )
}

export default Planet