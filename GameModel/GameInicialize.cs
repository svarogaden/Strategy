using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using SpaceStrategy.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SpaceStrategy.GameModel
{
    public class GameInicialize
    {
       



        public  async Task Initialize(UserPlanet userPlanet, ApplicationContext db)
        {


          //  Свободная Галлактика

                Galaxy galaxy = await db.Galaxies.FirstOrDefaultAsync(p => p.Count < 10);


            if (galaxy != null)
            {
                userPlanet.IndexPlanet = galaxy.Count;
                galaxy.Count++;


            }
            else
            {
                userPlanet.IndexPlanet = 0;
                galaxy = new Galaxy { Count = 1 };
                await db.Galaxies.AddAsync(galaxy);
            }

            userPlanet.Galaxy = galaxy;


          //  Свободная Галлактика



                //Базовые строения


            Building MineMetall = new Building
                {
                    Name = "Шахта металл",
                    Type = TypeBuilding.MineMetall,
                    Level = 1,
                    BuildEnd = new DateTime(2021, 9, 1, 18, 30, 25).ToUniversalTime(), // год - месяц - день - час - минута - секунда,
                    //HitDate = new DateTime(2021, 11, 1, 18, 30, 25).ToUniversalTime(),
                    //Opened = false,
                    CostMetall = 100,
                    CostGas = 50,
                    Armor = 2000,
                    Rate = 10,
                    X = 2,
                    Z = -2

                };



                Building MineGas = new Building
                {
                    Name = "Шахта газ",
                    Type = TypeBuilding.MineGas,
                    Level = 2,
                    BuildEnd = new DateTime(2021, 11, 2, 18, 30, 25).ToUniversalTime(), // год - месяц - день - час - минута - секунда,,
                    //HitDate = DateTime.UtcNow.AddYears(100),
                    CostMetall = 200,
                    CostGas = 100,
                    Armor = 5000,
                    Rate = 5,
                    X = -4,
                    Z = -1

                };



                Building MineUran = new Building
                {
                    Name = "Шахта уран",
                    Type = TypeBuilding.MineUran,
                    Level = 2,
                    BuildEnd = new DateTime(2021, 10, 30, 13, 30, 25).ToUniversalTime(), // год - месяц - день - час - минута - секунда,,,
                    //HitDate = DateTime.Now.AddYears(100),
                    CostMetall = 300,
                    CostGas = 150,
                    Armor = 12000,
                    Rate = 2,
                    X = 2,
                    Z = 1

                };



                Building comandCenter = new Building
                {
                    Name = "Командный центр",
                    Type = TypeBuilding.СommandСenter,
                    Level = 1,
                    BuildEnd = DateTime.UtcNow,
                    //HitDate = DateTime.UtcNow.AddYears(100),
                    CostMetall = 400,
                    CostGas = 200,
                    Armor = 10000,
                    X = 0,
                    Z = 0

                };


                userPlanet.Buildings.Add(comandCenter);
                userPlanet.Buildings.Add(MineMetall);
                userPlanet.Buildings.Add(MineGas);
                userPlanet.Buildings.Add(MineUran);

            //Базовые строения



            //Спутники



            Rocket spy = new Rocket { Type = TypeRocket.Spy, BuildEnd = DateTime.UtcNow.AddMinutes(-100) };
            Rocket spy1 = new Rocket { Type = TypeRocket.Spy, BuildEnd = DateTime.UtcNow.AddMinutes(-100) };
            Rocket spy2 = new Rocket { Type = TypeRocket.Spy, BuildEnd = DateTime.UtcNow.AddMinutes(-100) };
            Rocket spy3 = new Rocket { Type = TypeRocket.Spy, BuildEnd = DateTime.UtcNow.AddMinutes(-100) };
            Rocket spy4 = new Rocket { Type = TypeRocket.Spy, BuildEnd = DateTime.UtcNow.AddMinutes(-100) };


            Rocket strike = new Rocket { Type = TypeRocket.Strike, BuildEnd = DateTime.UtcNow.AddMinutes(-100) };
            Rocket strike2 = new Rocket { Type = TypeRocket.Strike, BuildEnd = DateTime.UtcNow.AddMinutes(-100) };
            Rocket strike3 = new Rocket { Type = TypeRocket.Strike, BuildEnd = DateTime.UtcNow.AddMinutes(-100) };
            Rocket strike4 = new Rocket { Type = TypeRocket.Strike, BuildEnd = DateTime.UtcNow.AddMinutes(-100) };



            Rocket intersect = new Rocket { Type = TypeRocket.Intercept, BuildEnd = DateTime.UtcNow.AddMinutes(-100) };
            Rocket intersect1 = new Rocket { Type = TypeRocket.Intercept, BuildEnd = DateTime.UtcNow.AddMinutes(-100) };
            Rocket intersect2 = new Rocket { Type = TypeRocket.Intercept, BuildEnd = DateTime.UtcNow.AddMinutes(-100) };
            Rocket intersect3 = new Rocket { Type = TypeRocket.Intercept, BuildEnd = DateTime.UtcNow.AddMinutes(-100) };
            Rocket intersect4 = new Rocket { Type = TypeRocket.Intercept, BuildEnd = DateTime.UtcNow.AddMinutes(-100) };



            userPlanet.Rockets.Add(spy);
            userPlanet.Rockets.Add(spy1);
            userPlanet.Rockets.Add(spy2);
            userPlanet.Rockets.Add(spy3);
            userPlanet.Rockets.Add(spy4);


            userPlanet.Rockets.Add(strike);
            userPlanet.Rockets.Add(strike2);
            userPlanet.Rockets.Add(strike3);
            userPlanet.Rockets.Add(strike4);



            userPlanet.Rockets.Add(intersect);
            userPlanet.Rockets.Add(intersect1);
            userPlanet.Rockets.Add(intersect2);
            userPlanet.Rockets.Add(intersect3);
            userPlanet.Rockets.Add(intersect4);

            ////Спутники





            ////Разведка

            Research researchScouting = new Research { Type = TypeResearch.Scouting, Level = 2 };
            userPlanet.Researches.Add(researchScouting);

            ////Разведка



        }






        }

    
}
