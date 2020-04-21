using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using StudentsAPI.Models;

namespace StudentsAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StudentController : ControllerBase
    {
        private readonly StudentContext _context;
        public StudentController(StudentContext context)
        {
            _context = context;
        }

        // GET: api/GetStudents
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Student>>> GetStudents()
        {
            return await _context.Students.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Student>> GetStudents(int id)
        {
            var student = await _context.Students.FindAsync(id);

            if (student == null) return NotFound();

            return student;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateStudent(int id, Student newStudent)
        {
            if (id != newStudent.Id) return BadRequest();

            Student student = await _context.Students.FindAsync(id);

            if (student == null) return NotFound();

            if (student.Age != null || student.Age > 0) student.Age = newStudent.Age;
            if (!string.IsNullOrEmpty(student.Career)) student.Career = newStudent.Career;
            if (!string.IsNullOrEmpty(student.FirstName)) student.FirstName = newStudent.FirstName;
            if (!string.IsNullOrEmpty(student.LastName)) student.LastName = newStudent.LastName;
            if (!string.IsNullOrEmpty(student.Username)) student.Username = newStudent.Username;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException) when (!StudentExists(id))
            {
                return NotFound();
            }
            catch (DbUpdateException ex)
            {
                if (ex.InnerException != null && ex.InnerException.SqliteErrorCode == 19)
                    return Conflict("Username Already Exists");
            }

            return Accepted();
        }

        [HttpPost]
        public async Task<ActionResult<Student>> CreateStudent(Student newStudent)
        {
            _context.Students.Add(newStudent);
            await _context.SaveChangesAsync();

            return CreatedAtAction(
                nameof(GetStudents),
                new { id = newStudent.Id });
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStudent(int id)
        {
            var student = await _context.Students.FindAsync(id);

            if (student == null) return NotFound();

            _context.Students.Remove(student);
            await _context.SaveChangesAsync();

            return Accepted();
        }

        private bool StudentExists(long id) =>
             _context.Students.Any(e => e.Id == id);
    }
}