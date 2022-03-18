using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SpaceStrategy.ViewModels
{
    public class UserViewModel
    {
        public string Id { get; set; }
        public int Year { get; set; }

        public string Name { get; set; }

        public double Rating { get; set; }


        public byte[] Avatar { get; set; }

        //public GameSetting GameSetting { get; set; }

    }
}
