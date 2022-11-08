import {Person, Person_Data} from './Person';
import {Location, Location_Data} from './Location';

const person1: Person_Data = {
    TU_Email: "lar9482@utulsa.edu",
    Name: "Luke Runnels",
    Password: "password123"
};

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
    Name: "Stephenson_Hall",
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
    Description: "School of Art",
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

const Mcfarlin_Library: Location_Data = {
    Name: "Mcfarlin Library",
    Description: "Main Academic Library",
    Latitude: 36.15232374393028,
    Longitude: -95.94599221560202,
    Tags: ["all", "Library"]
};

export function populate() {
    Person.createPersonTable();
    Location.createLocationTable();

    Person.insertIntoPersonTable(person1);

    Location.insertIntoLocationTable(Keplinger_Hall);
    Location.insertIntoLocationTable(Rayzor_Hall);
    Location.insertIntoLocationTable(Stephenson_Hall);
    Location.insertIntoLocationTable(John_Mabee);
    Location.insertIntoLocationTable(Lottie_John_Mabee);
    Location.insertIntoLocationTable(Student_Union);
    Location.insertIntoLocationTable(Philips_Hall);
    Location.insertIntoLocationTable(Helmerich_Hall);
    Location.insertIntoLocationTable(Chapman_Hall);
    Location.insertIntoLocationTable(Lorton_Hall);
    Location.insertIntoLocationTable(Mcfarlin_Library);
}