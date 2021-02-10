const mongoose = require('../src/db/mongoose');
//require('../src/db/mongose');
const User = require('../src/models/user');

/* User.findByIdAndUpdate('602110f9d1ab7319c057b2bf', {age: 1}).then((user)=>{
    console.log(user);
    return User.countDocuments({age:1});
}).then((result)=>{
    console.log(result);
}).catch((e)=>{
    console.log(e);
}) */

const updateAgeAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, {age});
    const count = await User.countDocuments({age})
    return count;
}

updateAgeAndCount('602110f9d1ab7319c057b2bf', 2).then((count)=>{
    console.log(count);
}).catch((e)=>{
    console.log(e);
})