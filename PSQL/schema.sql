CREATE SEQUENCE sq_entity;
CREATE TABLE entity (
	entity 		INT PRIMARY KEY DEFAULT NEXTVAL('sq_entity'),
	username	VARCHAR(40),
	email		VARCHAR(40),
	c1string	VARCHAR(40)
);

CREATE SEQUENCE sq_tag;
CREATE TABLE tag(
	tag 		INT PRIMARY KEY DEFAULT NEXTVAL('sq_tag'),
	name		VARCHAR(40)
);

CREATE SEQUENCE sq_tournament;
CREATE TABLE tournament(
	tournament 	INT PRIMARY KEY DEFAULT NEXTVAL('sq_tournament'),
	tag 		INT REFERENCES tag(tag)
);

CREATE SEQUENCE sq_company;
CREATE TABLE company(
	company 	INT PRIMARY KEY DEFAULT NEXTVAL('sq_company'),
	name		VARCHAR(40),
	image_name  VARCHAR(40),
	description VARCHAR(200),
	prizes 		VARCHAR(200),
	tag			INT REFERENCES tag(tag),
	c1string	VARCHAR(40)

);

CREATE SEQUENCE sq_company_match;
CREATE TABLE company_match(
	company_match INT PRIMARY KEY DEFAULT NEXTVAL('sq_company_match'),
	matchup		INT,
	tournament	INT REFERENCES tournament(tournament),
	company_a	INT REFERENCES company(company),
	company_b	INT REFERENCES company(company),
	a_won		BOOLEAN
);
CREATE SEQUENCE sq_vote;
CREATE TABLE vote(
	vote    	INT PRIMARY KEY DEFAULT NEXTVAL('sq_vote'),
	amount		INT,
	entity		INT REFERENCES entity(entity),
	company_match INT REFERENCES company_match(company_match)
);


