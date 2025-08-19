using Newtonsoft.Json;

namespace dcucountdown.ViewModel
{
    public class DCUProjectViewModel
    {
        [JsonProperty("slug")]
        public string Slug { get; set; }
        [JsonProperty("title")]
        public string Title { get; set; }
        [JsonProperty("type")]
        public string Type { get; set; }
        [JsonProperty("chapter")]
        public string Chapter { get; set; }
        [JsonProperty("status")]
        public string Status { get; set; }
        [JsonProperty("image")]
        public string Image { get; set; }
        [JsonProperty("release")]
        public ReleaseDates Release { get; set; }
        [JsonProperty("links")]
        public IDictionary<string, string>? Links { get; set; }
        [JsonProperty("sources")]
        public IList<string>? Sources { get; set; }
    }
}
