using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ContratApp.Migrations
{
    /// <inheritdoc />
    public partial class AddScrInCatAndSpec : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Scr",
                table: "Specialities",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Scr",
                table: "Categories",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Scr",
                table: "Specialities");

            migrationBuilder.DropColumn(
                name: "Scr",
                table: "Categories");
        }
    }
}
