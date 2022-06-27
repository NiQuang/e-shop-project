drop database eShop

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
	Preview nvarchar(4000) null,
	Price float default 0 not null,
	CreateDate date default getdate() not null,
	CategoryId int not null
	Constraint PK_Products PRIMARY KEY (Id),
	Constraint FK_Products_Categories FOREIGN KEY (CategoryId) REFERENCES Categories ON UPDATE CASCADE ON DELETE NO ACTION
)

if object_ID('ProductMedia') is not null
	drop table ProductMedia
go
create table ProductMedia
(
	id bigint identity(1,1) not null,
	productId int not null,
	mediaLink nvarchar(100) not null,
	constraint PK_ProductMedia PRIMARY KEY (id),
	constraint FK_ProductMedia_Products FOREIGN KEY(productId) REFERENCES Products ON UPDATE CASCADE ON DELETE CASCADE
)


if OBJECT_ID('Users') is not null
 drop table Users
go
create table Users
(
	username nvarchar(50) not null,
	password nvarchar(100) not null,
	fullname nvarchar(100)  not null,
	email nvarchar(200) not null,
	photo nvarchar(500) null,
	activated bit default 0 not null,
	constraint PK_Users PRIMARY KEY (username) 
)

if OBJECT_ID('Adress') is not null
	drop table Adress
go
create table Adress
(
	id int identity(1,1) not null,
	detail nvarchar(500) not null,
	phone nvarchar(11) not null,
	username nvarchar(50) not null,

	constraint PK_Adress PRIMARY KEY(id),
	constraint FK_Adress_Users FOREIGN KEY(username) REFERENCES Users ON UPDATE CASCADE ON DELETE CASCADE
)

if OBJECT_ID('CartItems') is not null
	drop table CartItems
go
create table CartItems
(
	id bigint identity(1,1) not null,
	productid int not null,
	quantity int not null,
	username nvarchar(50) not null,

	constraint PK_CartItems PRIMARY KEY(id),
	constraint FK_CartItems_Products FOREIGN KEY(productid) REFERENCES Products ON UPDATE CASCADE ON DELETE CASCADE,
	constraint FK_CartItems_Users FOREIGN KEY(username) REFERENCES Users ON UPDATE CASCADE ON DELETE CASCADE

)

if OBJECT_ID('Roles') is not null
	drop table Roles
go
create table Roles
(
	id int identity(1,1) not null,
	name nvarchar(250) not null
	constraint PK_Roles PRIMARY KEY (id)
)

if OBJECT_ID('Permission') is not null
	drop table Permission
go
create table Permission
(
	id int identity(1,1) not null,
	username nvarchar(50) not null,
	roleid int not null,

	constraint PK_Permission PRIMARY KEY(id),
	constraint FK_Permission_Users FOREIGN KEY (username) REFERENCES Users ON UPDATE CASCADE ON DELETE CASCADE,
	constraint FK_Permission_Roles FOREIGN KEY (roleid) REFERENCES Roles ON UPDATE CASCADE ON DELETE CASCADE
)

if OBJECT_ID('Orders') is not null
	drop table Orders
go
create table Orders
(
	id bigint identity (1,1) not null,
	status int default 0 not null,
	createdate date default getDate() not null,
	username nvarchar(50) not null,
	adressId int not null,
	constraint PK_Orders PRIMARY KEY (id),
	constraint FK_Orders_Users FOREIGN KEY (username) REFERENCES Users ON UPDATE CASCADE ON DELETE NO ACTION,
	constraint FK_Orders_Adress FOREIGN KEY(adressId) REFERENCES Adress ON UPDATE NO ACTION ON DELETE NO ACTION
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

