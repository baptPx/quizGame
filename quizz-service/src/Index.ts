const {app, start} = require('./App')
let port = 3001;
if(process.env.PORT && !isNaN(+process.env.PORT)) {
    port = +process.env.PORT
}
start()
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});