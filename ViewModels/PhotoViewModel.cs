using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace SpaceStrategy.ViewModels
{
    public class PhotoViewModel
    {
        public string Id { get; set; }
        [Required(ErrorMessage = "Не выбран файл")]
        public IFormFile Avatar { get; set; }
    }
}
