using SlideFormApp.Interfaces;
using SlideFormApp.Models;
using System;
using System.IO;
using System.Text.Encodings.Web;
using System.Text.Json;

namespace SlideFormApp.Services
{
    // Service, which saves user object to the file
    public class SaveUserService : ISaveable
    {
        private static int userIdCounter = 0;

        public SaveUserService()
        {
            // Auto increments of user IDs
            userIdCounter++;
        }
        public void SaveUserToFile(User user)
        {
            // Assigning the ID to the user
            user.Id = userIdCounter;

            // Generates the new file name in OS default "My Documents" folder
            var newFile = Environment.GetFolderPath(Environment.SpecialFolder.MyDocuments) +
                $"//user_ID_{user.Id}.txt";

            // Enables polish signs and prettify txt format
            var options = new JsonSerializerOptions
            {
                Encoder = JavaScriptEncoder.UnsafeRelaxedJsonEscaping,
                WriteIndented = true
            };
            string jsonString = JsonSerializer.Serialize(user, options);

            File.WriteAllText(newFile, jsonString);
        }
    }
}
