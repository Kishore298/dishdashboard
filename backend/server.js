const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const app = express();
const connectDatabase = require('./config/connectDatabase');
const cors = require('cors');
const Dish = require('./models/Dish');
dotenv.config({path: path.join(__dirname,'config','.env')})

connectDatabase();
app.use(express.json());
app.use(cors());




const seedDatabase = async () => {
    try {
 
       const dishes =  [
            {
            dishName: "Jeera Rice",
            dishId: "1",
            imageUrl: "https://nosh-assignment.s3.ap-south-1.amazonaws.com/jeera-rice.jpg",
            isPublished: true
            },
            {
            dishName: "Paneer Tikka",
            dishId: "2",
            imageUrl: "https://nosh-assignment.s3.ap-south-1.amazonaws.com/paneer-tikka.jpg",
            isPublished: true
            },
            {
            dishName: "Rabdi",
            dishId: "3",
            imageUrl: "https://nosh-assignment.s3.ap-south-1.amazonaws.com/rabdi.jpg",
            isPublished: true
            },
            {
            dishName: "Chicken Biryani",
            dishId: "4",
            imageUrl: "https://nosh-assignment.s3.ap-south-1.amazonaws.com/chicken-biryani.jpg",
            isPublished: true
            },
            {
            dishName: "Alfredo Pasta",
            dishId: "5",
            imageUrl: "https://nosh-assignment.s3.ap-south-1.amazonaws.com/alfredo-pasta.jpg",
            isPublished: true
            }
            ]
          

        await Dish.insertMany(dishes);
        console.log('Database seeded successfully');
    } catch (error) {
        console.error('Error seeding database:', error);
    }
};
 
// Seed the database on server startup
seedDatabase();


// api routes

//get dishes
app.get('/api/dishes', async (req, res) => {
  const dishes = await Dish.find();
  res.json(dishes);
});

app.post('/api/dishes/toggle/:id', async (req, res) => {
  const { id } = req.params;
  const dish = await Dish.findOne({ dishId: id });
  if (dish) {
    dish.isPublished = !dish.isPublished;
    await dish.save();
    res.json(dish);
  } else {
    res.status(404).send('Dish not found');
  }
});

app.listen(process.env.PORT,() => {
    console.log(`server listening on port ${process.env.PORT} in ${process.env.NODE_ENV}`)
});