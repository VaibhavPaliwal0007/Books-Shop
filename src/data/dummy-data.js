const { faker } = require("@faker-js/faker");

const Author = require("../models/Author");
const Book = require("../models/Book");

async function createDummyData() {
    try {
        await Author.deleteMany({});
        await Book.deleteMany({});
    } catch (err) {
        console.log(err);
    }

    try {
        for (let i = 0; i < 10; i++) {
            const name = faker.name.findName();
            const password = faker.internet.password();
            const email = faker.internet.email();
            const phoneNo = faker.phone.number("9#########");

            const author = new Author({
                name,
                password,
                email,
                phoneNo,
            });

            await author.save();

            for (let j = 0; j < 10; j++) {
                const bookName = faker.lorem.sentence();
                const likes = faker.datatype.number({ min: 10, max: 100 });

                const book = new Book({
                    title: bookName,
                    likes,
                    author: name,
                });

                await book.save();
            }
        }
    } catch (err) {
        console.log(err);
    }
}

createDummyData();

module.exports = createDummyData;
