create table member 
(username varchar(50) primary key,
 password varchar(50) not null,
 line_address varchar(50) not null,
 city varchar(30) not null,
 zipcode varchar(10) not null);

insert into member values ('Jacob', '123', '555 Seymour Street','Vancouver', 'V5R B8A');
insert into member values ('Jay', '123', '556 Seymour Street','Vancouver', 'V5R B8L');
insert into member values ('Le', '123', '557 Seymour Street','Vancouver', 'V5R K8L');
insert into member values ('Min', '123', '558 Seymour Street','Vancouver', 'V5R B8F');
insert into member values ('Ryan', '123', '559 Seymour Street','Vancouver', 'V5R D8B');
insert into member values ('Theo', '123', '560 Seymour Street','Vancouver', 'V5R C8A');


create table order_history 
(order_ID int identity(0,1) primary key,
 username varchar(50) not null foreign key references member(username),
 date_ordered datetime not null,
 restaurant_name varchar(50) not null,
 restaurant_address varchar(100) not null,
 delivery_fee money not null);

insert into order_history values ('Jacob', '2018-04-15', 'McDonald','1000 Joyce Street, Vancouver', 20);
insert into order_history values ('Jay', '2018-04-16', 'McDonald','1000 Joyce Street, Vancouver', 15.25);
insert into order_history values ('Le', '2018-04-17', 'McDonald','1000 Joyce Street, Vancouver', 40);
insert into order_history values ('Min', '2018-04-18', 'McDonald','1000 Joyce Street, Vancouver', 10);
insert into order_history values ('Ryan', '2018-04-19', 'McDonald','1000 Joyce Street, Vancouver', 19.99);
insert into order_history values ('Theo', '2018-04-20', 'McDonald','1000 Joyce Street, Vancouver', 15.45);

select * from member;
select * from order_history;