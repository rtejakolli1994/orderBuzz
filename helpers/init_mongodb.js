const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://mongodbuser:rtejakolli@cluster0.mwxgt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { dbName: 'mongodbuser',
    'useNewUrlParser': true,
    'useUnifiedTopology': true,
    'useFindAndModify': false,
    'useCreateIndex': true 
}).then(() => {
    console.log('mongodb connected')
}).catch((err) => {
    console.log(err.message)
})

mongoose.connection.on('connected',() => {
    console.log('Mongoose is connected')
})

mongoose.connection.on('error',(err)=>{
    console.log(err.message)
})

mongoose.connection.on('disconnected',(err)=>{
    console.log('Mongoose is disconnected')
})

process.on('SIGNINT', async()=>{
    await mongoose.connection.close();
    process.exit(0)
})