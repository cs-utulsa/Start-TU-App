
Create Table IF NOT EXISTS Event(
	Name Varchar(500) Primary key NOT NULL,
	Description VARCHAR(5000) NOT NULL,
	Datetime_Event Datetime,
	Category Varchar(100),
	Location_Name Varchar(100),
	Foreign key(Location_Name) References Location(Name)ON DELETE CASCADE ON UPDATE CASCADE
);

insert into Event (Name, Description, Datetime_Event)

Drop Table Event;