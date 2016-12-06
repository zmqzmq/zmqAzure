using System;
using System.ComponentModel.DataAnnotations;

namespace zmqAzure.Models
{
    public class MathRecord
    {
        public int MathRecordID { get; set; }

        public string UserMail { get; set; }

        [DataType(DataType.DateTime)]
        public DateTime SessionStart { get; set; }

        public string QuesString { get; set; }

        public int TimeSpendInSecond { get; set; }
    }
}
