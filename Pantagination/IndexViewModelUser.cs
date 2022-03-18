using SpaceStrategy.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SpaceStrategy.Pantagination
{
    public class IndexViewModelUser
    {
        public IEnumerable<UserPlanet> Users { get; set; }
        public PageViewModel PageViewModel { get; set; }
    }
}
