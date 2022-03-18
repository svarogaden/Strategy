using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using SpaceStrategy.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SpaceStrategy.GameModel
{

  public  enum TypeRocket { Spy=1 , Strike, Intercept }




    //  Rocket rocketSpy = await db.Rockets.Where(x => x.UserPlanet.Id == Context.UserIdentifier && x.TimeHit > DateTime.UtcNow  && x.Type == TypeRocket.Spy &&  x.BuildEnd< DateTime.UtcNow).FirstOrDefaultAsync();

    [Index("UserPlanetId", "TimeHit", "Type", "BuildEnd"   /*, IsUnique = true, Name = "Phone_Index"*/)]

    public class Rocket
    {
        public int Id { get; set; }

        public UserPlanet UserPlanet { get; set; }


        public TypeRocket Type { get; set; }

        public DateTime BuildEnd { get; set; }

        public DateTime TimeHit { get; set; }

        public bool IsLanched { get; set; }


        //прокачивается исследованиями
        public double Damage { get; set; }
        public double Accuracy { get; set; }  //Точность 

        public double Speed { get; set; }


        public int TargetPlanet { get; set; }
        public int X { get; set; }
        public int Z { get; set; }




        //прокачивается исследованиями




    }
}
