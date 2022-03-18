using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SpaceStrategy.GameModel
{
    public class EnemyBaseView
    {

        public int GalaxyId { get; set; }
        public int PlanetId { get; set; }


        public bool Atacked { get; set; }

        public double ScotchingInterval { get; set; }

        public List<BuildingEnemy> Buildings { get; set; }


        public EnemyBaseView()
        {
            Buildings = new List<BuildingEnemy>();
        }


    }



 
}
