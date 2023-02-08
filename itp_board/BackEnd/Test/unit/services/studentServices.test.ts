import {describe} from "node:test";
import {create, fetchAll, remove, update} from "../../../src/services/studentServices";
import {AppDataSource} from "../../../src/configs/db.config";
import {Student} from "../../../src/models/student";
import {io} from "../../../src/utils/app";
import {studentData} from "../../dummy";

const studentRepository = AppDataSource.getRepository(Student)
jest.mock('../../../src/configs/db.config', () => (
        {
            AppDataSource: {
                getRepository: jest.fn().mockReturnValue({
                    findOneBy: jest.fn(),
                    find: jest.fn(),
                    save: jest.fn(),
                    remove: jest.fn(),
                }),
            },
        }
    )
);

describe(
    "Create student",
    () => {
        it(
            "Response with id,name,gender,address,dateOfBirth",
            async () => {
                const name = "Hashen Perera";
                const gender = "male";
                const address = "pannipitiya";
                const dateOfBirth = "22/09/1997";
                const mobileNo = "0714748483";
                const expectedResponse = {
                    id: 10,
                    name: "Hashen Perera",
                    gender: "male",
                    address: "pannipitiya",
                    dateOfBirth: new Date("22/09/1997"),
                    mobileNo: "0714748483"
                }
                jest.spyOn(studentRepository, "save").mockResolvedValueOnce(expectedResponse);
                io.emit = jest.fn();
                const response = await create(name, gender, address, dateOfBirth, mobileNo)
                expect(response).toEqual(expectedResponse);
                expect(io.emit).toHaveBeenCalledWith('new_student_added', expectedResponse);
            }
        );

        it(
            "Should throw error when there is an error in save function",
            async () => {
                const name = "Hashen Perera";
                const gender = "male";
                const address = "pannipitiya";
                const dateOfBirth = "22/09/1997";
                const mobileNo = "0714748483";
                jest.spyOn(studentRepository, 'save').mockRejectedValue(new Error('Error in find'))
                await expect(create(name, gender, address, dateOfBirth, mobileNo)).rejects.toThrowError('Error in find')
            }
        );
    }
)
describe(
    'Remove student',
    () => {
        it('should emit "student_deleted" event and return response when student is deleted', async () => {
            const expectedResponse = {
                "raw": [],
                "affected": 1
            }
            studentRepository.delete = jest.fn().mockResolvedValue(expectedResponse);
            io.emit = jest.fn();

            const id = 1;
            const response = await remove(id);

            expect(response).toBe(expectedResponse);
            expect(studentRepository.delete).toHaveBeenCalledWith({id});
            expect(io.emit).toHaveBeenCalledWith('student_deleted', id);
        });

        it('should not emit "student_deleted" event and return response with 0 affected rows for unavilable id', async () => {
            const expectedResponse = {
                "raw": [],
                "affected": 0
            }
            studentRepository.delete = jest.fn().mockResolvedValue(expectedResponse);
            io.emit = jest.fn();

            const id = 1;
            const response = await remove(id);

            expect(response).toBe(expectedResponse);
            expect(studentRepository.delete).toHaveBeenCalledWith({id});
            expect(io.emit).not.toHaveBeenCalledWith('student_deleted', id);
        });
    });

describe(
    "Update Student data",
    () => {
        it(
            "Should return affected rows",
            async () => {
                const id = 10;
                const editData = {name: 'kavindu', address: 'homagama'}
                const expectedResponse = {generatedMaps: [], raw: [], affected: 1};
                studentRepository.update = jest.fn().mockResolvedValueOnce(expectedResponse);
                io.emit = jest.fn();
                const response = await update(id, editData);
                expect(response).toEqual(expectedResponse);
                expect(io.emit).toHaveBeenCalledWith('student_edited', id);
            }
        )

        it(
            "Should return 0 affected rows for unavailable id",
            async () => {
                const id = 1;
                const editData = {name: 'kavindu', address: 'homagama'}
                const expectedResponse = {generatedMaps: [], raw: [], affected: 0};
                studentRepository.update = jest.fn().mockResolvedValueOnce(expectedResponse);
                io.emit = jest.fn();
                const response = await update(id, editData);
                expect(response).toEqual(expectedResponse);
                expect(io.emit).not.toHaveBeenCalledWith('student_edited', id);
            }
        )

        it(
            "Should throw and error when there is an error in update",
            async () => {
                const id = 1;
                const editData = {name: 'kavindu', address: 'homagama'}
                studentRepository.update = jest.fn().mockRejectedValue(new Error('Error in update'));
                await expect(update(id, editData)).rejects.toThrowError('Error in update')
            }
        )

    }
)

describe(
    "Fetch all Student data",
    () => {
        it(
            "Should return list of student data",
            async () => {
                const expectedResponse = studentData;
                jest.spyOn(studentRepository, "find").mockResolvedValueOnce(studentData);
                const response = await fetchAll();
                expect(response).toEqual(expectedResponse);
            }
        );

        it(
            "Should throw and error when there is an error in find",
            async () => {
                jest.spyOn(studentRepository, 'find').mockRejectedValue(new Error('Error in find'))
                await expect(fetchAll()).rejects.toThrowError('Error in find')
            }
        )
    }
)




