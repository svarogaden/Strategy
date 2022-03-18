using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SpaceStrategy.GameModel
{
    public class BuildingView
    {
        public int Id { get; set; }

      

        public string Name { get; set; }

        public TypeBuilding Type { get; set; }

        public int Level { get; set; }

        public int X { get; set; }
        public int Z { get; set; }

           
        public double CostMetall { get; set; }

        public double CostGas { get; set; }


        public double BuildEnd { get; set; }


        public double Armor { get; set; }

        public double HitInterval { get; set; }




    }
}
