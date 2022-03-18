using SpaceStrategy.GameModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SpaceStrategy.Models
{
    public  struct Resourse 
    {
        public double Amount { get; set; }
        public double Rate { get; set; }

    }


    //public struct BuildingState
    //{

    //    public string Name { get; set; }

    //    public TypeBuilding Type { get; set; }

    //    public int Level { get; set; }


    //    public int X { get; set; }
    //    public int Y { get; set; }

    //    //public DateTime BuildStart { get; set; }

    //    public DateTime BuildEnd { get; set; }


    //    public DateTime DestroyDate { get; set; }

    //    public double Armor { get; set; }


    //}





    public class GameState
    {
        public int PlanetId { get; set; }

        public DateTime TimeServer { get; set; }

        public double Metall { get; set; }
        public double Uran { get; set; }
        public double Gas { get; set; }


        public double RateMetall { get; set; }
        public double RateUran { get; set; }
        public double RateGas { get; set; }


        public bool Atacked { get; set; }




        public List<BuildingView> Buildings { get; set; }
        public int GalaxyId { get;set; }

        public GameState()
        {
            Buildings = new List<BuildingView>();
            TimeServer = DateTime.UtcNow;
           

            Console.WriteLine("TimeServer : " + TimeServer);
        }


    }
}
