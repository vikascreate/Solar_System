import { Box } from "@react-three/drei"

function Stars() {
  return (
    <>
    {
        
        <mesh position={[10,10,10]}>
        <Box args={[10,10,1,1,1,1]}/>
        <meshBasicMaterial color={'white'}/>
    </mesh>}
    </>
  )
}

export default Stars