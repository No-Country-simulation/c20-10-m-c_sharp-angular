using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ContratApp.Migrations
{
    /// <inheritdoc />
    public partial class AddOfferorSpeciality : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "OfferorSpecialities",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdOfferor = table.Column<string>(type: "nvarchar(450)", maxLength: 450, nullable: false),
                    IdSpeciality = table.Column<int>(type: "int", nullable: false),
                    Title = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Text = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: false),
                    Area = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OfferorSpecialities", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OfferorSpecialities_Offerors_IdOfferor",
                        column: x => x.IdOfferor,
                        principalTable: "Offerors",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_OfferorSpecialities_Specialities_IdSpeciality",
                        column: x => x.IdSpeciality,
                        principalTable: "Specialities",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_OfferorSpecialities_IdOfferor",
                table: "OfferorSpecialities",
                column: "IdOfferor");

            migrationBuilder.CreateIndex(
                name: "IX_OfferorSpecialities_IdSpeciality",
                table: "OfferorSpecialities",
                column: "IdSpeciality");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "OfferorSpecialities");
        }
    }
}
