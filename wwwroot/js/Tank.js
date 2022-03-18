'use strict';
class Tank {
    constructor(/*ServerState*/ /*, GameState*/) {

        this.History = new Map();
        this.Desynchronization = 0;



        //Базовая позиция и ориентация

        //this.PositionState = new THREE.Vector3(0, 0, 0); //получать от сервера   
        //this.QuaternionState = new THREE.Quaternion(0, 0, 0, 1);

       
        this.PositionPredict = new THREE.Vector3(0, 0, 0); //прогнозируем
        this.QuaternionPredict = new THREE.Quaternion(0, 0, 0, 1);


        this.PositionPrew = new THREE.Vector3(0, 0, 0);
        this.QuaternionPrew = new THREE.Quaternion(0, 0, 0, 1);




        this.IdCommand = 0;
        this.tickStart = performance.now();

        this.SpeedScalar = 1;
        this.pitch_X = 0;
        this.yaw_Y = 0;
        this.roll_Z = 0;
        this.step_fly = 0.01745;





        //Временный танк



       this.groupTank = new THREE.Group();

       const geometryTankTarget = new THREE.BoxGeometry(20, 10, 100);
      // let TargetTank = new THREE.Mesh(geometryTankTarget, new THREE.MeshPhongMaterial({ color: 0x00ff00 }));
        let TargetTank = new THREE.Mesh(geometryTankTarget, new THREE.MeshLambertMaterial({ color: 0x00ff00 }));

      //TargetTank.position.z = -200;
      //TargetTank.position.y = 0;
      //TargetTank.position.x = 400;



        this.groupTank.add(TargetTank);
        let width = window.innerWidth;
        let height = window.innerHeight;

        const fov = 50; //охват обзора чем больше тем лучше охват градусы.
        const aspect = width / height;  // the canvas default
        const near = 1;
        const far = 500000;

      this.Camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
      current_camera = this.Camera;

     this.groupTank.add(this.Camera);
     this.Camera.position.z = 100;
     this.Camera.position.y = 12;

     current_scene.add(this.groupTank);

     //Временный танк




      //current_camera.position.y = 90;
      //current_camera.position.z = 220;


        //Временный танк


        //let raycasterTank = new THREE.Raycaster();



        //Временный танк

        ////let geometryTank = new THREE.BoxGeometry(50, 25, 50);
        ////let Tank = new THREE.Mesh(geometryTank, new THREE.MeshPhongMaterial({ color: 0x00ff00 }));

        ////this.groupTank = new THREE.Group();
        ////this.groupTank.add(Tank);


        ////current_scene.add(this.groupTank);

        //Временный танк



        //this.QuaternionState.x = ServerState.Quaternion.X;
        //this.QuaternionState.y = ServerState.Quaternion.Y;
        //this.QuaternionState.z = ServerState.Quaternion.Z;
        //this.QuaternionState.w = ServerState.Quaternion.W;

        //this.PositionState.x = ServerState.Position.X;
        //this.PositionState.y = ServerState.Position.Y;
        //this.PositionState.z = ServerState.Position.Z;


       




        //this.groupAir.position.copy(this.PositionState);
        //this.groupAir.quaternion.copy(this.QuaternionState);

        console.log("this.tickStart = " + this.tickStart);


    }


    Move()
    {

        //console.log("this.tickStart = " + (this.tickStart - performance.now())  );

        //заканчиваем предидущую интерполяцию

        this.groupTank.position.copy(this.PositionPredict);
        this.groupTank.quaternion.copy(this.QuaternionPredict);
        //

        this.PositionPrew.copy(this.PositionPredict);
        this.QuaternionPrew.copy(this.QuaternionPredict);

            //заканчиваем предидущую интерполяцию






        if (performance.now()-this.tickStart  >= 30)
        {
            //console.clear();
            console.log("this.tickStart = " + (performance.now() - this.tickStart  ));


            // Изменяем направление

            if (driver.RightPressed)
            {
                --this.yaw_Y;            
            }
            else if (driver.LeftPressed)
            {
                ++this.yaw_Y;            
            }



            let EulerModelPredict = new THREE.Euler(Number(this.pitch_X) * this.step_fly, Number(this.yaw_Y) * this.step_fly, Number(this.roll_Z) * this.step_fly,'YXZ');
            let QuaternionPredict   = new THREE.Quaternion().setFromEuler(EulerModelPredict);           

            QuaternionPredict.x = parseFloat(QuaternionPredict.x.toFixed(3));
            QuaternionPredict.y = parseFloat(QuaternionPredict.y.toFixed(3));
            QuaternionPredict.z = parseFloat(QuaternionPredict.z.toFixed(3));
            QuaternionPredict.w = parseFloat(QuaternionPredict.w.toFixed(3));

            this.QuaternionPredict.copy(QuaternionPredict);
       

            //разворачиваем  вектор в пространстве  применяя кватернион

             let directionPredict = new THREE.Vector3(0, 0, -1).applyQuaternion(QuaternionPredict).normalize();      
             let distance = directionPredict.multiplyScalar(this.SpeedScalar);   //растояние на которое   истребитель перемещается  в пространстве 

             let PositionPredict = new THREE.Vector3().addVectors(this.PositionPredict, distance); 
             PositionPredict.x = Math.round(PositionPredict.x);
             PositionPredict.y = Math.round(PositionPredict.y);
             PositionPredict.z = Math.round(PositionPredict.z);


             this.PositionPredict.copy(PositionPredict);

        

      

        //console.log("0.765.toFixed = " + 0.765.toFixed(2));
        

        this.tickStart = performance.now();


        this.IdCommand++;
        driver.Id = this.IdCommand;

       // console.log("driver.Tick = " + driver.Tick);
       
        //История предсказаний

        let Input = {

            RightPressed: driver.RightPressed,
            LeftPressed: driver.LeftPressed,
            UpPressed: driver.UpPressed,
            DownPressed: driver.DownPressed
        }


      
        this.History.set(this.IdCommand, { Quaternion: QuaternionPredict, Position: PositionPredict, Input: Input });

        hubConnection.invoke('ChangeDerection', driver, CurrentGame.idBattle, CurrentGame.idTank);

            //this.groupTank.position.copy(this.PositionPredict);
            //this.groupTank.quaternion.copy(this.QuaternionPredict);








        }

        //const q = new Quaternion()
        //q.slerpQuaternions(quatA, quatB, 0.6)


        let InterpolationTime = 30;
        let alpha = (performance.now() - this.tickStart) / Number(InterpolationTime);


        this.groupTank.position.copy(new THREE.Vector3().lerpVectors(this.PositionPrew, this.PositionPredict, alpha));
        this.groupTank.quaternion.slerpQuaternions(this.QuaternionPrew, this.QuaternionPredict, alpha);


      


    }


    



    Synchronization(State)
    {
       

        console.log("this.History.size = " + this.History.size);

        //console.log("Synchronization");
        //console.log(State);



        if (this.History.has(State.IdState))
        {
            console.log("Сравниваем состояния");


       
               let Prediction = this.History.get(State.IdState);
           

                this.History.forEach((value, key, map) => {
                if (key <= State.IdState)
                {
                    this.History.delete(key); //оставляем только несинхронизированные состояния
                }
           
        });





            
         
            let QuaternionState = new THREE.Quaternion(0, 0, 0, 1);

            QuaternionState.x = State.Quaternion.X;
            QuaternionState.y = State.Quaternion.Y;
            QuaternionState.z = State.Quaternion.Z;
            QuaternionState.w = State.Quaternion.W;


            let PositionState = new THREE.Vector3(0, 0, 0); //получать от сервера 

            PositionState.x = State.Position.X;
            PositionState.y = State.Position.Y;
            PositionState.z = State.Position.Z;

            

            let IsQuaternionSync = Prediction.Quaternion.equals(QuaternionState);
            let IsPositionSync = Prediction.Position.equals(PositionState);

            //Сихронизация

            let pitch_X = State.pitch_X;
            let yaw_Y = State.yaw_Y;
            let roll_Z = State.roll_Z;


            console.log("State.TickSevrer : " + State.IdState + "  IsPositionSync : " + IsPositionSync);
            console.log("State.TickSevrer : " + State.IdState + "  IsQuaternionSync : " + IsQuaternionSync);

            console.log(" PositionState.z : " + PositionState.z + " = Prediction.z: " + Prediction.Position.z);
            console.log(" PositionState.y : " + PositionState.y + " = Prediction.y: " + Prediction.Position.y);
            console.log(" PositionState.x : " + PositionState.x + " = Prediction.x: " + Prediction.Position.x);

            console.log(" QuaternionState.z : " + QuaternionState.z + " = Prediction.Quaternion.z: " + Prediction.Quaternion.z);
            console.log(" QuaternionState.y : " + QuaternionState.y + " = Prediction.Quaternion.y: " + Prediction.Quaternion.y);
            console.log(" QuaternionState.x : " + QuaternionState.x + " = Prediction.Quaternion.x: " + Prediction.Quaternion.x);
            console.log(" QuaternionState.x : " + QuaternionState.w + " = Prediction.Quaternion.w: " + Prediction.Quaternion.w);

            console.log("State pitch_X : " + pitch_X + " this.pitch_X:" + this.pitch_X);
            console.log("State yaw_Y   : " + yaw_Y + " this.yaw_Y:" + this.yaw_Y);
            console.log("State roll_Z  : " + roll_Z + " this.roll_Z:" + this.roll_Z);



            console.log(" DistanceTo : " + Prediction.Position.distanceTo(PositionState));
           

          
           


            //let distanceDesynchron = Prediction.Position.distanceTo(PositionState);

            if (!IsPositionSync || !IsQuaternionSync)
            {
                ////Сихронизация
                this.Desynchronization++;

             

                console.log(" Синхронизация : " + + this.History.size);

               


           


                this.History.forEach((value, key, map) => {
                    console.log(" this.History.forEach : ");

                    if (key > State.IdState) {


                        if (value.Input.RightPressed) {
                            --yaw_Y;
                        }
                        else if (value.Input.LeftPressed) {
                            ++yaw_Y;
                        }



                        // Пересчет предсказания 

                        let EulerCorrectPredict = new THREE.Euler(Number(pitch_X) * this.step_fly, Number(yaw_Y) * this.step_fly, Number(roll_Z) * this.step_fly, 'YXZ');
                        QuaternionState = new THREE.Quaternion().setFromEuler(EulerCorrectPredict);

                        QuaternionState.x = parseFloat(QuaternionState.x.toFixed(3));
                        QuaternionState.y = parseFloat(QuaternionState.y.toFixed(3));
                        QuaternionState.z = parseFloat(QuaternionState.z.toFixed(3));
                        QuaternionState.w = parseFloat(QuaternionState.w.toFixed(3));




                        let directionCorrectPredict = new THREE.Vector3(0, 0, -1).applyQuaternion(QuaternionState).normalize();
                        let distanceCorrect = directionCorrectPredict.multiplyScalar(this.SpeedScalar);   //растояние на которое   истребитель перемещается  в пространстве 

                        PositionState = new THREE.Vector3().addVectors(PositionState, distanceCorrect);
                        PositionState.x = Math.round(PositionState.x);
                        PositionState.y = Math.round(PositionState.y);
                        PositionState.z = Math.round(PositionState.z);


                        //Исправление предсказания в истории
                        this.History.set(key, { Quaternion: QuaternionState, Position: PositionState, Input: value.Input });
                    }



                });



                this.pitch_X = pitch_X;
                this.yaw_Y = yaw_Y;
                this.roll_Z = roll_Z;


                this.PositionPredict = PositionState;      //быстрое исправление
                this.QuaternionPredict = QuaternionState;

                


               

                



            }


            
            console.log("Количество рассинхронизаций :  " + this.Desynchronization);
            console.log("======================= ");






           //

            //if (parseInt(distanceDesynchron)>1)
            //{
            //    alert(distanceDesynchron);
            //    console.log("Необходима Синхронизация");

              
               
            //    //Сихронизация
            //    let pitch_X = State.pitch_X;
            //    let yaw_Y = State.yaw_Y;
            //    let roll_Z = State.roll_Z;

            //    console.log("State pitch_X : " + pitch_X + " this.pitch_X:" + this.pitch_X);
            //    console.log("State yaw_Y : " + yaw_Y + " this.yaw_Y:" + this.yaw_Y);
            //    console.log("State roll_Z : " + roll_Z + " this.roll_Z:" + this.roll_Z);




            //    //this.History.forEach((value, key, map) => {

                   

            //    //    //console.log(key);
            //    //    //console.log("value.Input.RightPressed = " + value.Input.RightPressed);
            //    //    //console.log("value.Input.LeftPressed  = " + value.Input.LeftPressed);

            //    //    //// value.Input.UpPressed = "Zuzun";
            //    //    //console.log("value.Input.UpPressed  = " + value.Input.UpPressed);


            //    //    if (value.Input.RightPressed) {
            //    //        --yaw_Y;
            //    //    }
            //    //    else if (value.Input.LeftPressed) {
            //    //        ++yaw_Y;
            //    //    }

            //    //    console.log("Sync yaw_Y : " + yaw_Y);
            //    //    //Исправление


            //    //    //Пересчет предсказания 

            //    //    let EulerCorrectPredict = new THREE.Euler(Number(pitch_X) * this.step_fly, Number(yaw_Y) * this.step_fly, Number(roll_Z) * this.step_fly, 'YXZ');
            //    //    QuaternionState = new THREE.Quaternion().setFromEuler(EulerCorrectPredict);

            //    //    let directionCorrectPredict = new THREE.Vector3(0, 0, -1).applyQuaternion(QuaternionState).normalize();
            //    //    let distanceCorrect = directionCorrectPredict.multiplyScalar(this.SpeedScalar);   //растояние на которое   истребитель перемещается  в пространстве 

            //    //    PositionState = new THREE.Vector3().addVectors(PositionState, distanceCorrect);

                   
                    

            //    //    let Input = {

            //    //        RightPressed: value.Input.RightPressed,
            //    //        LeftPressed: value.Input.LeftPressed,
            //    //        UpPressed: value.Input.UpPressed,
            //    //        DownPressed: value.Input.DownPressed
            //    //    }

            //    //    this.History.set(key, { Quaternion: QuaternionState, Position: PositionState, Input: Input });

            //    //     //Пересчет предсказания 

                   
                  
            //    //    //Исправление


            //    //});

            //   ///



            //    this.pitch_X = pitch_X;
            //    this.yaw_Y = yaw_Y;
            //    this.roll_Z = roll_Z;

            //    this.PositionPredict = PositionState; //прогнозируем
            //    this.QuaternionPredict = QuaternionState;


            //    console.log("Исправленное состояние");
            //    console.log(this.PositionPredict);
            //    console.log(this.QuaternionPredict);

            //    console.log("============================");

            //    //Исправление

            //}
            ////Сихронизация



        }
        else
        {
            console.log("Такого состояния нет в колекции History : " + State.IdState);
        }
    }









}
