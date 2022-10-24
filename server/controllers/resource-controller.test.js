// import { request } from 'http'
// const supertest = require('supertest')
// import { describe } from 'yargs'
// const resourcecontroller =require('./resource-controller.js') 

// import supertest from 'supertest'
// import resourcecontroller from './resource-controller.js'

// const request = require('supertest');
// const { deleteOne } = require('../models/user-model.js');
// const createResource = require('./resource-controller.js')
// // const jest = require('@jest/globals')

// const mockResponse = () => {
//     const res = {};
//     res.status = jest.fn().mockReturnValue(res);
//     res.json = jest.fn().mockReturnValue(res);
//     return res;
// };

// const mockRequest = (sessionData) => {
//     //console.log(sessionData);
//     return {
//       body: sessionData,
//     };
// };

//     describe ("!!!!",()=>{

//         test("When resource is missing", ()=>{
//             // const response = request(createResource).post("/resource").send({
//             // })
//             const req = mockRequest({
//                 Type:           "resource",
//                 Name:           "nihao",
//                 Author:         "shugui",
//                 Image:          "1",
//                 Source:         "1",
//                 Like:           1,
//                 Comments:       [["1111"]],
//                 PublishTime:    1666568158316,
//                 Description:    "1"
//             });
//             const body = req.body;
//             console.log(body);
//             const res = mockResponse();
//             createResource.createResource(req,res);
//             expect(res.status).toHaveBeenCalledWith(201);
//         })
//     })


// afterAll(async done => {
//     // Closing the DB connection allows Jest to exit successfully.
//     done();
// });