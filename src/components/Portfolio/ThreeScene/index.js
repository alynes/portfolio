import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three';

import Stats from 'three/examples/jsm/libs/stats.module.js';

import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { FlyControls } from 'three/examples/jsm/controls/FlyControls';
import { Water } from 'three/examples/jsm/objects/Water.js';
import { Sky } from 'three/examples/jsm/objects/Sky.js';
import ThreeJsUtils from '../../../utility/ThreeJsUtils';


export default function ThreeScene() {

    let container, stats;
    let camera, scene, renderer;
    let controls, water, sun, mesh;

    let cubeSide0Mesh, cubeSide1Mesh, cubeSide2Mesh, cubeSide3Mesh;
    const cubeSideSize = 20;

    const cubeStartingY = 40;
    const cubeStartingX = 0;
    const cubeStartingZ = 0;

    let bpChroniclesCubeMesh, tradeBoyCubeMesh, socialAutomatorCubeMesh;

    useEffect(() => {
        init();
        animate();
    }, [])

    
    
    function init() {

        container = document.getElementById( '3js-container' );

        //

        renderer = new THREE.WebGLRenderer();
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize( window.innerWidth, window.innerHeight );
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        container.appendChild( renderer.domElement );

        //

        scene = new THREE.Scene();

        camera = new THREE.PerspectiveCamera( 55, window.innerWidth / window.innerHeight, 1, 20000 );
        camera.position.set( 0, 30, 100 );

        //

        sun = new THREE.Vector3();

        // Water

        const waterGeometry = new THREE.PlaneGeometry( 10000, 10000 );

        water = new Water(
            waterGeometry,
            {
                textureWidth: 512,
                textureHeight: 512,
                waterNormals: new THREE.TextureLoader().load(process.env.PUBLIC_URL + '/waternormals.jpg', function ( texture ) {
                    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
                } ),
                sunDirection: new THREE.Vector3(),
                sunColor: 0xffffff,
                waterColor: 0x001e0f,
                distortionScale: 3.7,
                fog: scene.fog !== undefined,
                //size: 6
            }
        );

        water.rotation.x = - Math.PI / 2;
        water.material.uniforms[ 'size' ].value = 6;
        

        scene.add( water );

        // Skybox

        const sky = new Sky();
        sky.scale.setScalar( 10000 );
        scene.add( sky );

        const skyUniforms = sky.material.uniforms;

        skyUniforms[ 'turbidity' ].value = 10;
        skyUniforms[ 'rayleigh' ].value = 2;
        skyUniforms[ 'mieCoefficient' ].value = 0.005;
        skyUniforms[ 'mieDirectionalG' ].value = 0.8;

        const parameters = {
            elevation: 2,
            azimuth: 180
        };

        const pmremGenerator = new THREE.PMREMGenerator( renderer );

        function updateSun() {

            const phi = THREE.MathUtils.degToRad( 90 - parameters.elevation );
            const theta = THREE.MathUtils.degToRad( parameters.azimuth );

            sun.setFromSphericalCoords( 1, phi, theta );

            sky.material.uniforms[ 'sunPosition' ].value.copy( sun );
            water.material.uniforms[ 'sunDirection' ].value.copy( sun ).normalize();

            scene.environment = pmremGenerator.fromScene( sky ).texture;

        }

        updateSun();

        // Cube
        

        // // Create video and play
        // let textureVid = document.createElement("video")
        // textureVid.src = process.env.PUBLIC_URL + '/bc-all-directions.mp4'; // transform gif to mp4
        // textureVid.loop = true;
        // textureVid.muted = true;
        // textureVid.play();


        // // Load video texture
        // let videoTexture = new THREE.VideoTexture(textureVid);
        // videoTexture.format = THREE.RGBFormat;
        // videoTexture.minFilter = THREE.NearestFilter;
        // videoTexture.maxFilter = THREE.NearestFilter;
        // videoTexture.generateMipmaps = false;

        // const geometry = new THREE.BoxGeometry( 30, 30, 2 );
        // const material = new THREE.MeshStandardMaterial( { roughness: 0, map: videoTexture} );

        // mesh = new THREE.Mesh( geometry, material );
        // scene.add(mesh);


        // Cube 2
        

    
        // let loader = new THREE.TextureLoader();
        // let mats = [
        //     process.env.PUBLIC_URL + '/astronaut-flip.gif', //those are strings with urls, for example: "https://threejs.org/examples/textures"/uv_grid_opengl.jpg
        //     process.env.PUBLIC_URL + '/github-mark.png',
        //     process.env.PUBLIC_URL + '/tourists.jpg',
        //     process.env.PUBLIC_URL + '/github-mark.png',
        //     process.env.PUBLIC_URL + '/github-mark.png',
        //     process.env.PUBLIC_URL + '/github-mark.png',
        // ].map(pic => {
        //     return new THREE.MeshLambertMaterial({map: loader.load(pic), side: THREE.DoubleSide, color: 'white', });
        // });

        // const side0Geometry = new THREE.PlaneGeometry( cubeSideSize, cubeSideSize );
        // const side0Material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
        // cubeSide0Mesh = new THREE.Mesh( side0Geometry, mats[0]);
        // cubeSide0Mesh.position.set(cubeStartingX, cubeStartingY, cubeStartingZ);
        // cubeSide0Mesh.position.z = cubeStartingZ - (cubeSideSize / 2);
        // scene.add( cubeSide0Mesh );

        // cubeSide0Mesh = ThreeJsUtils.generateSimpleVideoTexturePlaneMesh(cubeSideSize, cubeSideSize, cubeStartingX, cubeStartingY, cubeStartingZ - (cubeSideSize / 2), 
        //     undefined, process.env.PUBLIC_URL + '/bc-all-directions.mp4');
        // scene.add(cubeSide0Mesh);

        // const side1Geometry = new THREE.PlaneGeometry( cubeSideSize, cubeSideSize );
        // const side1Material = new THREE.MeshBasicMaterial( {color: 'black', side: THREE.DoubleSide} );
        // cubeSide1Mesh = new THREE.Mesh( side1Geometry, mats[1] );
        // cubeSide1Mesh.rotation.x = Math.PI / 2;
        // cubeSide1Mesh.position.y = cubeStartingY + (cubeSideSize / 2);
        // scene.add( cubeSide1Mesh );

        
        // const side2Geometry = new THREE.PlaneGeometry( cubeSideSize, cubeSideSize );
        // const side2Material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
        // cubeSide2Mesh = new THREE.Mesh( side2Geometry, mats[2] );
        // cubeSide2Mesh.rotation.y = Math.PI / 2;
        // cubeSide2Mesh.position.x = cubeStartingX + (cubeSideSize / 2);
        // cubeSide2Mesh.position.y = cubeStartingY;
        // scene.add( cubeSide2Mesh );

        // const side3Geometry = new THREE.PlaneGeometry( cubeSideSize, cubeSideSize );
        // const side3Material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
        // cubeSide3Mesh = new THREE.Mesh( side3Geometry, mats[0]);
        // cubeSide3Mesh.position.set(cubeStartingX, cubeStartingY, cubeStartingZ);
        // cubeSide3Mesh.position.z = cubeStartingZ + (cubeSideSize / 2);
        // scene.add( cubeSide3Mesh ); 

        bpChroniclesCubeMesh = ThreeJsUtils.generateSimpleVideoTextureBoxMesh(30, 30, 5, 0, 25, 0, 0, 0, 0,
            process.env.PUBLIC_URL + '/bc-all-directions.mp4', process.env.PUBLIC_URL + '/bc-all-directions.mp4');
        scene.add(bpChroniclesCubeMesh);

        tradeBoyCubeMesh = ThreeJsUtils.generateSimpleVideoTextureBoxMesh(30, 30, 5, -45, 25, -10, 0, (Math.PI / 8), 0,
            process.env.PUBLIC_URL + '/tb-buysell.mp4', process.env.PUBLIC_URL + '/tb-tb-price.mp4');
        scene.add(tradeBoyCubeMesh);

        socialAutomatorCubeMesh = ThreeJsUtils.generateSimpleVideoTextureBoxMesh(30, 30, 5, 45, 25, -10, 0, -1 * (Math.PI / 8), 0,
            process.env.PUBLIC_URL + '/sa-schedule.mp4', process.env.PUBLIC_URL + '/sa-task-create.mp4');
        scene.add(socialAutomatorCubeMesh);

        const light = new THREE.AmbientLight( 0x404040 ); // soft white light
        light.intensity = 5;
        scene.add( light );

        //

        // controls = new OrbitControls( camera, renderer.domElement );
        // controls.maxPolarAngle = Math.PI * 0.495;
        // controls.target.set( 0, 10, 0 );
        // controls.minDistance = 40.0;
        // controls.maxDistance = 200.0;
        // controls.update();

        controls = new FlyControls( camera, renderer.domElement );
        controls.movementSpeed = 1000;
        controls.domElement = renderer.domElement;
        controls.rollSpeed = Math.PI / 24;
        controls.autoForward = false;
        controls.dragToLook = false;        //

        stats = new Stats();
        container.appendChild( stats.dom );

        // GUI

        const gui = new GUI();

        const folderSky = gui.addFolder( 'Sky' );
        folderSky.add( parameters, 'elevation', 0, 90, 0.1 ).onChange( updateSun );
        folderSky.add( parameters, 'azimuth', - 180, 180, 0.1 ).onChange( updateSun );
        folderSky.open();

        const waterUniforms = water.material.uniforms;

        const folderWater = gui.addFolder( 'Water' );
        folderWater.add( waterUniforms.distortionScale, 'value', 0, 8, 0.1 ).name( 'distortionScale' );
        folderWater.add( waterUniforms.size, 'value', 0.1, 10, 0.1 ).name( 'size' );
        folderWater.open();

        //

        window.addEventListener( 'resize', onWindowResize );

    }

    function onWindowResize() {

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize( window.innerWidth, window.innerHeight );

    }

    function animate() {

        requestAnimationFrame( animate );
        render();
        stats.update();

    }

    function render() {

        const time = performance.now() * 0.001;

        let yPos = Math.sin(Math.sin( time * 5 + 10 ) );
        tradeBoyCubeMesh.position.y = yPos;
        bpChroniclesCubeMesh.position.y = yPos;
        socialAutomatorCubeMesh.position.y = yPos;
        // mesh.rotation.x = time * 0.5;
        // mesh.rotation.z = time * 0.51;

        const cubeMeshMovementMod = 2;

        // cubeSide0Mesh.position.z = cubeStartingZ - (cubeSideSize / 2) - (Math.abs(Math.sin(time) * cubeMeshMovementMod));
        // cubeSide1Mesh.position.y = cubeStartingY + (cubeSideSize / 2) + (Math.abs(Math.sin(time) * cubeMeshMovementMod));
        // cubeSide2Mesh.position.x = cubeStartingX + (cubeSideSize / 2) + (Math.abs(Math.sin(time) * cubeMeshMovementMod));
        // cubeSide3Mesh.position.z = cubeStartingZ + (cubeSideSize / 2) + (Math.abs(Math.sin(time) * cubeMeshMovementMod));

        water.material.uniforms[ 'time' ].value += 1.0 / 60.0;

        renderer.render( scene, camera );

    }

    return (
        <div id="3js-container"></div>
    )


}
