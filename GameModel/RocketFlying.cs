using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SpaceStrategy.GameModel
{
    public class RocketFlying
    {
        public string LancherId { get; set; }

        public string AtackedId { get; set; }


        public TypeRocket Type { get; set; }

        public DateTime TimeHit { get; set; }
         
        public int TargetId { get; set; }

        public int GalaxyId { get; set; }

        public int  TargetPlanetIndex { get; set; }
        public double Accuracy { get; set; }  //Точность 

        public double Speed { get; set; }

        public int  Damage { get; set; }



}
}
