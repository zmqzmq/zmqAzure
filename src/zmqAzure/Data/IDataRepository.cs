using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using zmqAzure.Models;

namespace zmqAzure.Data
{
    public interface IDataRepository
    {
        void Add(MathRecord mathRecord);
        IEnumerable<MathRecord> GetMathRecords();
    }
}
