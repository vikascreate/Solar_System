
//import { Html } from '@react-three/drei'
import { 
  //useEffect,
   useRef
   , useState 
  } from 'react';
import { useFrame, useThree} from '@react-three/fiber';
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
    const [cameralook,setCameraLook]=useState<number>(0)
    const {camera}=useThree()
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
   //   const maxDistance=10;
    //  const opacity = 1 - Math.min(distance / maxDistance, 1);
    //  PlanetRef.current.material.setValues({opacity:0})
           PlanetRef.current.lookAt(camera.position);
           PlanetRef.current.position.set(x,y,positionOrbit.z)
           console.log(PlanetRef.current.position)
           if(cameralook==1){
            
            camera.lookAt(PlanetRef.current.position)
           }
         //  PlanetRef.current.material.opacity
       //    setcoords(PlanetRef.current.position)
         // PlanetRef.current.rotateY(camera.rotation.y);
         // PlanetRef.current.rotateZ(camera.rotation.z);
        }
      })
      function SeePlanet(){
        console.log('clicked on Planet')
        console.log(camera)
        if(PlanetRef.current)
        { camera.position.lerp(new Vector3(PlanetRef.current.position.x+90,PlanetRef.current.position.y+80,PlanetRef.current.position.z+300),1)
          setCameraLook(1)
        }
      console.log(camera)
      }
  return (
    <>
          <Circle  radiusX={circleRad} radiusY={circleRad} segments={128} color={color} position={positionPlanet} 
       //   rotation={new Eu}
           reft={PlanetRef} onClicked={()=>console.log('clicked')}/>
           {/* <Orbit position={positionPlanet} color={color}/> */}
          <Circle radiusX={radiusX} radiusY={radiusX} segments={128} color={color} position={positionOrbit} 
          // rotation={rotation}
           reft={null}
           onClicked={()=>SeePlanet()}
           />
           {/* <Html position={coords}>
             <div style={{ position: 'absolute', color: 'white',top:2,left:0}}>
           <h4>{planetName}</h4>
      </div>
    </Html> */}
    </>
  )
}

export default Planet