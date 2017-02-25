var Project = require('./models/project');

module.exports = function(app) {

    app.get('/', function(request, response) {
        Project.find({}, function(err, projects) {
            if (err) {
                console.log("error finding projects");
                response.send(err);
            } else {
                response.render('index.ejs', {projects: projects});
            }
        });
    });

    app.post('/project', function(request, response) {
        var newProject = new Project({
            projectName: request.body.projectName
        });
        newProject.save(function(err, project) {
            if (err) {
                response.send(err);
            } else {
                response.redirect('/');
            }
        });
    });

    app.get('/fake', (request, response) => {
        response.send({message: 'yo dawg'});
    });

};
