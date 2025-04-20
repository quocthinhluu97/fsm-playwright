import { createMachine } from 'xstate';

const atmMachine = createMachine({
    /** @xstate-layout N4IgpgJg5mDOIC5QEECuAXA9gWwIbsgAIAVMAGzLACdCBZXAYwAsBLAOzADoWJKBiAJIA5AMoBRAErEA+gGFkEgCIBtAAwBdRKAAOmWC3QtMbLSAAeiAIwA2S5wAsAdgCcNgByXVLx-bcBmABoQAE9EN0dORz9HNydLewAmAFY3Z2s-AF8MoLQsPAIIEnJKGnpmdi4GXCoIATZYagK+MSFiSWkABWE1TSQQXX1DY1MLBCcEzmtHR1Up+2sk32s3ayDQhASEiL83VK3rVXt7JOnM7JBcnHwiUgpqOkZWDk4qmrqGqib5IVkxABkeqYBgYjCY+qNxpNprMfAslis1mE7H5Nq5llsYrtHFkchgrgUindSo8KpxtOwxGwCFRIHxxH8xLIZMQJMhRMgmQIAPJCQF9YFDMGgUY+ZycVSWDwnRwJVyWZyOREbBKqTgKvzOBUJVILazONw4i54-I3Yr3MpPLjktiU6m076-AEaIF6EHDcGIUXiyWWaWyyzyxUhRC2CaOA5JSx+Y4JawJeWGy4mwq3EoPcrPdBUXD1RiCkTkMAMJoAdQExAAEopWSW+TpXYKRlZJfZOLHFvq-F3YW4lfHW0kks5ZnqfG4knGEonjdcU2biRmuFmc7A86CC5Ri-a2Y66-0G6CmwgA7E23DO935r3g2NnBM-ItNsdx0lY8lp3lZ4S0xbSQB3AwmAgbM-2aVp2mQWguQAVVaPcBUPD1j2OVsH2WZ9VDcZJpj7TDOHiex4kjeIVgNc4ky-VNzRJZ4APQICQL4B1-ngg93WFKwUM4NDYhSTDsKDdZojsZwnDSPxVC7BVdg-fFTSJdNLU4XBsEwVAqVtahaUUAQRA6FpxDkZARArVjBkQjjjzcWZOGspxrFsSx42mJJcLsGVXBiaJnC7dJrFk5Nv2oxdlNU9T0E0mkICYncWOdfk2KFcwrGs6xbMOcNHOcxxXJvZI7EWSwZhIhJ7D8KN7Cyc42EwCA4FMCiCSohdLRdcz2OShAAFpVhvHqAso+dFNJHhKDat0kohBIlXCWzNXK6Z7HVXwkgGpqht-Z5XlqepGkgcbGyQlEkkmGFwy7aMUNy9ZZtSHyitFKIVrW+Sfxoq0KSpLSIAOizOtsE7UnK8JBwknZ7D7LZOEHSSZh1VRFjI3FP3WhTNqXbNc2LddCy3H6EvaybEE7aHdiSWY-DjFZ4khuwo0WewEY8ZJGcq8iZ1Rt6QrohjcD-X6OtGKMUQcGwplE6nVH1Pt4kiFUkjQiTUkw1b2ZR17gqUlS1I0r6ooFonj2sRnInSTxwhmY2ZVwtxuIRidPGHNFnBeuc0fezgIBYWBtDAep2CgWRcFgJgDaPFUJWhtIysOB9Yh2XDVStmxHElZwTkSKc1bkt2uaU5cscFZAACNME+faCYm8PVEjodjYksqUjK68hJmWyFnTltEjFqqMiAA */
    id: 'Automated Teller Machine',
    initial: 'idle',
    states: {
        idle: {
            on: {
                INSERT_CARD: 'cardInserted',
            },
        },
        cardInserted:{
            on: {
                ENTER_PIN: 'pinEntered',
                CANCEL: 'transactionAborted'
            }
        },
        pinEntered:{
            on:{
                SELECT_TRANSACTION: 'transactionSelected',
                CANCEL: 'transactionAborted'
            }
        },
        transactionSelected:{
            on:{
                WITHDRAW: 'withdraw',
                CANCEL: 'transactionAborted'
            }
        },
        withdraw:{
            on:{
                ENTER_AMOUNT: 'amountEntered',
                CANCEL: 'transactionAborted'
            }
        },
        amountEntered:{
            on:{
                DISPENSE_CASH: 'dispensingCash',
                CANCEL: 'transactionAborted'
            }
        },
        dispensingCash:{
            type: 'final'
        },
        transactionAborted:{
            type: 'final'
        }

    }
});