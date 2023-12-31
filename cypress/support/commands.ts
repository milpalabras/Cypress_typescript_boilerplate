import 'cypress-file-upload'
import '@testing-library/cypress/add-commands'
import '@4tw/cypress-drag-drop'
import { generateRandomWords } from '../../cypress/utils'
/// <reference types="cypress" />
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to select DOM element by data-cy attribute.
       * @example cy.dataCy('greeting')
       */
      dataCy(value: string): Chainable<JQuery<HTMLElement>>

      /**
       * Custom command to type ramdon words in a input field.
       * @param count: number of words to be typed
       * @example cy.get('input').typeRandomWords(5)
       */
      typeRandomWords(count?: number, options?: Partial<TypeOptions>): Chainable<JQuery<HTMLElement>>
    }
  }
}

Cypress.Commands.add('dataCy', value => {
  return cy.get(`[data-cy=${value}]`)
})

Cypress.Commands.add(
  'typeRandomWords',
  { prevSubject: 'element' },
  (subject /* :JQuery<HTMLElement> */, count = 3, options?) => {
    return cy.wrap(subject).type(generateRandomWords(count), options)
  }
)
