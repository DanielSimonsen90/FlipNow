﻿// <auto-generated />
using System;
using FlipNow.DataAccess;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace FlipNow.DataAccess.Migrations
{
    [DbContext(typeof(FlipNowDbContext))]
    partial class FlipNowDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.12")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("CardGame", b =>
                {
                    b.Property<Guid>("CardsId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("GamesId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("CardsId", "GamesId");

                    b.HasIndex("GamesId");

                    b.ToTable("CardGame");
                });

            modelBuilder.Entity("FlipNow.Common.Entities.Card", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Cards");

                    b.HasData(
                        new
                        {
                            Id = new Guid("00000000-0000-0000-0000-000000000001"),
                            Name = "Card0"
                        },
                        new
                        {
                            Id = new Guid("00000000-0000-0000-0000-000000000002"),
                            Name = "Card1"
                        },
                        new
                        {
                            Id = new Guid("00000000-0000-0000-0000-000000000003"),
                            Name = "Card2"
                        },
                        new
                        {
                            Id = new Guid("00000000-0000-0000-0000-000000000004"),
                            Name = "Card3"
                        },
                        new
                        {
                            Id = new Guid("00000000-0000-0000-0000-000000000005"),
                            Name = "Card4"
                        },
                        new
                        {
                            Id = new Guid("00000000-0000-0000-0000-000000000006"),
                            Name = "Card5"
                        },
                        new
                        {
                            Id = new Guid("00000000-0000-0000-0000-000000000007"),
                            Name = "Card6"
                        },
                        new
                        {
                            Id = new Guid("00000000-0000-0000-0000-000000000008"),
                            Name = "Card7"
                        },
                        new
                        {
                            Id = new Guid("00000000-0000-0000-0000-000000000009"),
                            Name = "Card8"
                        },
                        new
                        {
                            Id = new Guid("00000000-0000-0000-0000-000000000010"),
                            Name = "Card9"
                        },
                        new
                        {
                            Id = new Guid("00000000-0000-0000-0000-000000000011"),
                            Name = "Card10"
                        },
                        new
                        {
                            Id = new Guid("00000000-0000-0000-0000-000000000012"),
                            Name = "Card11"
                        },
                        new
                        {
                            Id = new Guid("00000000-0000-0000-0000-000000000013"),
                            Name = "Card12"
                        });
                });

            modelBuilder.Entity("FlipNow.Common.Entities.Game", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime>("SavedTimestamp")
                        .HasColumnType("datetime2");

                    b.HasKey("Id");

                    b.ToTable("Games");
                });

            modelBuilder.Entity("FlipNow.Common.Entities.User", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<double>("AvgScore")
                        .HasColumnType("float");

                    b.Property<Guid?>("GameId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Username")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("GameId");

                    b.ToTable("Users");

                    b.HasData(
                        new
                        {
                            Id = new Guid("00000000-0000-0000-0000-000000000006"),
                            AvgScore = 0.0,
                            Username = "Dumbho"
                        });
                });

            modelBuilder.Entity("FlipNow.Common.Entities.UserScore", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid?>("GameId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<double>("Score")
                        .HasColumnType("float");

                    b.Property<TimeSpan>("Time")
                        .HasColumnType("time");

                    b.Property<Guid?>("UserId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Id");

                    b.HasIndex("GameId");

                    b.HasIndex("UserId");

                    b.ToTable("UserScores");
                });

            modelBuilder.Entity("CardGame", b =>
                {
                    b.HasOne("FlipNow.Common.Entities.Card", null)
                        .WithMany()
                        .HasForeignKey("CardsId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("FlipNow.Common.Entities.Game", null)
                        .WithMany()
                        .HasForeignKey("GamesId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("FlipNow.Common.Entities.User", b =>
                {
                    b.HasOne("FlipNow.Common.Entities.Game", null)
                        .WithMany("PlayingUsers")
                        .HasForeignKey("GameId");
                });

            modelBuilder.Entity("FlipNow.Common.Entities.UserScore", b =>
                {
                    b.HasOne("FlipNow.Common.Entities.Game", "Game")
                        .WithMany("Scores")
                        .HasForeignKey("GameId");

                    b.HasOne("FlipNow.Common.Entities.User", "User")
                        .WithMany("Scores")
                        .HasForeignKey("UserId");

                    b.Navigation("Game");

                    b.Navigation("User");
                });

            modelBuilder.Entity("FlipNow.Common.Entities.Game", b =>
                {
                    b.Navigation("PlayingUsers");

                    b.Navigation("Scores");
                });

            modelBuilder.Entity("FlipNow.Common.Entities.User", b =>
                {
                    b.Navigation("Scores");
                });
#pragma warning restore 612, 618
        }
    }
}
