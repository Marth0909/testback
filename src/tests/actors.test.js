//se importa request y app
const request = require('supertest');
const app = require('../app')

let id;

test('GET / actors debe traer todos los actores de las películas', async () => {
    const res = await request(app).get('/actors');
    expect(res.status).toBe(200); //tb
    expect(res.body).toBeInstanceOf(Array); //tbi
});


test('POST / debe crear un actor para peliculas', async () => {
    const body = {
        firstName: "Nahomi"
    }
    const res = await request(app).post('/actors').send(body);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.firstName).toBe(body.firstName);

});

test('DELETE /actors/:id debe eliminar un actor por id', async () => {
    const res = await request(app).delete(`/actors/${id}`);
    expect(res.status).toBe(204);
});


test('PUT /actors/:id con id incorrecto debe retornar 404 ', async () => {
    const res = await request(app).put('/actors/-1');
    expect(res.status).toBe(404);
});

test('PUT /actors/:id debe actualizar un actor por id ', async () => {
    const body = {
        firstName: " actualizado"
    };
    const res = await request(app).put(`/actors/${id}`).send(body);
    expect(res.status).toBe(200);
    expect(res.body).toBeDefined();
    expect(res.body.firstName).toBe(body.firstName);
});





