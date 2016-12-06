using System;
using System.Linq;
using zmqAzure.Models;

namespace zmqAzure.Data
{
    public class DbInitializer
    {
        public static void Initialize(MathRecordContext mathRecordContext)
        {
            mathRecordContext.Database.EnsureCreated();

            if (mathRecordContext.MathRecords.Any())
            {
                return;
            }

            var records = new MathRecord[]
            {
                new MathRecord {UserMail="a@a", SessionStart=DateTime.Now, QuesString="1+1=?", TimeSpendInSecond=2 },
                new MathRecord {UserMail="b@a", SessionStart=DateTime.Now, QuesString="1+1=?", TimeSpendInSecond=2 }
            };

            foreach(MathRecord record in records)
            {
                mathRecordContext.MathRecords.Add(record);
            }
            mathRecordContext.SaveChanges();
        }
    }
}
