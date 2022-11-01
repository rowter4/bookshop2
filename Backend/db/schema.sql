-- drop database if exist admin_db;

create database admin_db;

use admin_db;

create table user (
    userId varchar(64) not null,
    password varchar(128) not null,
    name varchar(128) not null,
    email varchar(64) PRIMARY KEY not null 
    -- primary key(userId);
);

create table line_item (
    item_id int auto_increment,
    title varchar(512) ,
    quantity int ,
    price float(5,2) not null ,
    ord_id char(8) not null, 
    email varchar(128),

    primary key(item_id),
    
    constraint fk_email
		foreign key(email)
        references user(email)
);

create table order_summary (
	ord_id char(8) not null,
    email varchar(128) not null,
    total float(7,2) not null ,
    ts timestamp,
    
	primary key(ord_id),
    
    constraint fk_email_2
		foreign key(email)
        references user(email)
);

create table book_details (

    book_id int auto_increment,
    added_by int,
    description text,
    format varchar(64),
    authors varchar(512) not null,
    edition varchar(64) default '',
    title varchar(512) not null,
    genres varchar(512),
    pages int default 0,
	rating float(3, 2) default 1.0,
    price float(5, 2) default 1.0,
	pic mediumblob,

	primary key(book_id)

);

