const request = require("supertest");
const app = require('../../../index');
const { userModel } = require('../../models');

const route = "/api/v1/users";
const user = {
    name : "test",
    lastname : "test",
    email : "test@test.com",
    password: "test",
    role : "user"
};

const user2 = {
  name : "test",
  lastname : "test",
  email : "test@test.com",
  role : "user"
};


describe("Users unit test", () => {

  // truncate table before test
  beforeAll( async() => {
    await userModel.destroy({truncate: true});
  });

  // Get all users

  test("[[/GET]-> /users] Return property [data]", async() => {
    const result = await request(app).get(route);
    expect(result.body).toHaveProperty(["data"]);
  });

  test("[[/GET]-> /users] Return status code 200", async() => {
    const result = await request(app).get(route);
    expect(result.statusCode).toEqual(200);
  });

  test("[[/GET]-> /users/{id}] Return status code 400 if user not found", async() => {
    const result = await request(app).get(`${route}/2`);
    expect(result.statusCode).toEqual(400);
  });

  // Register new user

  test("[[/POST] -> /users] return code 201 when create new user",async()=>{
    const result = await request(app)
      .post(route)
      .send(user);
      expect(result.statusCode).toEqual(201);
  })

  test("[[/GET]-> /users/{id}] Return status code 200 if exist user", async() => {
    const result = await request(app).get(`${route}/1`);
    expect(result.statusCode).toEqual(200);
  });

  test("[[/POST] -> /users] return code 200 when email user already exist",async()=>{
    const result = await request(app)
      .post(route)
      .send(user);
      expect(result.statusCode).toEqual(200);
  })

  test("[[/POST] -> /users] return code 400 when not exist fields [name,lastname,email,password]",async()=>{
    const result = await request(app)
      .post(route)
      .send(user2);
      expect(result.statusCode).toEqual(400);
  })


  // Change property deleted to false -> true

  test("[[/PUT] -> /users/change-deleted/{id}] return code 200 when change property deleted to false->true",async()=>{
    const result = await request(app)
      .put(`${route}/change-deleted/1`);
      expect(result.statusCode).toEqual(200);
  })

  test("[[/PUT] -> /users/change-deleted/{id}] return code 400 when user not found by update",async()=>{
    const result = await request(app)
      .put(`${route}/change-deleted/2`);
      expect(result.statusCode).toEqual(400);
  })

  // test("[[/PUT] -> /users/change-deleted/] return code 404 when not have the parameter id",async()=>{
  //   const result = await request(app)
  //     .put(`${route}/change-deleted/`);
  //     expect(result.statusCode).toEqual(404);
  // })

  test("[[/PUT] -> /users/change-deleted/{id}] return code 500 when Unknown column 'NaN' in 'where clause'",async()=>{
    const result = await request(app)
      .put(`${route}/change-deleted/fgr`);
      expect(result.statusCode).toEqual(500);
  })

  // Update method




  // Delete method

  test("[[/DELETE] -> /users/{id}] return code 200 when delete user successfully",async()=>{
    const result = await request(app)
      .delete(`${route}/1`);
      expect(result.statusCode).toEqual(200);
  })

  test("[[/DELETE] -> /users/{id}] return code 400 when user not found",async()=>{
    const result = await request(app)
      .delete(`${route}/1`);
      expect(result.statusCode).toEqual(400);
  })

  test("[[/DELETE] -> /users/{id}] return code 500 when Unknown column 'NaN' in 'where clause'",async()=>{
    const result = await request(app)
      .delete(`${route}/fgr`);
      expect(result.statusCode).toEqual(500);
  })

});
