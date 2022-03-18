using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace SpaceStrategy.ViewModels
{
    public class EditUserViewModel
    {
        [Required(ErrorMessage = "Не указано имя")]
        [StringLength(20, MinimumLength = 3, ErrorMessage = "Длина имени должна быть от 3 до 20 символов")]
        [RegularExpression(@"[А-Яа-яA-Za-z0-9-]{2,20}", ErrorMessage = "Имя должно состоять из кирилицы или латиницы")]
        [Display(Name = "Имя")]
        public string NameUser { get; set; }

        //public string Id { get; set; }

        [EmailAddress(ErrorMessage = "Некорректный адрес")]
        public string Email { get; set; }

        //[Required(ErrorMessage = "Укажите год рождения")]

        [RegularExpression(@"[0-9]{4,5}", ErrorMessage = "Недопустимый формат возраста")]

        //[RegularExpression(@"[0-9]*$", ErrorMessage = "Please enter a valid number ")]
        [Range(1900, 2100, ErrorMessage = "Недопустимый возраст")]
        [Display(Name = "Год рождения")]
        public int Year { get; set; }

    }
}
