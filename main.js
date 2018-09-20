/**
 * Example for a basic THREE.js scene setup.
 * 
 * @author  Ikaros Kappler
 * @date    2018-09-20
 * @cloned  from basic THREE.js scene setup from @date 2015-11-09
 * @version 1.0.0
 **/

// Create new scene
this.scene = new THREE.Scene(); 

// Create a camera to look through
this.camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000); 

// Initialize a new THREE renderer (you are also allowed 
// to pass an existing canvas for rendering).
this.renderer = new THREE.WebGLRenderer( { antialias : true } ); 
this.renderer.setSize( window.innerWidth, 
		       window.innerHeight
		     ); 

// ... and append it to the DOM
document.body.appendChild(renderer.domElement); 


// Create a geometry conaining the logical 3D information (here: a cube)
var geometry = new THREE.CubeGeometry(12,12,12); 

// Pick a material, something like MeshBasicMaterial, PhongMaterial, 
var material = new THREE.MeshPhongMaterial({color: 0x00ff00}); 
 
// Create the cube from the geometry and the material ...
var cube = new THREE.Mesh(geometry, material); 
cube.position.set( 12, 12, 12 );

// ... and add it to your scene.
this.scene.add(cube); 


// Add some light
this.pointLight = new THREE.PointLight(0xFFFFFF);
//this.pointLight = new THREE.AmbientLight(0xFFFFFF);

// set its position
this.pointLight.position.x = 10;
this.pointLight.position.y = 50;
this.pointLight.position.z = 130;

// add to the scene
this.scene.add( this.pointLight );


// Add grid helper
var gridHelper = new THREE.GridHelper( 90, 9 );
gridHelper.colorGrid = 0xE8E8E8;
this.scene.add( gridHelper );


// Add an axis helper
var ah                  = new THREE.AxisHelper(50);
ah.position.y -= 0.1;  // The axis helper should not intefere with the grid helper
this.scene.add( ah );


// Set the camera position
this.camera.position.set( 75, 75, 75 );
// And look at the cube again
this.camera.lookAt( cube.position );


// Finally we want to be able to rotate the whole scene with the mouse: 
// add an orbit control helper.
var _self = this;
this.orbitControls = new THREE.OrbitControls( this.camera, this.renderer.domElement ); 
// Always move the point light with the camera. Looks much better ;)
this.orbitControls.addEventListener( 'change', 
				     function() { _self.pointLight.position.copy(_self.camera.position); } 
				   );
this.orbitControls.enableDamping = true;
this.orbitControls.dampingFactor = 1.0;
this.orbitControls.enableZoom    = true;
this.orbitControls.target.copy( cube.position );


//---BEGIN--- Here comes the skybox ----------------------
var imagePrefix = "img/";
var directions  = ["wp-side", "wp-side", "wp-side", "wp-side", "wp-top", "wp-top"];
var imageSuffix = ".jpg";

var materialArray = [];
for (var i = 0; i < 6; i++)
    materialArray.push( new THREE.MeshBasicMaterial({
	map: THREE.ImageUtils.loadTexture( imagePrefix + directions[i] + imageSuffix ),
	side: THREE.BackSide
    }));

var skyGeometry = new THREE.CubeGeometry( 500, 500, 500 );
var skyMaterial = new THREE.MeshFaceMaterial( materialArray );
var skyBox = new THREE.Mesh( skyGeometry, skyMaterial );
//skyBox.rotation.x += Math.PI / 2;
this.scene.add( skyBox );
//---END----- Here comes the skybox ----------------------



// This is the basic render function. It will be called perpetual, again and again,
// depending on your machines possible frame rate.
this._render = function () { 
    // Pass the render function itself
    requestAnimationFrame(this._render); 
    
    // Let's animate the cube: a rotation.
    cube.rotation.x += 0.05; 
    cube.rotation.y += 0.04; 

    this.renderer.render(this.scene, this.camera); 
}; 
// Call the rendering function. This will cause and infinite recursion (we want 
// that here, because the animation shall run forever).
this._render(); 


