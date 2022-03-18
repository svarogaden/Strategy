using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using SpaceStrategy.GameModel;

namespace SpaceStrategy.Models
{
    [Authorize]
    public class ChatHub : Hub
    {

        //let driver = { Tick: 0, RightPressed: 0, LeftPressed: 0, UpPressed:0,DownPressed:0 ,Fire:0};
      




        private readonly ILogger<ChatHub> _logger;
        ApplicationContext db;

        public ChatHub(ILogger<ChatHub> logger, ApplicationContext context)
        {           
           _logger = logger;
            db = context;
        }





        public async Task Spy(int TargetPlanetIndex)
        {

            // ракета спутнник которая незапущена и построена
            UserPlanet rocketSpy = await db.Users.Include(x => x.Rockets
                                              .Where(rocket => rocket.IsLanched == false && rocket.Type == TypeRocket.Spy && rocket.BuildEnd < DateTime.UtcNow)
                                              .OrderBy(rocket => rocket.Id)
                                              .Take(5)
                                               )
                                             .Where(x => x.Id == Context.UserIdentifier)
                                             .OrderBy(x => x.Id)
                                             .FirstOrDefaultAsync();



            if (rocketSpy.Rockets.Count > 0)
            {
               Console.WriteLine("Spy : " + rocketSpy.Rockets.Count);
               Console.WriteLine("Spy Id: " + rocketSpy.Rockets[0].Id);

                rocketSpy.Rockets[0].TimeHit = DateTime.UtcNow.AddMinutes(5);
                rocketSpy.Rockets[0].IsLanched = true;
                rocketSpy.Rockets[0].TargetPlanet= TargetPlanetIndex;


                Console.WriteLine("Разведка запущена в  : " + DateTime.UtcNow);
                Console.WriteLine("Разведка будет закончена в  : " + rocketSpy.Rockets[0].TimeHit);
                await db.SaveChangesAsync();


                //double ScotchingInterval = DateTime.UtcNow.Subtract(rocketSpy.Rockets[0].TimeHit).TotalMilliseconds;


                //double ScotchingInterval = rocketSpy.Rockets[0].TimeHit.Subtract(DateTime.UtcNow).TotalMilliseconds;
                //Console.WriteLine("Тнтервал  : " + ScotchingInterval);


                ScochingView scochingView = new ScochingView();
                scochingView.PlanetIndex = TargetPlanetIndex;
                scochingView.ScotchingInterval = rocketSpy.Rockets[0].TimeHit.Subtract(DateTime.UtcNow).TotalMilliseconds;


                string jsongame = JsonConvert.SerializeObject(scochingView);  //Сериализация игрового остояния   
                await Clients.Caller.SendAsync("SpyStateNotify", jsongame);



               // await Clients.Caller.SendAsync("SpyStateNotify", ScotchingInterval);



            }
            else
            {
                Console.WriteLine("Спутнники Закончились: " + rocketSpy.Rockets.Count);
                await Clients.Caller.SendAsync("SpyEndNotify");
            }

        }


        public async Task CheckSpy(int TargetPlanetIndex)
        {

           UserPlanet rocketSpy = await db.Users.Include( x => x.Rockets
                                                .Where( rocket => rocket.TimeHit > DateTime.UtcNow && rocket.Type == TypeRocket.Spy  &&  rocket.TargetPlanet== TargetPlanetIndex)
                                                .OrderBy(rocket => rocket.Id)
                                                .Take(5) 
                                                )
                                              .Where(x => x.Id == Context.UserIdentifier)
                                              .OrderBy(x => x.Id)
                                              .FirstOrDefaultAsync();

            Console.WriteLine("CheckSpy : " +  rocketSpy.Rockets.Count);



            if(rocketSpy != null)
            {
                if (rocketSpy.Rockets.Count>0)
                {
                    Console.WriteLine("Спутнники в полете");

                    double interval = DateTime.UtcNow.Subtract(rocketSpy.Rockets[0].TimeHit).TotalMilliseconds;
                    await Clients.Caller.SendAsync("SpyStateNotify", new { PlanetIndex = TargetPlanetIndex, TimeEnd = interval }  );

                }
                else
                {
                    await Clients.Caller.SendAsync("SpyStateNotify", new { PlanetIndex = TargetPlanetIndex, TimeEnd = 0 });


                    Console.WriteLine("Спутннков запущенных нет");
                }


            }







            //Rocket rocketSpy = await db.Rockets.Where(x => x.UserPlanet.Id == Context.UserIdentifier && x.TimeHit > DateTime.UtcNow  && x.Type == TypeRocket.Spy &&  x.BuildEnd< DateTime.UtcNow).FirstOrDefaultAsync();


            //if (rocketSpy != null)
            //{
            //    double interval = DateTime.UtcNow.Subtract(rocketSpy.Rockets[0].TimeHit).TotalMilliseconds;
            //    await Clients.Caller.SendAsync("SpyStateNotify", new { PlanetIndex = TargetPlanetIndex, TimeEnd = interval });
            //}
            //else
            //{
            //    await Clients.Caller.SendAsync("SpyStateNotify", new { PlanetIndex = TargetPlanetIndex, TimeEnd = 0 });
            //}




        }















        public async Task TeleportPlanet(  int TargetPlanetIndex)
        {

            //Спутнник который прилетел уже  rocket.TimeHit < DateTime.UtcNow на указанную планету
            Console.WriteLine("TeleportPlanet to   TargetPlanetIndex: " + TargetPlanetIndex);



            UserPlanet userPlanet = await db.Users.Include(x => x.Rockets
                                             .Where(rocket => rocket.IsLanched==true && rocket.Type == TypeRocket.Spy && rocket.TargetPlanet == TargetPlanetIndex)
                                             .OrderByDescending(rocket => rocket.TimeHit)
                                             .Take(5)
                                              )
                                            .Where(x => x.Id == Context.UserIdentifier)
                                            .OrderBy(x => x.Id)
                                            .Include(x => x.Galaxy)
                                            .Include(x => x.Buildings)
                                            .AsSplitQuery()
                                            .FirstOrDefaultAsync();



            //Запущенные ракеты
            if (userPlanet.Rockets.Count > 0)
            {


                //Долетевшие ракеты
                if (DateTime.UtcNow > userPlanet.Rockets[0].TimeHit)
                {

                    Console.WriteLine("Спутнники шпионы  в полете: ");
                    Console.WriteLine("TimeHit : " + userPlanet.Rockets[0].TimeHit);

                    Console.WriteLine("TimeHit Interval : " + DateTime.UtcNow.Subtract(userPlanet.Rockets[0].TimeHit).TotalSeconds);



                    UserPlanet enemyPlanet = await db.Users.Include(x => x.Buildings
                                                                     .Where(buid => buid.BuildEnd <= userPlanet.Rockets[0].TimeHit)
                                                                     .OrderByDescending(rocket => rocket.Id)
                                                                     .Take(10)
                                                                   )
                                                                  .Where(x => x.IndexPlanet == TargetPlanetIndex && x.Galaxy.Id == userPlanet.Galaxy.Id)
                                                                  .OrderBy(x => x.Id)
                                                                  .FirstOrDefaultAsync();





                    if (enemyPlanet != null)
                    {
                        //Колонизированна

                        EnemyBaseView enemyBase = EnemyBuild(enemyPlanet.Buildings);
                        enemyBase.GalaxyId = enemyPlanet.Galaxy.Id;
                        enemyBase.PlanetId = enemyPlanet.IndexPlanet;

                        string jsongame = JsonConvert.SerializeObject(enemyBase);
                        await Clients.Caller.SendAsync("PlanetEnemyNotify", jsongame);
                    }
                    else
                    {
                        //Неколонизированна
                        await Clients.Caller.SendAsync("PlanetEmptyNotify");
                    }



                }
                else
                {
                   
                    //Летящие ракеты

                    ScochingView scochingView = new ScochingView();
                    scochingView.PlanetIndex = TargetPlanetIndex;                 
                    scochingView.ScotchingInterval = userPlanet.Rockets[0].TimeHit.Subtract(DateTime.UtcNow).TotalMilliseconds;
                    string jsongame = JsonConvert.SerializeObject(scochingView);  //Сериализация игрового остояния   
                    await Clients.Caller.SendAsync("SpyStateNotify", jsongame);


                }



            }
            else
            {
               



                EnemyBaseView enemyBase = new EnemyBaseView();
                enemyBase.GalaxyId = userPlanet.Galaxy.Id;
                enemyBase.PlanetId = TargetPlanetIndex;

                string jsongame = JsonConvert.SerializeObject(enemyBase);  //Сериализация игрового остояния                                                                        
                await Clients.Caller.SendAsync("PlanetEnemyNotify", jsongame);
            }




                                                 

        }








        public async Task CheckAtack(int TargetId)
        {

            UserPlanet userPlanet = await db.Users.Include(x => x.Rockets
                                            .Where(rocket => rocket.IsLanched ==false  && rocket.Type == TypeRocket.Strike  && rocket.BuildEnd<DateTime.UtcNow)
                                            .OrderByDescending(rocket => rocket.TimeHit)
                                            .Take(5)
                                             )
                                           .Where(x => x.Id == Context.UserIdentifier)
                                           .OrderBy(x => x.Id)
                                           .Include(x => x.Galaxy)
                                           .Include(x => x.Buildings)
                                           .AsSplitQuery()                                       
                                          .FirstOrDefaultAsync();

            if (userPlanet != null)
            {

                Building enemybuild = await db.Buildings.Where(x => x.Id == TargetId).OrderBy(x => x.Id)
                                               .Include(x => x.UserPlanet)
                                               .FirstOrDefaultAsync();
                if (enemybuild != null)
                {

                    AtackObject atackObject = new AtackObject();
                    atackObject.Armor = enemybuild.Armor;
                    atackObject.Name = enemybuild.Name;
                    atackObject.Id = enemybuild.Id;
                    atackObject.TargetPlanetIndex = enemybuild.UserPlanet.IndexPlanet;
                    atackObject.CountRocket = userPlanet.Rockets.Count;


                    string jsongame = JsonConvert.SerializeObject(atackObject);
                    await Clients.Caller.SendAsync("CheckAtackNotify", jsongame);

                }


            }


    
        }



        public async Task Atack(int TargetId , int TargetPlanetIndex)
        {
            UserPlanet userPlanet = await db.Users.Include(x => x.Rockets
                                          .Where(rocket => rocket.IsLanched == false && rocket.Type == TypeRocket.Strike && rocket.BuildEnd < DateTime.UtcNow)
                                          .OrderByDescending(rocket => rocket.TimeHit)
                                          .Take(5)
                                           )
                                         .Where(x => x.Id == Context.UserIdentifier)
                                         .OrderBy(x => x.Id)
                                         .Include(x => x.Galaxy)
                                         .Include(x => x.Buildings)
                                         .AsSplitQuery()
                                        .FirstOrDefaultAsync();


            if(userPlanet != null)
            {
                //Если есть ракеты 
                if(userPlanet.Rockets.Any())
                {

                    Building enemybuild = await db.Buildings.Where(x => x.Id == TargetId).OrderBy(x => x.Id)
                                              .Include(x => x.UserPlanet)
                                              .FirstOrDefaultAsync();

                    //Если есть  такое здание
                    if (enemybuild != null)
                    {

                        if (userPlanet.Rockets.Any())
                        {



                            //отмечаем в базе запуск ракеты

                            DateTime TimeHit = DateTime.UtcNow.AddMinutes(2);
                            userPlanet.Rockets[0].IsLanched = true;
                            userPlanet.Rockets[0].TimeHit = TimeHit;


                            enemybuild.HitDate = TimeHit;
                            await db.SaveChangesAsync();




                            Console.WriteLine("ЗАПУСК РАКЕТ : ");
                            Console.WriteLine("Осталось ракет : " + userPlanet.Rockets.Count);
                            //Console.WriteLine("Запущенна ракета  : " + userPlanet.Rockets[0].Id);
                            //Console.WriteLine("До удара Armor  : " + enemybuild.Armor);
                            //Console.WriteLine( enemybuild.Name);



                            //Console.WriteLine("DateTime.UtcNow");
                            //Console.WriteLine(DateTime.UtcNow);
                            //Console.WriteLine("TimeHit");
                            //Console.WriteLine(TimeHit);


                            //


                            RocketFlying rocketFlying = new RocketFlying();
                            rocketFlying.TargetId = TargetId;
                            rocketFlying.TimeHit = TimeHit;
                            rocketFlying.Type = TypeRocket.Strike;
                            
                            rocketFlying.GalaxyId = userPlanet.Galaxy.Id;
                            rocketFlying.TargetPlanetIndex = TargetPlanetIndex;
                            rocketFlying.Damage = 100;


                            rocketFlying.LancherId = userPlanet.Id;
                            rocketFlying.AtackedId = enemybuild.UserPlanet.Id;



                            while (!GameLoop.RocketsFly.TryAdd(Guid.NewGuid(), rocketFlying)) ;

                            Console.WriteLine(" TargetId : " + TargetId);
                        
                            await Clients.Caller.SendAsync("AtackNotify");                                                
                            await Clients.Group(enemybuild.UserPlanet.Id).SendAsync("AtackNotify");

                        }


                    }


                }


            }







        }












        public override async Task OnConnectedAsync()
        {
            //_logger.LogInformation("OnConnectedAsync ConnectionId : " + Context.ConnectionId);

            UserPlanet userPlanet = await db.Users.Where(x => x.Id == Context.UserIdentifier).OrderBy(x => x.Id)
                                           .Include(x => x.Buildings)
                                           .Include(x => x.Galaxy)
                                           .AsSplitQuery()
                                           .FirstOrDefaultAsync();


            if (userPlanet != null)
            {
                //Console.WriteLine("userPlanet.Galaxy.Count");
                //Console.WriteLine(userPlanet.Galaxy.Count);
                //Console.WriteLine(userPlanet.Galaxy.UserPlanets[0].Buildings);
                //Console.WriteLine("Galaxy.Id : " + userPlanet.Galaxy.Id);



                await Groups.AddToGroupAsync(Context.ConnectionId, userPlanet.Id.ToString());
                //await Groups.AddToGroupAsync(Context.ConnectionId, userPlanet.Galaxy.Id.ToString());





                Building MineMetall = userPlanet.Buildings.Where(i => i.Type == TypeBuilding.MineMetall).FirstOrDefault();
                double Metall = MineMetall.CountResource()+ userPlanet.Metall;


                Building MineGas = userPlanet.Buildings.Where(i => i.Type == TypeBuilding.MineGas).FirstOrDefault();
                double Gas = MineGas.CountResource() + userPlanet.Gas;


                Building MineUran = userPlanet.Buildings.Where(i => i.Type == TypeBuilding.MineUran).FirstOrDefault();
                double Uran = MineUran.CountResource() + userPlanet.Uran;



                Console.WriteLine("Всего добыто  Metall : " + Metall);
                Console.WriteLine("Всего добыто  Gas : " + Gas);
                Console.WriteLine("Всего добыто  Uran : " + Uran);



                GameState gameState = GameState(userPlanet.Buildings);


                gameState.PlanetId = userPlanet.IndexPlanet;
                gameState.GalaxyId = userPlanet.Galaxy.Id;
                gameState.Metall = Metall;
                gameState.Gas = Gas;
                gameState.Uran = Uran;

                gameState.RateMetall = MineMetall.Rate;
                gameState.RateGas = MineGas.Rate;
                gameState.RateUran = MineUran.Rate;




                string jsongame = JsonConvert.SerializeObject(gameState);  //Сериализация игрового остояния
                //Console.WriteLine(jsongame);

                await Clients.Caller.SendAsync("GameStateNotify", jsongame);












                //double Metall = CountTotalRecource(userPlanet.Buildings, userPlanet.Metall, TypeBuilding.MineMetall);
                //Console.WriteLine("=========================");
                //Console.WriteLine("Всего добыто  Metall : " + Metall);


                //double Gas = CountTotalRecource(userPlanet.Buildings, userPlanet.Gas, TypeBuilding.MineGas);
                //Console.WriteLine("=========================");
                //Console.WriteLine("Всего добыто  Gas : " + Gas);


                //double Uran = CountTotalRecource(userPlanet.Buildings, userPlanet.Uran, TypeBuilding.MineUran);
                //Console.WriteLine("=========================");
                //Console.WriteLine("Всего добыто  Uran : " + Uran);











                //string jsongame = JsonConvert.SerializeObject(gameState);  //Сериализация игрового остояния
                ////Console.WriteLine(jsongame);

                //await Clients.Caller.SendAsync("GameStateNotify", jsongame);



            }
            else
            {
                Console.WriteLine("userPlanet is NULL");
            }




            await base.OnConnectedAsync();
        }












        public async Task Build(TypeBuilding TypeBuild)
        {

            UserPlanet userPlanet = await db.Users.Where(x => x.Id == Context.UserIdentifier).OrderBy(x => x.Id)
                                         .Include(x => x.Buildings)
                                          .Include(x => x.Galaxy)                                       
                                         .ThenInclude(x => x.UserPlanets)
                                         .AsSplitQuery()
                                         .FirstOrDefaultAsync();


            if (userPlanet != null)
            {

                Building MineMetall = userPlanet.Buildings.Where(i => i.Type == TypeBuilding.MineMetall).FirstOrDefault();
                double Metall = MineMetall.CountResource() + userPlanet.Metall;


                Building MineGas = userPlanet.Buildings.Where(i => i.Type == TypeBuilding.MineGas).FirstOrDefault();
                double Gas = MineGas.CountResource() + userPlanet.Gas;


                Building MineUran = userPlanet.Buildings.Where(i => i.Type == TypeBuilding.MineUran).FirstOrDefault();
                double Uran = MineUran.CountResource() + userPlanet.Uran;


            




                Console.WriteLine("Всего добыто  Metall : " + Metall);
                Console.WriteLine("Всего добыто  Gas : " + Gas);
                Console.WriteLine("Всего добыто  Uran : " + Uran);



                switch (TypeBuild)
                {
                    case TypeBuilding.СommandСenter:
                    case TypeBuilding.MineMetall:   
                    case TypeBuilding.MineGas:                      
                    case TypeBuilding.MineUran:
                         Building building = userPlanet.Buildings.Where(i => i.Type == TypeBuild).FirstOrDefault();
                         if(building !=null)
                         {
                            if( building.Build(Metall, Gas))
                           {

                                GameState gameState = GameState(userPlanet.Buildings);


                                gameState.PlanetId =  userPlanet.IndexPlanet;
                                gameState.GalaxyId  = userPlanet.Galaxy.Id;
                                gameState.Metall = MineMetall.CountResource() + userPlanet.Metall;
                                gameState.Gas    = MineGas.CountResource()    + userPlanet.Gas;
                                gameState.Uran   = MineUran.CountResource()   + userPlanet.Uran;

                                gameState.RateMetall = MineMetall.Rate;
                                gameState.RateGas = MineGas.Rate;
                                gameState.RateUran = MineUran.Rate;




                                await db.SaveChangesAsync();

                                string jsongame = JsonConvert.SerializeObject(gameState);  //Сериализация игрового остояния
                                //Console.WriteLine(jsongame);
                                await Clients.Caller.SendAsync("GameStateNotify", jsongame);

                            }
                         }
                         break;
                }


               

            }


      


        }



        public async Task UpdateState()
        {
            UserPlanet userPlanet = await db.Users.Where(x => x.Id == Context.UserIdentifier).OrderBy(x => x.Id)
                                          .Include(x => x.Buildings)
                                           .Include(x => x.Galaxy)
                                          //.Include(x => x.Galaxy).ThenInclude(x => x.UserPlanets)
                                          .AsSplitQuery()
                                          .FirstOrDefaultAsync();

            if (userPlanet != null)
            {

                Building MineMetall = userPlanet.Buildings.Where(i => i.Type == TypeBuilding.MineMetall).FirstOrDefault();
                double Metall = MineMetall.CountResource() + userPlanet.Metall;


                Building MineGas = userPlanet.Buildings.Where(i => i.Type == TypeBuilding.MineGas).FirstOrDefault();
                double Gas = MineGas.CountResource() + userPlanet.Gas;


                Building MineUran = userPlanet.Buildings.Where(i => i.Type == TypeBuilding.MineUran).FirstOrDefault();
                double Uran = MineUran.CountResource() + userPlanet.Uran;


                


                GameState gameState = GameState(userPlanet.Buildings);
                gameState.PlanetId = userPlanet.IndexPlanet;
                gameState.GalaxyId = userPlanet.Galaxy.Id;


                gameState.Metall = Metall;
                gameState.Gas = Gas;
                gameState.Uran = Uran;

                gameState.RateMetall = MineMetall.Rate;
                gameState.RateGas = MineGas.Rate;
                gameState.RateUran = MineUran.Rate;




                string jsongame = JsonConvert.SerializeObject(gameState);  //Сериализация игрового остояния
                //Console.WriteLine(jsongame);

                await Clients.Caller.SendAsync("GameStateNotify", jsongame);





                //GameState gameState = GameState(userPlanet.Buildings);


                //Building MineMetall = userPlanet.Buildings.Where(i => i.Type == TypeBuilding.MineMetall).FirstOrDefault();
                //double Metall = MineMetall.CountResource();

                //Building MineGas = userPlanet.Buildings.Where(i => i.Type == TypeBuilding.MineGas).FirstOrDefault();
                //double Gas = MineGas.CountResource();

                //Building MineUran = userPlanet.Buildings.Where(i => i.Type == TypeBuilding.MineUran).FirstOrDefault();
                //double Uran = MineUran.CountResource();


                //gameState.Metall = Metall;
                //gameState.Gas = Gas;
                //gameState.Uran = Uran;


                //string jsongame = JsonConvert.SerializeObject(gameState);  //Сериализация игрового остояния       
                //await Clients.Caller.SendAsync("GameStateNotify", jsongame);

            }



        }




        public GameState GameState( List<Building> buildings)
        {
            GameState gameState = new GameState();

            foreach (Building build in buildings)
            {
               
                  
                    BuildingView b = new BuildingView();

                    b.Name = build.Name;
                    b.Type = build.Type;
                    b.Level = build.Level;
                   
                    b.CostMetall = build.CostMetall * (build.Level+1);
                    b.CostGas    = build.CostGas    * (build.Level+1);
                    b.X = build.X;
                    b.Z = build.Z;










                Console.WriteLine("=================");
                Console.WriteLine("DateTime.UtcNow");
                Console.WriteLine(DateTime.UtcNow);
                Console.WriteLine("build.HitDate");
                Console.WriteLine(build.HitDate);



                if (DateTime.UtcNow <= build.HitDate)
                {                              
                    Console.WriteLine("Ракета  в полете");
                    Console.WriteLine("=================");
                    gameState.Atacked = true;

                }
                else
                {
                    double intervalExplode = DateTime.UtcNow.Subtract(build.HitDate).TotalMilliseconds;
                    if (intervalExplode < 3600000)
                    {
                        b.HitInterval = intervalExplode;
                        Console.WriteLine("Ракета  прилетела");
                        Console.WriteLine("=================");

                    }
                }









                //Console.WriteLine("=================");
                //Console.WriteLine("DateTime.UtcNow");
                //Console.WriteLine(DateTime.UtcNow);
                //Console.WriteLine("build.HitDate");
                //Console.WriteLine(build.HitDate);
                //Console.WriteLine("=================");








                //if (DateTime.UtcNow <= build.HitDate)
                //{

                //    gameState.Atacked = true;
                //    //Console.WriteLine("=================");
                //    //Console.WriteLine("DateTime.UtcNow");
                //    //Console.WriteLine(DateTime.UtcNow);
                //    //Console.WriteLine("build.HitDate");
                //    //Console.WriteLine(build.HitDate);
                //    //Console.WriteLine("=================");

                //}
                //else
                //{
                //    b.HitInterval = DateTime.UtcNow.Subtract(build.HitDate).TotalMilliseconds;
                //}




                double interval = DateTime.UtcNow.Subtract(build.BuildEnd).TotalMilliseconds;
                    if (interval<0)
                    {
                        b.BuildEnd = interval;                    
                    }
                    else
                    {
                        b.BuildEnd = 0;                       
                    }

                    gameState.Buildings.Add(b);


              



            }

            return gameState;
        }





        public EnemyBaseView EnemyBuild(List<Building> buildings)
        {
            EnemyBaseView gameState = new EnemyBaseView();

            foreach (Building build in buildings)
            {

                BuildingEnemy b = new BuildingEnemy();

                b.Id= build.Id;
                b.Name = build.Name;
                b.Type = build.Type;
                b.Level = build.Level;         
                b.X = build.X;
                b.Z = build.Z;



                Console.WriteLine("=================");
                Console.WriteLine("DateTime.UtcNow");
                Console.WriteLine(DateTime.UtcNow);
                Console.WriteLine("build.HitDate");
                Console.WriteLine(build.HitDate);



                if (DateTime.UtcNow <= build.HitDate)
                {
                    Console.WriteLine("Ракета  в полете");
                    Console.WriteLine("=================");
                    gameState.Atacked = true;

                }
                else
                {
                    double intervalExplode = DateTime.UtcNow.Subtract(build.HitDate).TotalMilliseconds;
                    if (intervalExplode< 3600000)
                    {
                        b.HitInterval = intervalExplode;
                        Console.WriteLine("Ракета  прилетела");
                        Console.WriteLine("=================");

                    }
                    
                }












                //Console.WriteLine("=================");
                //Console.WriteLine("DateTime.UtcNow");
                //Console.WriteLine(DateTime.UtcNow);
                //Console.WriteLine("build.HitDate");
                //Console.WriteLine(build.HitDate);
                //Console.WriteLine("=================");












                //if (DateTime.UtcNow <= build.HitDate)
                //{
                //    //b.HitInterval = DateTime.UtcNow.Subtract(build.HitDate).TotalMilliseconds;
                //    gameState.Atacked = true;






                //}
                //else
                //{
                //    b.HitInterval = DateTime.UtcNow.Subtract(build.HitDate).TotalMilliseconds;
                //}

                gameState.Buildings.Add(b);
            }

            return gameState;
        }













        public override async Task OnDisconnectedAsync(Exception exception)
        {
            _logger.LogInformation("OnDisconnectedAsync ConnectionId : " + Context.ConnectionId);

            await base.OnDisconnectedAsync(exception);
        }







        }
}
