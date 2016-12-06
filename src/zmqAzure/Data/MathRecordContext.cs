using Microsoft.EntityFrameworkCore;
using zmqAzure.Models;

namespace zmqAzure.Data
{
    public class MathRecordContext : DbContext
    {
        public MathRecordContext(DbContextOptions<MathRecordContext> options) : base(options)
        {
        }
        public DbSet<MathRecord> MathRecords { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<MathRecord>().ToTable("MathRecord");
        }
    }
}
