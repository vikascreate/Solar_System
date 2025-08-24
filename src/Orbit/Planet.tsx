
//import { Html } from '@react-three/drei'
import { 
  //useEffect,
   useRef
   , useState 
  } from 'react';
import { useFrame, useThree} from '@react-three/fiber';
import Circle from './Circle';
import {
    Group, Vector3,
    // Euler
} from 'three';
import { Line2 } from 'three/examples/jsm/Addons.js';
import {Html} from "@react-three/drei";
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


function Planet({radiusX,radiusY,circleRad,color,positionOrbit,speed,planetName
  //planetName
//  rotation
}:PlanetProps) {
    const groupRef = useRef<Group>(null);
    const PlanetRef=useRef<Line2>(null)
    const [cameralook,setCameraLook]=useState<number>(0)
    const {camera}=useThree()
    const [labelOpacity, setLabelOpacity] = useState<number>(1);

    // --- NEW: Refs for tracking orbit time ---
    const completedOrbitsRef = useRef(0);
    const lastLogTimeRef = useRef(0);
    // ------------------------------------------



    useFrame(({ clock }) => {
        if (!groupRef.current) return; // Guard clause

        // Calculate position

        const elapsedTime = clock.getElapsedTime();
        const angle = elapsedTime * speed ;
        const x = Math.cos(angle) * radiusX;
        const y = Math.sin(angle) * radiusY;

        // 2. Update the position of the entire <group>
        groupRef.current.position.set(x, y, positionOrbit.z);


        // --- NEW: Orbit completion logging logic ---
        // A full circle is 2 * PI radians.
        // We use Math.abs(angle) to handle reverse motion (negative speed).
        const totalOrbitsCompleted = Math.floor(Math.abs(angle) / (2 * Math.PI));

        // Check if a new orbit has been completed
        if (totalOrbitsCompleted > completedOrbitsRef.current) {
            // Calculate the time it took for this specific orbit
            const orbitDuration = elapsedTime - lastLogTimeRef.current;

            console.log(
                `🪐 ${planetName}: Orbit #${totalOrbitsCompleted} completed in ${orbitDuration.toFixed(5)} seconds.`
            );

            // Update refs for the next orbit
            lastLogTimeRef.current = elapsedTime;
            completedOrbitsRef.current = totalOrbitsCompleted;
        }
        // ------------------------------------------


        // Scaling and camera logic remains the same, but references the group
        const distance = camera.position.distanceTo(groupRef.current.position);
      //  console.log(distance)
        const scaleFactor = distance * 0.0005;
        const maxDistance=15000
        const opacity = Math.max(0, 1 - distance / maxDistance);
        setLabelOpacity(opacity);


        // You might want to scale the planet mesh itself, not the whole group
        // If you have a ref on the planet Circle, use that here.
        // For now, I'll assume you want to scale the whole group (planet + label).
        groupRef.current.scale.set(scaleFactor, scaleFactor, scaleFactor);
        groupRef.current.lookAt(camera.position);

        if (cameralook === 1) {
            camera.lookAt(groupRef.current.position);
        }
    });

    // And update your SeePlanet function
    function SeePlanet(){
        console.log('clicked on Planet doing stuff')
        if(groupRef.current) {
            camera.position.lerp(new Vector3(groupRef.current.position.x+90, groupRef.current.position.y+80, groupRef.current.position.z+300), 1);

            camera.lookAt(groupRef.current.position);
        }
    }
    return (
        <>
            {/* 3. Wrap the planet and the label in a <group> and attach the ref here */}
            <group ref={groupRef} onClick={SeePlanet}>
                <Circle
                    radiusX={circleRad}
                    radiusY={circleRad}
                    segments={128}
                    color={color}
                    position={new Vector3(0, 0, 0)} // Positioned at the center of the group
                    reft={null} // Ref is now on the group
                    onClicked={() => console.log('clicked planet')}
                />
                <Html position={[0, circleRad * 1.5, 0]}> {/* Position label relative to the planet */}
                    <div style={{ color: 'white', whiteSpace: 'nowrap',opacity:labelOpacity }}>
                        <h4>{planetName}</h4>
                    </div>
                </Html>
            </group>

            {/* The orbit remains separate */}
            <Circle
                radiusX={radiusX}
                radiusY={radiusX} // Should this be radiusY?
                segments={128}
                color={color}
                position={positionOrbit}
                reft={null}
                onClicked={SeePlanet}
            />
        </>
    );
}

export default Planet;