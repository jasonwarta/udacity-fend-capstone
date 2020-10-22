import handleSubmit from '../src/client/js/handleSubmit'

// more in-depth testing for this sort of function isn't practical
// it requires a simulated event, a running server, and costs API credits

describe("Testing handleSubmit", () => {
    test("Function is defined", () => {
        expect(handleSubmit).toBeDefined()
    })

    test("Function throws on undefined event", () => {
        expect(handleSubmit).toThrowError(TypeError)
    })
})