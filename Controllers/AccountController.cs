using System;
using System.Collections.Generic;
using System.Linq;
using System.Numerics;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using SpaceStrategy.GameModel;
using SpaceStrategy.Models;
using Microsoft.AspNetCore.Authorization;
using System.Net;
using SpaceStrategy.ViewModels;
using SpaceStrategy;
using Microsoft.EntityFrameworkCore;

namespace WebIdentyMongo.Controllers
{



     public class AccountController : Controller
    {
        private readonly UserManager<UserPlanet> _userManager;
        private readonly SignInManager<UserPlanet> _signInManager;
        readonly ILogger<AccountController> _logger;
        private readonly ApplicationContext db;


        public AccountController( UserManager<UserPlanet> userManager, SignInManager<UserPlanet> signInManager, ILogger<AccountController> logger, ApplicationContext context)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            db = context;

            _logger = logger;
        }



       



        public async Task<ActionResult> Index()
        {
            return await Task.Run<ActionResult>(() =>
            {
                //User user = await _userManager.GetUserAsync(User);
                return View();

             });

        }



        [HttpGet]
        public IActionResult Register()
        {
            return View();
        }


        [HttpPost]
        public async Task<IActionResult> Register(RegisterViewModel model)
        {
            if (ModelState.IsValid)
            {


                //на локальном всегда ::1
                IPAddress remoteIpAddress = Request.HttpContext.Connection.RemoteIpAddress;
             


                UserPlanet userPlanet = new() { Email = model.Email, UserName = model.Email, Year = model.Year ,Name=model.Name , IpAdress  = remoteIpAddress };
                // добавляем пользователя
                IdentityResult result = await _userManager.CreateAsync(userPlanet, model.Password);
                if (result.Succeeded)
                {

                    GameInicialize gameInicialize = new GameInicialize();
                    await gameInicialize.Initialize(userPlanet, db);



                    //galaxy.UserPlanets.Add(userPlanet);
                    await db.SaveChangesAsync();


                    // установка куки
                    await _signInManager.SignInAsync(userPlanet, false);
                    return RedirectToAction("Index", "Home");
                }
                else
                {
                    foreach (var error in result.Errors)
                    {
                       // _logger.LogInformation(error.Code);

                        if (error.Code == "DuplicateUserName")
                        {
                            ModelState.AddModelError(string.Empty, "Такой емаил уже есть !");
                        }
                        else
                        {
                            ModelState.AddModelError(string.Empty, error.Description);
                        }
                    }




                }
            }
            return View(model);
        }




        [HttpGet]
        public IActionResult Login(string returnUrl = null)
        {
            return View(new LoginViewModel { ReturnUrl = returnUrl });
        }




        [HttpGet]
        public IActionResult Lockout()
        {
            return View();
        }











        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Login(LoginViewModel model)
        {
            if (ModelState.IsValid)
            {
                 Microsoft.AspNetCore.Identity.SignInResult result = await _signInManager.PasswordSignInAsync(model.Email, model.Password, model.RememberMe, true);
                _logger.LogInformation(result.ToString());



                if (result.Succeeded)
                {
                   


                    return RedirectToAction("Index", "Home");              
                }
               else if (result.IsLockedOut)
               {
                   
                    return RedirectToAction("Lockout", "Account");
                }
                else
                {
                   
                    ModelState.AddModelError("", "Неправильный логин и (или) пароль");
                }
            }
            return View(model);

          
        }




        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Logout()
        {
            // удаляем аутентификационные куки
            await _signInManager.SignOutAsync();
            return RedirectToAction("Index", "Home");
        }



        [HttpGet]
        public IActionResult AccessDenied()
        {
            return View(new LoginViewModel { /*ReturnUrl = returnUrl*/ });

        }




        //Забили пароль



        [HttpGet]
        [AllowAnonymous]
        public IActionResult ForgotPassword()
        {
            return View();
        }
        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> ForgotPassword(ForgotPasswordViewModel model)
        {
           
                    
            if (ModelState.IsValid)
            {

                var user = await _userManager.FindByEmailAsync(model.Email);
                if (user == null /*|| !(await _userManager.IsEmailConfirmedAsync(user))*/    )
                {
                    // пользователь с данным email может отсутствовать в бд
                    // тем не менее мы выводим стандартное сообщение, чтобы скрыть 
                    // наличие или отсутствие пользователя в бд
                    return View("ForgotPasswordConfirmation");
                }


                string code = await _userManager.GeneratePasswordResetTokenAsync(user);
                string callbackUrl = Url.Action("ResetPassword", "Account", new { userId = user.Id, code = code }, protocol: HttpContext.Request.Scheme);
                ////EmailService emailService = new();


                //await emailService.SendEmailAsync(model.Email, "Reset Password", $"Для сброса пароля пройдите по ссылке: <a href='{callbackUrl}'>link</a>");


                return View("ForgotPasswordConfirmation");

            }              
               
            return View(model);
        }




        [HttpGet]
        [AllowAnonymous]
        public IActionResult ResetPassword(string code = null)
        {
            return code == null ? View("Error") : View();
        }

        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> ResetPassword(ResetPasswordViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return View(model);
            }
            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user == null)
            {
                return View("ResetPasswordConfirmation");
            }
            var result = await _userManager.ResetPasswordAsync(user, model.Code, model.Password);
            if (result.Succeeded)
            {
                return View("ResetPasswordConfirmation");
            }
            foreach (var error in result.Errors)
            {
                ModelState.AddModelError(string.Empty, error.Description);
            }
            return View(model);
        }






    }



}
