import mongoose from "mongoose";

if(process.argv.length < 3){
    console.log('give password as argument');
    process.exit(1)
}

const password = process.argv[2]

const url =  `mongodb+srv://brunoarndt73:${password}@fullstack.emcl5.mongodb.net/phonebook?retryWrites=true&w=majority&appName=fullstack`

mongoose.set('strictQuery',false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)

if (!process.argv[3] && !process.argv[4]) {
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(person);
        });
        mongoose.connection.close().then(() => process.exit(0));
    });
} else {
    const name = process.argv[3];
    const number = process.argv[4];

    const person = new Person({
        name: name,
        number: number,
    });

    person.save().then(() => {
        console.log(`Added ${name} number ${number} to phonebook`);
        mongoose.connection.close();
    });
}
