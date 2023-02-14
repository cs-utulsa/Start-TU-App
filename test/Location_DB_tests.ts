import {Location, Location_Entity, Location_Data} from '../Database/Location'

const db_name: string = 'Test_DB.db';
const Location_Test: Location_Entity = new Location_Entity(db_name)

const event: Location_Data = {
    Name: "Event",
    Description: "Description",
    Latitude: 0,
    Longitude: 0,
    Tags: ['tag']
}

function createTest() {
    console.log('Beginning create table test for the location table')
    Location_Test.createLocationTable()
    console.log('Ending create table test for the location table')
}

function dropTest() {
    console.log('Beginning drop table test for the location table')
    Location_Test.createLocationTable()
    Location_Test.dropLocationTable()
    console.log('Ending drop table test for the location table')
}

function insertTest() {
    console.log('Beginning insert table test for the location table')
    Location_Test.createLocationTable()
    Location_Test.insertIntoLocationTable(event)
    console.log('Ending insert table test for the location table')
}

function queryTagTest_Valid() {
    const validTag = 'tag'
    console.log('Beginning valid tag table test for the location table')
    Location_Test.createLocationTable()
    Location_Test.insertIntoLocationTable(event)
    Location_Test.queryAttributes_Tag(validTag).then((value: Location_Data[]) => {
        console.log(value)
    }) 
    console.log('Ending valid tag table test for the location table')
}

function queryTagTest_Invalid() {
    const validTag = 'invalid_tag'
    console.log('Beginning invalid tag table test for the location table')
    Location_Test.createLocationTable()
    Location_Test.insertIntoLocationTable(event)
    Location_Test.queryAttributes_Tag(validTag).then((value: Location_Data[]) => {
        console.log(value)
    }) 
    console.log('Ending invalid tag table test for the location table')
}

function queryNameTest_Valid() {
    const validName = 'Event'
    console.log('Beginning valid name table test for the location table')
    Location_Test.createLocationTable()
    Location_Test.insertIntoLocationTable(event)
    Location_Test.queryAttributes_Name(validName).then((value: Location_Data) => {
        console.log(value)
    }) 
    console.log('Ending valid name table test for the location table')
}

function queryNameTest_Invalid() {
    const validName = 'Invalid_Event'
    console.log('Beginning invalid name table test for the location table')
    Location_Test.createLocationTable()
    Location_Test.insertIntoLocationTable(event)
    Location_Test.queryAttributes_Name(validName).then((value: Location_Data) => {
        console.log(value)
    }) 
    console.log('Ending invalid name table test for the location table')
}