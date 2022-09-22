


describe('POST /characters', function () {

    before(function () {
        cy.back2ThePast()
        cy.setToken()
    })


    it('deve cadastrar um persongem', function() {

        const character = {
            name: 'Wanda Maximorff',
            alias: 'Feiticeira Escarlate',
            team: ['Vingadores'],
            active: true
        }

       cy.postCharacter(character)
            .then(function (response) {
            expect(response.status).to.eql(201)
            cy.log(response.body.character_id)
            expect(response.body.character_id.length).to.equal(24)
        })

    })

    context('quando o personagem já existe', function(){

        const character = {
            name: 'Pietro Maximorff',
            alias: 'Mercurio',
            team: ['Vingadores da costa oeste', 'Irmanda de mutantes'],
            active: true
        }

        before(function(){
            cy.postCharacter(character)
            .then(function (response) {
                expect(response.status).to.equal(201)
            })            
        })

        it('não deve cadastar duplicado', function(){
            cy.postCharacter(character)
                .then(function (response) {
                expect(response.status).to.equal(400)
                expect(response.body.error).to.eql('Duplicate character')
                
            })
        }) 
    })
})
