


describe('POST /characters', function() {

    before(function(){
        cy.request({
            method:'POST',
            url:'/sessions',
            body: {
                email:'diegobrito@qacademy.io',
                password: 'qa-cademy'
            }
        }).then(function(response){
            expect(response.status).to.eql(200)
            cy.log(response.body.token)
            Cypress.env('token', response.body.token)
        })
    })


    it('deve cadastrar um persongem', function() {
       
       const charater = {
            name: 'Wanda Maximorff',
            alias: 'Feiticeira Escarlate',
            team: ['Vingadores' ],
            active: true
        }

        cy.request({
            method: 'POST',
            url: '/characters',
            body: charater,
            headers: {
                Authorization: Cypress.env('token')
            }
        }).then(function(response){
            expect(response.status).to.eql(201)
        })

    })
})