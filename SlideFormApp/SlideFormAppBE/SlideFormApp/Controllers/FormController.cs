using Microsoft.AspNetCore.Mvc;
using SlideFormApp.Models;
using SlideFormApp.Services;

namespace SlideFormApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FormController : ControllerBase
    {

        // Receiving data in JSON with new user object and saving it in file
        [HttpPost]
        public IActionResult Create(User user)
        {
            // Checking that user has all fields filled
            if (user.FirstName == null)
            {
                return BadRequest("First name cannot be empty!");
            }
            else if (user.LastName == null)
            {
                return BadRequest("Last name cannot be empty!");
            }
            else if (user.Address == null)
            {
                return BadRequest("Address cannot be empty!");
            }
            else if (user.UserGender == null)
            {
                return BadRequest("Gender cannot be empty!");
            }

            // If each field is filled, then save the user to the file
            SaveUserService save = new();
            save.SaveUserToFile(user);

            return Ok(user);
        }
    }
}
