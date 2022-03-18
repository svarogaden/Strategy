using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace SpaceStrategy.ViewModels
{
    public class PhotoEditModels
    {
        public string Id { get; set; }
        [Required]
        public byte[] Avatar { get; set; }

    }

    





}
