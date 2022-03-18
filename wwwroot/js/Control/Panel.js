let timerId;











function CreateAtackPanel(SelectedPlanetIndex)
{
    document.getElementById("Controls").innerHTML = ''
        + '<button class="btn"  id="Spy" ><img src="/images/target/Spy.png" width="100" height="100" alt="submit" /></button>'
        + '<button class="btn"  id="Atack" ><img src="/images/target/YesTarget.png" width="100" height="100" alt="submit" /></button>';




    document.getElementById('Spy').addEventListener("click", () => {        
        hubConnection.invoke('CheckSpy', SelectedPlanetIndex);


       /* SelectSpyPanel(SelectedPlanetIndex);*/
    });

   
    document.getElementById('Atack').addEventListener("click", () => {
        /* alert('Atack : ' + CurrentGame.SelectedPlanetIndex);*/
        /* SelectSpyPanel(2);*/
        SelectAtackPanel(SelectedPlanetIndex);
    });


        


}






function SpyEndPanel()
{



    let ImgSrc = "/images/target/Spy.png";
    document.getElementById("InfoPanel").innerHTML = ''
        + '<div class="message-wrapper">'
        + '<div class="message">'
        + '<div id="closedButton"> <img src="/images/display/button/close.jpg" width="40" height="40" class="iconRes"  /></div>'
        + '<div>'
        + '<h2 id="DiscribeOperation">Спутнники- Шпионы</h2>'
        + '</div>'
        + '<div>'
        + '<img src="' + ImgSrc + '" width="100" height="100" alt="submit" />'
        + ' </div>'
        + ' <div  id="ManageSpyBlock"></div>'
    /* + ' <div><button class="acceptButton" id="BuildButton">Атаковать</button></div>'*/
        /*+ ' <div>Спутнники-шпионы закончились.</div>'*/

        + '<h2 id="DiscribeOperation">Закончились</h2>'
        + ' </div>';




     document.getElementById('closedButton').addEventListener("mousedown", () => {
         document.getElementById("InfoPanel").innerHTML = '';
     });



}














//function SelectSpyPanel(State)
//{



//    let ImgSrc = "/images/target/Spy.png";
//    document.getElementById("InfoPanel").innerHTML = ''
//        + '<div class="message-wrapper">'
//        + '<div class="message">'
//        + '<div id="closedButton"> <img src="/images/display/button/close.jpg" width="40" height="40" class="iconRes"  /></div>'
//        + '<div>'
//        + '<h2 id="DiscribeOperation">Шпионаж</h2>'
//        + '</div>'
//        + '<div>'
//        + '<img src="' + ImgSrc + '" width="100" height="100" alt="submit" />'
//        + ' </div>'
//        + ' <div  id="ManageSpyBlock"></div>'
//        + ' </div>';


//     document.getElementById('closedButton').addEventListener("mousedown", () => {
//         document.getElementById("InfoPanel").innerHTML = '';
//         clearInterval(timerId);
//    });



//    //<button class="acceptButton" id="SpyButton">Запуск</button>

//    let ManageSpyBlock = document.getElementById("ManageSpyBlock");




    

//        if (State.timeEnd >= 0)
//        {

//            //if (State.spyCount > 0)
//            //{


//                ManageSpyBlock.innerHTML = '<button class="acceptButton" id="SpyButton">Запуск</button>';


//                document.getElementById('SpyButton').addEventListener("mousedown", () => {
//                    document.getElementById("InfoPanel").innerHTML = '';
//                    hubConnection.invoke('Spy', State.planetIndex);


//                });


//            //}
//            //else
//            //{
//            //    ManageSpyBlock.innerHTML = '<b>Шпионов 0</b>';
//            //}

//        }
//        else
//        {
           

//            ManageSpyBlock.innerHTML = '<b>0:00</b>';
            
           


//            //

//            clearInterval(timerId);

//            let timeGet = performance.now();
//            let timeEnd = State.timeEnd;

//             timerId = setInterval(


//                 (timeGet, timeEnd )=>
//                {
//                   let now  = performance.now();
//                   let diffrence = now - timeGet;



//                     if ((diffrence + timeEnd) < 0) {

//                         console.log(diffrence);
//                         console.log("=====");



//                         let timeRamain = Math.abs(diffrence + timeEnd);
//                         let minute = Math.floor(timeRamain / 1000 / 60);
//                         let second = Math.floor(timeRamain / 1000 % 60);
//                         switch (second)
//                         {
//                             case 0:                        
//                             case 1:
//                             case 2:
//                             case 3:
//                             case 4:
//                             case 5:
//                             case 6:
//                             case 7:
//                             case 8:
//                             case 9:
//                                 second = '0' + second;
//                                 break;
//                         }


                        
//                         document.getElementById("ManageSpyBlock").innerHTML = '<b>' + minute + ':' + second + '</b>';

//                     }
                    


//                }, 1000, [timeGet] , timeEnd);


           


//        }





//    //}
//    //else
//    //{
//    //    ManageSpyBlock.innerHTML = '<b>Шпионов 0</b>';
//    //}





//}




function Returnbase()
{

    document.getElementById("Controls").innerHTML = ''
        + '<button class="btn"  id="Teleport" ><img src="/images/display/Returnbase.png" width="100" height="100" alt="submit" /></button>'
        + '<button class="btn"  id="SpyBot" ><img src="/images/target/Spy.png" width="100" height="100" alt="submit" /></button>';



    document.getElementById('Teleport').addEventListener("mousedown", () => {

        /*alert('Teleport');*/

        document.getElementById("Controls").innerHTML = '';
       /* hubConnection.invoke('TeleportPlanet', CurrentGame.GalaxyId, CurrentGame.PlanetId);*/
        hubConnection.invoke('UpdateState');
       
    });

    

    document.getElementById('SpyBot').addEventListener("mousedown", () => {
        document.getElementById("Controls").innerHTML = '';
        hubConnection.invoke('Spy', CurrentGame.PlanetId );

    });





    //let ImgSrc = "/images/";
    //document.getElementById("InfoPanel").innerHTML = ''
    //    + '<div class="message-wrapper">'
    //    + '<div class="message">'
    //    + '<div id="closedButton"> <img src="/images/display/button/Returnbase.png" width="40" height="40" class="iconRes"  /></div>'
    //    + '<div>'
    //    + '<h2 id="DiscribeOperation">Шпионаж</h2>'
    //    + '</div>'
    //    + '<div>'
    //    + '<img src="' + ImgSrc + '" width="100" height="100" alt="submit" />'
    //    + ' </div>'
    //    + ' <div  id="ManageSpyBlock"></div>'
    //    + ' </div>';


}







//function PlanetEmptyPanel(SelectedPlanetIndex)
//{
//    let ImgSrc = "/images/target/YesTarget.png";
//    document.getElementById("InfoPanel").innerHTML = ''
//        + '<div class="message-wrapper">'

//        + '<div class="message">'
//        + '<div id="closedButton"> <img src="/images/display/button/close.jpg" width="40" height="40" class="iconRes"  /></div>'


//        + '<div>'
//        + '<h2 id="DiscribeOperation">Атака</h2>'
//        /* + '<h2 id="DiscribeOperation">' + resultBuild[0].Level + '</h2>'*/
//        + '</div>'
//        + '<div>'
//        + '<img src="' + ImgSrc + '" width="100" height="100" alt="submit" />'
//        + ' </div>'

//        //+ '<div class="ResBlockDescribe">'
//        //+ '<img src="/images/display/Metall.png" width="20" height="20" class="iconRes" /><b id="MetallRes">' + resultBuild[0].CostMetall + '</b> <br>'
//        //+ '<img src="/images/display/Gas.png" width="20" height="20" class="iconRes" /><b id="GasRes">' + resultBuild[0].CostGas + '</b>'
//        //+ ' </div>'

//        + ' <div><button class="acceptButton" id="BuildButton">Атаковать</button></div>'
//        + ' </div>';




//    document.getElementById('closedButton').addEventListener("mousedown", () => {
//        document.getElementById("InfoPanel").innerHTML = '';
//    });


   

//    document.getElementById('BuildButton').addEventListener("mousedown", () => {
//        document.getElementById("InfoPanel").innerHTML = '';
//        hubConnection.invoke('Atack', CurrentGame.GalaxyId, SelectedPlanetIndex);

//        console.log("CurrentGame.GalaxyId : " + CurrentGame.GalaxyId);
//        console.log("SelectedPlanetIndex  : " + SelectedPlanetIndex)


       

//    });
   










//}





function PlanetEmptyPanel(/*SelectedPlanetIndex*/) {

    let ImgSrc = "/images/target/YesTarget.png";
    document.getElementById("InfoPanel").innerHTML = ''
        + '<div class="message-wrapper">'

        + '<div class="message">'
        + '<div id="closedButton"> <img src="/images/display/button/close.jpg" width="40" height="40" class="iconRes"  /></div>'


        + '<div>'
        + '<h2 id="DiscribeOperation">Планета</h2>'
        /* + '<h2 id="DiscribeOperation">' + resultBuild[0].Level + '</h2>'*/
        + '</div>'
        + '<div>'
        + '<img src="' + ImgSrc + '" width="100" height="100" alt="submit" />'
        + ' </div>'

        //+ '<div class="ResBlockDescribe">'
        //+ '<img src="/images/display/Metall.png" width="20" height="20" class="iconRes" /><b id="MetallRes">' + resultBuild[0].CostMetall + '</b> <br>'
        //+ '<img src="/images/display/Gas.png" width="20" height="20" class="iconRes" /><b id="GasRes">' + resultBuild[0].CostGas + '</b>'
        //+ ' </div>'

        + '<h2 id="DiscribeOperation">Не колонизирована</h2>'

       /* + ' <div><button class="acceptButton" id="BuildButton">Атаковать</button></div>'*/
        + ' </div>';




    document.getElementById('closedButton').addEventListener("mousedown", () => {
        document.getElementById("InfoPanel").innerHTML = '';
    });




    //document.getElementById('BuildButton').addEventListener("mousedown", () => {
    //    document.getElementById("InfoPanel").innerHTML = '';
    //    hubConnection.invoke('Atack', CurrentGame.GalaxyId, SelectedPlanetIndex);

    //    //console.log("CurrentGame.GalaxyId : " + CurrentGame.GalaxyId);
    //    //console.log("SelectedPlanetIndex  : " + SelectedPlanetIndex)




    //});











}




















function SelectUpgradePanel(Type)
{
  

    let ImgSrc = "";

    switch (Type)
    {
        case 1:
            ImgSrc = "/images/display/button/CommanCenter.png";
            break;
        case 2:
            ImgSrc = "/images/display/button/MetallMine.png";
            break;
        case 3:
            ImgSrc = "/images/display/button/UranMine.png";
            break;
        case 4:
            ImgSrc = "/images/display/button/GasMine.png";
            break;
       
        //default:
        //    console.log("Sorry, we are out of " + expr + ".");
    }





    const resultBuild = CurrentGame.Buildings.filter(w => w.Type == Type);




    document.getElementById("InfoPanel").innerHTML = ''
    +'<div class="message-wrapper">'
       
       + '<div class="message">'
        + '<div id="closedButton"> <img src="/images/display/button/close.jpg" width="40" height="40" class="iconRes"  /></div>'


           + '<div>'
        + '<h2 id="DiscribeOperation">' + resultBuild[0].Name + ' </h2>'
        + '<h2 id="DiscribeOperation">' + resultBuild[0].Level + '</h2>'
           + '</div>'
            +'<div>'
        + '<img src="' + ImgSrc + '" width="100" height="100" alt="submit" />'
           +' </div>'

            +'<div class="ResBlockDescribe">'
            + '<img src="/images/display/Metall.png" width="20" height="20" class="iconRes" /><b id="MetallRes">' + resultBuild[0].CostMetall + '</b> <br>'
            + '<img src="/images/display/Gas.png" width="20" height="20" class="iconRes" /><b id="GasRes">' + resultBuild[0].CostGas + '</b>'
           +' </div>'

          + ' <div><button class="acceptButton" id="BuildButton">Построить</button></div>'
   + ' </div>';



   



    let BuildButton = document.getElementById('BuildButton');
    BuildButton.addEventListener("click", () =>
    {
          hubConnection.invoke('Build', Type);
          document.getElementById("InfoPanel").innerHTML = '';
    });



    
    
    document.getElementById('closedButton').addEventListener("mousedown", () => {
        document.getElementById("InfoPanel").innerHTML = '';
    });




    //console.log("CostMetall : " + resultBuild[0].CostMetall);
    //console.log("CostGas : " + resultBuild[0].CostGas);

    //console.log("СurrentMetall : " + CurrentGame.СurrentMetall);
    //console.log("CurrentGas : " + CurrentGame.СurrentGas);
  




    //if (resultBuild[0].BuildEnd >= 0)
    //{
    //    if (resultBuild[0].CostMetall <= CurrentGame.СurrentMetall && resultBuild[0].CostGas <= CurrentGame.СurrentGas)
    //    {
    //        // BuildButton.setAttribute("disabled", false);
    //        BuildButton.style.visibility = "visible";
    //        console.log("Строить можно ! ");
    //    }
    //    else
    //    {
    //        BuildButton.style.visibility = "hidden";
    //    }
    //}
    //else
    //{
    //   // BuildButton.setAttribute("disabled", true);
    //    BuildButton.style.visibility = "hidden";
    //    console.log("Строить нельзя ! ");
    //}


   





}



function BuildPanel(Type)
{
 
    let ImgSrc = "";

    switch (Type)
    {
        case 1:
            ImgSrc = "/images/display/button/CommanCenter.png";
            break;
        case 2:
            ImgSrc = "/images/display/button/MetallMine.png";
            break;
        case 3:
            ImgSrc = "/images/display/button/UranMine.png";
            break;
        case 4:
            ImgSrc = "/images/display/button/GasMine.png";
            break;
      
    }



    document.getElementById("Controls").innerHTML = ''
    +'<button class="btn" id="OpenBuildPanelButton"><img src="' + ImgSrc + '"100" height="100" alt="submit" /></button>';
       


    document.getElementById('OpenBuildPanelButton').addEventListener("click", () => {
        SelectUpgradePanel(Type);
        document.getElementById("Controls").innerHTML = '';
    });








}


function CheckAtackPanel(GameState)
{
    let ImgSrc = "/images/hit/Nucliarbomb.png";
    document.getElementById("InfoPanel").innerHTML = ''
        + '<div class="message-wrapper">'
        + '<div class="message">'
        + '<div id="closedButton"> <img src="/images/display/button/close.jpg" width="40" height="40" class="iconRes"  /></div>'
        + '<div>'
        + '<h2 id="DiscribeOperation">Ядерный удар</h2>'
        + '</div>'
        + '<div>'
        + '<img src="' + ImgSrc + '" width="150" height="150" alt="submit" />'
        + ' </div>'
        + ' <div  id="ManageSpyBlock"></div>'
        + '<h4 id="DiscribeOperation">' + GameState.Name +'</h4>'
        + '<h4 id="DiscribeOperation">' + GameState.Armor +'</h4>'
       /* + '<h4 id="DiscribeOperation">' + GameState.CountRocket +'</h4>'*/

         + ' <div id="ButtonAtack"></div>'
        /*+ ' <div>Спутнники-шпионы закончились.</div>'*/

      /*  + '<h2 id="DiscribeOperation">Закончились</h2>'*/
        + ' </div>';




    if (GameState.CountRocket > 0)
    {
        document.getElementById("ButtonAtack").innerHTML = '<button class="acceptButton" id="StartAtackButton">Запустить</button>';


        document.getElementById('StartAtackButton').addEventListener("mousedown", () => {
        

            document.getElementById("InfoPanel").innerHTML = '';
           /* document.getElementById("loading").innerHTML = '<div class="buttonNucliar"><img src="/images/hit/Nucliarbomb.png" width="100" height="100"  alt="Кнопка «button»"></div>';*/




            hubConnection.invoke('Atack', GameState.Id, GameState.TargetPlanetIndex);
          

            //alert('StartAtackButton');
        });



    }
    else {
        document.getElementById("ButtonAtack").innerHTML = '<h2 id="DiscribeOperation">Закончились</h2>';
    }


    document.getElementById('closedButton').addEventListener("mousedown", () => {
        document.getElementById("InfoPanel").innerHTML = '';
    });

}