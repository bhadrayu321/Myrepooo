const mongoose = require("mongoose");

const mongoURI =
  "mongodb+srv://admin:admin@cluster0.gsnqxv1.mongodb.net/gofoodmern?retryWrites=true&w=majority";

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(mongoURI, { useNewUrlParser: true });
    console.log("Connected to MongoDB");

    const foodItemsCollection = mongoose.connection.db.collection("food_items");
    const foodCategoryCollection =
      mongoose.connection.db.collection("foodCategory");

    const [foodItems, foodCategories] = await Promise.all([
      foodItemsCollection.find({}).toArray(),
      foodCategoryCollection.find({}).toArray(),
    ]);

    global.food_items = foodItems;
    global.foodCategory = foodCategories;

    //console.log(global.foodCategory);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

module.exports = connectToMongoDB;

// const mongoose = require("mongoose");
// const mongoURI =
//   "mongodb+srv://admin:admin@cluster0.gsnqxv1.mongodb.net/gofoodmern?retryWrites=true&w=majority";

// const mongoDB = async () => {
//   try {
//     await mongoose.connect(mongoURI, { useNewUrlParser: true });
//     console.log("Connected to MongoDB");
//     const fetched_data = await mongoose.connection.db.collection("food_items");
//     fetched_data.find({}).toArray(function (err, data) {
//       if (err) console.log(err);
//       else console.log(data);
//     });
//   } catch (error) {
//     console.error("Error connecting to MongoDB:", error);
//   }
// };

// module.exports = mongoDB;
