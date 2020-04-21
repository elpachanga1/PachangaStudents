using Microsoft.EntityFrameworkCore;

namespace StudentsAPI.Models
{
    public class StudentContext : DbContext
    {
        public DbSet<Student> Students { get; set; }

        public StudentContext()
        {
        }
        public StudentContext(DbContextOptions<StudentContext> options)
            : base(options)
        {
        }
    }
}