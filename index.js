function main(){
  animate();
}
var healthList = []
var bulletList = []
var fireList = []
var enemy;
var enemyScale = 1
var ifGame = 1
var HP = 100
var score = 0
var enemyHP = 100
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera( 100, window.innerWidth / (window.innerHeight*0.9), 0.1, 100 )
camera.position.set(0,0,10)
camera.lookAt(new THREE.Vector3(0,0,0));
const renderer = new THREE.WebGLRenderer({ antialias: true})

renderer.setSize( window.innerWidth, window.innerHeight*0.9 )
// sets renderer background color
renderer.setClearColor("#dddddd")
var c = document.getElementById("gameCanvas");
c.appendChild(renderer.domElement);
const xAxis = new THREE.Vector3(1, 0, 0);
const yAxis = new THREE.Vector3(0, 1, 0);
const zAxis = new THREE.Vector3(0, 0, 1);
// resize canvas on resize window
window.addEventListener( 'resize', () => {
	let width = window.innerWidth
	let height = window.innerHeight*0.9
	renderer.setSize( width, height )
	camera.aspect = width / height
	camera.updateProjectionMatrix()
})



// ambient light
var now = 0
var ambientLight = new THREE.AmbientLight (0xdddddd,1 )
scene.add( ambientLight )


// Creating player's plane
var player;
let loader = new THREE.GLTFLoader();
loader.load('./attacker.gltf',function(gltf){
  player = gltf.scene;

  player.rotateOnAxis(yAxis, THREE.Math.degToRad(90));
  player.rotateOnAxis(zAxis, THREE.Math.degToRad(10));
  player.scale.set(0.1,0.1,0.1)
  player.position.z = 9.6
  player.position.y = -0.5
player.position.x = 0
  scene.add(player);
});

loader.load('./environment.gltf',function(gltf){
  environment = gltf.scene;

  // environment.rotateOnAxis(yAxis, THREE.Math.degToRad(90));
  // environment.rotateOnAxis(zAxis, THREE.Math.degToRad(10));
  environment.scale.set(100,100,100)
  environment.position.z = 9
  environment.position.y = -4
  environment.position.x = 0
  scene.add(environment);
});

loader = new THREE.FontLoader();
loader.load('arial.json', function (res) {
  font = res;
  createText();
});
function createText() {
  textGeo = new THREE.TextGeometry( "Hello", {
    font: font,
    size: 40,
    height: 6
});
textGeo.position.y = 10
scene.add(textGeo)
}
//Function for creating new enemy
function createEnemy(){
var num = Math.random()
if(num<0.5){
  enemyScale = 1
}
else{
  enemyScale = -1
}
let loader = new THREE.GLTFLoader();
loader.load('./enemy.gltf',function(gltf){
  enemy = gltf.scene;
  enemy.scale.set(0.5,0.5,0.5)
  if (enemyScale==1){
    enemy.rotateOnAxis(yAxis, THREE.Math.degToRad(-45));
    enemy.position.z = -30
enemy.position.x = -31
  }
  else{
  enemy.rotateOnAxis(yAxis, THREE.Math.degToRad(-135));
  enemy.position.z = -30
  enemy.position.x = 31
  }

enemy.position.y = -0.5
  // enemy.translateOnAxis(zAxis, -5);
  // enemy.translateOnAxis(xAxis, -5);
  scene.add(enemy);
  
});
}

// function for controller
addEventListener('keydown', logKey);
function logKey(e){
  if(e.keyCode==65 && player.position.x>=-25){
    player.position.x-=0.15
    camera.position.set(player.position.x,0,10)
  camera.lookAt(new THREE.Vector3(player.position.x,0,0));
  // camera.updateProjectionMatrix()
  }
  if(e.keyCode==68 && player.position.x<=25){
    player.position.x+=0.15
    camera.position.set(player.position.x,0,10)
    camera.lookAt(new THREE.Vector3(player.position.x,0,0));
    // camera.updateProjectionMatrix()
  }
  if(e.keyCode==80){
    let loader3 = new THREE.GLTFLoader();
    loader3.load('./bullet.gltf',function(gltf){
      var bullet = gltf.scene;
      bullet.scale.set(0.1,0.1,0.1)
      bullet.rotateOnAxis(xAxis, THREE.Math.degToRad(100));
      bullet.position.z = 9.3
      bullet.position.y = -0.5
      bullet.position.x = player.position.x-0.3
      bulletList.push(bullet)
      scene.add(bullet);
    });
    let loader4 = new THREE.GLTFLoader();
    loader3.load('./bullet.gltf',function(gltf){
      var bullet1 = gltf.scene;
    bullet1.scale.set(0.1,0.1,0.1)
    bullet1.rotateOnAxis(xAxis, THREE.Math.degToRad(100));
    bullet1.position.z = 9.3
    bullet1.position.y = -0.5
    bullet1.position.x = player.position.x+0.3
    bulletList.push(bullet1)
    scene.add(bullet1);
    });
    
  }
  
}

// funtion to create health
function createHealth(){
  let loader1 = new THREE.GLTFLoader();
loader1.load('./health.gltf',function(gltf){
  var health = gltf.scene;

  health.scale.set(0.1,0.1,0.1)
  health.position.z = -10
  health.position.y = -0.5
  health.position.x = Math.random()*50-25
  healthList.push(health)
  scene.add(health);
});
}


// function to create fireBall
function createFire(){
  let loader3 = new THREE.GLTFLoader();
  loader3.load('./fire.gltf',function(gltf){
    var fire = gltf.scene
  
    fire.scale.set(0.1,0.1,0.1)
    fire.position.z = enemy.position.z
    fire.position.y = -0.5
    fire.position.x = enemy.position.x
    fireList.push(fire)
    scene.add(fire);
  });
}

// function for moving the enemy and powerups
function Move(){
  if(enemyScale==1){
    enemy.position.x+=0.25
  }
  else{
    enemy.position.x-=0.25
  }
  enemy.position.z+=0.20
  var k = healthList.length
  for(var i=0;i<k;i++){
    healthList[i].position.z+=0.2
  }
  var k = fireList.length
  for(var i=0;i<k;i++){
    fireList[i].position.z+=0.2
  }
  var k = bulletList.length
  for(var i=0;i<k;i++){
    bulletList[i].position.z-=0.3
  }
}


//Collision with powerup
function CollisionWithPowerup(){
  var l = 9.0
  var r = 10.0
    var k = healthList.length
    for(i=0;i<k && i<200;i++){
      if(healthList[k-1-i].position.z<=r && healthList[k-1-i].position.z>=l && healthList[k-1-i].position.x>=player.position.x-0.27 && healthList[k-1-i].position.x<=player.position.x+0.27){
        HP = Math.min(100,HP+5)
        healthList[k-1-i].position.z = 20
        score+=2
      }
      else if(healthList[k-1-i].position.z<=10){
        continue
      }
      scene.remove(healthList[k-1-i])
    }
    k = fireList.length
    for(i=0;i<k && i<200;i++){
      if(fireList[k-1-i].position.z<=r && fireList[k-1-i].position.z>=l && fireList[k-1-i].position.x>=player.position.x-0.27 && fireList[k-1-i].position.x<=player.position.x+0.27){
        HP = Math.max(HP-30,0)
        fireList[k-1-i].position.z = 20
      }
      else if(fireList[k-1-i].position.z<=10){
        continue
      }
      scene.remove(fireList[k-1-i])
    }
    l = enemy.position.z-1
    r = enemy.position.z+1
    k = bulletList.length
    for(i=0;i<k && i<200;i++){
      if(bulletList[k-1-i].position.z<=enemy.position.z+1 && bulletList[k-1-i].position.z>=enemy.position.z-1 && bulletList[k-1-i].position.x>=enemy.position.x-2 && bulletList[k-1-i].position.x<=enemy.position.x+2){
        enemyHP = Math.max(0,enemyHP-20)
        bulletList[k-1-i].position.z = -40
        checkEnemy()
      }
      else if(bulletList[k-1-i].position.z>=-35){
        continue
      }
      scene.remove(bulletList[k-1-i])
    }
}

// function for collision with enemy
function CollisionWithEnemy(){
  if(player.position.x>=enemy.position.x-1 && player.position.x<=enemy.position.x+1 && player.position.z>=enemy.position.z-2 && player.position.z<=enemy.position.z+1){
    enemy.position.z = 30
    scene.remove(enemy)
    HP = 0
  }
}

// function for checking if enemy died
function checkEnemy(){
  if(enemyHP == 0){
    enemy.position.z = 30
    score+=20
    scene.remove(enemy)
  }
}

// function for checking if game over
function checkGameOver(){
  if(HP == 0){
    ifGame = 0
  }
}


function animate() {
	requestAnimationFrame( animate )
  if(ifGame==1){
  if(now==0){
    createEnemy()
  }
  var num = Math.floor(Math.random() * 50); 
  if(num==1){
    createHealth().then()
  }
  else{
    var num1 = Math.floor(Math.random() * 15); 
    if(num1==1){
      createFire()
    }
  }
 

  Move()
  CollisionWithPowerup()
  CollisionWithEnemy()
  checkGameOver()
  document.getElementById("health").innerHTML = "Health : "+HP.toString()+"                         Score: "+score.toString()
}
else{
  document.getElementById("health").innerHTML = "Game over and your score is: "+score.toString()+"  , Refresh to play again"
}
	renderer.render( scene, camera )
  now = (now+1)%230
  renderer.renderLists.dispose();

}