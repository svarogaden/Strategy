



function StatResource()
{
    let timeInterval = (performance.now() - CurrentGame.TimeGet);
    document.getElementById('MetallDisplay').innerHTML = Math.round((CurrentGame.Metall + ((timeInterval / 3600000) * CurrentGame.MetallRate)));
    document.getElementById('GasDisplay').innerHTML = Math.round((CurrentGame.Gas + ((timeInterval / 3600000) * CurrentGame.GasRate)));
    document.getElementById('UranDisplay').innerHTML = Math.round((CurrentGame.Uran + ((timeInterval / 3600000) * CurrentGame.UranRate)));
}




function StatBuilding()
{
    let timeInterval = (performance.now() - CurrentGame.TimeGet);












    CurrentGame.Buildings.forEach(element => {


        /*console.log(element.ModelBuild.children[1].material.uniforms);*/


        //Explodode animation

        if (element.HitInterval > 0 && element.HitInterval < timeFire)
        {

            element.ModelBuild.children[0].material.uniforms.delta.value += 2;
        }

        //





        //
        if (element.ModelBuild.name == "BuildSqure")
        {

            //


          


            //







            element.ctx.clearRect(0, 0, element.canvas.width, element.height);

            /* element.ctx.clearRect(0, 0, 1000, 1000);*/


            let timeRamain = timeInterval + element.BuildEnd;
            /*let timeRamain = Math.abs(timeInterval + element.BuildEnd);*/




            if (element.BuildEnd < 0 && timeRamain < 0)
            {
                timeRamain = Math.abs(timeRamain);




                /* let timeRamain = element.BuildEnd + timeInterval  ;*/


                let totalTimeBuild = (element.Level * 2 * 60000);
                let PercentProcess = 1 - (timeRamain / totalTimeBuild);



                element.ctx.strokeStyle = "red";
                element.ctx.lineWidth = 5;
                element.ctx.strokeRect(10, 10, 280, 50);

                element.ctx.fillStyle = "grey";
                element.ctx.fillRect(10, 10, 280, 50);

                element.ctx.fillStyle = "green";
                element.ctx.fillRect(10, 10, (280 * PercentProcess), 50);



                element.ctx.fillStyle = "yellow";
                element.ctx.font = "24px serif";



                let displayRemainTime = "";



                let days = Math.floor(timeRamain / (1000 * 60 * 60 * 24));
                if (days > 0)
                    displayRemainTime += days + " д ";


                let hours = Math.floor((timeRamain / (1000 * 60 * 60)) % 24);
                if (hours > 0)
                    displayRemainTime += hours + " ч ";


                let minute = Math.floor(timeRamain / 1000 / 60);
                if (minute > 0)
                    displayRemainTime += minute + " м ";


                let second = Math.floor(timeRamain / 1000 % 60);
                if (second > 0)
                    displayRemainTime += second + " с";



                element.ctx.fillText(displayRemainTime, 40, 40);
                element.canvasTexture.needsUpdate = true;


                element.canvasTexture.visible = true;

            }
            else
            {
                element.canvasTexture.visible = false;
            }



        }
       


  

        //




 });


}







//function StatResource(Building)
//{

//    if (Building.ModelBuild.name === "BuildSqure" && Building.ModelBuild  != null )
//    {
//        console.log(Building.ModelBuild.name );

//        let timeInterval = (performance.now() - CurrentGame.TimeGet);


//        let ButtomBuild = null;
//        switch (Building.Type) {
//            case 1:
//                ButtomBuild = document.getElementById("CommanCenterBtn");
//                break;
//            case 2:
//                CurrentGame.СurrentMetall = Math.round((CurrentGame.Metall + ((timeInterval / 3600000) * Building.Rate)));
//                document.getElementById('MetallDisplay').innerHTML = CurrentGame.СurrentMetall;
//                ButtomBuild = document.getElementById("MetallMineBtn");
//                break;
//            case 3:
//                CurrentGame.СurrentUran = Math.round((CurrentGame.Uran + ((timeInterval / 3600000) * Building.Rate)));
//                document.getElementById('UranDisplay').innerHTML = CurrentGame.СurrentUran;
//                ButtomBuild = document.getElementById("UranMineBtn");
//                break;
//            case 4:
//                CurrentGame.СurrentGas = Math.round((CurrentGame.Gas + ((timeInterval / 3600000) * Building.Rate)));
//                document.getElementById('GasDisplay').innerHTML = CurrentGame.СurrentGas;
//                ButtomBuild = document.getElementById("GasMineBtn");
//        }








//        Building.ctx.clearRect(0, 0, 300, 300);

//        if (Building.BuildEnd < 0) {
//            let timeRamain = Math.abs(timeInterval + Building.BuildEnd);
//            let totalTimeBuild = (Building.Level * 2 * 60000);
//            let PercentProcess = 1 - (timeRamain / totalTimeBuild);



//            Building.ctx.strokeStyle = "red";
//            Building.ctx.lineWidth = 5;
//            Building.ctx.strokeRect(10, 10, 280, 50);

//            Building.ctx.fillStyle = "grey";
//            Building.ctx.fillRect(10, 10, 280, 50);

//            Building.ctx.fillStyle = "green";
//            Building.ctx.fillRect(10, 10, (280 * PercentProcess), 50);



//            Building.ctx.fillStyle = "yellow";
//            Building.ctx.font = "24px serif";
//            /*Building.ctx.fillText("Hello world", 0, 0);*/




//            let displayRemainTime = "";



//            let days = Math.floor(timeRamain / (1000 * 60 * 60 * 24));
//            if (days > 0)
//                displayRemainTime += days + " д ";


//            let hours = Math.floor((timeRamain / (1000 * 60 * 60)) % 24);
//            if (hours > 0)
//                displayRemainTime += hours + " ч ";


//            let minute = Math.floor(timeRamain / 1000 / 60);
//            if (minute > 0)
//                displayRemainTime += minute + " м ";


//            let second = Math.floor(timeRamain / 1000 % 60);
//            if (second > 0)
//                displayRemainTime += second + " с";



//            Building.ctx.fillText(displayRemainTime, 40, 40);
//            Building.canvasTexture.needsUpdate = true;


//        }





//    }

    




//}











function DisableBuilButton()
{


    let btnUran = document.getElementById("UranMineBtn");
    if (btnUran != null)
    {
        btnUran.style.background = "#c0c0c0";
    }

    let btnMetall = document.getElementById("MetallMineBtn");
    if (btnMetall != null)
    {
        btnMetall.style.background = "#c0c0c0";
    }


    let btnGas = document.getElementById("GasMineBtn");
    if (btnGas != null)
    {
        btnGas.style.background = "#c0c0c0";
    }


    let btnCenter = document.getElementById("CommanCenterBtn");
    if (btnCenter != null)
    {
        btnCenter.style.background = "#c0c0c0";
    }

   





}