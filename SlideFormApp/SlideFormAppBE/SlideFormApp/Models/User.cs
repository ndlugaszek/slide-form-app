using System.ComponentModel.DataAnnotations;

namespace SlideFormApp.Models
{
    public class User
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Address { get; set; }
        public string UserGender { get; set; }
       
    }
}
