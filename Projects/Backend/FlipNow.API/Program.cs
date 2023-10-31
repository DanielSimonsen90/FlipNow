using FlipNow.Business.Hubs;
using FlipNow.Business.Services;
using FlipNow.DataAccess;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNet.SignalR;

var builder = WebApplication.CreateBuilder(args);

// Add standard ASP.NET services
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Add Business services
builder.Services.AddDbContext<FlipNowDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
});
builder.Services.AddScoped<UnitOfWork>();
builder.Services.AddSingleton<GameSessionService>();
builder.Services.AddSignalR();

// Force lowercase endpoints
builder.Services.Configure<RouteOptions>(options =>
{
    options.LowercaseUrls = true;
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthorization();

app.MapControllers();
app.MapHub<GamesHub>($"/api/{GamesHub.ENDPOINT}");

app.UseCors(builder => builder
    .AllowAnyHeader()
    .AllowAnyMethod()
    .SetIsOriginAllowed(_ => true)
    .AllowCredentials());
app.Run();