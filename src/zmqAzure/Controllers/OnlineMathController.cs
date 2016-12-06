using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using zmqAzure.Models;
using Microsoft.AspNetCore.Identity;
using zmqAzure.Data;

namespace zmqAzure.Controllers
{
    public class OnlineMathController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult GenerateMath()
        {
            return View();
        }

        public IActionResult MathRecords()
        {
            return View();
        }

    }
}