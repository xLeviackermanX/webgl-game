function main(){
  let scene, camera , renderer;
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xdddddd);

  camera = new THREE.PerspectiveCamera(40,window , innerWidth/window.innerHeight , 1,5000);
  camera.position.x = 0;
  camera.position.z = 1000;
  hlight = new THREE.AmbientLight(0x404040,100);
  scene.add(hlight);

  renderer = new THREE.WebGLRenderer({antialias:true});
  renderer.setSize(window.innerWidth.innerHeight);
  document.body.appendChild(renderer.domElement);

  let loader = new THREE.GLTFLoader();
  loader.load('./enemy.gltf',function(gltf){
    scene.add(gltf.scene);
    renderer.render(scene , camera);
  });
}
main();