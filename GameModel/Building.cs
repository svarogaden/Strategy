using Newtonsoft.Json;
using SpaceStrategy.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Numerics;
using System.Threading.Tasks;

namespace SpaceStrategy.GameModel
{
    public enum TypeBuilding 
    {
        СommandСenter=1,  MineMetall  ,MineUran, MineGas
    };





    public class Building
    {
        public int Id { get; set; }


        //public int UserPlanetId { get; set; }
        public  UserPlanet UserPlanet { get; set; }
       

        public string Name { get; set; }   

        public TypeBuilding Type { get; set; }

        public int Level { get; set; }


        public int X { get; set; }
        public int Z { get; set; }

        public double Rate { get; set; }

        //[JsonIgnore]
        //public double Remainder { get; set; }
      

        public double CostMetall { get; set; }

        public double CostGas{ get; set; }


        //public DateTime BuildStart { get; set; }

        public DateTime BuildEnd { get; set; } = DateTime.UtcNow;


        public DateTime HitDate { get; set; } = new DateTime(2015, 7, 20); // год - месяц - день


        public double Armor { get; set; }


        public double CountResource()
        {
            double Resource = 0;
           

            if (DateTime.UtcNow >= BuildEnd)
            {
                double hours = DateTime.UtcNow.Subtract(BuildEnd).TotalHours;
                Resource =Math.Round( hours * Rate * Level);

                //Console.WriteLine("Шахта  открыта : " + Type + " Level: " + Level);             
                //Console.WriteLine("DateTime.UtcNow : " + DateTime.UtcNow );
                //Console.WriteLine("BuildEnd : " + BuildEnd);
                //Console.WriteLine("Hours : " + hours);
                //Console.WriteLine("=============================");

            }

            return Resource;


        }




        public bool Build(double Metall, double Gas)
        {
            double CostMetallNext = CostMetall * (Level + 1);
            double CostMetallGas = CostGas * (Level + 1);


            Console.WriteLine("CostMetallNext");
            Console.WriteLine(CostMetallNext);
            Console.WriteLine("CostMetallGas");
            Console.WriteLine(CostMetallGas);


            if (DateTime.UtcNow >= BuildEnd)
            {


                if (Metall >= CostMetallNext && Gas >= CostMetallGas)
                {
                    Console.WriteLine("Можно строить. " + Type + " Уровень : " +  (Level+1) );


                    //1 . Списываем ресурсы 

                    UserPlanet.Metall -= CostMetallNext;
                    UserPlanet.Gas -= CostMetallGas;





                    //2. Персчет ресурсов и списывание в остаток

                    //double Remain = CountResource();

                    switch (Type)
                    {
                        case TypeBuilding.MineMetall:
                            UserPlanet.Metall += CountResource();
                            Rate *= 2;
                            break;
                        case TypeBuilding.MineGas:
                            UserPlanet.Gas += CountResource();
                            Rate *= 2;
                            break;
                        case TypeBuilding.MineUran:
                            UserPlanet.Uran += CountResource();
                            Rate *= 2;
                            break;
                    }


                    //3. Остановка шахты

                    Level++;
                    BuildEnd =  DateTime.UtcNow.AddMinutes(Level * 2); 


                    Console.WriteLine("Build Class");
                    Console.WriteLine(BuildEnd);



                    //Console.WriteLine("Build");
                    //double subtime = DateTime.UtcNow.Subtract(BuildEnd).TotalMinutes;
                    //Console.WriteLine("Subtime : " + subtime);





                    //4. Повышаем бронировку  зданий
                    Armor *= Level;


                    //5. Меняем позицию  здания

                    X++;
                    if (X > 4)
                    {
                       X = -4;
                    }


                    return true;

                }
                else
                {
                    Console.WriteLine("Недостаточно ресурсов для строительства.");
                }


            }
            else
            {
                Console.WriteLine("Незаконченно предидущее строительство.");
            }


            return false;
        }




        //public Building()
        //{
        //    HitDate = DateTime.UtcNow.AddYears(100);

        //}











    }
}
