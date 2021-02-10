const mongoose = require('../src/db/mongoose');
const { count } = require('../src/models/task');
const Task = require('../src/models/task');


/* Task.findByIdAndRemove('602246754d6cc325f0ef1a1a').then((task) => {
    console.log('Deleted ', task);
    return Task.countDocuments({completed:false});
}).then((result)=>{
    console.log(result);
}).catch((e)=>{
    console.log(e);
}) */

/* Task.findByIdAndDelete('60226b4f620ae741c5a20dc9').then((task)=>{
    console.log('Deleted!');
    console.log(task);
    return Task.countDocuments({completed:false});
}).then((result)=>{
    console.log(result);
}).catch((e)=>{
    console.log(e);
}) */

const deleteTaskAndCount = async (id)=>{
    const task = await Task.findByIdAndDelete(id);
    const count = await Task.countDocuments({completed:false});
    return count;
}

deleteTaskAndCount('6021bc833b510e1a1cf523a5').then((count)=>{
    console.log(count);
}).catch((e)=>{
    console.log(e);
})