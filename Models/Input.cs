using System;
using System.Collections.Generic;
using System.Linq;
using System.Numerics;
using System.Threading.Tasks;

namespace SpaceStrategy.Models
{
    public struct Input
    {
        public long Id { get; set; }
        public bool RightPressed { get; set; }
        public bool LeftPressed { get; set; }
        public bool UpPressed { get; set; }
        public bool DownPressed { get; set; }



    }


    public struct RotateTower
    {
        public long Id { get; set; }
        public bool RightRotate { get; set; }
        public bool LeftRotate { get; set; }

        public int WheelBlock { get; set; }

        public DateTime LastCommand { get; set; }


    }

    public struct FireTarget
    {
        public long Id { get; set; }

        //Direction
        public float X { get; set; }
        public float Y { get; set; }
        public float Z { get; set; }



        // public Vector3 DirectionFire { get; set; }

        public string TargetId { get; set; }

    }


    //public class Perimeter
    //{
    //    public Vector3 pointForward { get; set; }
    //    public Vector3 pointBackward { get; set; }

    //    public Perimeter(Vector3 pointCenter)
    //    {
    //        float centerRound = 22;
    //        pointForward = new Vector3(pointCenter.X,  0, (pointCenter.Z - centerRound));
    //        pointForward = new Vector3(pointCenter.X , 0, (pointCenter.Z + centerRound));
    //    }


    //    public void Collision()
    //    {

    //    }





    //}





    //public class Perimeter
    //{
    //    public Vector3 pointUpLeft { get; set; }
    //    public Vector3 pointUpRight { get; set; }
    //    public Vector3 pointDownLeft { get; set; }
    //    public Vector3 pointDownRight { get; set; }


    //    public Perimeter(Vector3 pointCenter)
    //    {
    //        pointUpLeft = new Vector3((pointCenter.X - 25), 0, (pointCenter.Z - 45));
    //        pointUpRight = new Vector3((pointCenter.X + 25), 0, (pointCenter.Z - 45));
    //        pointDownLeft = new Vector3((pointCenter.X - 25), 0, (pointCenter.Z + 45));
    //        pointDownRight = new Vector3((pointCenter.X + 25), 0, (pointCenter.Z + 45));


    //        //Console.WriteLine(Vector3.Distance(pointCenter, pointUpLeft));
    //        //Console.WriteLine(Vector3.Distance(pointCenter, pointUpRight));
    //        //Console.WriteLine(Vector3.Distance(pointCenter, pointDownLeft));
    //        //Console.WriteLine(Vector3.Distance(pointCenter, pointDownRight));


    //        //Console.WriteLine("pointUpLeft");
    //        //Console.WriteLine( pointUpLeft);
    //        //Console.WriteLine("pointUpRight");
    //        //Console.WriteLine( pointUpRight);
    //        //Console.WriteLine("pointDownLeft");
    //        //Console.WriteLine( pointDownLeft);
    //        //Console.WriteLine("pointDownRight");
    //        //Console.WriteLine( pointDownRight);
    //        //Console.WriteLine("=======");



    //    }


    //    public void ChangePerimeter(Vector3 distance)
    //    {
    //        pointUpLeft = Vector3.Add(pointUpLeft, distance);
    //        pointUpRight = Vector3.Add(pointUpRight, distance);
    //        pointDownLeft = Vector3.Add(pointDownLeft, distance);
    //        pointDownRight = Vector3.Add(pointDownRight, distance);


    //        //Console.WriteLine("pointUpLeft");
    //        //Console.WriteLine(pointUpLeft);
    //        //Console.WriteLine("pointUpRight");
    //        //Console.WriteLine(pointUpRight);
    //        //Console.WriteLine("pointDownLeft");
    //        //Console.WriteLine(pointDownLeft);
    //        //Console.WriteLine("pointDownRight");
    //        //Console.WriteLine(pointDownRight);


    //        //Console.WriteLine("==================================");


    //    }





    //}





}
