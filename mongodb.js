const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient
const ObjectID = mongodb.ObjectID

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

//first argument: connection URL, second: options object with this key needed, third: callback that is invoked when connection is completed
MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log("Didnt Work")
    }
    const db = client.db(databaseName)
    // db.collection('users').findOne({ _id: new ObjectID("5e2375a870412d8e3f2b9757") }, (error, user) => {
    //     if (error) {
    //         return console.log("that aint it")
    //     }
    //     console.log("user", user)
    // })

    // db.collection('users').find({ age: 29 }).count((error, users) => {
    //     console.log(users)
    // })

    // db.collection('tasks').findOne({ _id: new ObjectID('5e23782dde77658ee893646c') }, (error, task) => {
    //     console.log(task)
    // })

    // db.collection('tasks').find({ completed: false }).toArray((error, tasks) => {
    //     console.log(tasks)
    // })


    // db.collection('users').updateOne({ _id: new ObjectID('5e2375a870412d8e3f2b9757') }, {
    //     $inc: {
    //         age: 2
    //     }
    // }).then((res) => { console.log(res) }).catch((error) => { console.log(error) })


    // db.collection('tasks').updateMany({ completed: false }, {
    //     $set: {
    //         completed: true
    //     }
    // }).then((res) => { console.log(res) }).catch((error) => { console.log(error) })

    // db.collection('users').deleteMany({
    //     name: 'Tashawn'
    // }).then((res) => { console.log(res) }).catch((error) => console.log(error))

    db.collection('tasks').deleteOne({
        description: 'testing Mongo'
    }).then((res) => console.log(res)).catch((error) => console.log(error))

})