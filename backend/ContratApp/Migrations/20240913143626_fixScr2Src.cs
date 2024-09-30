using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ContratApp.Migrations
{
    /// <inheritdoc />
    public partial class fixScr2Src : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Scr",
                table: "Specialities",
                newName: "Src");

            migrationBuilder.RenameColumn(
                name: "Scr",
                table: "Categories",
                newName: "Src");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Src",
                table: "Specialities",
                newName: "Scr");

            migrationBuilder.RenameColumn(
                name: "Src",
                table: "Categories",
                newName: "Scr");
        }
    }
}
