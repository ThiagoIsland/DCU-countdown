using System.IO;
using System.Text.Json;
using dcucountdown.ViewModel;

namespace dcucountdown.endpoints
{ 
    public static class DCUProjectsEndpoints
    {
        public static async void UseDCUProjectsEndpoints(this IEndpointRouteBuilder app) 
        {
           var projectsFile = Path.Combine(AppContext.BaseDirectory, "Data", "dcu-projects.json");
           var projects = JsonSerializer.Deserialize<List<DCUProjectViewModel>>(
               await File.ReadAllTextAsync(projectsFile),
                new JsonSerializerOptions { PropertyNameCaseInsensitive = true })!;
   

            Console.WriteLine($"JSON: {projects}");

            app.MapGet("/api/projects", () => projects);

            app.MapGet("/api/nextRelease", () =>
            {
                var nextProject = projects.Select(p => new
                {
                    Project = p,
                    NextDate = p.Release.Theatrical ?? p.Release.Streaming ?? p.Release.Pvod
                })
                .Where(p => p.NextDate != null && p.NextDate > DateTimeOffset.UtcNow)
                .OrderBy(p => p.NextDate)
                .FirstOrDefault();

                return nextProject is null ? Results.NotFound() : Results.Ok(nextProject);
            });

            app.MapGet("/api/lastRelease", () =>
            {
                var lastProject = projects.Select(p => new
                {
                    Project = p,
                    lastDate = p.Release.Theatrical ?? p.Release.Streaming ?? p.Release.Pvod
                })
                .Where(p => p.lastDate != null && p.lastDate < DateTimeOffset.UtcNow)
                .OrderBy(p => p.lastDate)
                .FirstOrDefault();

                return lastProject is null ? Results.NotFound() : Results.Ok(lastProject);
            });


        }

    }
}
