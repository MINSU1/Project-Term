const app = require('./app.js')
/** port can be 8080 or the port for Heroku */
const port = process.env.PORT || 8080;

//------------------------------app.list to the port--------------------------------------------------
/** listening assigned port */https://docs.google.com/document/d/1PvIUqoPHOS5SRPQk71-QaeayYxRf3IeeMcSszSaZJzs/edit?usp=sharing
app.listen(port, () => {
    console.log(`Server is up on the port ${port}`);
});