//se importa request y app
const request = require('supertest');
const app = require('../app')

let id;

test('GET / directors debe traer todos los directores de las películas', async () => {
    const res = await request(app).get('/directors');
    expect(res.status).toBe(200); //tb
    expect(res.body).toBeInstanceOf(Array); //tbi
});

test('POST / debe crear un director de pelicula', async () => {
    const body = {
        firstName: "James",
        lastName:"Cameron",
        nationality:"US",
        image:"http://",
        birthday:"1860-04-17"
    }
    const res = await request(app).post('/directors').send(body);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBe(body.name);

});

test('DELETE /directors/:id debe eliminar un director por id', async () => {
    const res = await request(app).delete(`/directors/${id}`);
    expect(res.status).toBe(204);
});

test('PUT /directors/:id debe actualizar un director por su id', async () => {
    const body = {
        firstName:"Guillermo",
    
    };
    const res = await request(app).put(`/directors/${id}`).send(body);
    console.log(res.body)
    expect(res.status).toBe(200);
    expect(res.body).toBeDefined();
    expect(res.body.firstName).toBe(body.firstName);
});

test('PUT /directors/:id con id incorrecto debe retornar 404 ', async () => {
    const res = await request(app).put('/directors/-1');
    expect(res.status).toBe(404);
});







;





