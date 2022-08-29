const { connect, connection } = require('mongoose');

connect('mondgodb://localhost:27017/socialNetworkApi', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

module.exports = connection;