

import { Html } from '@react-three/drei'
import { Vector3 } from 'three'
function Label() {
  return (
    <>
    <Html position={new Vector3(1,1,1)}>
    <div style={{ position: 'absolute', top: 0, left: 0, color: 'white' }}>
        <h4>Sun</h4>
      </div>
    </Html></>
  )
}

export default Label