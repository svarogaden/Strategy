using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SpaceStrategy.GameModel
{
    public class AtackObject
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int CountRocket { get; set; }
        public double Armor { get; set; }

       public int TargetPlanetIndex { get; set; }

        public DateTime ScoutingTime { get; set; }

    }
}
