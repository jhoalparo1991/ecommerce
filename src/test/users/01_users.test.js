const request = require("supertest");
const express = require("express");

const app = express();

const route = "/api/v1/users";

describe("Users unit test", () => {
  test("Error 404 not found", async() => {
    const result = await request(app).get(route);
    expect(result.statusCode).toEqual(404);
  });
});
