DROP DATABASE IF EXISTS moviedb;
CREATE DATABASE moviedb;
\c moviedb;
\i seed.sql;