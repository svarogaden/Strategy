using MongoDB.Bson;
using SpaceStrategy.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SpaceStrategy.GameModel
{
    public class Galaxy
    {

        public int Id { get; set; }

        public string Name { get; set; }

        public int Count { get; set; }

        public List<UserPlanet> UserPlanets { get; set; } = new List<UserPlanet>();

       


    }
}
