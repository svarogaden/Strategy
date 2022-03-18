using Newtonsoft.Json;
using SpaceStrategy.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SpaceStrategy.GameModel
{

    public enum TypeResearch
    {
        Scouting = 1, Atack, Defence
    };





    public class Research
    {
        public int Id { get; set; }


        //[JsonIgnore]
       public UserPlanet UserPlanet { get; set; }
       //public int UserPlanetId { get; set; }


        public TypeResearch Type { get; set; }


        public string Name { get; set; }

        public int Level { get; set; }

        public DateTime BuildStart { get; set; }

        public DateTime BuildEnd { get; set; }



    }
}
