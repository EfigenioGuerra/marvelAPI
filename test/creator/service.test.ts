import creatorService from "../../src/service/creators.service";
import creatorsSchema from "../../src/schema/creators.schema";

jest.mock("../../src/schema/creators.schema");

describe("Creator Service", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("findAll", () => {
        it("should find all creators", async () => {
            const mockCreators = [{ fullName: "Creator 1" }, { fullName: "Creator 2" }];
            (creatorsSchema.find as jest.Mock).mockResolvedValue(mockCreators);

            const result = await creatorService.findAll();

            expect(result).toEqual(mockCreators);
        });
    });

    describe("findById", () => {
        it("should find creator by id", async () => {
            const mockCreator = { fullName: "Creator 1" };
            (creatorsSchema.findById as jest.Mock).mockResolvedValue(mockCreator);

            const result = await creatorService.findById("123");

            expect(result).toEqual(mockCreator);
        });
    });

    describe("findByIdBanco", () => {
        it("should find creator by id in the database", async () => {
            const mockCreator = { fullName: "Creator 1" };
            (creatorsSchema.findById as jest.Mock).mockResolvedValue(mockCreator);

            const result = await creatorService.findByIdBanco("123");

            expect(result).toEqual(mockCreator);
        });
    });

    describe("delete", () => {
        it("should delete creator", async () => {
            const mockCreatorId = "123";
            (creatorsSchema.findByIdAndDelete as jest.Mock).mockResolvedValue(undefined);

            const result = await creatorService.delete(mockCreatorId);

            expect(result).toEqual("Creator Removed");
        });
    });
});
