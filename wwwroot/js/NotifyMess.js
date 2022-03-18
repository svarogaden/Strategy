
        //let materialTarget = new THREE.SpriteMaterial({ map: AsyncLoader.tex["Nucliarbomb"] });
        //let spriteTarget = new THREE.Sprite(materialTarget);
        //element.ModelBuild.add(spriteTarget);
        //spriteTarget.scale.set(3, 3, 3);
        //spriteTarget.name = "NucliarAtack";
        //spriteTarget.position.y = 5;


let timeFire = 3600000;







hubConnection.on("GameStateNotify", (State) => {

    document.getElementById("loading").innerHTML = '';

   










     //let myPlanet = AsyncLoader.planents.filter(w => w.IndexPlanet == GameState.PlanetId);
    /*  AsyncLoader.planents.forEach(element => element.spherePlanet.visible = true);*/


  
    let GameState = JSON.parse(State);
    console.log(GameState);



    if (GameState.Atacked)
    {
        document.getElementById("loading").innerHTML = '<div class="buttonNucliar"><img src="/images/hit/Nucliarbomb.png" width="100" height="100"  alt="Кнопка «button»"></div>';
    }









    
    document.getElementById("resourceTable").style.visibility = 'visible';

   /* CreateSceenMars();*/




    switch (GameState.PlanetId)
    {
        case 0:
            CreateSceenEath();
            document.getElementById("currentPlanet").innerHTML = "Eath : " + GameState.PlanetId;
            break
        case 1:
            CreateSceenLuna();
            document.getElementById("currentPlanet").innerHTML = "Luna : " + GameState.PlanetId;
            break
        case 2:
            CreateSceenMars();
            document.getElementById("currentPlanet").innerHTML = "Mars : " + GameState.PlanetId;
            break
        case 3:
            CreateSceenSaturn();
            document.getElementById("currentPlanet").innerHTML = "Saturn : " + GameState.PlanetId;
            break
        case 4:
            CreateSceenUran();
            document.getElementById("currentPlanet").innerHTML = "Uran : " + GameState.PlanetId;
            break
        case 5:
            CreateSceenFobos();
            document.getElementById("currentPlanet").innerHTML = "Fobos : " + GameState.PlanetId;
            break
        case 6:
            CreateSceenTurion();
            document.getElementById("currentPlanet").innerHTML = "Turion : " + GameState.PlanetId;
            break
        case 7:
            CreateSceenAmos();
            document.getElementById("currentPlanet").innerHTML = "Amos : " + GameState.PlanetId;
            break
      /*  default:*/
            /*CreateSceenMars();*/
    }






    CurrentGame.GalaxyId = GameState.GalaxyId;
    CurrentGame.PlanetId = GameState.PlanetId;
    CurrentGame.TimeGet = performance.now();

    CurrentGame.Metall = GameState.Metall;
    CurrentGame.Gas = GameState.Gas;
    CurrentGame.Uran = GameState.Uran;


    CurrentGame.MetallRate = GameState.RateMetall;
    CurrentGame.GasRate = GameState.RateGas;
    CurrentGame.UranRate = GameState.RateUran;



    CurrentGame.Buildings = [];
    CurrentGame.Buildings = GameState.Buildings;




    CurrentGame.Buildings.forEach(element => {

        element.ModelBuild = AsyncLoader.mesh["mineMetall"].clone();

       element.ModelBuild.name = "BuildSqure";
       element.ModelBuild.userData.Type = element.Type;


       current_scene.add(element.ModelBuild);

      element.ModelBuild.position.y =1.1;    
      element.ModelBuild.position.x = element.X;
      element.ModelBuild.position.z = element.Z

        //



        //Explode

        if (element.HitInterval > 0 && element.HitInterval < timeFire)
        {
            let fire = FireJet();
            element.ModelBuild.add(fire);



            //setTimeout(() => {
            //    hubConnection.invoke('UpdateState');
            //}, Math.abs(timeFire - element.HitInterval ));


        }

        //









        //     //Progress build


        element.canvas = document.createElement('canvas');
        element.ctx = element.canvas.getContext('2d');

        element.canvasTexture = new THREE.CanvasTexture(element.canvas);
        element.canvasTexture.needsUpdate = true;  //иначе  текстура не анимируется


        let spriteMaterailDiscribe = new THREE.SpriteMaterial({
            map: element.canvasTexture,
            color: 0xffffff
        });
        let spriteDiscribe = new THREE.Sprite(spriteMaterailDiscribe);

       /* spriteDiscribe.scale.set(5, 2, 2);*/


        element.ModelBuild.add(spriteDiscribe);




        spriteDiscribe.position.y = 0.5;
        spriteDiscribe.name = "ProgressBuild";



        if (element.BuildEnd < 0)
        {

             setTimeout(() => {
                hubConnection.invoke('UpdateState');
            }, Math.abs(element.BuildEnd));

        }










        //Progress build



        //
        //if (element.HitInterval > 0 /*&& element.HitInterval < 3600000*/) {

        //    let materialTarget = new THREE.SpriteMaterial({ map: AsyncLoader.tex["nuclear3"] });
        //    let spriteTarget = new THREE.Sprite(materialTarget);
        //    element.ModelBuild.add(spriteTarget);
        //    spriteTarget.scale.set(3, 3, 3);
        //    spriteTarget.name = "Nuclear";
        //    spriteTarget.position.y = 0.4;
        //}


        //let explode = AsyncLoader.mesh["Explode"].clone();
        //element.ModelBuild.add(explode);



       /* groupWarIstrebitel.children[1].material.uniforms['time'].value = .00025 * (Date.now() - CurrentGame.AnimationStart);*/


       /* var fire = new THREE.Fire(AsyncLoader.mesh["Fire"].clone());*/


        //




       /* console.log(element.ModelBuild.children[1].material.uniforms);*/





        });
   




});



hubConnection.on("SpyStateNotify", (State) => {
    console.log("SpyStateNotify");

    let GameState = JSON.parse(State);
    console.log(GameState);


    //


    switch (GameState.PlanetIndex)
    {
        case 0:
            CreateSceenEath();
            document.getElementById("currentPlanet").innerHTML = "Eath : " + GameState.PlanetIndex;
            break
        case 1:
            CreateSceenLuna();
            document.getElementById("currentPlanet").innerHTML = "Luna : " + GameState.PlanetIndex;
            break
        case 2:
            CreateSceenMars();
            document.getElementById("currentPlanet").innerHTML = "Mars : " + GameState.PlanetIndex;
            break
        case 3:
            CreateSceenSaturn();
            document.getElementById("currentPlanet").innerHTML = "Saturn : " + GameState.PlanetIndex;
            break
        case 4:
            CreateSceenUran();
            document.getElementById("currentPlanet").innerHTML = "Uran : " + GameState.PlanetIndex;
            break
        case 5:
            CreateSceenFobos();
            document.getElementById("currentPlanet").innerHTML = "Fobos : " + GameState.PlanetIndex;
            break
        case 6:
            CreateSceenTurion();
            document.getElementById("currentPlanet").innerHTML = "Turion : " + GameState.PlanetIndex;
            break
        case 7:
            CreateSceenAmos();
            document.getElementById("currentPlanet").innerHTML = "Amos : " + GameState.PlanetIndex;
            break
        /*  default:*/
        /*CreateSceenMars();*/
    }




















    //

    if (GameState.ScotchingInterval > 0)
    {
       
        let CurrentTime = new Date();
       // CurrentTime.setMinutes(CurrentTime.getMinutes() + GameState);
        CurrentTime.setMilliseconds(CurrentTime.getMilliseconds() + GameState.ScotchingInterval);

        //

        let options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
        let timedateStr = CurrentTime.toLocaleString(['ru', 'en-GB'], options).replace(".,", "");
        document.getElementById("loading").innerHTML = '<b>Разведка до : ' + timedateStr + '</b>';



        setTimeout(() =>
        {
            hubConnection.invoke('TeleportPlanet', GameState.PlanetIndex);
            /*hubConnection.invoke('UpdateState');*/
        }, Math.abs(GameState.ScotchingInterval));








    }









       


  

});




hubConnection.on("PlanetEmptyNotify", () => {
    document.getElementById("loading").innerHTML = '';
    PlanetEmptyPanel();
});




hubConnection.on("PlanetEnemyNotify", (State) => {

    //"nuclear3"



    document.getElementById("loading").innerHTML = '';


    //let myPlanet = AsyncLoader.planents.filter(w => w.IndexPlanet == GameState.PlanetId);
    /*  AsyncLoader.planents.forEach(element => element.spherePlanet.visible = true);*/



    let GameState = JSON.parse(State);
    console.log(GameState);




    if (GameState.Atacked)
    {
        document.getElementById("loading").innerHTML = '<div class="buttonNucliar"><img src="/images/hit/Nucliarbomb.png" width="100" height="100"  alt="Кнопка «button»"></div>';
    }




 


    document.getElementById("resourceTable").style.visibility = 'hidden';

    /* CreateSceenMars();*/




    switch (GameState.PlanetId) {
        case 0:
            CreateSceenEath();
            document.getElementById("currentPlanet").innerHTML = "Eath : " + GameState.PlanetId;
            break
        case 1:
            CreateSceenLuna();
            document.getElementById("currentPlanet").innerHTML = "Luna : " + GameState.PlanetId;
            break
        case 2:
            CreateSceenMars();
            document.getElementById("currentPlanet").innerHTML = "Mars : " + GameState.PlanetId;
            break
        case 3:
            CreateSceenSaturn();
            document.getElementById("currentPlanet").innerHTML = "Saturn : " + GameState.PlanetId;
            break
        case 4:
            CreateSceenUran();
            document.getElementById("currentPlanet").innerHTML = "Uran : " + GameState.PlanetId;
            break
        case 5:
            CreateSceenFobos();
            document.getElementById("currentPlanet").innerHTML = "Fobos : " + GameState.PlanetId;
            break
        case 6:
            CreateSceenTurion();
            document.getElementById("currentPlanet").innerHTML = "Turion : " + GameState.PlanetId;
            break
        case 7:
            CreateSceenAmos();
            document.getElementById("currentPlanet").innerHTML = "Amos : " + GameState.PlanetId;
            break
        /*  default:*/
        /*CreateSceenMars();*/
    }





    CurrentGame.GalaxyId = GameState.GalaxyId;
    CurrentGame.PlanetId = GameState.PlanetId;
    CurrentGame.TimeGet = performance.now();

    
    CurrentGame.Buildings = [];
    CurrentGame.Buildings = GameState.Buildings;




    CurrentGame.Buildings.forEach(element => {

        element.ModelBuild = AsyncLoader.mesh["mineMetall"].clone();

        element.ModelBuild.name = "BuildEnemySqure";
        element.ModelBuild.userData.Type = element.Type;
        element.ModelBuild.userData.TargetId = element.Id;

        current_scene.add(element.ModelBuild);

        element.ModelBuild.position.y = 1.1;
        element.ModelBuild.position.x = element.X;
        element.ModelBuild.position.z = element.Z

        //


        //     //Progress build
        /*console.log("element.HitInterval = " +  element.HitInterval);*/





        if (element.HitInterval > 0 && element.HitInterval < timeFire )
        {      
                let fire = FireJet();
            element.ModelBuild.add(fire);


            //setTimeout(() => {
            //    hubConnection.invoke('UpdateState');
            //}, Math.abs(timeFire - element.HitInterval));

        }


        //

    });




    Returnbase();






});





hubConnection.on("RefreshNotify", () =>
{
    hubConnection.invoke('UpdateState');

});







hubConnection.on("CheckAtackNotify", (State) => {
    /* CheckAtackPanel();  */
    let GameState = JSON.parse(State);
    console.log(GameState);
    CheckAtackPanel(GameState);

});







hubConnection.on("NucliarHitNotify", (PlanetId) => {
    hubConnection.invoke('TeleportPlanet', PlanetId);
});







hubConnection.on("AtackNotify", (/*State*/) => {
    /* CheckAtackPanel();  */
    //let GameState = JSON.parse(State);
    //console.log(GameState);
    ///*CheckAtackPanel(GameState);*/

    /* alert("AtackNotify");*/

    document.getElementById("loading").innerHTML = '<div class="buttonNucliar"><img src="/images/hit/Nucliarbomb.png" width="100" height="100"  alt="Кнопка «button»"></div>';


});



//element.ModelBuild.name = "BuildEnemySqure";
//"PlanetEnemyNotify",

