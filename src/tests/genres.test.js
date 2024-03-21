//se importa request y app
const request = require('supertest');
const app = require('../app')

let id;

test('GET / genres debe traer todos los géneros de las películas', async () => {
    const res = await request(app).get('/genres');
    expect(res.status).toBe(200); //tb
    expect(res.body).toBeInstanceOf(Array); //tbi
});


test('POST / debe crear un género para peliculas', async () => {
    const body = {
        name: "terror"
    }
    const res = await request(app).post('/genres').send(body);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBe(body.name);

});

test('DELETE /genres/:id debe eliminar el genero por id', async () => {
    const res = await request(app).delete(`/genres/${id}`);
    expect(res.status).toBe(204);
});


test('PUT /genres/:id con id incorrecto debe retornar 404 ', async () => {
    const res = await request(app).put('/genres/-1');
    expect(res.status).toBe(404);
});

test('PUT /genres/:id debe actualizar un género por id ', async () => {
    const body = {
        name: " actualizado"
    };
    const res = await request(app).put(`/genres/${id}`).send(body);
    expect(res.status).toBe(200);
    expect(res.body).toBeDefined();
    expect(res.body.name).toBe(body.name);
});





