using SlideFormApp.Models;

namespace SlideFormApp.Interfaces
{
    interface ISaveable
    {
        public void SaveUserToFile(User user);
    }
}
