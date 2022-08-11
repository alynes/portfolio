import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three';
import { Canvas } from '@react-three/fiber'
import WaterMesh from './WaterMesh';
import SkyMesh from './SkyMesh'
import Box from './Box';
import { Sky } from './Sky';
import { Water } from './Water'


export default function ThreeScene() {
    let canvasRef = useRef(null);

    // Camera
    const camera = new THREE.PerspectiveCamera(
        60, window.innerWidth / window.innerHeight, 1, 20000
    );
    camera.position.set(0,45,100);
    camera.rotation.x = 50;

    // Water
    const waterGeometry = new THREE.PlaneGeometry( 10000, 10000 );
    const water = new Water(
        waterGeometry,
        {
            textureWidth: 512,
            textureHeight: 512,
            waterNormals: new THREE.TextureLoader().load(process.env.PUBLIC_URL + './waternormals.jpg', function ( texture ) {

                texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

            } ),
            sunDirection: new THREE.Vector3(),
            sunColor: 0xffffff,
            waterColor: 0x001e0f,
            distortionScale: 3.7,
            fog: true
        }
    );
    water.rotation.x = - Math.PI / 2;

    // Sky
    const sky = new Sky();
    sky.scale.setScalar( 10000 );

    const skyUniforms = sky.material.uniforms;

    skyUniforms[ 'turbidity' ].value = 10;
    skyUniforms[ 'rayleigh' ].value = 2;
    skyUniforms[ 'mieCoefficient' ].value = 0.005;
    skyUniforms[ 'mieDirectionalG' ].value = 0.8;

    // Sun 
    const parameters = {
        elevation: 2,
        azimuth: 90
    };

    useEffect(() => {
        if (canvasRef.current) {
            const sun = new THREE.Vector3();
        
            const phi = THREE.MathUtils.degToRad( 90 - parameters.elevation );
            const theta = THREE.MathUtils.degToRad( parameters.azimuth );
        
            sun.setFromSphericalCoords( 1, phi, theta );
        
            sky.material.uniforms[ 'sunPosition' ].value.copy( sun );
            water.material.uniforms[ 'sunDirection' ].value.copy( sun ).normalize();
        }
    }, [])

    console.log('render');
    return (
        <div className={'absolute-full-centered'}>
        <Canvas
            ref={canvasRef}
            camera={camera}
            environment={sky.texture ?? undefined}
            
            
            
        >
            {/* <ambientLight intensity={0.9} /> */}
            {/* <spotLight position={[100, 100, 100]} angle={0.25} penumbra={1} /> */}
            {/* <pointLight position={[-10, -10, -10]} /> */}

            <WaterMesh water={water} />

            <Box position={[0, 0, 0]}  />
            
            <SkyMesh sky={sky} />

        </Canvas>
            
        </div>
    )
}
