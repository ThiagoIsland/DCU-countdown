using dcucountdown;
using dcucountdown.endpoints;
using Microsoft.AspNetCore.Builder;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddOpenApi();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseDCUProjectsEndpoints();
app.UseSwagger();
app.UseSwaggerUI();
app.UseHttpsRedirection();
app.Run();

