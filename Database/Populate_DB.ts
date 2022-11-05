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
    Tags: ["all"]
};

export function populate() {
    Person.createPersonTable();
    Location.createLocationTable();

    Person.insertIntoPersonTable(person1);

    Location.insertIntoLocationTable(Keplinger_Hall);
    Location.insertIntoLocationTable(Rayzor_Hall);
    Location.insertIntoLocationTable(Stephenson_Hall);
    Location.insertIntoLocationTable(John_Mabee);
    Location.insertIntoLocationTable(Student_Union);
}