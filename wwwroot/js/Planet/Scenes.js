let Cameras = new Map();
let Scenes = new Map();



let color = 0xFFFFFF;
let intensity = 1;



//this.planents.push(new Planet(100, 40, -250, "Eath", 1,8 ,0));
         //this.planents.push(new Planet(-250, 40, 0, "Luna", 8, 7,1));
         //this.planents.push(new Planet(0, 60, 250, "Mars", 4, 4,2));
         //this.planents.push(new Planet(0, 60, -250, "Saturn", 3, 4, 3));
         //this.planents.push(new Planet(-100, 25, -250, "Uran", 2, 7,4));
         //this.planents.push(new Planet(100, 40, 250, "Fobos", 5, 6,5));
         //this.planents.push(new Planet(-100, 25, 250, "Turion", 6,7,6));
         //this.planents.push(new Planet(250, 40, 0, "Amos", 7, 7,7));




function CreateSceenEath()
{

    let lightDir = new THREE.DirectionalLight(color, intensity);
    let lightAmbient = new THREE.AmbientLight(color, intensity);



    current_scene = new THREE.Scene();
    /*Scenes.set("Eath", scene)*/;
    current_scene.background = AsyncLoader.tex["textureSkyCube"];

    current_scene.name = "Eath";


    current_scene.add(lightDir);
    current_scene.add(lightAmbient);


    current_scene.add(current_camera);
    current_scene.add(AsyncLoader.mesh["Plato"].clone());
    current_scene.add(AsyncLoader.mesh["PlanetGround"].clone());



   /* scene.add(AsyncLoader.planents["Eath"].clone());*/
    current_scene.add(AsyncLoader.planents["Luna"].clone());
    current_scene.add(AsyncLoader.planents["Mars"].clone());
    current_scene.add(AsyncLoader.planents["Saturn"].clone());
    current_scene.add(AsyncLoader.planents["Uran"].clone());
    current_scene.add(AsyncLoader.planents["Fobos"].clone());
    current_scene.add(AsyncLoader.planents["Turion"].clone());
    current_scene.add(AsyncLoader.planents["Amos"].clone());





}

function CreateSceenLuna() {
    let lightDir = new THREE.DirectionalLight(color, intensity);
    let lightAmbient = new THREE.AmbientLight(color, intensity);



    current_scene = new THREE.Scene();
   /* Scenes.set("Luna", scene);*/
    current_scene.background = AsyncLoader.tex["textureSkyCube"];

    current_scene.name = "Luna";


    current_scene.add(lightDir);
    current_scene.add(lightAmbient);


    current_scene.add(current_camera);


    current_scene.add(AsyncLoader.mesh["Plato"].clone());
    current_scene.add(AsyncLoader.mesh["PlanetGround"].clone());


    current_scene.add(AsyncLoader.planents["Eath"].clone());
   /* scene.add(AsyncLoader.planents["Luna"].clone());*/
    current_scene.add(AsyncLoader.planents["Mars"].clone());
    current_scene.add(AsyncLoader.planents["Saturn"].clone());
    current_scene.add(AsyncLoader.planents["Uran"].clone());
    current_scene.add(AsyncLoader.planents["Fobos"].clone());
    current_scene.add(AsyncLoader.planents["Turion"].clone());
    current_scene.add(AsyncLoader.planents["Amos"].clone());


   



    //let planents = [];

    //planents.push(new Planet(100, 40, -250, "Eath", 1, 8, 0, scene));
    ///* AsyncLoader.planents.push(new Planet(-250, 40, 0, "Luna", 8, 7, 1, scene));*/

    //planents.push(new Planet(0, 60, 250, "Mars", 4, 4, 2, scene));


    //planents.push(new Planet(0, 60, -250, "Saturn", 3, 4, 3, scene));
    //planents.push(new Planet(-100, 25, -250, "Uran", 2, 7, 4, scene));
    //planents.push(new Planet(100, 40, 250, "Fobos", 5, 6, 5, scene));
    //planents.push(new Planet(-100, 25, 250, "Turion", 6, 7, 6, scene));
    //planents.push(new Planet(250, 40, 0, "Amos", 7, 7, 7, scene));


}


function CreateSceenMars()
{
    /*alert("CreateSceenMars");*/
    

    let lightDir = new THREE.DirectionalLight(color, intensity);
    let lightAmbient = new THREE.AmbientLight(color, intensity);



 
    current_scene = new THREE.Scene();
  /*  Scenes.set("Mars", scene);*/
    current_scene.background = AsyncLoader.tex["textureSkyCube"];

    current_scene.name = "Mars";


    current_scene.add(lightDir);
    current_scene.add(lightAmbient);

 
    current_scene.add(current_camera);


    current_scene.add(AsyncLoader.mesh["Plato"].clone());
    current_scene.add(AsyncLoader.mesh["PlanetGround"].clone());



    current_scene.add(AsyncLoader.planents["Eath"].clone());
    current_scene.add(AsyncLoader.planents["Luna"].clone());
   /* scene.add(AsyncLoader.planents["Mars"].clone());*/
    current_scene.add(AsyncLoader.planents["Saturn"].clone());
    current_scene.add(AsyncLoader.planents["Uran"].clone());
    current_scene.add(AsyncLoader.planents["Fobos"].clone());
    current_scene.add(AsyncLoader.planents["Turion"].clone());
    current_scene.add(AsyncLoader.planents["Amos"].clone());






   






}

function CreateSceenSaturn() {
    let lightDir = new THREE.DirectionalLight(color, intensity);
    let lightAmbient = new THREE.AmbientLight(color, intensity);



    current_scene = new THREE.Scene();
   /* Scenes.set("Saturn", scene);*/
    current_scene.background = AsyncLoader.tex["textureSkyCube"];


    current_scene.name = "Saturn";


    current_scene.add(lightDir);
    current_scene.add(lightAmbient);


    current_scene.add(current_camera);
    current_scene.add(AsyncLoader.mesh["Plato"].clone());
    current_scene.add(AsyncLoader.mesh["PlanetGround"].clone());



    current_scene.add(AsyncLoader.planents["Eath"].clone());
    current_scene.add(AsyncLoader.planents["Luna"].clone());
    current_scene.add(AsyncLoader.planents["Mars"].clone());
   /* scene.add(AsyncLoader.planents["Saturn"].clone());*/
    current_scene.add(AsyncLoader.planents["Uran"].clone());
    current_scene.add(AsyncLoader.planents["Fobos"].clone());
    current_scene.add(AsyncLoader.planents["Turion"].clone());
    current_scene.add(AsyncLoader.planents["Amos"].clone());







    //let planents = [];

    //planents.push(new Planet(100, 40, -250, "Eath", 1, 8, 0, scene));
    //planents.push(new Planet(-250, 40, 0, "Luna", 8, 7, 1, scene));
    //planents.push(new Planet(0, 60, 250, "Mars", 4, 4, 2, scene));


    ///* AsyncLoader.planents.push(new Planet(0, 60, -250, "Saturn", 3, 4, 3, scene));*/
    //planents.push(new Planet(-100, 25, -250, "Uran", 2, 7, 4, scene));
    //planents.push(new Planet(100, 40, 250, "Fobos", 5, 6, 5, scene));
    //planents.push(new Planet(-100, 25, 250, "Turion", 6, 7, 6, scene));
    //planents.push(new Planet(250, 40, 0, "Amos", 7, 7, 7, scene));



}


function CreateSceenUran()
{
    let lightDir = new THREE.DirectionalLight(color, intensity);
    let lightAmbient = new THREE.AmbientLight(color, intensity);



    current_scene = new THREE.Scene();
    /*Scenes.set("Uran", scene);*/
    current_scene.background = AsyncLoader.tex["textureSkyCube"];

    current_scene.name = "Uran";


    current_scene.add(lightDir);
    current_scene.add(lightAmbient);


    current_scene.add(current_camera);
    current_scene.add(AsyncLoader.mesh["Plato"].clone());
    current_scene.add(AsyncLoader.mesh["PlanetGround"].clone());



    current_scene.add(AsyncLoader.planents["Eath"].clone());
    current_scene.add(AsyncLoader.planents["Luna"].clone());
    current_scene.add(AsyncLoader.planents["Mars"].clone());
    current_scene.add(AsyncLoader.planents["Saturn"].clone());
    /*scene.add(AsyncLoader.planents["Uran"].clone());*/
    current_scene.add(AsyncLoader.planents["Fobos"].clone());
    current_scene.add(AsyncLoader.planents["Turion"].clone());
    current_scene.add(AsyncLoader.planents["Amos"].clone());




}


function CreateSceenFobos()
{
    let lightDir = new THREE.DirectionalLight(color, intensity);
    let lightAmbient = new THREE.AmbientLight(color, intensity);



    current_scene = new THREE.Scene();
    /*Scenes.set("Fobos", scene);*/
    current_scene.background = AsyncLoader.tex["textureSkyCube"];

    current_scene.name = "Fobos";


    current_scene.add(lightDir);
    current_scene.add(lightAmbient);


    current_scene.add(current_camera);
    current_scene.add(AsyncLoader.mesh["Plato"].clone());
    current_scene.add(AsyncLoader.mesh["PlanetGround"].clone());


    current_scene.add(AsyncLoader.planents["Eath"].clone());
    current_scene.add(AsyncLoader.planents["Luna"].clone());
    current_scene.add(AsyncLoader.planents["Mars"].clone());
    current_scene.add(AsyncLoader.planents["Saturn"].clone());
    current_scene.add(AsyncLoader.planents["Uran"].clone());
    /*scene.add(AsyncLoader.planents["Fobos"].clone());*/
    current_scene.add(AsyncLoader.planents["Turion"].clone());
    current_scene.add(AsyncLoader.planents["Amos"].clone());








}

function CreateSceenTurion() {

    let lightDir = new THREE.DirectionalLight(color, intensity);
    let lightAmbient = new THREE.AmbientLight(color, intensity);



    current_scene = new THREE.Scene();
   /* Scenes.set("Turion", scene);*/
    current_scene.background = AsyncLoader.tex["textureSkyCube"];

    current_scene.name = "Turion";


    current_scene.add(lightDir);
    current_scene.add(lightAmbient);


    current_scene.add(current_camera);
    current_scene.add(AsyncLoader.mesh["Plato"].clone());
    current_scene.add(AsyncLoader.mesh["PlanetGround"].clone());


    current_scene.add(AsyncLoader.planents["Eath"].clone());
    current_scene.add(AsyncLoader.planents["Luna"].clone());
    current_scene.add(AsyncLoader.planents["Mars"].clone());
    current_scene.add(AsyncLoader.planents["Saturn"].clone());
    current_scene.add(AsyncLoader.planents["Uran"].clone());
    current_scene.add(AsyncLoader.planents["Fobos"].clone());
    /*scene.add(AsyncLoader.planents["Turion"].clone());*/
    current_scene.add(AsyncLoader.planents["Amos"].clone());








}

function CreateSceenAmos() {

    let lightDir = new THREE.DirectionalLight(color, intensity);
    let lightAmbient = new THREE.AmbientLight(color, intensity);



    current_scene = new THREE.Scene();
  /*  Scenes.set("Amos", scene);*/
    current_scene.background = AsyncLoader.tex["textureSkyCube"];

    current_scene.name = "Amos";


    current_scene.add(lightDir);
    current_scene.add(lightAmbient);


    current_scene.add(current_camera);
    current_scene.add(AsyncLoader.mesh["Plato"].clone());
    current_scene.add(AsyncLoader.mesh["PlanetGround"].clone());


    current_scene.add(AsyncLoader.planents["Eath"].clone());
    current_scene.add(AsyncLoader.planents["Luna"].clone());
    current_scene.add(AsyncLoader.planents["Mars"].clone());
    current_scene.add(AsyncLoader.planents["Saturn"].clone());
    current_scene.add(AsyncLoader.planents["Uran"].clone());
    current_scene.add(AsyncLoader.planents["Fobos"].clone());
    current_scene.add(AsyncLoader.planents["Turion"].clone());
    /*scene.add(AsyncLoader.planents["Amos"].clone());*/


}