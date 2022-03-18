let driver = { Id: 0, RightPressed: false, LeftPressed: false, UpPressed: false, DownPressed: false };

//let blockForward = false;
//let blockBackward = false;

//console.log(hubConnection);

document.addEventListener("keydown", KeyMoveDown, false ); 
function KeyMoveDown(e)
{
    let keyCode = e.keyCode;
    let FullScreen = document.getElementById('FullScreen');



    //alert(keyCode);
    if (keyCode ==27)
    {
        let switcher = document.getElementById('menu__toggle');
        if (switcher != null)
        {
            switcher.checked = false;
            FullScreenFlag = !FullScreenFlag;
            if (FullScreenFlag == true)
            {
             
               
                FullScreen.innerHTML = 'Убрать полный экран';
            }
            else
            {
                FullScreen.innerHTML = 'Полный экран';
            }


            CurrentGame.SelectedUnit = 0;
           
            document.getElementById("InfoPanel").innerHTML = '';
            clearInterval(timerId);


          /*  document.getElementById("movieposters").style.visibility = "hidden";*/

        }
    }



    if (CurrentGame.IsGameStart)
    {


    

       if (keyCode == 68 || keyCode == 39)
       {

           if (driver.RightPressed == false)
           {
               driver.RightPressed = true;
               driver.Id = Date.now();
               hubConnection.invoke('ChangeDerection', driver, CurrentGame.idBattle, CurrentGame.idTank);


               console.log('ChangeDerection:' + Date.now());


              // console.log('ChangeDerection:' + keyCode + " Date.now() :" + Date.now());
              // CurrentGame.MyTank.SavePrediction();

           }
        }
       else if (keyCode == 65 || keyCode == 37)
       {

           if (driver.LeftPressed == false)
           {
               driver.LeftPressed = true;
               driver.Id = Date.now();


              
               hubConnection.invoke('ChangeDerection', driver, CurrentGame.idBattle, CurrentGame.idTank);

               //console.log('ChangeDerection:' + keyCode + " Date.now() :" + Date.now());
              // CurrentGame.MyTank.SavePrediction();
           }
        }


        if (keyCode == 87 || keyCode == 38)
        {
            if (driver.UpPressed == false) {
                driver.UpPressed = true;
                driver.Id = Date.now();
            
                hubConnection.invoke('ChangeDerection', driver, CurrentGame.idBattle, CurrentGame.idTank);
             
            }
        }
        else if (keyCode == 83 || keyCode == 40)
        {

            if (driver.DownPressed == false)
            {
                driver.DownPressed = true;
                driver.Id = Date.now();


               // driver.Id = performance.now();
                //driver.Tick = Date.now();

                hubConnection.invoke('ChangeDerection', driver, CurrentGame.idBattle, CurrentGame.idTank);


                //  console.log('ChangeDerection:' + keyCode);
               // CurrentGame.MyTank.SavePrediction();
            }
        }


    //    //WebConnector.sendToServer(driver);
    }
            

}


document.addEventListener("keyup", KeyMoveUp, false );  
function KeyMoveUp(e)
{
    let keyCode = e.keyCode;


    //if (GameStatus == true) {

       

        if (keyCode == 68 || keyCode == 39) {
            driver.RightPressed = false;
            driver.Id = Date.now();

           // driver.Id = performance.now();

            
            hubConnection.invoke('ChangeDerection', driver, CurrentGame.idBattle, CurrentGame.idTank);
            //console.log('ChangeDerection:' + keyCode);
            //CurrentGame.MyTank.SavePrediction();
        }
        else if (keyCode == 65 || keyCode == 37) {

            driver.LeftPressed = false;
            driver.Id = Date.now();



            //driver.Id = performance.now();
            hubConnection.invoke('ChangeDerection', driver, CurrentGame.idBattle, CurrentGame.idTank);

            //console.log('ChangeDerection:' + keyCode);
            //CurrentGame.MyTank.SavePrediction();
        }


        if (keyCode == 87 || keyCode == 38) {
            driver.UpPressed = false;
            driver.Id = Date.now();



            //driver.Id = performance.now();           
            hubConnection.invoke('ChangeDerection', driver, CurrentGame.idBattle, CurrentGame.idTank);
            //console.log('ChangeDerection:' + keyCode);
           // CurrentGame.MyTank.SavePrediction();
        }
        else if (keyCode == 83 || keyCode == 40) {
            driver.DownPressed = false;
            driver.Id = Date.now();


           // driver.Id = performance.now();          
            hubConnection.invoke('ChangeDerection', driver, CurrentGame.idBattle, CurrentGame.idTank);
           // console.log('ChangeDerection:' + keyCode);
           // CurrentGame.MyTank.SavePrediction();
        }


    //    //WebConnector.sendToServer(driver);
    //}

}



