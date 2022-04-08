let server = require("../index");
let chai = require("chai");
let chaiHttp = require("chai-http");

// Assertion
chai.should();
chai.use(chaiHttp);

describe('nft APIs', () => {

    describe("Test GET route /api/nfts", () => {
        it("It should return all nfts", (done) => {
            chai.request(server)
                .get("/api/nfts")
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('array');
                    response.body.length.should.not.be.eq(0);
                done();
                });
        });

        it("It should NOT return all the nfts", (done) => {
            chai.request(server)
                .get("/api/nfts")
                .end((err, response) => {
                    response.should.have.status(404);
                done();
                });
        });

    });


    /**
     * Test the GET (by id) route
     */
    describe("GET /api/nfts/:id", () => {
        it("It should GET a nft by ID", (done) => {
            const nftId = 1;
            chai.request(server)
                .get("/api/nfts/" + nftId)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('id');
                    response.body.should.have.property('name');
                    response.body.should.have.property('url');
                    response.body.should.have.property('date');
                    response.body.should.have.property('id').eq(1);
                done();
                });
        });

        it("It should NOT GET a nft by ID", (done) => {
            const nftId = 123;
            chai.request(server)
                .get("/api/nfts/" + nftId)
                .end((err, response) => {
                    response.should.have.status(404);
                    response.text.should.be.eq("The nft with the provided ID does not exist.");
                done();
                });
        });

    });

    /**
     * Test the POST route
     */
     describe("POST /api/nfts", () => {
        it("It should POST a new nft", (done) => {
            const nft = {
                name: "nft-test",
                url: "http/nft.com/",
                date: "25/08/2015"
               
            };
            chai.request(server)
                .post("/api/nfts")
                .send(nft)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    //response.body.should.have.property('id').eq(100);
                    response.body.should.have.property('name').eq("nft-test");
                    response.body.should.have.property('url').eq("http/nft.com/");
                    response.body.should.have.property('date').eq("25/08/2015");
                    
                done();
                });
        });

        it("It should NOT POST a new nft without the name property", (done) => {
            const nft = {
                name: "nft-test",
            };
            chai.request(server)
                .post("/api/nfts")
                .send(nft)
                .end((err, response) => {
                    response.should.have.status(400);
                    response.text.should.be.eq("The name should be at least 3 chars long!");
                done();
                });
        });

    });

/**
     * Test the PUT route
     */
 describe("PUT /api/nfts/:id", () => {
    it("It should PUT an existing nft", (done) => {
        const nftId = 1;
        const nft = {
            name: "nft-test",
            url: "http/nft.com/",
            date: "25/08/2015"
        };
        chai.request(server)
            .put("/api/nfts/" + nftId)
            .send(nft)
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.a('object');
                response.body.should.have.property('id').eq(1);
                response.body.should.have.property('name').eq("nft-test");
                response.body.should.have.property('url').eq("http/nft.com/");
                response.body.should.have.property('date').eq("25/08/2015");
            done();
            });
    });

    it("It should NOT PUT an existing nft with a name with less than 3 characters", (done) => {
        const nftId = 1;
        const nft = {
            
            name: "nft-test",
            url: "http/nft.com/",
            date: "25/08/2015"
        };
        chai.request(server)
            .put("/api/nfts/" + nftId)
            .send(nft)
            .end((err, response) => {
                response.should.have.status(400);
                response.text.should.be.eq("The name should be at least 3 chars long!");
            done();
            });
    });
});


    /**
     * Test the DELETE route
     */
    describe("DELETE /api/nfts/:id", () => {
        it("It should DELETE an existing nft", (done) => {
            const nftId = 1;
            chai.request(server)
                .delete("/api/nfts/" + nftId)
                .end((err, response) => {
                    response.should.have.status(200);
                done();
                });
        });

        it("It should NOT DELETE a nft that is not in the database", (done) => {
            const nftId = 145;
            chai.request(server)
                .delete("/api/nfts/" + nftId)
                .end((err, response) => {
                    response.should.have.status(404);
                    response.text.should.be.eq("The nft with the provided ID does not exist.");
                done();
                });
        });

    });




});


