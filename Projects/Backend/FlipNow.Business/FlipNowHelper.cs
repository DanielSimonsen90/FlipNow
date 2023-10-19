namespace FlipNow.Business;

public static class FlipNowHelper
{
    public static string EnsureSlash(string value, bool start) =>
        start
            ? value.StartsWith('/') ? value : $"/{value}"
            : value.EndsWith('/') ? value : $"{value}/";
}
