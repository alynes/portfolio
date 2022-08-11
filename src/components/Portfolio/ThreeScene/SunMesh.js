import React, {useEffect, useRef} from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber'
import { Water } from './Water'

export default function WaterMesh(props) {
	let sunRef = useRef(null);

    useFrame((state, delta) => {
        waterRef.current.material.uniforms['time'].value += 1.0 / 60.0;
		//waterRef.current.material.visible = true;
    })

    const pmremGenerator = new THREE.PMREMGenerator( renderer );

    sun = new THREE.Vector3();

    const phi = THREE.MathUtils.degToRad( 90 - parameters.elevation );
    const theta = THREE.MathUtils.degToRad( parameters.azimuth );

    sun.setFromSphericalCoords( 1, phi, theta );

    sky.material.uniforms[ 'sunPosition' ].value.copy( sun );
    water.material.uniforms[ 'sunDirection' ].value.copy( sun ).normalize();

    scene.environment = pmremGenerator.fromScene( sky ).texture;

	return (
		<mesh ref={sunRef} {...planeWater} />

	)
}