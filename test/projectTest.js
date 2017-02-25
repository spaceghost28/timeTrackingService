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

	describe('/GET fake', () => {

		it('should say yo dawg to me', (done) => {
			chai.request(server)
				.get('/fake')
				.end((err, response) => {
					response.should.have.status(200);
					response.body.message.should.be.eql("yo dawg");
					done();
				});
		});

	});

});
