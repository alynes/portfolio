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
        
        let frontPlaneMesh = ThreeJsUtils.generateSimpleVideoTexturePlaneMesh(sizeWidth, sizeHeight, 0, 0, 0 + (sizeDepth / 2), 0, 0, 0, undefined, frontSrc);
        let backPlaneMesh = ThreeJsUtils.generateSimpleVideoTexturePlaneMesh(sizeWidth, sizeHeight, 0, 0, 0 - (sizeDepth / 2), 0, Math.PI, 0, undefined, backSrc);

        let leftPlaneMesh = ThreeJsUtils.generateSimpleVideoTexturePlaneMesh(sizeDepth, sizeHeight, 0 - (sizeWidth / 2), 0, 0, 0, Math.PI / 2, 0, 'black');
        let rightPlaneMesh = ThreeJsUtils.generateSimpleVideoTexturePlaneMesh(sizeDepth, sizeHeight, 0 + (sizeWidth / 2), 0, 0, 0, Math.PI / 2, 0, 'black');
        
        let topPlaneMesh = ThreeJsUtils.generateSimpleVideoTexturePlaneMesh(sizeWidth, sizeDepth, 0, 0 + (sizeHeight / 2), 0, Math.PI / 2, 0, 0, 'black');
        let bottomPlaneMesh = ThreeJsUtils.generateSimpleVideoTexturePlaneMesh(sizeWidth, sizeDepth, 0, 0 - (sizeHeight / 2), 0, Math.PI / 2, 0, 0, 'black');
        
        boxMesh.add(frontPlaneMesh, backPlaneMesh, leftPlaneMesh, rightPlaneMesh, topPlaneMesh, bottomPlaneMesh);
        boxMesh.position.set(positionX, positionY, positionZ);
        boxMesh.rotation.set(rotationX, rotationY, rotationZ);

        return boxMesh;
    }


    static generateSimpleVideoTexturePlaneMesh = (sizeWidth, sizeHeight, positionX, positionY, positionZ, rotationX, rotationY, rotationZ, color, videoSrc = null) => {

        let planeTexture;

        if (!videoSrc) {
            // Use basic texture
            planeTexture = undefined;
        }
        else {
            // Create video and play
            let textureVid = document.createElement("video")
            textureVid.src = videoSrc;
            textureVid.loop = true;
            textureVid.muted = true;
            textureVid.autoplay = true;
            textureVid.playsInline = true;
            textureVid.play();
    
            // Load video texture
            planeTexture = new THREE.VideoTexture(textureVid);
            planeTexture.format = THREE.RGBAFormat;
            planeTexture.encoding = THREE.sRGBEncoding;
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

    static makeLabelCanvas = (size, text) => {
        const borderSize = 2;
        const ctx = document.createElement('canvas').getContext('2d');
        const font =  `${size}px sans-serif`;
        ctx.font = font;

        // Measure how long the name will be
        const doubleBorderSize = borderSize * 2;
        const width = ctx.measureText(text).width + doubleBorderSize;
        const height = size + doubleBorderSize;
        ctx.canvas.width = width;
        ctx.canvas.height = height;
    
        // Need to set font again after resizing canvas
        ctx.font = font;
        ctx.textBaseline = 'top';
    
        ctx.fillStyle = 'transparent';
        ctx.fillRect(0, 0, width, height);
        ctx.fillStyle = 'black';
        ctx.fillText(text, borderSize, borderSize);
    
        return ctx.canvas;
    }

    static generateSimpleTextMesh = (positionVector, positionModVector, size, text) => {
        const labelGeometry = new THREE.PlaneBufferGeometry(1, 1);

        const canvas = ThreeJsUtils.makeLabelCanvas(size, text);
        const texture = new THREE.CanvasTexture(canvas);

        // Because our canvas is likely not a power of 2, in both dimensions set the filtering appropriately.
        texture.minFilter = THREE.LinearFilter;
        texture.wrapS = THREE.ClampToEdgeWrapping;
        texture.wrapT = THREE.ClampToEdgeWrapping;
    
        const labelMaterial = new THREE.MeshBasicMaterial({
          map: texture,
          side: THREE.DoubleSide,
          transparent: true,
        });
    
        const root = new THREE.Object3D();
        root.position.set(positionVector.x, positionVector.y, positionVector.z);
        root.rotation.set(positionModVector.x, positionModVector.y, positionModVector.z);
    
        const label = new THREE.Mesh(labelGeometry, labelMaterial);
        root.add(label);
    
        // If units are meters then 0.01 here makes size of the label into centimeters.
        const labelBaseScale = 0.01;
        label.scale.x = canvas.width  * labelBaseScale;
        label.scale.y = canvas.height * labelBaseScale;
    
        return root;
        
    }

}