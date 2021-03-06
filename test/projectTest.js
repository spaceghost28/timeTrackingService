process.env.NODE_ENV = "test";
var mongoose = require('mongoose');
var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();

var Project = require('../app/models/project');
var server = require('../server');

chai.use(chaiHttp);

describe('Projects', () => {

	beforeEach((done) => {
		Project.remove({}, (err) => {
			done();
		});
	});

	describe('POST project', () => {

		it('should create a new project', (done) => {
			let projectToSend = new Project({
				projectName: 'steve'
			});

			chai.request(server)
				.post('/project')
				.send(projectToSend)
				.end((err, res) => {
					res.should.have.status(201);
					Project.findOne({projectName: 'steve'}, (err, foundProj) => {
						chai.expect(foundProj).to.not.be.null;
						foundProj.projectName.should.eql('steve');
						done();
					});
				});
		});

	});

	describe('POST time', () => {

		it('should do something', (done) => {
			chai.request(server)
				.post('/time')
				.send({
					projectName: "steve",
					cardNumber: 123,
					userId: 654456,
					startTime: Date.now(),
					endTime: new Date(2342340)
				})
				.end((err, res) => {
					done();
				});
		});

	});

});
