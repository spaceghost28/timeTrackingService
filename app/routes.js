var Project = require('./models/project');

module.exports = function(app) {

    app.get('/', function(request, response) {
        response.render('index.ejs');
    });

    app.post('/project', function(request, response) {
        Project.findOne({projectName: request.body.projectName }, function(err, project) {
            if (err) console.log('error finding project');
            else if (!project) {
                console.log('no project found');
            }
            else {
                console.log('we found a project');
            }
            response.redirect('/');
        });
    });

    app.post('/time', function(request, response) {

    });

};
