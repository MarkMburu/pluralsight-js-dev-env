import {expect} from "chai"
import jsdom from "jsdom";
import fs from "fs";

describe("our first test",()=>{
    it('should pass',()=>{
        expect(true).to.equal(true);
    });
});
describe('index.html',()=>{
    it('Should say hello',(done)=>{
        const index = fs.readFileSync('./src/index.html',"utf-8");
        jsdom.env(index,(err,window)=>{
            const h1 = window.document.getElementsByTagName('h1')[0];
            expect(h1.innerHTML).to.equal("Hello World");
            done()
            window.close()
        });
    });
});
describe('index.html',()=>{
    it('Should say Starter Kit',(done)=>{
        const index = fs.readFileSync('./src/index.html',"utf-8");
        jsdom.env(index,(err,window)=>{
            const title = window.document.getElementById('title');
            expect(title.innerHTML).to.equal("Starter Kit");
            done()
            window.close()
        });
    });
});