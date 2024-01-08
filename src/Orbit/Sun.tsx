
import {  useFrame, useLoader } from '@react-three/fiber'
import { GLTFLoader,} from 'three/examples/jsm/Addons.js'
//import { OrbitControls } from 'three/examples/jsm/Addons.js'
import { useRef } from 'react'
import Label from './Label'
function Sun() {
    const manager=useRef<THREE.Object3D>(null)
   const gltf=useLoader(GLTFLoader,'./Models/solarSystem.glb')
   useFrame(({camera})=>{
    if(manager.current)
   { const SunMesh=manager.current.children[0]
    const distance = camera.position.distanceTo(SunMesh.position);
    if(distance>1000){
    const scaleFactor =  0.005*Math.pow(distance,1.02);// Adjust the denominator to control the size

          SunMesh.scale.set(scaleFactor, scaleFactor, scaleFactor);
   }
  }
   })
  return (
    <>
    <primitive object={gltf.scene} ref={manager}/>
    <Label/>
    </>
  )
}

export default Sun