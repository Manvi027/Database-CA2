const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config()

const app = express();
app.use(express.json());
PORT = 5000;

const restaurantSchema = new mongoose.Schema ({
    name :{type :String , required :true},
    location : {type: String , required : true},
    cuisine : {type :String , required: true},
    rating : {type : Number},
    menu: [{ name : {type : String, required:true},
             description : {type: String, required:true},
             price :{ type : number , required:true}}],
            
});

const Restaurant = mongoose.model('Restaurant',restaurantSchema);

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch(error => console.error("Error connecting to MongoDB", error));

    app.post('/additem', async(req,res) => {
        const {name,location,cuisine,rating,menu}=req.body;
        if(!name || !location || !cuisine  || !menu){
            return res.status(400).send("All fields are required")
        }
        try {
          const Restaurant = new {name,location,cuisine};
          await Restaurant.save();
          res.send('added successfully')
        }
        catch (error){
            res.status(500).send("Something went wrong")
        }
    });

    app.get('/item', async (req,res) => {
        try{
            const Restaurant = await Restaurant.find();
            if (!Restaurant.length) {
                return res.status(404).send("not found")
            }
            res.send("workout");
        }
        catch (error){
            res.status(500).send("error getting");
        }
    })

    app.put ('/item' , async (req,res) => {
        try{
            const Restaurant = await Restaurant.findByIdAndUpdate(req.params.id)
        }
        catch (error){
            
        }
    })

    app.delete('/itemde', async (req,res) =>{
        try{
            const Restaurant = await Restaurant.findByIdAndDelete(req.params.id);
        }
        catch (error){

        }
    })

app.listen(PORT, () => {
    console.log(`server is running on  http://localhost:${PORT}`)
});
