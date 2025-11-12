import {expect, describe, it} from "vitest"

import { snakeCase } from "./string-utils"

describe("snake case function", () => {
    it("should convert a simple string to snake case", () => {
        const result = snakeCase("Hello World")
        expect(result).toBe("hello_world")
    })
})
