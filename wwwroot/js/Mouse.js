
//const raycaster = new THREE.Raycaster();
//const mouse = new THREE.Vector2();

function onMouseMove(event)
{

	// calculate mouse position in normalized device coordinates
	// (-1 to +1) for both components

	mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
	mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

}


window.addEventListener('mousemove', onMouseMove, false);


























////const mouse = new THREE.Vector2();



//////let canwasWindow = document.getElementById("canvas");


//////window.addEventListener('mousemove', raycastMouse, false);

////let IntervalRotate = performance.now();
////let PrewMosePosition = new THREE.Vector2();


////function onMouseMove(event) {


////	//Для Raycast  с центра

////	//mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
////	//mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

////	//Для Raycast  с центра




////	if (CurrentGame.IsGameStart && (performance.now() - IntervalRotate) >= 30 )
////	{

////		let WheelBlock = 0;
////		let Right = false;
////		let Left = false;
////		IntervalRotate = performance.now();


////		if (event.clientX == 0)
////		{
////			//console.log("LeftBlock");
////			WheelBlock = -1;
////		}
////		else if (event.clientX > (0.99 * window.innerWidth))
////		{
////			//console.log("RightBlock");
////			WheelBlock = 1;
////		}







	
		






	

////		//Вправо-Лево

////		let biasX = event.clientX - PrewMosePosition.x;
////		if (biasX < 0) {
////			//console.log("Left");
////			Left = true;

////		}
////		else if (biasX > 0) {
////			//console.log("Right");
////			Right = true;
////		}


////		PrewMosePosition.x = event.clientX;

////		hubConnection.invoke('RotateTower', { Id: Date.now(), RightRotate: Right, LeftRotate: Left, WheelBlock: WheelBlock}, CurrentGame.idBattle, CurrentGame.idTank);


////		//RotateTower

////		//WebConnector.sendToServer({ typemess: 10, IDcommand: Date.now(), Right: Right, Left: Left, Up: Up, Down: Down });


////	}





////}


////window.addEventListener('mousemove', onMouseMove, false);


////window.addEventListener('mousedown', (event) => {

////	if (CurrentGame.IsGameStart) {

////		if (event.which == 1) {

////			console.log(CurrentGame.Target.DirectionFire);
////			hubConnection.invoke('FireTower', {
////				Id: Date.now(),
////				X: CurrentGame.Target.DirectionFire.x,
////				Y: CurrentGame.Target.DirectionFire.y,
////				Z: CurrentGame.Target.DirectionFire.z,
////				TargetId: CurrentGame.Target.TargetId
////			},
////				CurrentGame.idBattle,
////				CurrentGame.idTank);

////			//hubConnection.invoke('FireTower', { Id: Date.now(), DirectionFire: CurrentGame.Target.DirectionFire,    TargetId: CurrentGame.Target.TargetId }, CurrentGame.idBattle, CurrentGame.idTank);


////			//alert("Fire!!!");

////			//console.log("BlockManage = " + BlockManage);


////			//TimeStartRocket = performance.now();

////			//driver.Fire = 1;
////			//driver.IDcommand = Date.now();

////			//WebConnector.sendToServer({ typemess: 9, IDcommand: Date.now() });


////		}
////		//else if (event.which == 3) {
////		//	//relatedTarget – ссылка на объект над которым находится курсор мыши;
////		//	//target – ссылка на объект, с которого ушел курсор мыши.


////		//	//let prop = "target = " + event.target.tagName;
////		//	////alert(prop);
////		//	//console.log(prop);
////		//}




////	}


////});



//////document.getElementById("ScreenHeath")