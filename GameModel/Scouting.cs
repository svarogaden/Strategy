using Newtonsoft.Json;
using SpaceStrategy.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SpaceStrategy.GameModel
{
    public class Scouting   //Карты разведки
    {
        public int Id { get; set; }

        //[JsonIgnore]
        public UserPlanet UserPlanet { get; set; }

        //public int UserPlanetId { get; set; }

        public double Accuracy { get; set; }  //Точность разведки в процентах

      
        public DateTime ScanEnd { get; set; }


        public int Destination { get; set; }  //точка назначения

    }
}
