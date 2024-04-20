require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const { graphqlHTTP } = require("express-graphql");
const { schema, root } = require("./src/graphql/schema");
const User = require("./src/models/User");
const PrivilegeType = require("./src/data/userData");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors())
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const createAdmin = async () => {
  const user = await User.findOne({ username: "admin" });
  if (!user) {
    //create admin
    try { 
      const newUser = new User({
        username: "admin",
        password: "admin",
        firstName: "admin",
        lastName: "admin",
        roomNumber: 0,
        privilege: PrivilegeType.manager,
      });
  
      await newUser.save();
      console.log("admin created successfully");
    } catch (error) {
      console.log(error);
    }
  }else{
    console.log("admin exist");
  }
}
createAdmin();

const port = process.env.PORT || 4000;

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

app.listen(port, () => console.log(`Server running on port ${port}`));
