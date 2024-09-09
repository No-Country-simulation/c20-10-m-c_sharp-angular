using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ContratApp.Migrations
{
    /// <inheritdoc />
    public partial class AddOfferors2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Offeror_Users_Id",
                table: "Offeror");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Offeror",
                table: "Offeror");

            migrationBuilder.RenameTable(
                name: "Offeror",
                newName: "Offerors");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Offerors",
                table: "Offerors",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Offerors_Users_Id",
                table: "Offerors",
                column: "Id",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Offerors_Users_Id",
                table: "Offerors");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Offerors",
                table: "Offerors");

            migrationBuilder.RenameTable(
                name: "Offerors",
                newName: "Offeror");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Offeror",
                table: "Offeror",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Offeror_Users_Id",
                table: "Offeror",
                column: "Id",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
