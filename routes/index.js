// IMPORT Routes
const apiRoutes = require("./api.route");
// IMPORT Middleware
// const { auth } = require("../middleware/middleware.middleware");

const generateMethods = (methods) => {
    let method = "";
    for (let key in methods) {
        if (methods[key] === true) {
            method = key;
        }
    }
    return method;
};

const generateStacks = (handler) => {
    let nestedRoutes = handler.stack;
    if (nestedRoutes) {
        return nestedRoutes.map((stack) => ({
            path: stack.route.path,
            method: generateMethods(stack.route.methods),
            structure: stack.route.stack.map((st) => st.name),
        }));
    }
    return null;
};

const routes = [
    {
        name: "apiRoutes",
        path: "/api",
        handler: [
            // auth, 
            apiRoutes
        ],
    },
    {
        name: "All Route List",
        path: "/routes",
        handler: (req, res) => {
            let getAllRoutes = routes.map((route) => {
                return {
                    name: route.name,
                    path: route.path,
                    routes: generateStacks(route.handler),
                };
            });
            res.json({
                routes: getAllRoutes,
                totalRootRoutes: getAllRoutes.length - 2,
            });
        },
    },
    {
        path: "/",
        handler: (req, res) => {
            res.json({
                title: "HEY Welcome to MVC Boilerplate template",
            });
        },
    },
    {
        name: "Not Found",
        path: "*",
        handler: (req, res) => {
            res.status(404).json({ error: "Endpoint Not Found" });
        },
    },
    {
        name: "Error Boundary",
        path: "*",
        handler: (error, req, res, next) => {
            if (error.status === 404) {
                res.status(404).json({ error: "Endpoint Not Found" });
            }
            process.env.NODE_ENV === "developement" && console.error(error.message);
            res.status(500).json({ error: error });
        },
    },
];

module.exports = (app) => {
    routes.forEach((route) => {
        if (route.path === "/") {
            app.get(route.path, route.handler);
        } else {
            app.use(route.path, route.handler);
        }
    });
};

// if need access from outside uncomment below line
// exports.routes = routes.map(r => r);
