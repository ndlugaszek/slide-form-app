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
        public User Create(User user)
        {
            SaveUserService save = new();
            save.SaveUserToFile(user);

            return user;
        }
    }
}
