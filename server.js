const app = require('./app.js')
/** port can be 8080 or the port for Heroku */
const port = process.env.PORT || 8080;

//------------------------------app.list to the port--------------------------------------------------
/** listening assigned port */
app.listen(port, () => {
    console.log(`Server is up on the port ${port}`);
});