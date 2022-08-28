const router = require('express').router();
const apiRoutes = require('./api');

router.use('/api', apiRoutes)
router.use((req, res) => {
    return res.send('Route not located, please check address.');
});

module.exports = router;
