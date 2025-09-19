describe('ページ動作チェック', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000')
    cy.contains('北海道').click()
    cy.contains('福井県').click()
    cy.contains('愛知県').click()
    cy.contains('年少人口').click()
    cy.contains('生産年齢人口').click()
    cy.contains('老年人口').click()
    cy.contains('割合').click()
    cy.contains('総人口').click()
  })
})