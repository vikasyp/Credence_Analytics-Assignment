const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');
const Series = require('../models/series');


beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
 await Series.deleteMany({}); // Clean up database before tests
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('CRUD Operations', () => {
  let seriesId;

  test('Create Series', async () => {
    console.log(app)
    const response = await request(app).post('/api/series').send({
      "name": "Avengers: Endgame_1",
      "img": "https://bit.ly/2Pzczlb",
      "summary": "Adrift in space with no food or water, Tony Stark sends amessage to Pepper Potts as his oxygen supply starts to dwindle."
    });
    console.log('Create Series Response:', response.statusCode, response.body);
    expect(response.statusCode).toBe(201);
    expect(response.body.name).toBe('Avengers: Endgame_1');
    seriesId = response.body._id;
  });

  test('Get All Series', async () => {
    const response = await request(app).get('/api/series');
    console.log('Get All Series Response:', response.statusCode, response.body);
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });



  test('Update Series by ID', async () => {
    const response = await request(app).put(`/api/series/${seriesId}`).send({
      name: 'Avengers: Endgame'
    });
    console.log('Update Series by ID Response:', response.statusCode, response.body);
    expect(response.statusCode).toBe(200);
    expect(response.body.name).toBe('Avengers: Endgame');
  });

  test('Delete Series by ID', async () => {
    const response = await request(app).delete(`/api/series/${seriesId}`);
    console.log('Delete Series by ID Response:', response.statusCode, response.body);
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Series deleted successfully');
  });
});
