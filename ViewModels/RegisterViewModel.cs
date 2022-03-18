using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace SpaceStrategy.ViewModels
{
    public class RegisterViewModel
    {

        [Required(ErrorMessage = "Не указано имя")]
        [StringLength(20, MinimumLength = 3, ErrorMessage = "Длина имени должна быть от 3 до 20 символов")]
        [RegularExpression(@"[А-Яа-яA-Za-z0-9-]{2,20}", ErrorMessage = "Имя должно состоять из кирилицы или латиницы")]
        [Display(Name = "Имя")]
        public string Name { get; set; }


        [EmailAddress(ErrorMessage = "Некорректный адрес")]
        [Required(ErrorMessage = "Укажите Email")]
        [Display(Name = "Email")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Укажите год рождения")]
        [Range(1900, 2100, ErrorMessage = "Недопустимый возраст")]
        [Display(Name = "Год рождения")]
        public int Year { get; set; }

        [Required]
        [DataType(DataType.Password)]
        [Display(Name = "Пароль")]
        public string Password { get; set; }

        [Required]
        [Compare("Password", ErrorMessage = "Пароли не совпадают")]
        [DataType(DataType.Password)]
        [Display(Name = "Подтвердить пароль")]
        public string PasswordConfirm { get; set; }
    }
}
