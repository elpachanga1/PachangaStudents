using System.ComponentModel.DataAnnotations;

namespace StudentsAPI.Models
{
    public class Student
    {
        [Key]
        public int Id { get; set; }
        [Required(ErrorMessage = "Username Required")]
        [StringLength(20, ErrorMessage = "Username length can't be more than 20.")]
        public string Username { get; set; }
        [Required(ErrorMessage = "FirstName Required")]
        [StringLength(20, ErrorMessage = "FirstName length can't be more than 20.")]
        public string FirstName { get; set; }
        [Required(ErrorMessage = "LastName Required")]
        [StringLength(20, ErrorMessage = "LastName length can't be more than 20.")]
        public string LastName { get; set; }
        [Required(ErrorMessage = "Age Required")]
        public int? Age { get; set; }
        [Required(ErrorMessage = "Career Required")]
        [StringLength(50, ErrorMessage = "Career length can't be more than 50.")]
        public string Career { get; set; }
    }
}