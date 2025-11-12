import { expect, describe, it } from "vitest";

import { filterMealsByKind } from "./filter-helpers";

const testData = [
    {
        "meal_name": "Roast Duck",
        "guest_name": "Robert",
        "serves": 4,
        "kind_of_dish": "entree",
    },
    {
        "meal_name": "Chef Salad",
        "guest_name": "Robert",
        "serves": 3,
        "kind_of_dish": "side",
    },
    {
        "meal_name": "Roast Duck Dinner",
        "guest_name": "Robert",
        "serves": 12,
        "kind_of_dish": "entree",
    }
];


describe("Filter Meal" ,() => {
    it("should return all meals if set to all", () => {
        const result = filterMealsByKind(testData, "all");
        expect(result.length).toBe(3)
    })
    it("should filter out the entrees", () => {
        const result = filterMealsByKind(testData, "entree");
        expect(result.length).toBe(2)
    })
    it("should filter out the sides", () => {
        const result = filterMealsByKind(testData, "side");
        expect(result.length).toBe(1)
    })
})


