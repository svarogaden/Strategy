using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SpaceStrategy.Models;
using SpaceStrategy.Pantagination;
using SpaceStrategy.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace SpaceStrategy.Controllers
{

    [Authorize(Roles = "admin")]
    public class RolesController : Controller
    {
        RoleManager<IdentityRole> _roleManager;
        UserManager<UserPlanet> _userManager;
        public RolesController(RoleManager<IdentityRole> roleManager, UserManager<UserPlanet> userManager)
        {
            _roleManager = roleManager;
            _userManager = userManager;
        }




        public async Task<IActionResult> Index() => View(await _roleManager.Roles.ToListAsync());


        public IActionResult Create() => View();
        [HttpPost]
        public async Task<IActionResult> Create(string name)
        {
            if (!string.IsNullOrEmpty(name) && Regex.IsMatch(name.Trim(), @"^[0-9a-z@\.]{1,30}$", RegexOptions.IgnoreCase))
            {
                // получаем все роли
                List<IdentityRole> allRoles = _roleManager.Roles.ToList();
                bool checkRole = allRoles.Exists(x => x.Name == name);

                if (checkRole)
                {
                    ModelState.AddModelError("", "Такая роль уже существует!");
                    return View();
                }

                IdentityResult result = await _roleManager.CreateAsync(new IdentityRole(name));
                if (result.Succeeded)
                {
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
            return View(name);
        }





        //public async Task<IActionResult> UserList() => View(await _userManager.Users.ToListAsync());



        public async Task<IActionResult> UserList(string email, int page = 1)
        {
            int pageSize = 3;   // количество элементов на странице

            List<UserPlanet> source = null;





            if (!String.IsNullOrEmpty(email) && Regex.IsMatch(email.Trim(), @"^[0-9a-z@\.]{1,30}$", RegexOptions.IgnoreCase))
            {
                source = await _userManager.Users.Where(b => b.Email.StartsWith(email.Trim())).ToListAsync();
            }
            else
            {
                source = await _userManager.Users.ToListAsync();
            }



            int count = source.Count();
            var items = source.Skip((page - 1) * pageSize).Take(pageSize).ToList();

            PageViewModel pageViewModel = new PageViewModel(count, page, pageSize, email);
            IndexViewModelUser viewModel = new IndexViewModelUser
            {
                PageViewModel = pageViewModel,
                Users = items
            };
            return View(viewModel);
        }







        public async Task<IActionResult> Edit(string userId)
        {
            // получаем пользователя
            UserPlanet user = await _userManager.FindByIdAsync(userId);
            if (user != null)
            {
                // получем список ролей пользователя
                var userRoles = await _userManager.GetRolesAsync(user);
                var allRoles = _roleManager.Roles.ToList();
                ChangeRoleViewModel model = new ChangeRoleViewModel
                {
                    UserId = user.Id,
                    UserEmail = user.Email,
                    UserRoles = userRoles,
                    AllRoles = allRoles
                };
                return View(model);
            }

            return NotFound();
        }
        [HttpPost]
        public async Task<IActionResult> Edit(string userId, List<string> roles)
        {
            // получаем пользователя
            UserPlanet user = await _userManager.FindByIdAsync(userId);
            if (user != null)
            {
                // получем список ролей пользователя
                var userRoles = await _userManager.GetRolesAsync(user);
                // получаем все роли
                List<IdentityRole> allRoles = _roleManager.Roles.ToList();


                // получаем список ролей, которые были добавлены
                var addedRoles = roles.Except(userRoles);
                // получаем роли, которые были удалены
                var removedRoles = userRoles.Except(roles);

                await _userManager.AddToRolesAsync(user, addedRoles);


                await _userManager.RemoveFromRolesAsync(user, removedRoles);

                return RedirectToAction("UserList");
            }

            return NotFound();
        }

        [HttpPost]
        public async Task<IActionResult> Delete(string id)
        {
            IdentityRole role = await _roleManager.FindByIdAsync(id);
            if (role != null)
            {
                IdentityResult result = await _roleManager.DeleteAsync(role);
            }
            return RedirectToAction("Index");
        }
















    }










}
