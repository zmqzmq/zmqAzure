using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Concurrent;
using zmqAzure.Models;

namespace zmqAzure.Data
{
    public class DataRepository:IDataRepository
    {
        private static MathRecordContext _mathRecordContext;

        public DataRepository(MathRecordContext mathRecordContext)
        {
            _mathRecordContext = mathRecordContext;
        }

        public IEnumerable<MathRecord> GetMathRecords()
        {
            return _mathRecordContext.MathRecords;
        }

        public void Add(MathRecord mathRecord)
        {
            _mathRecordContext.MathRecords.Add(mathRecord);
            _mathRecordContext.SaveChanges();
         }

    }
}
