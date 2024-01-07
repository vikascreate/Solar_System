import { Line } from '@react-three/drei';
import { Ref, useState } from 'react'
import {
   //Euler,
    Vector3 } from 'three';
import { Line2 } from 'three/examples/jsm/Addons.js';
interface CircleProps {
    radiusX: number;
    radiusY:number;
    segments: number;
    color:string,
    position:Vector3
   // rotation:Euler,
    reft:Ref<Line2>
  }
  
function Circle({ radiusX,radiusY,segments,color,position,reft }:CircleProps) {
  const [lineWidthChange,setLineWidthChange]=useState<number>(2)
    const points:Vector3[]= [];
  for (let i = 0; i <= segments; i++) {
    const theta = (i / segments) * Math.PI * 2.5;
    const x = radiusX * Math.cos(theta);
    const y = radiusY * Math.sin(theta);
    points.push(new Vector3(x,y,0));
  }
  return (
    <Line
      points={points}
      color={color}
      lineWidth={lineWidthChange} // Adjust line width as needed
      position={position}
      onPointerEnter={()=>setLineWidthChange(4)}
      onPointerLeave={()=>setLineWidthChange(2)}
      // rotation={rotation}
      ref={reft}// Set the position of the circle in the scene
    />
  )
}

export default Circle