const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FoodSchema = new Schema(
    {
    query:{
        type:String,
        required:true
    },

    results:[
        {
            name: {type:String, required:true},
            brand_name: {type:String, required:true},
            calories: {type:Number, required:true}
        }
    ]

    },
    { timestamps:true}
);

module.exports = mongoose.model("food-items",FoodSchema);