'use strict';
class AsyncLoaderModel
{

    constructor()
    {

        this.mesh = [];
        this.mat = [];
        this.tex = [];
        this.explode = [];
        this.planents = [];


        this.loadingManager = new THREE.LoadingManager();


        this.loadingManager.onStart = (url, itemsLoaded, itemsTotal) => {
            console.log('Начата загрузка файлов: ' + url + '.\nЗагружено ' + itemsLoaded + ' из ' + itemsTotal + ' файлов.');
        };

        this.loadingManager.onLoad = () => {

            console.log('Loading complete!');

            document.getElementById("loading").innerHTML = 'Соединение с сервером ';
            start();


            this.AssemblyModel();

           


        };


        this.loadingManager.onProgress = (url, itemsLoaded, itemsTotal) => {
            console.log('Загрузка файлов: ' + url + '.\nЗагружено ' + itemsLoaded + ' из ' + itemsTotal + ' файлов.');
            document.getElementById("loading").innerHTML = 'Загружено ' + itemsLoaded + ' из ' + itemsTotal + ''



        };




        this.loadingManager.onError = (url) => {

         console.log('Произошла ошибка при загрузке ' + url);

        };



        //

        //if (this.mesh["CIRKLE"] === undefined)
        //    this.LoadModelOBJ("3dModels/testModel/sfera.obj", "CIRKLE");


        //this.LoadTexture("testModel/sfera_Base_color.png", "test_Base_color");
        //this.LoadTexture("testModel/sfera_Metallic.png", "test_Metallic");
        //this.LoadTexture("testModel/sfera_Mixed_AO.png", "test_Mixed_AO");
        //this.LoadTexture("testModel/sfera_Normal_DirectX.png", "test_Normal_DirectX");
        //this.LoadTexture("testModel/sfera_Roughness.png", "test_Roughness");


        //


        
       
        if (this.mesh["Plato"] === undefined)
            this.LoadModelOBJ("3dModels/plato.obj", "Plato");
        


        if (this.mesh["ComandCenter"] === undefined)
        this.LoadModelOBJ("3dModels/ComandCenter.obj", "ComandCenter");


        if (this.mesh["mineGas"] === undefined)
            this.LoadModelOBJ("3dModels/mineGas.obj", "mineGas");


        if (this.mesh["mineUran"] === undefined)
            this.LoadModelOBJ("3dModels/mine_uranium.obj", "mineUran");



        if (this.mesh["mineMetall"] === undefined)
            this.LoadModelOBJ("3dModels/mine_metal.obj", "mineMetall");




        //if (this.mesh["Platforma"] === undefined)
        //    this.LoadModelOBJ("3dModels/platforma.obj", "Platforma");

       



        this.LoadTextures();




        ///Текстуры
        this.LoadTexture("target/SquareFireCatch.png", "Target");
        this.LoadTexture("plato/Plato_Base_color.png", "Plato_Base_Color");
        this.LoadTexture("plato/Plato_Metallic.png", "Plato_Metallic");     
        this.LoadTexture("plato/Plato_Mixed_AO.png", "Plato_Mixed_AO");
        this.LoadTexture("plato/Plato_Normal_DirectX.png", "Plato_Normal_DirectX");
        this.LoadTexture("plato/Plato_Roughness.png", "Plato_Roughness");
        this.LoadTexture("Road/plane_Base_color.png", "Road_Material_Base_Color");
        this.LoadTexture("Road/plane_Metallic.png", "Road_Material_Metallic");   
        this.LoadTexture("Road/plane_Mixed_AO.png", "Road_Material_Mixed_AO");
        this.LoadTexture("Road/plane_Normal_DirectX.png", "Road_Normal_DirectX");
        this.LoadTexture("Road/plane_Roughness.png", "Road_Material_Roughness");



        this.LoadTexture("planet/Mars.jpg", "Mars");
        this.LoadTexture("planet/Mars5.jpg", "Mars2");
        this.LoadTexture("planet/Uran.jpg", "Uran");
        this.LoadTexture("planet/Saturn.jpg", "Saturn");
        this.LoadTexture("planet/Saturn5.jpg", "Saturn2");
        this.LoadTexture("planet/Earth4.jpg", "Earth");
        this.LoadTexture("planet/Earth6.jpg", "Eath2");
        this.LoadTexture("planet/Uran7.png", "Uran2");


        this.LoadTexture("hit/Nucliarbomb.png", "Nucliarbomb");      
        this.LoadTexture("cloud/Smoke-Element.png", "Smoke");



        ///
     
        this.LoadTexture("mineGas/mine_2_material_Base_color.png", "mine_2_material_Base_color");
        this.LoadTexture("mineGas/mine_2_material_Metallic.png", "mine_2_material_Metallic");
        this.LoadTexture("mineGas/mine_2_material_Mixed_AO.png", "mine_2_material_Mixed_AO");
        this.LoadTexture("mineGas/mine_2_material_Normal_DirectX.png", "mine_2_material_Normal_DirectX");
        this.LoadTexture("mineGas/mine_2_material_Roughness.png", "mine_2_material_Roughness");




      //  mine_uran_material_Normal_DirectX
       
        //
        this.LoadTexture("mineUran/mine_uran_material_Base_color.png", "mine_uran_material_Base_color");
        this.LoadTexture("mineUran/mine_uran_material_Metallic.png", "mine_uran_material_Metallic");
        this.LoadTexture("mineUran/mine_uran_material_Mixed_AO.png", "mine_uran_material_Mixed_AO");
        this.LoadTexture("mineUran/mine_uran_material_Normal_OpenGL.png", "mine_uran_material_Normal_OpenGL");
        this.LoadTexture("mineUran/mine_uran_material_Roughness.png", "mine_uran_material_Roughness");


        //





        //  mine_metall

        //


        this.LoadTexture("mineMetall/mine_metal_material_Base_color.png", "mine_metal_material_Base_color");
        this.LoadTexture("mineMetall/mine_metal_material_Metallic.png", "mine_metal_material_Metallic");
        this.LoadTexture("mineMetall/mine_metal_material_Mixed_AO.png", "mine_metal_material_Mixed_AO");
        this.LoadTexture("mineMetall/mine_metal_material_Normal_OpenGL.png", "mine_metal_material_Normal_OpenGL");
        this.LoadTexture("mineMetall/mine_metal_material_Roughness.png", "mine_metal_material_Roughness");


        //



        this.LoadTexture("Nucliar/nuclear1.png", "nuclear3");



        this.LoadTexture("Explosion/explosion.png", "Explosion");


        //Fire
       /* this.tex["Fire"] = texture_loader.load("/images/Fire/fire.png");*/


        this.LoadTexture("Fire/fire.png", "Fire");


      /*  this.LoadTexture("Fire/fire.png", "Fire");*/








    }





    LoadModelOBJ(path, nameElement)
    {

        console.log("this.tex.length = " + this.tex.length)
        let objLoader = new THREE.OBJLoader(this.loadingManager);

        objLoader.load(path, (object) => {


            this.mesh[nameElement] = object.children[0];
            this.mesh[nameElement].castShadow = true;
            this.mesh[nameElement].receiveShadow = true;

            console.log("Mesh name  " + nameElement);

        },
            // called when loading is in progresses
            (xhr) =>
            {

                console.log((xhr.loaded / xhr.total * 100) + '% loaded');

            },
            // called when loading has errors
            (error) =>
            {
                console.log('An error happened');
                this.LoadModelOBJ(path, nameElement);
            }


        );


    }





    LoadTexture(filename, nameElement)
    {
      

        let texture_loader = new THREE.TextureLoader(this.loadingManager);       
        this.tex[nameElement] = texture_loader.load("/images/" + filename,
            (texture) =>
            {
                this.tex[nameElement] = texture;
            },
            undefined,
            (err) =>
            {
                console.error('An error happened. ' + nameElement);
                this.LoadTexture(filename, nameElement);
            }


        );
       
    }









    LoadTextures() {

        let texture_loader = new THREE.TextureLoader(this.loadingManager);


        if (this.tex["textureSkyCube"] === undefined)         
            this.tex["textureSkyCube"] = new THREE.CubeTextureLoader().setPath("/images/sky/space_nebula_3/").load(["corona_lf.png", "corona_rt.png", "corona_up.png", "corona_dn.png", "corona_ft.png", "corona_bk.png"]);

      
    }


   





    AssemblyModel()
    {

        //Explode


        //this.materialExplodeFlyer = new THREE.ShaderMaterial({

        //    uniforms: {
        //        //tExplosion: { type: "t", value: THREE.ImageUtils.loadTexture('explosion.png') },
        //        tExplosion: { type: "t", value: AsyncLoader.tex["Explosion"] },
        //        time: { type: "f", value: 0.0 },
        //        weight: { type: "f", value: 10.0 }
        //    },
        //    //vertexShader: document.getElementById('vertexShader').textContent,
        //    //fragmentShader: document.getElementById('fragmentShader').textContent
        //    vertexShader: _VSExplode,
        //    fragmentShader: _FSExplode

        //});



        //this.mesh["Explode"] = new THREE.Mesh(new THREE.IcosahedronBufferGeometry(1, 10), this.materialExplodeFlyer);
        //this.mesh["Explode"].name = "Explode";

        //console.log(this.mesh["Explode"]);


        // this.tex["Explode"].visible = false;


        ///Explode













       
       

        //"mineMetall

        //this.LoadTexture("mineMetall/mine_metal_material_Base_color.png", "mine_metal_material_Base_color");
        //this.LoadTexture("mineMetall/mine_metal_material_Metallic.png", "mine_metal_material_Metallic");
        //this.LoadTexture("mineMetall/mine_metal_material_Mixed_AO.png", "mine_metal_material_Mixed_AO");
        //this.LoadTexture("mineMetall/mine_metal_material_Normal_OpenGL.png", "mine_metal_material_Normal_OpenGL");
        //this.LoadTexture("mineMetall/mine_metal_material_Roughness.png", "mine_metal_material_Roughness")






        this.mat["mineMetall"] = new THREE.MeshStandardMaterial({

            map: this.tex["mine_metal_material_Base_color"],
            aoMap: this.tex["mine_metal_material_Mixed_AO"],
            normalMap: this.tex["mine_metal_material_Normal_OpenGL"],
            normalScale: { x: 2, y: 2 },
            roughnessMap: this.tex["mine_metal_material_Roughness"],
            roughness: 0.5,
            metalnessMap: this.tex["mine_metal_material_Metallic"],
            metalness: 0.6,



          

        });


         this.mesh["mineMetall"].material = this.mat["mineMetall"];



        //console.log("mineMetall");
        //console.log(this.mat["mineMetall"]);



        //this.mat["mineUran"] = new THREE.MeshStandardMaterial({

        //    map: this.tex["mine_uran_material_Base_color"],
        //    aoMap: this.tex["mine_uran_material_Mixed_AO"],
        //    normalMap: this.tex["mine_uran_material_Normal_OpenGL"],
        //    normalScale: { x: 2, y: 2 },
        //    roughnessMap: this.tex["mine_uran_material_Roughness"],
        //    roughness: 0.5,
        //    metalnessMap: this.tex["mine_uran_material_Metallic"],
        //    metalness: 0.6,



        //    //transparent: true,
        //    //fog: false

        //});





       /* this.mesh["mineMetall"].material = this.mat["mineMetall"];*/
      

      













        //

        //"mine_uran_material_Normal_DirectX

        this.mat["mineUran"] = new THREE.MeshStandardMaterial({

            map: this.tex["mine_uran_material_Base_color"],
            aoMap: this.tex["mine_uran_material_Mixed_AO"],
            normalMap: this.tex["mine_uran_material_Normal_OpenGL"],
            normalScale: { x: 2, y: 2 },
            roughnessMap: this.tex["mine_uran_material_Roughness"],
            roughness: 0.5,
            metalnessMap: this.tex["mine_uran_material_Metallic"],
            metalness: 0.6,


           
            //transparent: true,
            //fog: false

        });



        this.mesh["mineUran"].material = this.mat["mineUran"];
       /* this.mesh["mineGas"].scale.set(0.004, 0.004, 0.004);*/








        //
       
        this.mat["GasMine"] = new THREE.MeshStandardMaterial({

            map: this.tex["mine_2_material_Base_color"],
            aoMap: this.tex["mine_2_material_Mixed_AO"],
            normalMap: this.tex["mine_2_material_Normal_DirectX"],
            normalScale: { x: 2, y: 2 },
            roughnessMap: this.tex["mine_2_material_Roughness"],
            roughness: 0.5,
            metalnessMap: this.tex["mine_2_material_Metallic"],
            metalness: 0.6,

            //transparent: true,
            //fog: false

        });



        this.mesh["mineGas"].material = this.mat["GasMine"];
       /* this.mesh["mineGas"].scale.set(0.004, 0.004, 0.004);*/
      
















       /// console.log(this.mat["GasMine"]);


        //


       this.tex["Road_Material_Base_Color"].wrapS = THREE.RepeatWrapping;
       this.tex["Road_Material_Base_Color"].wrapT = THREE.RepeatWrapping;
       this.tex["Road_Material_Base_Color"].repeat.set(80, 80);





        this.mat["Plato"] = new THREE.MeshStandardMaterial({

            map: this.tex["Plato_Base_Color"],
            aoMap: this.tex["Plato_Mixed_AO"],
            normalMap: this.tex["Plato_Normal_DirectX"],
            normalScale: { x: 2, y: 2 },
            roughnessMap: this.tex["Plato_Roughness"],
            roughness: 0.5,
            metalnessMap: this.tex["Plato_Metallic"],
            metalness: 0.6,

            //transparent: true,
            //fog: false

        });


        //console.log("Plato");
        //console.log(this.mat["Plato"]);



        this.mesh["Plato"].material = this.mat["Plato"];
        this.mesh["Plato"].position.y = 1;


        ///







        this.mat["Road"] = new THREE.MeshStandardMaterial({

            map: this.tex["Road_Material_Base_Color"],
            aoMap: this.tex["Road_Material_Mixed_AO"],
            normalMap: this.tex["Road_Normal_DirectX"],
            normalScale: { x: 2, y: 2 },
            roughnessMap: this.tex["Road_Material_Roughness"],
            roughness: 0.5,
            metalnessMap: this.tex["Road_Material_Metallic"],
            metalness: 0.6,

            //transparent: true,


            //fog: false
        });


        this.mat["Road"].wrapS = THREE.RepeatWrapping;
        this.mat["Road"].wrapT = THREE.RepeatWrapping;


        //ComandCenter

        //this.mesh["ComandCenter"].material = new THREE.MeshPhongMaterial({ color: 0x6b8e23 });
        //this.mesh["ComandCenter"].scale.set(0.1, 0.1, 0.1);

        /*this.mesh["ComandCenter"].position.y = 1.1;*/

        //ComandCenter



        let geometry = new THREE.PlaneBufferGeometry(1000, 1000, 32);
        this.mesh["PlanetGround"] = new THREE.Mesh(geometry, this.mat["Road"]);
        this.mesh["PlanetGround"].rotation.x = - Math.PI / 2;
        this.mesh["PlanetGround"].name = "PlanetGround";
       /* current_scene.add(this.mesh["PlanetGround"]);*/

       

       
       
        this.planents["Eath"] = CreatePlanet(100, 40, -250, "Eath", 10, 0);
        this.planents["Luna"] = CreatePlanet(-250, 40, 0, "Luna", 10, 1);
        this.planents["Mars"] = CreatePlanet(0, 60, 250, "Mars", 10, 2);
        this.planents["Saturn"] = CreatePlanet(0, 60, -250, "Saturn", 10, 3);
        this.planents["Uran"] = CreatePlanet(-100, 25, -250, "Uran", 10, 4);
        this.planents["Fobos"] = CreatePlanet(100, 40, 250, "Fobos", 10, 5);
        this.planents["Turion"] = CreatePlanet(-100, 25, 250, "Turion", 10, 6);
        this.planents["Amos"] = CreatePlanet(250, 40, 0, "Amos", 10, 7);




         //this.planents.push(new Planet(100, 40, -250, "Eath", 1,8 ,0));
         //this.planents.push(new Planet(-250, 40, 0, "Luna", 8, 7,1));
         //this.planents.push(new Planet(0, 60, 250, "Mars", 4, 4,2));
         //this.planents.push(new Planet(0, 60, -250, "Saturn", 3, 4, 3));
         //this.planents.push(new Planet(-100, 25, -250, "Uran", 2, 7,4));
         //this.planents.push(new Planet(100, 40, 250, "Fobos", 5, 6,5));
         //this.planents.push(new Planet(-100, 25, 250, "Turion", 6,7,6));
         //this.planents.push(new Planet(250, 40, 0, "Amos", 7, 7,7));


        //this.planents["Eath"] = new Planet(100, 40, -250, "Eath", 1, 8, 0);
        //this.planents["Luna"] = new Planet(-250, 40, 0, "Luna", 8, 7, 1);
        //this.planents["Mars"] = new Planet(0, 60, 250, "Mars", 4, 4, 2);
        //this.planents["Saturn"] = new Planet(0, 60, -250, "Saturn", 3, 4, 3);
        //this.planents["Uran"] = new Planet(-100, 25, -250, "Uran", 2, 7, 4);
        //this.planents["Fobos"] = new Planet(100, 40, 250, "Fobos", 5, 6, 5);
        //this.planents["Turion"] = new Planet(-100, 25, 250, "Turion", 6, 7, 6);
        //this.planents["Amos"] = new Planet(250, 40, 0, "Amos", 7, 7, 7);








       
        //CreateSceenEath();
        //CreateSceenLuna();
        //CreateSceenMars();
        //CreateSceenSaturn();
        //CreateSceenUran();
        //CreateSceenFobos();
        //CreateSceenTurion();
        //CreateSceenAmos();

        IsLoaded = true;





        // CreateMainSceen();
      /* loop();*/
       
       


   
   
       
       /* current_scene.add(this.mesh["Plato"]);*/
       /* this.mesh["Plato"].position.y = 1;*/
 
     /*  this.mesh["Plato"].scale.set(10, 10, 10);*/

        //

       /* console.log("this.planents.length = " +   this.planents.length);*/




        //current_scene.background = AsyncLoader.tex["textureSkyCube"];
        //current_scene.add(AsyncLoader.mesh["Plato"].clone());
        //current_scene.add(AsyncLoader.mesh["PlanetGround"].clone());






    }













}