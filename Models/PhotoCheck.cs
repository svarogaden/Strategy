using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SpaceStrategy.Models
{
    public class PhotoCheck
    {

       
        public static bool GetImageFormat(byte[] bytes)
        {
            // see http://www.mikekunz.com/image_file_header.html  
            var bmp = Encoding.ASCII.GetBytes("BM");     // BMP
            var gif = Encoding.ASCII.GetBytes("GIF");    // GIF
            var png = new byte[] { 137, 80, 78, 71 };    // PNG
            var tiff = new byte[] { 73, 73, 42 };         // TIFF
            var tiff2 = new byte[] { 77, 77, 42 };         // TIFF
            var jpeg = new byte[] { 255, 216, 255, 224 }; // jpeg
            var jpeg2 = new byte[] { 255, 216, 255, 225 }; // jpeg canon



            //Когда файл JPG использует JFIF или EXIF, подпись отличается: Raw: FF D8 FF DB;   JFIF: FF D8 FF E0; EXIF: FF D8 FF E1

            var Raw = new byte[] { 0xFF, 0xD8, 0xFF, 0xDB };
            var JFIF = new byte[] { 0xFF, 0xD8, 0xFF, 0xE0 };
            var EXIF = new byte[] { 0xFF, 0xD8, 0xFF, 0xE1 };


            if (bmp.SequenceEqual(bytes.Take(bmp.Length)))
                //return ImageFormat.bmp;
                return true;

            if (gif.SequenceEqual(bytes.Take(gif.Length)))
                //return ImageFormat.gif;
                return true;

            if (png.SequenceEqual(bytes.Take(png.Length)))
                //return ImageFormat.png;
                return true;

            if (tiff.SequenceEqual(bytes.Take(tiff.Length)))
                //return ImageFormat.tiff;
                return true;

            if (tiff2.SequenceEqual(bytes.Take(tiff2.Length)))
                //return ImageFormat.tiff;
                return true;

            if (jpeg.SequenceEqual(bytes.Take(jpeg.Length)))
                //return ImageFormat.jpeg;
                return true;

            if (jpeg2.SequenceEqual(bytes.Take(jpeg2.Length)))
                //return ImageFormat.jpeg;
                return true;


            //

            if (Raw.SequenceEqual(bytes.Take(Raw.Length)))
                //return ImageFormat.jpeg;
                return true;



            if (JFIF.SequenceEqual(bytes.Take(JFIF.Length)))
                //return ImageFormat.jpeg;
                return true;

            if (EXIF.SequenceEqual(bytes.Take(EXIF.Length)))
                //return ImageFormat.jpeg;
                return true;





            //return ImageFormat.unknown;
            return false;
        }





    }
}
