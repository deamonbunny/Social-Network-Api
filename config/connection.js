const { connect, connection } = require('mongoose');

connect('mondgodb://localhost/socialNetworkApi', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

module.exports = connection;