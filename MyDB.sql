create table Tickets (
num bigint auto_increment primary key,
user_id bigint not null,
description_ text not null,
priority varchar(20) not null,
status_ varchar(20) not null, 
created_at datetime,
updated_at datetime,
foreign key (user_id) references Users(num)
);