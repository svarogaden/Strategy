'use strict';
class WarTank {
 constructor(ServerState ) {

     this.idTank;


     //Базовая позиция и ориентация

     this.PositionState = new THREE.Vector3(0, 0, 0); //получать от сервера   
     this.QuaternionState = new THREE.Quaternion(0, 0, 0, 1);


     this.QuaternionTowerState = new THREE.Quaternion(0, 0, 0, 1);
     this.QuaternionTowerPrew = new THREE.Quaternion(0, 0, 0, 1);


     //Интерполяция

     this.PositionPrew = new THREE.Vector3(0, 0, 0);
     this.QuaternionPrew = new THREE.Quaternion(0, 0, 0, 1);

    

     this.TankModel = AsyncLoader.mesh["Abrams"].clone();
     this.TankModel.scale.set(10, 10, 10);


     this.TankTowerModel = AsyncLoader.mesh["AbramsTower"].clone();
     this.TankTowerModel.scale.set(10, 10, 10);
     


     //убрать после разворота
    // this.TankTowerModel.rotation.y -= Math.PI;




     this.groupWarTank = new THREE.Group();
     this.groupWarTank.add(this.TankModel);
     this.groupWarTank.add(this.TankTowerModel);

   
    



     current_scene.add(this.groupWarTank);


    // this.WarshipModel.visible = false;  

   




    // Камера

     this.idTank = ServerState.IdWarTank;




     if (ServerState.IdWarTank == CurrentGame.idTank) {

         this.SetViewCamera();
         this.raycaster = new THREE.Raycaster();



         /////Прицел
         
         //this.sphereOrigin = new THREE.Mesh(
         //    new THREE.SphereGeometry(1, 32, 32),
         //    new THREE.MeshBasicMaterial({
         //        color: 0xffff00
         //    })

         //);

         //this.TankTowerModel.add(this.sphereOrigin);



         //this.sphereDestination = new THREE.Mesh(
         //    new THREE.SphereGeometry(1, 32, 32),
         //    new THREE.MeshBasicMaterial({
         //        color: 0xff0000
         //    })

         //);

         //this.TankTowerModel.add(this.sphereDestination);
         //this.sphereDestination.position.z = -20;



         ///Прицел





     }
     else {


         let materialsTarget = [
             new THREE.MeshBasicMaterial({ color: 0x00ff00 }),  //Lime
             new THREE.MeshBasicMaterial({ color: 0x00ffff }),  //Aqua
             new THREE.MeshBasicMaterial({ color: 0xff00ff }), //Magenta
             new THREE.MeshBasicMaterial({ color: 0xb8860b }), //Dark Goldenrod
             new THREE.MeshBasicMaterial({ color: 0x8a2be2 }), //Blue Violet
             new THREE.MeshBasicMaterial({ color: 0x2f4f4f })

         ];//Dark Slate Grey

        



         let geometryTarget = new THREE.BoxBufferGeometry(50, 50, 90); //w,h,d
         this.cubeTargetEnemy = new THREE.Mesh(geometryTarget, materialsTarget);

         this.cubeTargetEnemy.name = "TargetCubeEnemy";
         current_scene.add(this.cubeTargetEnemy);

        this.cubeTargetEnemy.position.copy(this.groupWarTank.position);


        this.cubeTargetEnemy.userData.TargetTankId = ServerState.IdWarTank; //Id цели
       // this.cubeTargetEnemy.visible =false ;

         
         //this.geometrySphere = new THREE.SphereGeometry(100, 2, 2);
         //this.materialSphere = new THREE.MeshBasicMaterial({ color: 0xffff00 });
         //this.sphereSphere = new THREE.Mesh(geometrySphere, materialSphere);
         //this.groupWarTank.add(this.sphereSphere);
         






     }





    //Камера


    }


    SetViewCamera()
    {
        let width = window.innerWidth;
        let height = window.innerHeight;

        const fov = 90; //охват обзора чем больше тем лучше охват градусы.
        const aspect = width / height;  // the canvas default
        const near = 1;
        const far = 500000;

        this.Camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
        current_camera = this.Camera;


        //
        this.TankTowerModel.add(this.Camera);

      

        this.Camera.position.copy(this.TankTowerModel.position);
        this.Camera.position.z = 9;
        this.Camera.position.y = 7;

        
       this.Camera.rotation.x = -Math.PI/180 *10;




     


    }




    SetServerState(ServerState)
    {

          //Время старта новой интерполяции

            this.tickStart = performance.now();
         
            this.PositionPrew.copy(this.PositionState);
            this.QuaternionPrew.copy(this.QuaternionState);

  
            //Следующая точка  окончания  интерполяции

            this.QuaternionState.x = ServerState.Quaternion.X;
            this.QuaternionState.y = ServerState.Quaternion.Y;
            this.QuaternionState.z = ServerState.Quaternion.Z;
            this.QuaternionState.w = ServerState.Quaternion.W;

            this.PositionState.x = ServerState.Position.X;
            this.PositionState.y = ServerState.Position.Y;
            this.PositionState.z = ServerState.Position.Z;

    

        //Вращаем башню

       
        this.QuaternionTowerPrew.copy(this.QuaternionTowerState);

        this.QuaternionTowerState.x = ServerState.QTower.X;
        this.QuaternionTowerState.y = ServerState.QTower.Y;
        this.QuaternionTowerState.z = ServerState.QTower.Z;
        this.QuaternionTowerState.w = ServerState.QTower.W;



         //Вращаем башню








        }



















     Move()
     {

         let alpha = (performance.now() - this.tickStart) / Number(InterpolationTime);
         if (alpha <= MaxAlpha)
         {

             //this.WarshipModel.visible = true;

             

             //Шасси
             this.groupWarTank.position.copy(new THREE.Vector3().lerpVectors(this.PositionPrew, this.PositionState, alpha));
             this.TankModel.quaternion.slerpQuaternions(this.QuaternionPrew, this.QuaternionState, alpha);



             //Башня
             this.TankTowerModel.quaternion.slerpQuaternions(this.QuaternionTowerPrew, this.QuaternionTowerState, alpha);

             //




             if (this.idTank == CurrentGame.idTank)
             {                
                 this.RadarFace();

             }
             else {               
                 this.cubeTargetEnemy.position.copy(this.groupWarTank.position);
             }








             //


         }


     }
    







    RadarFace() {


        // Направление луча 

        //Cameras["viewbatlle"].lookAt(this.IstrebitelModel.position);

       

        //let posOrigin = new THREE.Vector3();
        //posOrigin = posOrigin.setFromMatrixPosition(this.sphereOrigin.matrixWorld);

        //let posDestination = new THREE.Vector3();
        //posDestination = posDestination.setFromMatrixPosition(this.sphereDestination.matrixWorld);


        //let dir = new THREE.Vector3().subVectors(posDestination, posOrigin).normalize();



        //console.log("dir");
        //console.log(dir);    
        //console.log("===============");






       



        let direction = new THREE.Vector3(0, 0, -1).applyQuaternion(this.TankTowerModel.quaternion).normalize();
        this.raycaster.set(this.TankTowerModel.position, direction);


        // console.log("dir");
        //console.log(dir);
        //console.log(direction);
        //console.log("===============");



      //  this.raycaster.set(this.PositionState, dir);
        
        //выбрать цели и снять выделение

        this.raycaster.set(this.PositionState, direction);

        let TargetArray = current_scene.children.filter(x => x.name === "TargetCubeEnemy");//цели
        //TargetArray.forEach(target => {
        //    target.children[0].material.map = AsyncLoader.tex["SquareFire"];//зеленный
        //});

        //

       // this.planeTarget.material.map = AsyncLoader.tex["NoTarget"];   //захвачена цель


        let intersectArray = this.raycaster.intersectObjects(TargetArray); //массив с целями
        for (let i = 0; i < intersectArray.length; i++)
        {
            if (intersectArray[i].object.name === "TargetCubeEnemy")
            {

                CurrentGame.Target.DirectionFire = direction;
                CurrentGame.Target.TargetId = intersectArray[i].object.userData.TargetTankId;


                //alert("TargetCubeEnemy");



                //this.planeTarget.material.map = AsyncLoader.tex["YesTarget"];   //захвачена цель



                //Проверка попадания на сервере или клиенете

               // let distance = direction.multiplyScalar(intersectArray[i].distance);   //растояние на которое   истребитель перемещается  в пространстве              
               // let Check_Pos_Target = this.PositionState.clone().add(distance);

                //

                ///грань с которой пересечение
                let face = intersectArray[i].face;




                //point of intersection, in world coordinates
                let point = intersectArray[i].point;
                console.log("Можно стрелять  intersectArray[i].point");
                console.log(intersectArray[i].object.position);
                console.log(point);
                console.log("TargetTankId : " +  intersectArray[i].object.userData.TargetTankId);

                console.log("Расстояние до цели "+  intersectArray[i].distance);



                switch (face.materialIndex) {
                    case 0:
                        console.log("Lime");
                        break;
                    case 1:
                        console.log("Aqua");
                        break;
                    case 2:
                        console.log("Magenta");
                        break;
                    case 3:
                        console.log("Dark Goldenrod");
                        break;
                    case 4:
                        console.log("Blue Violet");
                        break;
                    case 5:
                        console.log("Dark Slate Grey");
                        break;
                    default:
                        break;
                }




                console.log("========================");//


            }





        }

        return false;



    }























    }
