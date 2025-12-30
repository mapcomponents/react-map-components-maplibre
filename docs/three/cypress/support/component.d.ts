import { mount } from 'cypress/react';
declare global {
    namespace Cypress {
        interface Chainable {
            mount: typeof mount;
        }
    }
}
//# sourceMappingURL=component.d.ts.map