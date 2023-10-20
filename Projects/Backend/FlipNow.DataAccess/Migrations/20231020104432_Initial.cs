using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace FlipNow.DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class Initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Cards",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Cards", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "CardGame",
                columns: table => new
                {
                    GameId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CardsId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CardId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CardGame", x => new { x.CardsId, x.GameId });
                    table.ForeignKey(
                        name: "FK_CardGame_Cards_CardId",
                        column: x => x.CardId,
                        principalTable: "Cards",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CardGame_Cards_CardsId",
                        column: x => x.CardsId,
                        principalTable: "Cards",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Games",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    WinnerScoreId = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Games", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Username = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AvgScore = table.Column<double>(type: "float", nullable: false),
                    HighestScoreId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    ActiveGameId = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Users_Games_ActiveGameId",
                        column: x => x.ActiveGameId,
                        principalTable: "Games",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "UserScores",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    UserId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    Score = table.Column<double>(type: "float", nullable: false),
                    GameId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    Time = table.Column<TimeSpan>(type: "time", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserScores", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserScores_Games_GameId",
                        column: x => x.GameId,
                        principalTable: "Games",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_UserScores_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.InsertData(
                table: "Cards",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { new Guid("00000000-0000-0000-0000-000000000001"), "Card0" },
                    { new Guid("00000000-0000-0000-0000-000000000002"), "Card1" },
                    { new Guid("00000000-0000-0000-0000-000000000003"), "Card2" },
                    { new Guid("00000000-0000-0000-0000-000000000004"), "Card3" },
                    { new Guid("00000000-0000-0000-0000-000000000005"), "Card4" }
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "ActiveGameId", "AvgScore", "HighestScoreId", "Username" },
                values: new object[] { new Guid("00000000-0000-0000-0000-000000000006"), null, 0.0, null, "Dumbho" });

            migrationBuilder.CreateIndex(
                name: "IX_CardGame_CardId",
                table: "CardGame",
                column: "CardId");

            migrationBuilder.CreateIndex(
                name: "IX_CardGame_GameId",
                table: "CardGame",
                column: "GameId");

            migrationBuilder.CreateIndex(
                name: "IX_Games_WinnerScoreId",
                table: "Games",
                column: "WinnerScoreId");

            migrationBuilder.CreateIndex(
                name: "IX_Users_ActiveGameId",
                table: "Users",
                column: "ActiveGameId");

            migrationBuilder.CreateIndex(
                name: "IX_Users_HighestScoreId",
                table: "Users",
                column: "HighestScoreId");

            migrationBuilder.CreateIndex(
                name: "IX_UserScores_GameId",
                table: "UserScores",
                column: "GameId");

            migrationBuilder.CreateIndex(
                name: "IX_UserScores_UserId",
                table: "UserScores",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_CardGame_Games_GameId",
                table: "CardGame",
                column: "GameId",
                principalTable: "Games",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Games_UserScores_WinnerScoreId",
                table: "Games",
                column: "WinnerScoreId",
                principalTable: "UserScores",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Users_UserScores_HighestScoreId",
                table: "Users",
                column: "HighestScoreId",
                principalTable: "UserScores",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Users_Games_ActiveGameId",
                table: "Users");

            migrationBuilder.DropForeignKey(
                name: "FK_UserScores_Games_GameId",
                table: "UserScores");

            migrationBuilder.DropForeignKey(
                name: "FK_Users_UserScores_HighestScoreId",
                table: "Users");

            migrationBuilder.DropTable(
                name: "CardGame");

            migrationBuilder.DropTable(
                name: "Cards");

            migrationBuilder.DropTable(
                name: "Games");

            migrationBuilder.DropTable(
                name: "UserScores");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
