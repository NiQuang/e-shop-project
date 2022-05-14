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


if OBJECT_ID('Customers') is not null
 drop table Customers
go
create table Customers
(
	username nvarchar(50) not null,
	password nvarchar(100) not null,
	fullname nvarchar(100)  not null,
	email nvarchar(200) not null,
	photo nvarchar(500) null,
	activated bit default 0 not null,
	admin bit default 0 not null,

	constraint PK_Customers PRIMARY KEY (username) 
)

if OBJECT_ID('Orders') is not null
	drop table Orders
go
create table Orders
(
	id bigint identity (1,1) not null,
	adress nvarchar(200) not null,
	phonenumber nvarchar(10) not null,
	status int default 0 not null,
	username nvarchar(50) not null,

	constraint PK_Orders PRIMARY KEY (id),
	constraint FK_Orders_Customers FOREIGN KEY (username) REFERENCES Customers ON UPDATE CASCADE ON DELETE NO ACTION
)


if OBJECT_ID('OrderDetail') is not null
	drop table OrderDetail
go
create table OrderDetail
(
	id bigint identity(1,1) not null,
	price float not null,
	quantity int not null,
	productId int not null,
	orderId bigint not null,

	constraint PK_OrderDetail PRIMARY KEY (id),
	constraint FK_OrderDetail_Products FOREIGN KEY (productId) REFERENCES Products ON UPDATE CASCADE ON DELETE NO ACTION,
	constraint FK_OrderDetail_Orders FOREIGN KEY (orderId) REFERENCES Orders ON UPDATE CASCADE ON DELETE CASCADE

)

select * from Orders