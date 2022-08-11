import React, {useEffect, useRef} from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber'


export default function WaterMesh(props) {
	let waterRef = useRef(null);

    useFrame((state, delta) => {
        waterRef.current.material.uniforms['time'].value += 1.0 / 60.0;
		//waterRef.current.material.visible = true;
    })

	return (
		<mesh ref={waterRef} {...props.water} />

	)
}