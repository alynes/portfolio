import React, { useEffect, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'


export default function SkyMesh(props) {
    let skyRef = useRef(null);

    useFrame((state, delta) => {
        //waterRef.current.material.uniforms['time'].value += 1.0 / 60.0;
		//waterRef.current.material.visible = true;
    })

    useEffect(() => {

        console.log('skymesh');
    }, [props.sky])

	return (
		<mesh ref={skyRef} {...props.sky} />

	)
}
