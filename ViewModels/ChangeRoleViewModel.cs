using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AspNetCore.Identity.Mongo.Model;
using Microsoft.AspNetCore.Identity;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;



namespace SpaceStrategy.ViewModels
{

    public class ChangeRoleViewModel
    {
        public string UserId { get; set; }
        public string UserEmail { get; set; }
        public List<IdentityRole> AllRoles { get; set; }
        public IList<string> UserRoles { get; set; }
        public ChangeRoleViewModel()
        {
            AllRoles = new List<IdentityRole>();
            UserRoles = new List<string>();
        }
    }













    //public class ChangeRoleViewModel
    //{

    //    //[BsonRepresentation(BsonType.ObjectId)]
    //    //public string Id { get; set; }

    //    //[BsonId]
    //    //[BsonRepresentation(BsonType.ObjectId)]
    //    // public ObjectId Id { get; set; }

    //    public string Id { get; set; }

    //    public string UserEmail { get; set; }
    //    public List<MongoRole> AllRoles { get; set; }
    //    public IList<string> UserRoles { get; set; }
    //    public ChangeRoleViewModel()
    //    {
    //        AllRoles = new List<MongoRole>();
    //        UserRoles = new List<string>();
    //    }
    //}





}
