create database ecommerce;

use ecommerce;


create table users(
    id int primary key auto_increment not null,
    name varchar(255) not null ,
    lastname varchar(255) not null,
    email varchar(255) not null unique,
    password varchar(255) not null,
    role varchar(255) not null,
    deleted boolean default false,
    createdAt timestamp default now(),
    updatedAt timestamp default now()
)Engine=InnoDB;

create table user_photo(
    id int primary key auto_increment,
    user_id int not null,
    name_image varchar(150) not null unique,
    url_image varchar(255) not null unique
)Engine=InnoDB

alter table user_photo
add constraint fk_user_photo
foreign key (user_id) references users(id)
on update cascade
on delete no action;

create table products(
    id int primary key auto_increment not null,
    product_name varchar(255) not null ,
    description varchar(255) null,
    stock float not null default 0,
    price float not null default 0,
    imagen varchar(255) null,
    favorite boolean default false,
    deleted boolean default false,
    category_id int not null,
    createdAt timestamp default now(),
    updatedAt timestamp default now()
)Engine=InnoDB;

create table categories(
    id int primary key auto_increment not null,
    name varchar(255) not null unique,
    description varchar(255) null,
    deleted boolean default false,
    createdAt timestamp default now(),
    updatedAt timestamp default now()
)Engine=InnoDB;

alter table products
add constraint FK_product_category
foreign key (category_id) references categories(id)
on update cascade
on delete no action;