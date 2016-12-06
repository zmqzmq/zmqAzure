﻿using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using zmqAzure.Data;

namespace zmqAzure.Data.Migrations
{
    [DbContext(typeof(MathRecordContext))]
    partial class MathRecordContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasAnnotation("ProductVersion", "1.0.1")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("zmqAzure.Models.MathRecord", b =>
                {
                    b.Property<int>("MathRecordID")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("QuesString");

                    b.Property<DateTime>("SessionStart");

                    b.Property<int>("TimeSpendInSecond");

                    b.Property<string>("UserMail");

                    b.HasKey("MathRecordID");

                    b.ToTable("MathRecord");
                });
        }
    }
}
