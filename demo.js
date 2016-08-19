var $container = $('#container');
var renderer = new THREE.WebGLRenderer({antialias: true});
var camera = new THREE.PerspectiveCamera(90,window.innerWidth/window.innerHeight,0.1,10000);
var scene = new THREE.Scene();

scene.add(camera);
renderer.setSize(window.innerWidth, window.innerHeight);
$container.append(renderer.domElement);

/////////////////////////////////////////

// Normalmaterial
var normalMaterial = new THREE.MeshNormalMaterial({});
var phongMaterial = new THREE.MeshPhongMaterial({
  color: 0xA20A2E,
  specular: 0xDE2118,
  ambiant: 0xBF4EF6
});
var phongMaterial_black = new THREE.MeshPhongMaterial({
  color: 0x2322E8
});

var light = new THREE.PointLight(0x00FFFF, 9);
light.position.set(0, 0,-250);
scene.add(light);

var light2 = new THREE.PointLight(0xFFD730, 4);
light2.position.set(0, 0,-50);
scene.add(light2);

// Torus
function Torus(f){
  if(f%2){
    this.b = new THREE.Mesh(new THREE.TorusGeometry( 160, 75, 2, 29),phongMaterial);
  }
  else {
    this.b = new THREE.Mesh(new THREE.TorusGeometry( 160, 75, 2, 19),phongMaterial_black);
  }
  this.b.position.x = 67*Math.cos(f);
  this.b.position.y = 67*Math.sin(f);
  this.b.position.z = f*1.05;
  this.b.rotation.z = f*0.03333;
}
		
var numTorus = 80;
var tabTorus = [];
for(var i=0; i<numTorus; i++){
  tabTorus.push(new Torus(-i*13));
  scene.add(tabTorus[i].b);
}	

var rotAngle = 0;

// Update
function update(){
  camera.rotation.z = Math.sin(rotAngle);
  rotAngle +=0.01;
  for(var i=0; i<numTorus; i++){
    tabTorus[i].b.position.z+=2.25;
    tabTorus[i].b.rotation.z+=i*0.0002;
    if(tabTorus[i].b.position.z>0)
    {
      tabTorus[i].b.position.z=-1000;
    }
  }	
}

// Render
function render() {
  requestAnimationFrame(render);			
  renderer.render(scene, camera);
  update();			
}
render();
