create database eShop
use eShop
go


if OBJECT_ID('Categories') is not null
	drop table Categories
go
create table Categories
(
	Id int identity(1,1) not null,
	Title nvarchar(100) not null,

	constraint PK_Categories PRIMARY KEY (Id)
)

if OBJECT_ID('Products') is not null
	drop table Products
go
create table Products
(
	Id int identity(1,1) not null,
	Title nvarchar(100) not null,
	Preview nvarchar(500) null,
	Images nvarchar(200) null,
	CreateDate date default getdate() not null,
	CategoryId int not null

	Constraint PK_Products PRIMARY KEY (Id),
	Constraint FK_Products_Categories FOREIGN KEY (CategoryId) REFERENCES Categories ON UPDATE CASCADE ON DELETE NO ACTION
)