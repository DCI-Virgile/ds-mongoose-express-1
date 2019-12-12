const mongoose = require("mongoose");
const faker = require("faker");

const userSchema = new mongoose.Schema(
  {
    firstname: String,
    lastname: String,
    email: String,
    age: Number
  },
  { versionKey: false }
);

const User = mongoose.model("user", userSchema);

mongoose.connect("mongodb://localhost/users", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const toCreate = 5;

// mongoose.connection
//   .on("open", () => {
//     console.log("MongoDB Connection established");
//     for (i = 0; i < toCreate; i++) {
//       const firstname = faker.name.firstName();
//       const lastname = faker.name.lastName();
//       const email = `${firstname.toLowerCase()}.${lastname.toLowerCase()}@email.com`;
//       const age = faker.random.number({ min: 18, max: 50 });

//       User.create({
//         firstname: firstname,
//         lastname: lastname,
//         email: email,
//         age: age
//       }).then(user => {
//         console.log(user);
//       });
//     }
//   })
//   .then(() => {
//     mongoose.connection.close("close", () => {
//       console.log("MongoDB Connection closed");
//     });
//   });

mongoose.connection.on("open", async () => {
  console.log("MongoDB Connection established");
  try {
    for (i = 0; i < toCreate; i++) {
      const firstname = faker.name.firstName();
      const lastname = faker.name.lastName();
      const email = `${firstname.toLowerCase()}.${lastname.toLowerCase()}@email.com`;
      const age = faker.random.number({ min: 18, max: 50 });

      const newUser = await User.create({
        firstname: firstname,
        lastname: lastname,
        email: email,
        age: age
      });
      console.log(newUser);
    }
  } catch (e) {
    console.error(e);
  } finally {
    mongoose.connection.close("close", () => {
      console.log("MongoDB Connection closed");
    });
  }
});
