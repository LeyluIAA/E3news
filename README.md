# E3news

# Prerequisites

Install Postgresql-9.1

``` shell

$ sudo apt-get install postgresql-9.1 postgresql-client-9.1
$ sudo -i -u postgres
postgres $ psql
postgres=# CREATE USER <user>;
postgres=# ALTER USER <user> WITH ENCRYPTED PASSWORD 'password'; 
postgres=# ALTER ROLE <user> WITH CREATEDB;
postgres=# CREATE DATABASE expo OWNER <user>;
postgres=# \q

```

Create the right table

``` shell
$ psql expo
expo=> CREATE TABLE news (
title  varchar(50),
description varchar(100),
link varchar(80),
image varchar(80),
copyright varchar(80),
updated date,
author varchar(80)
);

```