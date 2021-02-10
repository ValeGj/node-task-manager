const express = require('express');
require('./db/mongoose');
const User = require('./models/user');
const Task = require('./models/task');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port,()=>{
    console.log('Server is up on port' + port);
});


const bcrypt = require('bcryptjs');

const myFunction = async () => {
    const password = 'Red12345!';
    const hashedPassord = await bcrypt.hash(password, 8);

    console.log(password);
    console.log(hashedPassord);

    const isMatch = await bcrypt.compare('red12345!',hashedPassord);
    console.log(isMatch);
}

myFunction();