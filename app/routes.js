var Project = require('./models/project');

module.exports = function(app) {

    app.get('/', function(request, response) {
        response.render('index.ejs');
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
        })
    })

};
