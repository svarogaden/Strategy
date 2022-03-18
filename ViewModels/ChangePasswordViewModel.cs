using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace SpaceStrategy.ViewModels
{
   

    public class ChangePasswordViewModel
    {
      

        [Required(ErrorMessage = "Не указан новый пароль")]
        [DataType(DataType.Password)]
        [StringLength(100, ErrorMessage = "Поле {0} должно иметь минимум {2} и максимум {1} символов.", MinimumLength = 8)]
        public string NewPassword { get; set; }


        [Required(ErrorMessage = "Не указан  старый пароль")]
        [DataType(DataType.Password)]
        [StringLength(100, ErrorMessage = "Поле {0} должно иметь минимум {2} и максимум {1} символов.", MinimumLength = 8)]
        public string OldPassword { get; set; }
    }








}
