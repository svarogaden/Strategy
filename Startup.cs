using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AspNetCore.Identity.Mongo;
using AspNetCore.Identity.Mongo.Model;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.StaticFiles;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using MongoDB.Driver;
using SpaceStrategy.GameModel;
using SpaceStrategy.Models;








namespace SpaceStrategy
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddHostedService<GameLoop>();
            services.AddSignalR();





            //ограничить число попыток ввода пароля 
            services.Configure<IdentityOptions>(options =>
            {
                options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(3);
                options.Lockout.MaxFailedAccessAttempts = 3;

            });


            services.AddIdentity<UserPlanet, IdentityRole>(opts => {
                opts.Password.RequiredLength = 8;   // минимальная длина
                opts.Password.RequireNonAlphanumeric = false;   // требуются ли не алфавитно-цифровые символы
                opts.Password.RequireLowercase = false; // требуются ли символы в нижнем регистре
                opts.Password.RequireUppercase = false; // требуются ли символы в верхнем регистре
                opts.Password.RequireDigit = false; // требуются ли цифры

            })
        .AddEntityFrameworkStores<ApplicationContext>()
        .AddDefaultTokenProviders();


            //NuclearWar

            //Компьютер
            string connection = "Data Source=DESKTOP-GU1MDBK;Initial Catalog=NuclearWar;Persist Security Info=True;User ID=necromant;Password=Reddeath1920;";


            //string connection = "Data Source=WINSERV2016;Initial Catalog=GamerTester;Persist Security Info=True;User ID=Temnozor;Password=Reddeath1920;";








            //server chess
            //   string connection = "Data Source=WIN-J9D866ESIJ2;Initial Catalog=NuclearWar;Persist Security Info=True;User ID=necromant;Password=Reddeath1920;";

            // string connection = "Data Source=WIN-J9D866ESIJ2;Initial Catalog=ChessBase;Persist Security Info=True;User ID=necromant;Password=Reddeath1920;";


            //Noutbook chess
            //  string connection = "Data Source=DESKTOP-M68UNDT;Initial Catalog=Chess;Persist Security Info=True;User ID=necromant;Password=Reddeath1920;";



            services.AddDbContext<ApplicationContext>(options => options.UseSqlServer(connection));




            // This is required to ensure server can identify user after login
            services.ConfigureApplicationCookie(options =>
            {
                // Cookie settings
                options.Cookie.HttpOnly = true;
               // options.ExpireTimeSpan = TimeSpan.FromMinutes(5);

                options.LoginPath = "/Account/Login";
                options.AccessDeniedPath = "/Account/AccessDenied";
                options.SlidingExpiration = true;
            });


           

            services.Configure<FormOptions>(options =>
            {
                // Set the limit to 256 MB ,максимальный размер файла
                options.MultipartBodyLengthLimit = 268435456;

            });



            //количество ошибок 
            services.AddMvc(options => options.MaxModelValidationErrors = 50);





            services.AddControllersWithViews();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            FileExtensionContentTypeProvider provider = new();
            provider.Mappings[".obj"] = "text/plain";
            provider.Mappings[".mp3"] = "audio/mpeg";




            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }
            app.UseHttpsRedirection();
           

            app.UseStaticFiles(

               new StaticFileOptions
               {
                   ContentTypeProvider = provider
               }

            );




            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();



            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Home}/{action=Index}/{id?}");
            });



            app.UseEndpoints(endpoints =>
            {
                endpoints.MapHub<ChatHub>("/game");
            });







        }
    }
}
