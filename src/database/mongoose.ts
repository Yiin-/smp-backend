var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/smp');

export default mongoose;