using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Numerics;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using SpaceStrategy.Models;

namespace SpaceStrategy.GameModel
{
    public class GameLoop : IHostedService, IDisposable
    {
        public readonly static ConcurrentDictionary<Guid, RocketFlying> RocketsFly = new ConcurrentDictionary<Guid, RocketFlying>();
        //public  readonly static ConcurrentDictionary<string, IClientProxy> Connections = new ConcurrentDictionary<string, IClientProxy>();



        //private int executionCount = 0;
        private readonly ILogger<GameLoop> _logger;
        private Timer _timer;


        IHubContext<ChatHub> hubContext;
        ApplicationContext db;

        private readonly IServiceScope scope;





        public GameLoop(IHubContext<ChatHub> hubContext, ILogger<GameLoop> logger, IServiceScopeFactory scopeFactory)
        {
            _logger = logger;
            this.hubContext = hubContext;


            scope = scopeFactory.CreateScope();
            IServiceProvider services = scope.ServiceProvider;
            db = services.GetRequiredService<ApplicationContext>();


        }

        public Task StartAsync(CancellationToken stoppingToken)
        {
            //_logger.LogInformation("Timed Hosted Service running.");

           // _timer = new Timer(DoWork, null, TimeSpan.Zero, TimeSpan.FromMilliseconds(30));
            _timer = new Timer(DoWork, null, TimeSpan.Zero, TimeSpan.FromMinutes(1));

            return Task.CompletedTask;
        }




      


        private  async void  DoWork(object state)
        {
            //var count = Interlocked.Increment(ref executionCount);
            ////_logger.LogInformation("Timed Hosted Service is working. Count: {Count}", count);
            //ParallelLoopResult result = Parallel.ForEach(RocketsFly, EngineTimeAsync);


            foreach(KeyValuePair<Guid, RocketFlying> Rocket in RocketsFly)
            {
                //


                if (Rocket.Value.TimeHit <= DateTime.UtcNow)
                {

                    Building enemybuild = await db.Buildings.Where(x => x.Id == Rocket.Value.TargetId).OrderBy(x => x.Id)
                                                 .FirstOrDefaultAsync();
                 
                    enemybuild.Armor -= Rocket.Value.Damage;
                    await db.SaveChangesAsync();




                    _logger.LogInformation("RocketHit : " + Rocket.Value.TimeHit);
                    _logger.LogInformation("BuidHit : " + Rocket.Value.TargetId);
                    _logger.LogInformation("Buid Ammor After: " + Rocket.Value.TargetId);


                    /* string jsongame = JsonConvert.SerializeObject(Rocket.Value); */ //Сериализация игрового остояния   
                                                                                       //rocketFlying.LancherId

                    //await hubContext.Clients.Group(Rocket.Value.GalaxyId.ToString()).SendAsync("NucliarHitNotify", Rocket.Value.TargetPlanetIndex);

                    await hubContext.Clients.Group(Rocket.Value.LancherId).SendAsync("NucliarHitNotify", Rocket.Value.TargetPlanetIndex);
                    await hubContext.Clients.Group(Rocket.Value.AtackedId).SendAsync("RefreshNotify");


                    
                    while (!RocketsFly.TryRemove(Rocket)) ;

                }
                else
                {
                    _logger.LogInformation("Fly : " + Rocket.Value.TimeHit);
                }





                //


            }







        }



        //public async void EngineTimeAsync(KeyValuePair<Guid, RocketFlying> Rocket)
        //{
           

        //    if(Rocket.Value.TimeHit<=DateTime.UtcNow)
        //    {

        //        Building enemybuild = await db.Buildings.Where(x => x.Id == Rocket.Value.TargetId).OrderBy(x => x.Id)
        //                                     .FirstOrDefaultAsync();

        //        enemybuild.Armor -= Rocket.Value.Damage;
        //        enemybuild.HitDate = DateTime.UtcNow;

        //        await db.SaveChangesAsync();




        //        _logger.LogInformation("RocketHit : " + Rocket.Value.TimeHit);
        //        _logger.LogInformation("BuidHit : " + Rocket.Value.TargetId);
        //        _logger.LogInformation("Buid Ammor After: " + Rocket.Value.TargetId);


        //       /* string jsongame = JsonConvert.SerializeObject(Rocket.Value); */ //Сериализация игрового остояния   
        //        await hubContext.Clients.Group(Rocket.Value.GalaxyId.ToString()).SendAsync("NucliarHitNotify", Rocket.Value.TargetPlanetIndex);
        //        while (!RocketsFly.TryRemove(Rocket)) ;

        //    }
        //    else
        //    {
        //        _logger.LogInformation("Fly : " + Rocket.Value.TimeHit);
        //    }



           
        //}









        public Task StopAsync(CancellationToken stoppingToken)
        {
            _logger.LogInformation("Timed Hosted Service is stopping.");

            _timer?.Change(Timeout.Infinite, 0);

            return Task.CompletedTask;
        }

        public void Dispose()
        {
            _timer?.Dispose();
            GC.SuppressFinalize(this);
        }















    }
}
