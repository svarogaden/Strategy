'use strict';



function CreatePlanet(x, y, z, name, radius, IndexPlanet)
{
    let geometryPlanet = new THREE.SphereBufferGeometry(radius, 32, 32);
   


        let materialPlanet;
        switch (IndexPlanet)
        {
            case 0:
                materialPlanet = new THREE.MeshBasicMaterial({ map: AsyncLoader.tex["Earth"] });
                /*IndexPlanet = 0;*/
                break;
            case 1:
                materialPlanet = new THREE.MeshBasicMaterial({ map: AsyncLoader.tex["Mars2"] });
                /*IndexPlanet = 1;*/
                break;
            case 2:
                materialPlanet = new THREE.MeshBasicMaterial({ map: AsyncLoader.tex["Mars"] });
               /* IndexPlanet = 2;*/
                break;
            case 3:
                materialPlanet = new THREE.MeshBasicMaterial({ map: AsyncLoader.tex["Saturn"] });
                /*IndexPlanet = 3;*/
                break;
            case 4:
                materialPlanet = new THREE.MeshBasicMaterial({ map: AsyncLoader.tex["Uran"] }); //
                /*IndexPlanet = 4;*/
                break;
            case 5:
                materialPlanet = new THREE.MeshBasicMaterial({ map: AsyncLoader.tex["Uran2"] });
               /* IndexPlanet = 6;*/
                break;
            case 6:
                materialPlanet = new THREE.MeshBasicMaterial({ map: AsyncLoader.tex["Eath2"] });
                /*IndexPlanet = 7;*/               
                break;
            case 7:
                materialPlanet = new THREE.MeshBasicMaterial({ map: AsyncLoader.tex["Saturn2"] });
               /* IndexPlanet = 8;  */             
                break;

        }




      let spherePlanet = new THREE.Mesh(geometryPlanet, materialPlanet);
          spherePlanet.position.x = x;
          spherePlanet.position.y = y;
          spherePlanet.position.z = z;
          spherePlanet.name = "PlanetEnemy";


         spherePlanet.userData.IndexPlanet = IndexPlanet;
         spherePlanet.userData.NamePlanet = name;


     let materialTarget = new THREE.SpriteMaterial({ map: AsyncLoader.tex["Target"] });
     let spriteTarget = new THREE.Sprite(materialTarget);
     spherePlanet.add(spriteTarget);
     spriteTarget.scale.set(30, 30, 30);
     spriteTarget.name = "TargetPlanetEnemy";



       //Название планеты



        let canvas_level = document.createElement('canvas');
        let ctx = canvas_level.getContext('2d');
        ctx.fillStyle = "red";
        ctx.font = "bold 36px Georgia ";
        ctx.fillText(name, 0, 42);

        let canvasTexture = new THREE.CanvasTexture(canvas_level);
        canvasTexture.needsUpdate = true;  //иначе  текстура не анимируется

        let spriteMaterailDiscribe = new THREE.SpriteMaterial({
            map: canvasTexture,
            color: 0xffffff
        });
        let spriteDiscribe = new THREE.Sprite(spriteMaterailDiscribe);

        spriteDiscribe.scale.set(30, 30, 30);


        spherePlanet.add(spriteDiscribe);
        spriteDiscribe.position.y = 15;
        spriteDiscribe.name = "DiscribePlanetEnemy";

        //Название планеты








    return spherePlanet;

}












//class Planet
//{
//    constructor(x, y, z, name, typeplanet, radius, indexPlanet  /*, scene*/)
//    {
//        let geometryPlanet = new THREE.SphereBufferGeometry(radius, 32, 32);
//        this.IndexPlanet = indexPlanet;
//        this.namePlanet = name;
       

//        let materialPlanet;
//        switch (typeplanet)
//        {
//            case 1:
//                materialPlanet = new THREE.MeshBasicMaterial({ map: AsyncLoader.tex["Earth"] });
//                /*IndexPlanet = 0;*/
//                break;
//            case 2:
//                materialPlanet = new THREE.MeshBasicMaterial({ map: AsyncLoader.tex["Uran"] });
//                /*IndexPlanet = 1;*/
//                break;
//            case 3:
//                materialPlanet = new THREE.MeshBasicMaterial({ map: AsyncLoader.tex["Saturn"] });
//               /* IndexPlanet = 2;*/
//                break;
//            case 4:
//                materialPlanet = new THREE.MeshBasicMaterial({ map: AsyncLoader.tex["Mars"] });
//                /*IndexPlanet = 3;*/
//                break;
//            case 5:
//                materialPlanet = new THREE.MeshBasicMaterial({ map: AsyncLoader.tex["Mars2"] });
//                /*IndexPlanet = 4;*/
//                break;
//            case 6:
//                materialPlanet = new THREE.MeshBasicMaterial({ map: AsyncLoader.tex["Uran2"] });
//               /* IndexPlanet = 6;*/
//                break;
//            case 7:
//                materialPlanet = new THREE.MeshBasicMaterial({ map: AsyncLoader.tex["Eath2"] });
//                /*IndexPlanet = 7;*/               
//                break;
//            case 8:
//                materialPlanet = new THREE.MeshBasicMaterial({ map: AsyncLoader.tex["Saturn2"] });
//               /* IndexPlanet = 8;  */             
//                break;

//        }


        

     
//        this.spherePlanet = new THREE.Mesh(geometryPlanet, materialPlanet);
//       /* scene.add(this.spherePlanet);*/


//        this.spherePlanet.position.x = x;
//        this.spherePlanet.position.y = y;
//        this.spherePlanet.position.z = z;

//        this.spherePlanet.name = "PlanetEnemy";


//        this.spherePlanet.visible = true;
//       /* this.spherePlanet.visible = false;*/

//        //Цель



//        let materialTarget = new THREE.SpriteMaterial({ map: AsyncLoader.tex["Target"] });
//        this.spriteTarget = new THREE.Sprite(materialTarget);
//        this.spherePlanet.add(this.spriteTarget);
//        this.spriteTarget.scale.set(30, 30, 30);
//        this.spriteTarget.name = "TargetPlanetEnemy";


//        //Цель



//      //  //Название планеты



//        let canvas_level = document.createElement('canvas');
//        let ctx = canvas_level.getContext('2d');
//        ctx.fillStyle = "red";
//        ctx.font = "bold 36px Georgia ";
//        ctx.fillText(name, 0, 42);

//        let canvasTexture = new THREE.CanvasTexture(canvas_level);
//        canvasTexture.needsUpdate = true;  //иначе  текстура не анимируется

//        let spriteMaterailDiscribe = new THREE.SpriteMaterial({
//            map: canvasTexture,
//            color: 0xffffff
//        });
//        let spriteDiscribe = new THREE.Sprite(spriteMaterailDiscribe);
      
//        spriteDiscribe.scale.set(30, 30, 30);


//        this.spherePlanet.add(spriteDiscribe);
//        spriteDiscribe.position.y = 15;
//        spriteDiscribe.name = "DiscribePlanetEnemy";

      

//      ////Название планеты



     
//        this.spherePlanet.userData.IndexPlanet = this.IndexPlanet;
//        this.spherePlanet.userData.NamePlanet = name;

//       /* this.spherePlanet.callback = function () { console.log("XXXX"); }*/

     

//    }

//}