import * as THREE from 'three';

export default class ThreeJsUtils {
    /*
    *   materialArray should be an array with 6 strings, either a video/image url (.mp4/.jpg/.png) or a color
    *   
    */
    static generateSimpleVideoTextureBoxMesh = (sizeWidth, sizeHeight, sizeDepth, positionX, positionY, positionZ, rotationX, rotationY, rotationZ, 
        frontSrc, backSrc) => {
        // Create merged mesh
        let mergeGeometry = new THREE.BoxGeometry(sizeWidth, sizeHeight, sizeDepth);
        
        var boxMesh = new THREE.Mesh(mergeGeometry, {color: 'black', side: THREE.DoubleSide });
        
        let frontPlaneMesh = ThreeJsUtils.generateSimpleVideoTexturePlaneMesh(sizeWidth, sizeHeight, positionX, positionY, positionZ + (sizeDepth / 2), 0, 0, 0, undefined, frontSrc);
        let backPlaneMesh = ThreeJsUtils.generateSimpleVideoTexturePlaneMesh(sizeWidth, sizeHeight, positionX, positionY, positionZ - (sizeDepth / 2), 0, Math.PI, 0, undefined, backSrc);

        let leftPlaneMesh = ThreeJsUtils.generateSimpleVideoTexturePlaneMesh(sizeDepth, sizeHeight, positionX - (sizeWidth / 2), positionY, positionZ, 0, Math.PI / 2, 0, 'black');
        let rightPlaneMesh = ThreeJsUtils.generateSimpleVideoTexturePlaneMesh(sizeDepth, sizeHeight, positionX + (sizeWidth / 2), positionY, positionZ, 0, Math.PI / 2, 0, 'black');
        
        let topPlaneMesh = ThreeJsUtils.generateSimpleVideoTexturePlaneMesh(sizeWidth, sizeDepth, positionX, positionY + (sizeHeight / 2), positionZ, Math.PI / 2, 0, 0, 'black');
        let bottomPlaneMesh = ThreeJsUtils.generateSimpleVideoTexturePlaneMesh(sizeWidth, sizeDepth, positionX, positionY - (sizeHeight / 2), positionZ, Math.PI / 2, 0, 0, 'black');
        
        boxMesh.add(frontPlaneMesh, backPlaneMesh, leftPlaneMesh, rightPlaneMesh, topPlaneMesh, bottomPlaneMesh);
        boxMesh.rotation.set(rotationX, rotationY, rotationZ);

        return boxMesh;
    }


    static generateSimpleVideoTexturePlaneMesh = (sizeWidth, sizeHeight, positionX, positionY, positionZ, rotationX, rotationY, rotationZ, color, videoSrc = null) => {

        let planeTexture;

        if (!videoSrc) {
            // Use basic texture
            //let bt = new THREE.Texture({color: color})
            planeTexture = undefined;
        }
        else {
            // Create video and play
            let textureVid = document.createElement("video")
            textureVid.src = videoSrc;
            textureVid.loop = true;
            textureVid.muted = true;
            textureVid.play();
    
            // Load video texture
            planeTexture = new THREE.VideoTexture(textureVid);
            planeTexture.format = THREE.RGBFormat;
            planeTexture.minFilter = THREE.NearestFilter;
            planeTexture.maxFilter = THREE.NearestFilter;
            planeTexture.generateMipmaps = false;

        }

        // Create geometry/mesh
        const planeGeometry = new THREE.PlaneGeometry(sizeWidth, sizeHeight);
        const planeMaterial = new THREE.MeshBasicMaterial( {color: color, side: THREE.DoubleSide, map: planeTexture} );
        const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
        planeMesh.position.set(positionX, positionY, positionZ);
        planeMesh.rotation.set(rotationX, rotationY, rotationZ);

        return planeMesh;

    }

}