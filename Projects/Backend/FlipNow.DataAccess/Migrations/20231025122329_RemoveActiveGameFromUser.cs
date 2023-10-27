using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FlipNow.DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class RemoveActiveGameFromUser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Users_Games_ActiveGameId",
                table: "Users");

            migrationBuilder.RenameColumn(
                name: "ActiveGameId",
                table: "Users",
                newName: "GameId");

            migrationBuilder.RenameIndex(
                name: "IX_Users_ActiveGameId",
                table: "Users",
                newName: "IX_Users_GameId");

            migrationBuilder.AddForeignKey(
                name: "FK_Users_Games_GameId",
                table: "Users",
                column: "GameId",
                principalTable: "Games",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Users_Games_GameId",
                table: "Users");

            migrationBuilder.RenameColumn(
                name: "GameId",
                table: "Users",
                newName: "ActiveGameId");

            migrationBuilder.RenameIndex(
                name: "IX_Users_GameId",
                table: "Users",
                newName: "IX_Users_ActiveGameId");

            migrationBuilder.AddForeignKey(
                name: "FK_Users_Games_ActiveGameId",
                table: "Users",
                column: "ActiveGameId",
                principalTable: "Games",
                principalColumn: "Id");
        }
    }
}
