using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
//using System.Numerics;
using System.Threading.Tasks;
//using AspNetCore.Identity.Mongo.Model;
using Microsoft.AspNetCore.Identity;
using Newtonsoft.Json;
using SpaceStrategy.GameModel;
//using MongoDB.Bson;


namespace SpaceStrategy.Models
{
    public class UserPlanet : IdentityUser
    {

       
        public string Name { get; set; }

     
        public string LastName { get; set; }

      
        public int Year { get; set; }


        public double Rating { get; set; }


        public DateTime? Birthdate { get; set; }

     
        public byte[] Avatar { get; set; }

        //[JsonIgnore]
        public IPAddress IpAdress { get; set; }

        public Galaxy Galaxy { get; set; }



        //public int GalaxyId { get; set; }


        public int IndexPlanet { get; set; }

        public List<Building> Buildings { get; set; }

        public List<Scouting> Scoutings { get; set; } = new List<Scouting>();

        public List<Research> Researches { get; set; } = new List<Research>();

        public List<Rocket> Rockets { get; set; } = new List<Rocket>();



        public double Metall { get; set; }
        public double Gas { get; set; }
        public double Uran { get; set; }



        public UserPlanet()
        {
            Buildings = new List<Building>();
        }









    }





}
