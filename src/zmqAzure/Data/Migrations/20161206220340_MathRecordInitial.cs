using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Metadata;

namespace zmqAzure.Data.Migrations
{
    public partial class MathRecordInitial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "MathRecord",
                columns: table => new
                {
                    MathRecordID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    QuesString = table.Column<string>(nullable: true),
                    SessionStart = table.Column<DateTime>(nullable: false),
                    TimeSpendInSecond = table.Column<int>(nullable: false),
                    UserMail = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MathRecord", x => x.MathRecordID);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "MathRecord");
        }
    }
}
