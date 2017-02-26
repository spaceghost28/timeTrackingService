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
                response.status(400).send(err);
            } else {
                response.status(201).send();
            }
        });
    });

    app.get('/project', (request, response) => {
        Project.find({}, (err, projects) => {
            if(err) {
                console.log(err);
                response.status(400).send(err);
            } else {
                response.send(projects);
            }
        });
    });

    app.delete('/project', (request, response) => {
        Project.findOne({ projectName: request.body.projectName }, (err, project) => {
            if (err) throw err;

            if (project) {
                project.remove((err) => {
                    if(err) throw err;
                    response.send();
                });
            } else {
                response.status(404).send();
            }
        });
    });

    app.get('/storyCard/:project', (request, response) => {
        Project.findOne({ projectName: request.params.project }, (err, project) => {
            if (err) response.status(500).send(err);
            if (project) {
                response.send(project.storyCards);
            } else {
                response.status(404).send();
            }
        });
    });

    app.post('/storycard', (request, response) => {
        Project.findOne({projectName: request.body.projectName}, (err, project) => {
            if (err) response.status(500).send(err);
            if (project) {
                if (cardAlreadyExists(project, request.body.cardNumber)) {
                    response.status(409).send();
                }
                project.storyCards.push({
                    cardNumber: request.body.cardNumber
                });
                project.save((err) => {
                    if (err) response.status(500).send(err);
                    response.status(201).send();
                });
            } else {
                response.status(404).send();
            }
        });
    });

    let cardAlreadyExists = function(project, cardNumber) {
        return project.storyCards.find(sc => sc.cardNumber == cardNumber);
    }

};
