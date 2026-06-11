const app = require('./src/app');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("servidor flowpay corriendo en el puerto" + PORT);
    console.log("http://localhost:" + PORT + "/api/health" );
    console.log("probando servidor :)");
});

