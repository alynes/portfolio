import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three';
import * as TWEEN from '@tweenjs/tween.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';
import { Water } from 'three/examples/jsm/objects/Water.js';
import { Sky } from 'three/examples/jsm/objects/Sky.js';
import ThreeJsUtils from '../../../utility/ThreeJsUtils';
import RouteConstants from '../../../constant/RouteConstants';

export default function ThreeScene(props) {
    let container,
        camera, 
        controls,
        scene, 
        renderer,
        water, 
        sun;

    let bpChroniclesCubeMesh, tradeBoyCubeMesh, socialAutomatorCubeMesh;
    const bpChroniclesCubeMeshDescriptor = RouteConstants.BpChronicles, tradeBoyCubeMeshDescriptor = RouteConstants.TradeBoy, 
        socialAutomatorCubeMeshDescriptor = RouteConstants.SocialAutomator, waterMeshDescriptor = 'WATER', skyMeshDescriptor = 'SKY';

    const threeJsContainerId = '3js-container';

    const modalShowTimeoutMs = 800;
    const cameraMoveTimeoutMs = 600;

    const portfolioItemOriginalY = 25;
    const portfolioItemTextSize = 300;
    const portfolioItemTextYPosMod = 21;

    const cameraOriginalPosition = {x: 0, y: 30, z: 100};
    const cameraOriginalTarget = {x: 0, y: 10, z: 0};
    const cameraCloseUpPositionZ = 50;
    const cameraFov = 50;
    const planeAspectRatio = 16 / 9;

    const clientYOffsetNavbarHeight = 48;
    const showGuiControls = false;

    let lastClickedObject = null;
    let isOriginalPosition = true;
    let cancelShowModal = false;

    const hasMovedOrbitControlsThreshold = 5;
    let isMovingOrbitControls = false;
    let mouseStartXY = {x: 0, y: 0};
    let mouseDistanceXY = {x: 0, y: 0};

    const isCameraMoving = useRef(false);
    
    useEffect(() => {
        init();
        animate();
    }, [])
    
    let onContainerClick = (event) => {
        let closestObject = getClosestIntersectingObject(event);

        let targetCameraX, targetCameraY, targetCameraZ;
        let targetTargetX, targetTargetY, targetTargetZ;

        switch(closestObject.descriptor) {
            case waterMeshDescriptor: 
            case skyMeshDescriptor:
                if (isOriginalPosition) {
                    targetCameraX = bpChroniclesCubeMesh.position.x / 2;
                    targetCameraY = bpChroniclesCubeMesh.position.y + (bpChroniclesCubeMesh.geometry.parameters.height / 2);
                    targetCameraZ = cameraCloseUpPositionZ;
                    targetTargetX = bpChroniclesCubeMesh.position.x;
                    targetTargetY = bpChroniclesCubeMesh.position.y;
                    targetTargetZ = bpChroniclesCubeMesh.position.z;
                    
                    isOriginalPosition = false;
                } else { 
                    targetCameraX = cameraOriginalPosition.x;
                    targetCameraY = cameraOriginalPosition.y + (bpChroniclesCubeMesh.geometry.parameters.height / 2);
                    targetCameraZ = cameraOriginalPosition.z;
                    targetTargetX = cameraOriginalTarget.x;
                    targetTargetY = cameraOriginalTarget.y;
                    targetTargetZ = cameraOriginalTarget.z;
                    
                    isOriginalPosition = true; 
                }
                cancelShowModal = true;
                break;
            case tradeBoyCubeMeshDescriptor:
            case bpChroniclesCubeMeshDescriptor:
            case socialAutomatorCubeMeshDescriptor:
                targetCameraX = closestObject.position.x / 2;
                targetCameraY = closestObject.position.y;
                targetCameraZ = cameraCloseUpPositionZ;
                targetTargetX = closestObject.position.x;
                targetTargetY = closestObject.position.y;
                targetTargetZ = closestObject.position.z;

                let isDelayModal;
                switch(lastClickedObject?.descriptor) {
                    case closestObject.descriptor:
                        isDelayModal = false;
                        break;
                    case skyMeshDescriptor:
                    case waterMeshDescriptor:
                        isDelayModal = ((closestObject.descriptor === bpChroniclesCubeMeshDescriptor) 
                            && (!isOriginalPosition)) ? false : true;
                        break;
                    default:
                        isDelayModal = true;
                        break;
                }

                isOriginalPosition = false;
                cancelShowModal = false;

                setTimeout(() => {
                    if (cancelShowModal) return;

                    props.setShowModal(true);
                    props.handleChoosePortfolioItem(closestObject.descriptor);
                }, isDelayModal ? modalShowTimeoutMs : 0)
                break;
            default:
                return;
        }

        lastClickedObject = closestObject; 

        isCameraMoving.current = true;

        new TWEEN.Tween(camera.position).to({
            x: targetCameraX,
            y: targetCameraY,
            z: targetCameraZ
        }, cameraMoveTimeoutMs)
            .easing( TWEEN.Easing.Quadratic.InOut)
            .onUpdate(() => {
                camera.lookAt(camera.target);
            })
            .onComplete(() => {
                camera.lookAt({x: targetTargetX, y: targetTargetY, z: targetTargetZ});
                controls.target.set(targetTargetX, targetTargetY, targetTargetZ);
                controls.update();
                isCameraMoving.current = false;
            })
            .start();

        new TWEEN.Tween(camera.target).to({
            x: targetTargetX,
            y: targetTargetY,
            z: targetTargetZ
        }, cameraMoveTimeoutMs)
            .easing(TWEEN.Easing.Quadratic.InOut)
            .onComplete(() => {
                camera.lookAt({x: targetTargetX, y: targetTargetY, z: targetTargetZ});
                controls.target.set(targetTargetX, targetTargetY, targetTargetZ);
                controls.update();
            })
            .start();

        event.stopPropagation();
    }

    let onPointerDown = (e) => {
        isMovingOrbitControls = true;
        mouseDistanceXY = {x: 0, y: 0};

        mouseStartXY = {x: e.clientX, y: e.clientY};
    }

    let onPointerMove = (e) => {
        if (!isMovingOrbitControls) return;

        mouseDistanceXY = {x: mouseStartXY.x - e.clientX, y: mouseStartXY.y - e.clientY}
    }

    let onPointerUp = (e) => {
        let hasMovedOrbitControls = (Math.abs(mouseDistanceXY.x) > hasMovedOrbitControlsThreshold 
            || Math.abs(mouseDistanceXY.y) > hasMovedOrbitControlsThreshold);

        if (!isCameraMoving.current) {
            !hasMovedOrbitControls && onContainerClick(e);
        }

        isMovingOrbitControls = false;
        mouseDistanceXY = {x: 0, y: 0};
    }

    let onPointerLeave = (e) => {
        isMovingOrbitControls = false;
        mouseDistanceXY = {x: 0, y: 0};
    }
    
    function init() {
        container = document.getElementById(threeJsContainerId);
        container.addEventListener('pointerdown', (e) => {onPointerDown(e)});
        container.addEventListener('pointerup', (e) => {onPointerUp(e)});
        container.addEventListener('pointermove', (e) => {onPointerMove(e)});
        container.addEventListener('pointerleave', (e) => {onPointerLeave(e)});

        renderer = new THREE.WebGLRenderer();
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.outputEncoding = THREE.sRGBEncoding;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.domElement.style.touchAction = 'none';

        container.appendChild(renderer.domElement);

        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(cameraFov, window.innerWidth / window.innerHeight, 1, 20000);
        
        if (camera.aspect > planeAspectRatio) {
            // window too large
            camera.fov = cameraFov;
        } else {
            // window too narrow
            const cameraHeight = Math.tan(THREE.MathUtils.degToRad(cameraFov / 2));
            const ratio = camera.aspect / planeAspectRatio;
            const newCameraHeight = cameraHeight / ratio;
            camera.fov = THREE.MathUtils.radToDeg(Math.atan(newCameraHeight)) * 2;
        }
        camera.updateProjectionMatrix();

        // Water
        const waterGeometry = new THREE.PlaneGeometry(10000, 10000);

        water = new Water(
            waterGeometry,
            {
                textureWidth: 512,
                textureHeight: 512,
                waterNormals: new THREE.TextureLoader().load(process.env.PUBLIC_URL + '/assets/waternormals.jpg', function (texture) {
                    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
                }),
                sunDirection: new THREE.Vector3(),
                sunColor: 0xffffff,
                waterColor: 0x001e0f,
                distortionScale: 3.7,
                fog: scene.fog !== undefined,
                //size: 6
            }
        );

        water.rotation.x = - Math.PI / 2;
        water.material.uniforms['size'].value = 6;
        water.descriptor = waterMeshDescriptor;

        scene.add( water );
        
        // Sky
        const sky = new Sky();
        sky.scale.setScalar(10000);
        sky.descriptor = skyMeshDescriptor;
        scene.add(sky);

        const skyUniforms = sky.material.uniforms;

        skyUniforms['turbidity'].value = 10;
        skyUniforms['rayleigh'].value = 2;
        skyUniforms['mieCoefficient'].value = 0.005;
        skyUniforms['mieDirectionalG'].value = 0.8;

        const parameters = {
            elevation: 3.7,
            azimuth: 0
        };

        const pmremGenerator = new THREE.PMREMGenerator(renderer);

        sun = new THREE.Vector3();
        function updateSun() {
            const phi = THREE.MathUtils.degToRad(90 - parameters.elevation);
            const theta = THREE.MathUtils.degToRad( parameters.azimuth );

            sun.setFromSphericalCoords(1, phi, theta);

            sky.material.uniforms['sunPosition'].value.copy(sun);
            water.material.uniforms['sunDirection'].value.copy(sun).normalize();

            scene.environment = pmremGenerator.fromScene(sky).texture;
        }
        updateSun();

        // Portfolio Items
        bpChroniclesCubeMesh = ThreeJsUtils.generateSimpleVideoTextureBoxMesh(30, 30, 3, 0, portfolioItemOriginalY, -8, 0, 0, 0,
            process.env.PUBLIC_URL + '/assets/bp-chronicles-compressed.mp4');
        scene.add(bpChroniclesCubeMesh);
        bpChroniclesCubeMesh.descriptor = bpChroniclesCubeMeshDescriptor;
        ThreeJsUtils.generate3DTextMesh({x: bpChroniclesCubeMesh.position.x, y: bpChroniclesCubeMesh.position.y + portfolioItemTextYPosMod, z: bpChroniclesCubeMesh.position.z},
            bpChroniclesCubeMesh.rotation, portfolioItemTextSize, 'BIPOLAR ADVENTURES').then((textMesh) => { scene.add(textMesh) });

        const tradeBoyImgSrc = process.env.PUBLIC_URL + '/assets/tb-buysell.mp4';
        tradeBoyCubeMesh = ThreeJsUtils.generateSimpleVideoTextureBoxMesh(30, 30, 3, -45, portfolioItemOriginalY, 0, 0, (Math.PI / 8), 0,
            tradeBoyImgSrc);
        scene.add(tradeBoyCubeMesh);
        tradeBoyCubeMesh.descriptor = tradeBoyCubeMeshDescriptor;
        ThreeJsUtils.generate3DTextMesh({x: tradeBoyCubeMesh.position.x, y: tradeBoyCubeMesh.position.y + portfolioItemTextYPosMod, z: tradeBoyCubeMesh.position.z},
            tradeBoyCubeMesh.rotation, portfolioItemTextSize, 'TRADE BOY').then((textMesh) => { scene.add(textMesh) });

        socialAutomatorCubeMesh = ThreeJsUtils.generateSimpleVideoTextureBoxMesh(30, 30, 3, 45, portfolioItemOriginalY, 0, 0, -1 * (Math.PI / 8), 0,
            process.env.PUBLIC_URL + '/assets/sa-schedule.mp4');
        scene.add(socialAutomatorCubeMesh);
        socialAutomatorCubeMesh.descriptor = socialAutomatorCubeMeshDescriptor;
        ThreeJsUtils.generate3DTextMesh({x: socialAutomatorCubeMesh.position.x, y: socialAutomatorCubeMesh.position.y + portfolioItemTextYPosMod, z: socialAutomatorCubeMesh.position.z},
            socialAutomatorCubeMesh.rotation, portfolioItemTextSize, 'SOCIAL AUTOMATOR').then((textMesh) => { scene.add(textMesh) });

        // Light
        const light = new THREE.AmbientLight( 0x404040 ); // soft white light
        light.intensity = 1;
        scene.add(light);

        // Camera Finalization
        camera.position.set(cameraOriginalPosition.x, cameraOriginalPosition.y, cameraOriginalPosition.z);
        camera.target = new THREE.Vector3(cameraOriginalTarget.x, cameraOriginalTarget.y, cameraOriginalTarget.z);
        camera.lookAt(camera.target);

        // Controls
        controls = new OrbitControls(camera, renderer.domElement);
        controls.maxPolarAngle = Math.PI * 0.495;
        controls.target.set(cameraOriginalTarget.x, cameraOriginalTarget.y, cameraOriginalTarget.z);
        controls.minDistance = 25.0;
        controls.maxDistance = 200.0;
        controls.enablePan = false;
        controls.update();

        // GUI
        if (showGuiControls) {
            const gui = new GUI();
    
            const folderSky = gui.addFolder('Sky');
            folderSky.add(parameters, 'elevation', 0, 90, 0.1 ).onChange(updateSun);
            folderSky.add(parameters, 'azimuth', - 180, 180, 0.1 ).onChange(updateSun);
            folderSky.open();
    
            const waterUniforms = water.material.uniforms;
    
            const folderWater = gui.addFolder('Water');
            folderWater.add(waterUniforms.distortionScale, 'value', 0, 8, 0.1).name('distortionScale');
            folderWater.add(waterUniforms.size, 'value', 0.1, 10, 0.1 ).name('size');
            folderWater.open();
        }

        window.addEventListener('resize', onWindowResize);
    }

    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
	
        if (camera.aspect > planeAspectRatio) {
            // window too large
            camera.fov = cameraFov;
        } else {
            // window too narrow
            const cameraHeight = Math.tan(THREE.MathUtils.degToRad(cameraFov / 2));
            const ratio = camera.aspect / planeAspectRatio;
            const newCameraHeight = cameraHeight / ratio;
            camera.fov = THREE.MathUtils.radToDeg(Math.atan(newCameraHeight)) * 2;
        }
        camera.updateProjectionMatrix();

        renderer.setSize( window.innerWidth, window.innerHeight );
    }

    function getClosestIntersectingObject(event) {
        var vector = new THREE.Vector3();
        var raycaster = new THREE.Raycaster();
        var dir = new THREE.Vector3();

        if (camera instanceof THREE.OrthographicCamera) {
            vector.set((event.clientX / window.innerWidth) * 2 - 1, - ( (event.clientY - clientYOffsetNavbarHeight) / window.innerHeight) * 2 + 1, - 1); // z = - 1 important!
            vector.unproject(camera);
            dir.set(0, 0, - 1 ).transformDirection(camera.matrixWorld);
            raycaster.set( vector, dir );
        } else if ( camera instanceof THREE.PerspectiveCamera ) {
            vector.set((event.clientX / window.innerWidth ) * 2 - 1, - ((event.clientY - clientYOffsetNavbarHeight) / window.innerHeight) * 2 + 1, 0.5); // z = 0.5 important!
            vector.unproject( camera );
            raycaster.set(camera.position, vector.sub(camera.position ).normalize());
        }

        // calculate objects intersecting the picking ray
        const intersects = raycaster.intersectObjects(scene.children);
        let closestIntersect = intersects[0];
        return closestIntersect.object;
    }

    function animate() {
        requestAnimationFrame(animate);
        render();
    }

    function render() {
        const time = performance.now() * 0.001;

        let yPos = Math.sin(Math.sin(time * 5 + 10) );
        tradeBoyCubeMesh.position.y = portfolioItemOriginalY + yPos;
        bpChroniclesCubeMesh.position.y = portfolioItemOriginalY + yPos;
        socialAutomatorCubeMesh.position.y = portfolioItemOriginalY + yPos;

        water.material.uniforms['time'].value += 1.0 / 60.0;

        renderer.render(scene, camera);
        TWEEN.update();
    }

    return (
        <div style={{pointerEvents: 'all', overflow: 'hidden'}} id={threeJsContainerId}></div>
    )
}
