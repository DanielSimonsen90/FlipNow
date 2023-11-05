using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

namespace FlipNow.DataAccess;

internal class FlipNowContextFactory : IDesignTimeDbContextFactory<FlipNowDbContext>
{
    public FlipNowDbContext CreateDbContext(string[] args)
    {
        IConfigurationRoot configuration = new ConfigurationBuilder()
            .SetBasePath(Directory.GetCurrentDirectory())
            .AddJsonFile("appsettings.json")
            .Build();

        var optionsBuilder = new DbContextOptionsBuilder<FlipNowDbContext>();
        optionsBuilder.UseSqlServer(configuration.GetConnectionString(
            "DefaultConnection"
            //"ReleaseConnection"
            ));

        return new FlipNowDbContext(optionsBuilder.Options);
    }
}
