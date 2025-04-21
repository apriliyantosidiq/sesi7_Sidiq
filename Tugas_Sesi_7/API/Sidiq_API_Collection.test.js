import fetch from "node-fetch";
import { expect } from "chai";
import Ajv from "ajv";
import schema_post from "../Schema/reqresShcema";


describe ("API Test Suite Sidiq Collection", function(){
    //request GET
    it ("GET_Post", async function () {
        const hasilGet = await fetch('https://dummyjson.com/posts/1');
        expect(hasilGet.status, "Pastikan URL yang digunakan sudah benar").to.equal(200)
    });
    //request POST
    it ("POST_Add", async function () {
        const newPost = {
            title : "Sidiq Post Add",
            userId : 5
        };

        const hasilPost = await fetch('https://dummyjson.com/posts/add', {
            method : "POST",
            headers : {"Content-Type": "application/json"},
            body : JSON.stringify(newPost)
        });
        expect(hasilPost.status, "Pastikan data yang diinput sudah benar").to.equal(201)
        
        //validasi Schema
        const ajv = new Ajv();
        const data = await hasilPost.json();
        const check = ajv.compile(schema_post);
        const hasilSchema = check(data);

        expect(hasilSchema, "Schema harus valid").to.be.true
    })
})  