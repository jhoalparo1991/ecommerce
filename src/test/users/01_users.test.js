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

describe("Users unit test", () => {

  beforeAll( async() => {
    await userModel.destroy({truncate: true});
  });

  test("[[/GET]-> /users] Return property [data]", async() => {
    const result = await request(app).get(route);
    expect(result.body).toHaveProperty(["data"]);
  });

  test("[[/GET]-> /users] Return status code 200", async() => {
    const result = await request(app).get(route);
    expect(result.statusCode).toEqual(200);
  });


  test("[[/POST] -> /users] return code 201 when create new user",async()=>{
    const result = await request(app)
      .post(route)
      .send(user);
      expect(result.statusCode).toEqual(201);
  })

  test("[[/POST] -> /users] return code 200 when email user already exist",async()=>{
    const result = await request(app)
      .post(route)
      .send(user);
      expect(result.statusCode).toEqual(200);
  })

  /**
   * this test is optional
   */
  // test("[[/POST] -> /users] return code 400 when not exist fields [name,lastname,email,password]",async()=>{
  //   const result = await request(app)
  //     .post(route)
  //     .send(user);
  //     expect(result.statusCode).toEqual(400);
  // })



});
