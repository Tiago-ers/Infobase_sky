const mongoose = require('mongoose');

//'mongodb://localhost:27017/sky'

mongoose.Promise = global.Promise;
mongoose
  .connect(
    'mongodb+srv://tiago:123@cluster0.i4x3i.mongodb.net/sky?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    }
  )
  .then(() => {
    console.log('Mongo conectado');
  })
  .catch((error) => console.log(error.message));

module.exports = mongoose;
