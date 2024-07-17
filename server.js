const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);

// Custom route to search by username and return a single object
server.get('/users', (req, res, next) => {
    if (req.query.username) {
        const username = req.query.username;
        const users = router.db.get('users').value();
        const user = users.find(user => user.username === username);
        if (user) {
        return res.jsonp(user);
        } else {
        return res.status(404).jsonp({ error: "User not found" });
        }
    }
    next();
});

server.use(router);

server.listen(3000, () => {
    console.log('JSON Server is running');
});