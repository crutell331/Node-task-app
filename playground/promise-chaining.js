require('../src/db/mongoose')
const User = require('../src/models/User')
const Task = require('../src/models/Task')
const updateAgeAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, { age })
    const count = await User.countDocuments({ age })
    return count
}

// updateAgeAndCount('5e23ac1e91554aa012ce8494', 30).then(count => {
//     console.log(count)
// }).catch(e => console.log(e))

const deleteTaskAndCount = async (id) => {
    const task = await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({ completed: false })
    return count
}

deleteTaskAndCount('5e2397b0ea23d59a3d6c7f08')
    .then(count => console.log(count))
    .catch(e => console.log(e))