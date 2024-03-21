const request = require('supertest');
const app = require('../app');
const Actors = require('../models/Actors');
const Directors = require('../models/Directors');
const Genres = require('../models/Genres');

let id;

test('GET /movies debe retornar status 200', async () => {
    const res = await request(app).get('/movies');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST /movies debe crear una pelicula', async () => {
    const body = {
        name:"Godzilla",
        image:"http://",
        synopsis:"Un mounstruo terrestre y acuatico con poderes...",
        releaseYear: 2024
    };
    const res = await request(app).post('/movies').send(body);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body).toBeDefined();
    expect(res.body.name).toBe(body.name);
    expect(res.body.id).toBeDefined();
});

test('GET /movies/:id debe traer la pelicula por su id', async () => {
    const res = await request(app).get(`/movies/${id}`);
    expect(res.status).toBe(200);
    expect(res.body.id).toBeDefined();
});

test('GET /movies/:id con id incorrecto debe retornar 404 ', async () => {
    const res = await request(app).post('/movies/-1/actors');
    expect(res.status).toBe(404);
});

test('PUT /movies/:id debe actualizar la pelicula por su id', async () => {
    const body = {
        name:"Godzilla vs Kong"
    };
    const res = await request(app).put(`/movies/${id}`).send(body);
    expect(res.status).toBe(200);
    expect(res.body).toBeDefined();
    expect(res.body.name).toBe(body.name);
});

test('PUT /movies/:id con id incorrecto debe retornar 404 ', async () => {
    const res = await request(app).put('/movies/-1/actors');
    expect(res.status).toBe(404);
});

test('POST /movies/:id/actors agrega los actores a una pelicula', async () => {
    const actor = await Actors.create({
        firstName:"George",
        lastName:"Clouney",
        nationality:"British",
        image:"http://",
        birthday:"1970-06-08"
    });
    const res = await request(app)
    .post(`/movies/${id}/actors`)
    .send([actor.id]);
    await actor.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBe(1);
});

test('POST /movies/:id/actors con id incorrecto debe retornar 404 ', async () => {
    const res = await request(app).post('/movies/-1/actors').send([]);
    expect(res.status).toBe(404);
});

test('POST /movies/:id/directors agraga los directores a una pelicula', async () => {
    const director = await Directors.create({
        firstName:"James",
        lastName:"Cameron",
        nationality:"US",
        image:"http://",
        birthday:"1965-04-05"
    });
    const res = await request(app)
    .post(`/movies/${id}/directors`)
    .send([director.id]);
    await director.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBe(1);
});

test('POST /movies/:id/dierctors con id incorrecto debe retornar 404 ', async () => {
    const res = await request(app).post('/movies/-1/directors').send([]);
    expect(res.status).toBe(404);
});

test('POST /movies/:id/genres agrega los generos a una pelicula ', async () => {
    const genre = await Genres.create({
        name:"fiction"
    });
    const res = await request(app)
    .post(`/movies/${id}/genres`)
    .send([genre.id]);
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBe(1);
});

test('POST /movies/:id/genres con id incorrecto debe retornar 404 ', async () => {
    const res = await request(app).post('/movies/-1/genres').send([]);
    expect(res.status).toBe(404);
});


test('DELETE /movies/:id es para eliminar una pelicula por su id', async () => {
    const res = await request(app).delete(`/movies/${id}`);
    expect(res.status).toBe(204);
});