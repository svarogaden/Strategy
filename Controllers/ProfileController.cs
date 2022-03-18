using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using SpaceStrategy.Models;
using SpaceStrategy.Pantagination;
using SpaceStrategy.ViewModels;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace SpaceStrategy.Controllers
{

    [Authorize]
    public class ProfileController : Controller
    {
        private readonly UserManager<UserPlanet> _userManager;
        private readonly SignInManager<UserPlanet> _signInManager;
        private readonly ILogger<ProfileController> _logger;
        private readonly ApplicationContext db;



        public ProfileController(ApplicationContext context, UserManager<UserPlanet> userManager, SignInManager<UserPlanet> signInManager, ILogger<ProfileController> logger)
        {
            db = context;
            _userManager = userManager;
            _signInManager = signInManager;
            _logger = logger;
        }



        public async Task<IActionResult> Index()
        {
            UserPlanet userPersonal = await _userManager.GetUserAsync(User);
            if (userPersonal == null)
            {
                return NotFound();
            }
            else
            {
                if (User.IsInRole("admin"))
                {
                    Console.WriteLine(" Вы админ ");
                }
                else
                {
                    Console.WriteLine(" Вы обычный пользователь ");
                }


                UserViewModel userViewModel = new UserViewModel { Name = userPersonal.Name, Year = userPersonal.Year, Avatar = userPersonal.Avatar, Rating = userPersonal.Rating };
                return View(userViewModel);
            }


        }







        public async Task<IActionResult> Edit()
        {
            UserPlanet userPersonal = await _userManager.GetUserAsync(User);

            if (userPersonal == null)
            {
                return NotFound();
            }
            EditUserViewModel model = new EditUserViewModel { Email = userPersonal.Email, Year = userPersonal.Year, NameUser = userPersonal.Name };
            return View(model);
        }



        [HttpPost]
        public async Task<IActionResult> Edit(EditUserViewModel model)
        {
            // _logger.LogInformation("model.Year : " + model.Year);

            //if(model.Year<=0)
            //{
            //    ModelState.AddModelError(string.Empty, "Неверный формат возраста !");
            //    return View(model);
            //}



            if (ModelState.IsValid)
            {
                UserPlanet user = await _userManager.GetUserAsync(User);


                //User user = await _userManager.FindByIdAsync(model.Id);
                if (user != null)
                {
                    user.Email = model.Email;
                    user.UserName = model.Email;
                    user.Year = model.Year;
                    user.Name = model.NameUser;


                    var result = await _userManager.UpdateAsync(user);

                    if (result.Succeeded)
                    {
                        return RedirectToAction("Index");
                    }
                    else
                    {
                        foreach (var error in result.Errors)
                        {
                            if (error.Code == "DuplicateUserName")
                            {
                                ModelState.AddModelError(string.Empty, "Такой емаил уже есть !");
                            }
                            else
                            {
                                ModelState.AddModelError(string.Empty, error.Code);
                            }

                        }
                    }
                }
            }
            return View(model);


        }



        //Смена пароля

        public async Task<IActionResult> ChangePassword()
        {
            UserPlanet userPersonal = await _userManager.GetUserAsync(User);

            if (userPersonal == null)
            {
                return NotFound();
            }



            ChangePasswordViewModel model = new ChangePasswordViewModel { };
            return View(model);
        }


        [HttpPost]
        public async Task<IActionResult> ChangePassword(ChangePasswordViewModel model)
        {


            if (String.IsNullOrEmpty(model.NewPassword) || String.IsNullOrEmpty(model.OldPassword) || model.NewPassword.Length < 8 || model.OldPassword.Length < 8)
            {
                ModelState.AddModelError(string.Empty, "Пароль не может быть пустым или короче 8 символов");
            }
            else if (ModelState.IsValid)
            {
                UserPlanet userPersonal = await _userManager.GetUserAsync(User);
                Microsoft.AspNetCore.Identity.SignInResult resultChekOldPass = await _signInManager.CheckPasswordSignInAsync(userPersonal, model.OldPassword, false);

                if (!resultChekOldPass.Succeeded)
                {
                    ModelState.AddModelError(string.Empty, "Неправильно указан старый пароль");
                    return View(model);
                }




                if (userPersonal != null)
                {
                    var _passwordValidator = HttpContext.RequestServices.GetService(typeof(IPasswordValidator<UserPlanet>)) as IPasswordValidator<UserPlanet>;
                    var _passwordHasher = HttpContext.RequestServices.GetService(typeof(IPasswordHasher<UserPlanet>)) as IPasswordHasher<UserPlanet>;


                    IdentityResult result = await _passwordValidator.ValidateAsync(_userManager, userPersonal, model.NewPassword);


                    if (result.Succeeded)
                    {
                        userPersonal.PasswordHash = _passwordHasher.HashPassword(userPersonal, model.NewPassword);
                        await _userManager.UpdateAsync(userPersonal);
                        return RedirectToAction("Index");
                    }
                    else
                    {
                        foreach (var error in result.Errors)
                        {
                            ModelState.AddModelError(string.Empty, error.Description);
                        }
                    }
                }
                else
                {
                    ModelState.AddModelError(string.Empty, "Пользователь не найден");
                }
            }
            return View(model);
        }



        //Редактировать аватар

        public async Task<IActionResult> EditAvar()
        {
            UserPlanet userPersonal = await _userManager.GetUserAsync(User);
            if (userPersonal == null)
            {
                return NotFound();
                // return RedirectToAction("Index");
            }


            PhotoEditModels model = new PhotoEditModels { Id = userPersonal.Id, Avatar = userPersonal.Avatar };
            return View(model);
        }


        [HttpPost]
        public async Task<IActionResult> EditAvar(PhotoViewModel model)
        {
            UserPlanet user = null;

            if (ModelState.IsValid)
            {
                //user = await _userManager.FindByIdAsync(model.Id);

                user = await _userManager.GetUserAsync(User);
                if (user == null)
                {
                    //ModelState.AddModelError(string.Empty, "Такой пользователь не существует.");
                    //return RedirectToAction("Index");

                    return NotFound();
                }
                else
                {

                    using (var binaryReader = new BinaryReader(model.Avatar.OpenReadStream()))
                    {
                        byte[] imageData = binaryReader.ReadBytes((int)model.Avatar.Length);
                        bool checkFileType = PhotoCheck.GetImageFormat(imageData);


                        if (checkFileType)
                        {
                            user.Avatar = imageData;
                            IdentityResult result = await _userManager.UpdateAsync(user);
                        }
                        else
                        {
                            ModelState.AddModelError(string.Empty, "Некорректный формат файла.Только jpg");
                            // пишем на консоль информацию
                            // _logger.LogInformation("Некорректный формат файла.Только jpg", checkFileType);
                        }


                    }


                }

            }
            else
            {
                return RedirectToAction("Index");
                /// return View(new PhotoEditModels { Id = model.Id });
            }


            PhotoEditModels Editmodel = new PhotoEditModels { Id = user.Id, Avatar = user.Avatar };
            return View(Editmodel);



        }






       


        [Authorize(Roles = "admin")]
        public async Task<IActionResult> Members(string email, int page = 1)
        {
            int pageSize = 3;   // количество элементов на странице
                                //  List<User> source = await _userManager.Users.ToListAsync();

            UserPlanet userPersonal = await _userManager.GetUserAsync(User);
            if (userPersonal == null)
            {
                return RedirectToAction("Account", "Logout");
            }
            //

            Console.WriteLine("userPersonal.Id " + userPersonal.Id);  //ошибка


            //фильтрация
            IQueryable<UserPlanet> users = db.Users;
            //  List<User> source = await _userManager.Users.ToListAsync();



            if (!String.IsNullOrEmpty(email) && Regex.IsMatch(email.Trim(), @"^[0-9a-z@\.]{1,30}$", RegexOptions.IgnoreCase))
            {
                users = users.Where(b => b.Email.StartsWith(email.Trim()) && b.Id != userPersonal.Id);
            }
            else
            {
                users = users.Where(b => b.Id != userPersonal.Id);
            }

            users = users.OrderBy(s => s.Year);




            if (users == null)
            {
                Console.WriteLine("users NULL");
            }


            // пагинация
            int count = await users.CountAsync();
            List<UserPlanet> items = await users.Skip((page - 1) * pageSize).Take(pageSize).ToListAsync();




            PageViewModel pageViewModel = new PageViewModel(count, page, pageSize, email);
            IndexViewModelUser viewModel = new IndexViewModelUser
            {
                PageViewModel = pageViewModel,
                Users = items
            };
            return View(viewModel);
        }




        public async Task<IActionResult> UserProfile(string id)
        {

            UserPlanet userPersonal = await _userManager.FindByIdAsync(id);
            if (userPersonal == null)
            {
                return RedirectToAction("Index");
            }
            else
            {
                UserViewModel userViewModel = new UserViewModel { Name = userPersonal.Name, Year = userPersonal.Year, Avatar = userPersonal.Avatar, Rating = userPersonal.Rating };
                return View(userViewModel);
            }

        }






        [HttpPost]
        public async Task<IActionResult> Delete(string id)
        {
            UserPlanet userPlanet = await db.Users.Where(x => x.Id == id).Include(x => x.Buildings)
                .Include(x => x.Researches)
                .Include(x => x.Rockets)
                .Include(x => x.Scoutings)
                .FirstOrDefaultAsync();




            //UserPlanet userPlanet = await _userManager.FindByIdAsync(id);

            if (userPlanet != null)
            {
                IdentityResult result = await _userManager.DeleteAsync(userPlanet);
                Console.WriteLine(result);
            }
            else
            {
                Console.WriteLine("Такого пользователя нет!");

            }


            /*IdentityRole role =*/
            //if (role != null)
            //{
            //    IdentityResult result = await _roleManager.DeleteAsync(role);
            //}
            return RedirectToAction("Index");
        }









    }














}
