let chai = require("chai");
let chaiHttp = require("chai-http");
let route = require("../backend/routes/Product/ProductRoutes");
let server = require("../server");

chai.should();

chai.use(chaiHttp);


describe("Products API", () => {

    // GET PRODUCT BY ID
    describe("GET /product/:id", () => {
        it("Should get the correct product", async (done) => {
            chai.request(server)
                .get("/product/10")
                .end((err, response) => {
                    response.body.should.be.a("json");
                    response.body.length.should.be.eq(10);
                    done();
                })
        })

    })


})

