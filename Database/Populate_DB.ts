import {Person, Person_Data} from './Person';
import {Location, Location_Data} from './Location';
import {Event, Event_Data} from './Event'

const Keplinger_Hall: Location_Data = {
    Name: "Keplinger Hall",
    Description: "Main Building for the College of Engineering & Natural Science",
    Latitude: 36.153979761758876,
    Longitude: -95.94205412959185,
    Tags: ["ens", "all"]
};

const Rayzor_Hall: Location_Data = {
    Name: "Rayzor Hall",
    Description: "Building of Electrical/Computer Engineering and Computer Science",
    Latitude: 36.15313162846364,
    Longitude: -95.94272874465813,
    Tags: ["ens", "all"]
};

const Stephenson_Hall: Location_Data = {
    Name: "Stephenson Hall",
    Description: "Building of Mechanical Engineering & Petroleum Engineering",
    Latitude: 36.15312927984461,
    Longitude: -95.94206106343141,
    Tags: ["ens", "all"]
};

const Student_Union: Location_Data = {
    Name: "Alan Chapman Student Union",
    Description: "Major location for restaurants and student events",
    Latitude: 36.153439180383586,
    Longitude: -95.94357520929442,
    Tags: ["all"]
};

const John_Mabee: Location_Data = {
    Name: "John Mabee",
    Description: "All Males' Dorm",
    Latitude: 36.15322236736723,
    Longitude: -95.94873798075692,
    Tags: ["all", "housing"]
};

const Lottie_John_Mabee: Location_Data = {
    Name: "Lottie John Mabee",
    Description: "All Females' Dorm",
    Latitude: 36.15133476567233,
    Longitude: -95.94871428765713,
    Tags: ["all", "housing"]
};

const Philips_Hall: Location_Data = {
    Name: "Philips Hall",
    Description: "Building of the School of Art",
    Latitude: 36.15299141037871,
    Longitude: -95.94642195707841,
    Tags: ["all", "a&s"]
};

const Helmerich_Hall: Location_Data = {
    Name: "Helmerich Hall",
    Description: "Building of the Collins College of Business",
    Latitude: 36.15324781305708,
    Longitude: -95.94717706214203,
    Tags: ["all", "a&s"]
};

const Chapman_Hall: Location_Data = {
    Name: "Chapman Hall",
    Description: "Building of the Kendall College of Arts & Science",
    Latitude: 36.15308684418934,
    Longitude: -95.94790750389673,
    Tags: ["all", "a&s"]
};

const Lorton_Hall: Location_Data = {
    Name: "Lorton Hall",
    Description: "Building of the Department of Psychology",
    Latitude: 36.15142254421786,
    Longitude: -95.94796814388067,
    Tags: ["all", "a&s"]
};

const Tyrrell_Hall: Location_Data = {
    Name: "Tyrrell Hall",
    Description: "Multimedia teaching laboratory",
    Latitude: 36.15154819531764,
    Longitude: -95.94690836796727,
    Tags: ["all", "a&s"]
};

const Kendall_Hall: Location_Data = {
    Name: "Kendall Hall",
    Description: "Location for Student Theaters",
    Latitude: 36.15194253937832,
    Longitude: -95.94525166245168,
    Tags: ["all", "a&s"]
};

const Harwell_Hall: Location_Data = {
    Name: "Harwell Hall",
    Description: "Building for the Department of Anthropology",
    Latitude: 36.15141112563814,
    Longitude: -95.94476132971788,
    Tags: ["all", "a&s"]
};

const Zink_Hall: Location_Data = {
    Name: "John Zink Hall",
    Description: "Building for the Department of English, Communication, and Information Technology",
    Latitude: 36.15105577622461,
    Longitude: -95.94463724042029,
    Tags: ["all", "a&s"]
}
//36.15115937432833, -95.94540514228939
const Oliphant_Hall: Location_Data = {
    Name: "Oliphant Hall",
    Description: "Building for the Biological Sciences and Languages",
    Latitude: 36.15115937432833,
    Longitude: -95.94540514228939,
    Tags: ["all", "a&s"]
}


const Mcfarlin_Library: Location_Data = {
    Name: "McFarlin Library",
    Description: "Main Academic Library",
    Latitude: 36.15232374393028,
    Longitude: -95.94599221560202,
    Tags: ["all", "Library"]
};

const College_Of_Law: Location_Data = {
    Name: "College of Law",
    Description: "Location for the College of Law",
    Latitude: 36.154373802419194,
    Longitude: -95.94392719242241,
    Tags: ["all", "Law"]
};

const Mayo_Village_Apartments: Location_Data = {
    Name: "Mayo Village Apartments",
    Description: "Apartments in the southwest corner of campus",
    Latitude: 36.14895161333691,
    Longitude: -95.94821376598672,
    Tags: ["all", "housing"]
};

const University_Square_Apartments_West: Location_Data = {
    Name: "University Square Apartments West",
    Description: "Apartments in the southwest corner of campus",
    Latitude: 36.15448550024493,
    Longitude: -95.95050024251663,
    Tags: ["all", "housing"]
};

//36.15044355355848, -95.94836729025664
const Fisher_Hall: Location_Data = {
    Name: "Fisher Hall",
    Description: "Student Dorms in the Southwest of campus",
    Latitude: 36.15044355355848,
    Longitude: -95.94836729025664,
    Tags: ["all", "housing"]
};

const Norman_Village_Apartments: Location_Data = {
    Name: "Norman Village Apartments",
    Description: "Apartments in the Northwest corner of campus.",
    Latitude: 36.155533443889006,
    Longitude: -95.94827750391109,
    Tags: ["all", "housing"]
};

//36.153974649897705, -95.94094846282417
const Brown_Village_Apartments: Location_Data = {
    Name: "Brown Village Apartments",
    Description: "Apartments in the Northeast corner of campus.",
    Latitude: 36.153974649897705,
    Longitude: -95.94094846282417,
    Tags: ["all", "housing"]
};

//36.14915206471965, -95.94542769050474
const Lorton_Village_Apartments: Location_Data = {
    Name: "Lorton Village Apartments",
    Description: "Apartments in the Southeast side of campus.",
    Latitude: 36.14915206471965,
    Longitude: -95.94542769050474,
    Tags: ["all", "housing"]
};

//36.150515588037024, -95.94215565211398
const LaFortune_House: Location_Data = {
    Name: "LaFortune House",
    Description: "Student Dorms in the Southwest side of campus.",
    Latitude: 36.150515588037024,
    Longitude: -95.94215565211398,
    Tags: ["all", "housing"]
};

const First_Generic_Event: Event_Data = {
    Name: "First Generic Event",
    Description: "Testing Event",
    Date_Start: new Date('2022-08-26'),
    Date_End: new Date('2022-08-26'),
    Category: "Meeting",
    Location: "TU Campus"
}

const Second_Generic_Event: Event_Data = {
    Name: "Second Generic Event",
    Description: "Testing Event",
    Date_Start: new Date('2022-08-30'),
    Date_End: new Date('2022-08-30'),
    Category: "Meeting",
    Location: "TU Campus"
}

const Third_Generic_Event: Event_Data = {
    Name: "Third Generic Event",
    Description: "Testing Event",
    Date_Start: new Date('2022-09-30'),
    Date_End: new Date('2022-09-30'),
    Category: "Meeting",
    Location: "TU Campus"
}

export function populate() {
    Person.dropPersonTable();
    Location.dropLocationTable();
    Event.dropEventTable();

    Person.createPersonTable();
    Location.createLocationTable();
    Event.createEventTable();

    Location.insertIntoLocationTable(Keplinger_Hall);
    Location.insertIntoLocationTable(Rayzor_Hall);
    Location.insertIntoLocationTable(Stephenson_Hall);
    Location.insertIntoLocationTable(Student_Union);
    Location.insertIntoLocationTable(Philips_Hall);
    Location.insertIntoLocationTable(Helmerich_Hall);
    Location.insertIntoLocationTable(Chapman_Hall);
    Location.insertIntoLocationTable(Lorton_Hall);
    Location.insertIntoLocationTable(Mcfarlin_Library);
    Location.insertIntoLocationTable(Tyrrell_Hall);
    Location.insertIntoLocationTable(Zink_Hall);
    Location.insertIntoLocationTable(Harwell_Hall);
    Location.insertIntoLocationTable(Kendall_Hall);
    Location.insertIntoLocationTable(College_Of_Law);
    Location.insertIntoLocationTable(Oliphant_Hall);

    Location.insertIntoLocationTable(John_Mabee);
    Location.insertIntoLocationTable(Lottie_John_Mabee);
    Location.insertIntoLocationTable(Mayo_Village_Apartments);
    Location.insertIntoLocationTable(University_Square_Apartments_West);
    Location.insertIntoLocationTable(Norman_Village_Apartments);
    Location.insertIntoLocationTable(Fisher_Hall);
    Location.insertIntoLocationTable(Brown_Village_Apartments);
    Location.insertIntoLocationTable(Lorton_Village_Apartments);
    Location.insertIntoLocationTable(LaFortune_House);

    Event.insertIntoEventTable(First_Generic_Event);
    Event.insertIntoEventTable(Second_Generic_Event);
    Event.insertIntoEventTable(Third_Generic_Event);
}