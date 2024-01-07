import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
interface OrbitProps{
    position:THREE.Vector3,
    color:string
}
function Orbit({position,color}:OrbitProps) {
    const OrbitRef=useRef<THREE.Mesh>(null)

    useFrame(({camera})=>{
        if(OrbitRef.current){
            OrbitRef.current.lookAt(camera.position)
        }
    })

  return (
    <>
    <mesh position={position} ref={OrbitRef}>
        <torusGeometry args={[50,2,2,40]} ></torusGeometry>
        <meshBasicMaterial color={color} />
    </mesh>
    </>
  )
}

export default Orbit