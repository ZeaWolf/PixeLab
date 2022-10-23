// import { request } from 'http'
// const supertest = require('supertest')
// import { describe } from 'yargs'
// const resourcecontroller =require('./resource-controller.js') 

// import supertest from 'supertest'
// import resourcecontroller from './resource-controller.js'

const request = require('supertest')
const createResource = require('./resource-controller.js')

describe("Create resource", ()=>{
    describe ("!!!!",()=>{
        test("When resource is missing", ()=>{
            // const response = request(createResource).post("/resource").send({
            // })
            const test = {
                Type: "resource"
            }
            const response = createResource.createResource(test)

            expect(response.statusCode).toBe(400)
        })
    })
})