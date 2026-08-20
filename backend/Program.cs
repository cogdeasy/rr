using RR.Group.Api.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.PropertyNamingPolicy = System.Text.Json.JsonNamingPolicy.CamelCase;
        options.JsonSerializerOptions.Converters.Add(new System.Text.Json.Serialization.JsonStringEnumConverter());
    });

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo
    {
        Title = "Rolls-Royce Group Performance & Transformation Platform API",
        Version = "v1",
        Description = "Operational and financial APIs aligned to the Rolls-Royce Holdings plc 2026 Half Year strategic priorities"
    });
});

builder.Services.AddSingleton<GroupPerformanceService>();
builder.Services.AddSingleton<CivilAerospaceService>();
builder.Services.AddSingleton<DefenceService>();
builder.Services.AddSingleton<PowerSystemsService>();
builder.Services.AddSingleton<NuclearService>();
builder.Services.AddSingleton<TransformationService>();
builder.Services.AddSingleton<AnalyticsService>();

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins("http://localhost:4200")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();

app.UseCors();
app.MapControllers();
app.MapGet("/api/health", () => new { status = "ok", service = "rr-group-api" });

app.Run();
