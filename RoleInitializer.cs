using Microsoft.AspNetCore.Identity;
using SpaceStrategy.GameModel;
using SpaceStrategy.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SpaceStrategy
{
    public class RoleInitializer
    {


        public static async Task InitializeAsync(UserManager<UserPlanet> userManager, RoleManager<IdentityRole> roleManager, ApplicationContext db)
        {
            string adminEmail = "admin@gmail.com";
            string password = "_Aa123456";
            if (await roleManager.FindByNameAsync("admin") == null)
            {
                await roleManager.CreateAsync(new IdentityRole("admin"));
            }
            if (await roleManager.FindByNameAsync("employee") == null)
            {
                await roleManager.CreateAsync(new IdentityRole("employee"));
            }
            if (await roleManager.FindByNameAsync("banned") == null)
            {
                await roleManager.CreateAsync(new IdentityRole("banned"));
            }
            if (await roleManager.FindByNameAsync("moder") == null)
            {
                await roleManager.CreateAsync(new IdentityRole("moder"));
            }



            if (await userManager.FindByNameAsync(adminEmail) == null)
            {

                UserPlanet admin = new UserPlanet { Email = adminEmail, UserName = adminEmail, Name = "Klaus", Year = 1991 };

                GameInicialize gameInicialize = new GameInicialize();
                await gameInicialize.Initialize(admin, db);


                IdentityResult result = await userManager.CreateAsync(admin, password);
                if (result.Succeeded)
                {
                    await userManager.AddToRoleAsync(admin, "admin");
                }
            }
        }

















    }
}
