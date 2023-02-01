const dotenv = require('dotenv');
const http = require('./app');
require('./socket');

/* env */
dotenv.config();
const PORT = process.env.PORT || 3000;

http.listen(PORT, () => {
    console.log(`Listening on Port ${PORT}`);
});
