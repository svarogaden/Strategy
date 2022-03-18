"use strict";



let IsLoaded = false;
let clock;
let smokeParticles = [];


let FullScreenFlag = false;


let current_camera;
let current_scene;
//let index_scene = 0;
let scenes;

let renderer;
let canvas;
let controls;



//let width = 0;
//let raycaster = new THREE.Raycaster();
//let raycasterTank = new THREE.Raycaster();


const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();





//Sun,Sky
let pmremGenerator;
let water;
let sun;
let sky;









let AsyncLoader;
//let maxanisotropy;


//let GameStatus = false;



//let InterpolationTime = 100;
//let MaxAlpha = 1.0;

let connectionId = 0;



let CurrentGame = {

    SelectedUnit:0,
    TimeGet: null,

    GalaxyId: 0,
    PlanetId:0 ,
    Metall: 0,
    Uran: 0,
    Gas: 0,


   Metall: 0, Uran: 0, Gas: 0,
   MetallRate : 0, GasRate : 0,  UranRate: 0,



    Buildings: [],
    TargetPlanetIndex: 0,
    TargetId: 0,
    BuildingType:0




    /*diffDates:0*/





    //Target: {
    //    DirectionFire: new THREE.Vector3(0, 0, 0),
    //    TargetId: null
    //},

    /*BattleField : new Map()*/
}; 




const hubConnection = new signalR.HubConnectionBuilder()
    .withUrl("/game")
    .build();


async function start()
{
    try {
        await hubConnection.start();
        console.log("SignalR Connected.");
       // alert('Connection Start');

        console.log(hubConnection.connectionId);
        connectionId = hubConnection.connectionId;
        //document.getElementById("loading").innerHTML = 'Старт игры ';
        document.getElementById("loading").innerHTML = '';

    }
    catch (err) {
        document.getElementById("loading").innerHTML = 'Ошибка соединения ';
        console.log(err);
        setTimeout(start, 5000);

    }
};


let TankModel;

// Globals

////let INV_MAX_FPS = 1000;
////let frameDelta = 0;
////let clock = new THREE.Clock();




//function raycastMouse(e)
//{

//    //1. sets the mouse position with a coordinate system where the center
//    //   of the screen is the origin
//    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
//    mouse.y = - (e.clientY / window.innerHeight) * 2 + 1;


//    //2. set the picking ray from the camera position and mouse coordinates
//    raycaster.setFromCamera(mouse, current_camera);

//    //3. compute intersections
//    var intersects = raycaster.intersectObjects(current_scene.children);

//    for (var i = 0; i < intersects.length; i++)
//    {
//        console.log(intersects[i]); 
//        intersects[i].object.material.color.set(0xff0000);
//    }

//}







//hubConnection.invoke('AcceptDraw', currentParty);








//function CreateMainSceen()
//{
//    //Настройки сцены 

//   // current_scene = new THREE.Scene();


//    current_scene = new THREE.Scene();
//    {
//        const color = 0xFFFFFF;
//        const density = 0.00004;
//        current_scene.fog = new THREE.FogExp2(color, density);
//    }





//    current_scene.background = AsyncLoader.tex["textureSkyCube"];




//    const color = 0xFFFFFF;
//    const intensity = 1;
//    const lightDir = new THREE.DirectionalLight(color, intensity);

   

//    current_scene.add(lightDir);
//    const lightAmbient = new THREE.AmbientLight(color, intensity);
//    current_scene.add(lightAmbient);

 

//    //current_camera.position.y = 5.2;
//    //current_camera.position.z = 25; //расстояние установки  базовой позиции  камеры 


//    current_scene.add(current_camera);



    


//}
    


    
function FullScreenSet()
{

    let FullScreen = document.getElementById('FullScreen');
    FullScreen.addEventListener("click", () => {

        var doc = window.document;
        var docEl = doc.documentElement;

        var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen;
        var cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen;

        if (!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement) {
            requestFullScreen.call(docEl);
        }
        else {
            cancelFullScreen.call(doc);
        }

        document.getElementById('menu__toggle').checked = false;


        FullScreenFlag = !FullScreenFlag;
        if (FullScreenFlag == true) {
            FullScreen.innerHTML = 'Убрать полный экран';
        }
        else {
            FullScreen.innerHTML = 'Полный экран';
        }




    });
}














window.onload = function ()
{

    FullScreenSet();
    AsyncLoader = new AsyncLoaderModel();  //Загрузка моделей


 

    //Запуск игровой сцены



    let width = window.innerWidth;
    let height = window.innerHeight;

    canvas = document.getElementById("canvas");
    canvas.setAttribute('width', width);
    canvas.setAttribute('height', height);



    //передаем canvas в renderer
    renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
    renderer.shadowMap.enabled = true;



    //Камера

    const fov = 45; //охват обзора чем больше тем лучше охват.
    const aspect = width / height;  // the canvas default
    const near = 0.1;
    const far = 5000;


    current_camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

    //расстояние установки  базовой позиции  камеры
    current_camera.position.y = 5.2;
    current_camera.position.z = 25;
    current_scene = new THREE.Scene();


    let color = 0xFFFFFF;
    let intensity = 1;

    let lightDir = new THREE.DirectionalLight(color, intensity);
    let lightAmbient = new THREE.AmbientLight(color, intensity);

    current_scene.add(lightDir);
    current_scene.add(lightAmbient);
    current_scene.add(current_camera);









     //Камера



    controls = new OrbitControls(current_camera, renderer.domElement);


    //углы поворота по X
    controls.maxPolarAngle = Math.PI * 0.495;

    controls.minPolarAngle = Math.PI * 0.430;



  /*  controls.maxPolarAngle = 0;*/



    controls.target.set(0, 2.2, 0);  //точка фокусировки
    controls.minDistance = 1.0;
    controls.maxDistance = 40.0;
    controls.update();


    controls.enablePan = false;
    controls.enableDamping = true;





    loop();
  






    clock = new THREE.Clock();

    hubConnection.onclose((e) => {      
        setTimeout(start, 5000);
    });






}







//ресайз окна

function onResize()
{


    let width = window.innerWidth;
    let height = window.innerHeight;


    canvas.setAttribute('width', width);
    canvas.setAttribute('height', height);


    current_camera.aspect = window.innerWidth / window.innerHeight;
    current_camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);



}


window.addEventListener('resize', onResize, false);




//function onMouseMove(event) {

//    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
//    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

//}


//window.addEventListener('mousemove', onMouseMove, false);




//click

window.addEventListener('mousedown', (event) =>
{

    //var v1 = new THREE.Vector3(0, 0, 1);
    //var v2 = new THREE.Vector3(1, 0, 0);
    //var v3 = new THREE.Vector3(-1, 0, 0);



    var v1 = new THREE.Vector3(8, -7, -2);
    var v2 = new THREE.Vector3(7, -11, 8);


   let angleR = v1.angleTo(v2)
    console.log("angleR : " + angleR);





   

   /* document.getElementById("loading").innerHTML = '<b>' + CurrentTime + '</b>';*/













    console.log("event.which : " + event.which);


        if (event.which == 1)
		{
            /*console.log("LeftBlock");*/

            //


            if (CurrentGame.TargetPlanetIndex >= 0)
            {                                                  
                hubConnection.invoke('TeleportPlanet',  CurrentGame.TargetPlanetIndex);
            }


            if (CurrentGame.BuildingType>0)
            {
                BuildPanel(CurrentGame.BuildingType);
            }



            if (CurrentGame.TargetId > 0)
            {            
                hubConnection.invoke('CheckAtack', CurrentGame.TargetId);
            }


            //
		
		}
        else if (event.which == 3)
		{           
            document.getElementById("InfoPanel").innerHTML = '';			
		}


}, false);

//click










//Игровой цикл
function loop()
{
  
    /*evolveSmoke();*/

    controls.update(); 


    if (IsLoaded)
    {
        StatResource();
        StatBuilding();


      /*  CurrentGame.Buildings.forEach(element => StatResource(element));*/
         RayChecker();

      
   
    }



    requestAnimationFrame(() => { loop(); });
    renderer.render(current_scene, current_camera);
}




function RayChecker()
{

   


        let TargetArray = current_scene.children.filter(x => x.name === "PlanetEnemy");//цели
        TargetArray.forEach(target => {

            target.children[0].visible = false;
            target.children[1].visible = false;

        });



        raycaster.setFromCamera(mouse, current_camera);

        // calculate objects intersecting the picking ray
        const intersects = raycaster.intersectObjects(current_scene.children);



        CurrentGame.TargetId = -1;
        CurrentGame.TargetPlanetIndex = -1;
        CurrentGame.BuildingType = 0;





        for (let i = 0; i < intersects.length; i++) {


            if (intersects[i].object.name === "PlanetEnemy")
            {

                intersects[i].object.children[0].visible = true;
                intersects[i].object.children[1].visible = true;
                CurrentGame.TargetPlanetIndex = intersects[i].object.userData.IndexPlanet;
                CurrentGame.SelectedPlanet = true;


            }
            else if (intersects[i].object.name === "BuildSqure") {

                CurrentGame.BuildingType = intersects[i].object.userData.Type;
               /* console.log(intersects[i].object.userData.Type);*/

            }
            else if (intersects[i].object.name === "BuildEnemySqure")
            {
                CurrentGame.TargetId = intersects[i].object.userData.TargetId;
            }

        }



        




}












function CreateGameFilds()
{
    


    const square = new THREE.BoxGeometry(1, 0.1, 1);
    const lightsquare = new THREE.MeshBasicMaterial({ color: 0xE0C4A8 });
    const darksquare = new THREE.MeshBasicMaterial({ color: 0x6A4236 });


   /* let board = new THREE.Group();*/
   

    

    let squareNumber = 1;
    for (let x = -10; x < 10; x++)
    {
        for (let z = -10; z < 10; z++)
        {
            let cube;
            if (z % 2 == 0)
            {
                cube = new THREE.Mesh(square, x % 2 == 0 ? lightsquare : darksquare);
            }
            else
            {
                cube = new THREE.Mesh(square, x % 2 == 0 ? darksquare : lightsquare);             
            }

            cube.name = "BuildSqure";
            /*cube.userData.squareNumber = squareNumber;*/
            cube.userData.squarePosition = {X:x,Y:z};


           /* squareNumber++;*/

            cube.position.set(x, 1.1, z);
            current_scene.add(cube);
        }
    }











   //smokeParticles = [];


   // //let smokeMaterial = new THREE.MeshLambertMaterial(
   // //    {
   // //        color: 0x00dddd,
   // //        map: AsyncLoader.tex["Smoke"],
   // //        depthWrite: false,
   // //        depthTest: false,
   // //        transparent: true,
   // //        blending: THREE.NormalBlending,
   // //        side: THREE.DoubleSide
   // //    });
   // //let smokeGeo = new THREE.PlaneGeometry(10, 10);



   // ///

   // let spriteMaterailCloud  = new THREE.SpriteMaterial({
   //     color: 0x00dddd,
   //     map: AsyncLoader.tex["Smoke"],
   //     depthWrite: false,
   //     depthTest: false,
   //     transparent: true,
   //     blending: THREE.NormalBlending,
   //     side: THREE.DoubleSide
   // });
    













    //for (let p = 0; p < 250; p++)
    //{

      
    //    let spriteCloud = new THREE.Sprite(spriteMaterailCloud);
    //    spriteCloud.position.set(THREE.MathUtils.randFloatSpread(20), 0, THREE.MathUtils.randFloatSpread(20));

    //    current_scene.add(spriteCloud);
    //    smokeParticles.push(spriteCloud);
    //    spriteCloud.scale.set(10, 10,10);




    //    //var particle = new THREE.Mesh(smokeGeo, smokeMaterial);
    //    //particle.position.set(THREE.MathUtils.randFloatSpread(10), 0, THREE.MathUtils.randFloatSpread(10));    
    //    //particle.rotation.z = Math.random() * 360;

    //    //particle.rotation.y = Math.random() * 360;
    //    //particle.rotation.x = Math.random() * 360;
     

    //    //current_scene.add(particle);
    //    //smokeParticles.push(particle);

       
    //}


















}





//function evolveSmoke()
//{
//     let delta = clock.getDelta();

//    var sp = smokeParticles.length;
//    while (sp--)
//    {
//        smokeParticles[sp].rotation.z += (delta * 0.8);
//        smokeParticles[sp].rotation.x += (delta * 0.8);
//        smokeParticles[sp].rotation.y += (delta * 0.8);

//    }
//}




//function evolveSmoke()
//{
//    let delta = clock.getDelta();

//    //var sp = smokeParticles.length;
//    //while (sp--)
//    //{
      
//    //    smokeParticles[sp].position.x += (delta * 0.2);
//    //    if (smokeParticles[sp].position.x > 10)
//    //    {
//    //        smokeParticles[sp].position.x = -10;
//    //    }
//    //}
//}