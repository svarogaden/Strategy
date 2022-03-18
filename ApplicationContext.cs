using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SpaceStrategy.Models;
using SpaceStrategy.GameModel;

namespace SpaceStrategy
{

    public class ApplicationContext : IdentityDbContext<UserPlanet>
    {
        public DbSet<Galaxy> Galaxies { get; set; }
        public DbSet<Building> Buildings { get; set; }

        public DbSet<Scouting> Scoutings { get; set; }

        public DbSet<Research> Researchs { get; set; }

        public DbSet<Rocket> Rockets { get; set; }




        //Rocket
        //Planet
        //Galaxy

        //Tactic
        //public DbSet<Tactic> Tactics { get; set; }


        //public DbSet<Game> Games { get; set; }

        //public DbSet<Side> Sides { get; set; }



        //
        public ApplicationContext(DbContextOptions<ApplicationContext> options)
            : base(options)
        {
            //Database.EnsureDeleted();
            Database.EnsureCreated();
            // Database.Migrate();
        }



        //protected override void OnModelCreating(ModelBuilder modelBuilder)
        //{
        //    modelBuilder.Entity<Message>().HasIndex(u => new { u.IdSender, u.IdRecipient }).IsUnique(); 
        //}




    }













}
