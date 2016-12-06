using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using zmqAzure.Data;
using zmqAzure.Models;

namespace zmqAzure.ApiControllers
{
    [Produces("application/json")]
    [Route("api/MathRecords")]
    public class MathRecordsController : Controller
    {
        private static IDataRepository _dataRepository { get; set; }

        public MathRecordsController(IDataRepository dataRepository)
        {

            _dataRepository = dataRepository;
        }

        [HttpGet]
        public IEnumerable<MathRecord> GetAll()
        {
            return _dataRepository.GetMathRecords();
        }

        [HttpGet("{userMail}")]
        public IEnumerable<MathRecord> GetAll(string userMail)
        {
            return (_dataRepository.GetMathRecords()).Where(record=>record.UserMail == userMail);
        }

        [HttpPost]
        public IActionResult Create([FromBody] MathRecord mathRecord)
        {
            if (mathRecord == null)
            {
                return BadRequest();
            }
            _dataRepository.Add(mathRecord);
            return Ok();
        }
    }
}