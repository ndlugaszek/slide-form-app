using SlideFormApp.Models;
using System;
using System.IO;
using System.Text;
using System.Text.Encodings.Web;
using System.Text.Json;

namespace SlideFormApp.Services
{
    // Service, which saves user object to the file
    public static class SaveUserService
    {
        private static int userCounter = 0;
        public static void SaveUserToFile(User user)
        {
            // Auto increments of user IDs
            user.Id = userCounter;

            // Counter of created users
            userCounter++;

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
