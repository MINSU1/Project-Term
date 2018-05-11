create table review
(reviewID int identity(0,1) primary key,
 name varchar(50) not null,
 date date not null,
 rating int not null,
 comment varchar(582) not null,
 suggestion varchar(582));

insert into review values ('Jay','2017-05-01',5,'This app is awesome','It''s already perfect');
insert into review values ('Jakob','2017-05-01',1,'App is too buggy, the devs suck lol','Jk, app is all good');

select * from review;