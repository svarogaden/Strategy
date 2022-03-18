using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SpaceStrategy.GameModel
{
    public class BuildingEnemy
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public TypeBuilding Type { get; set; }

        public int Level { get; set; }

        public int X { get; set; }
        public int Z { get; set; }
       public double HitInterval { get; set; }


    }
}
