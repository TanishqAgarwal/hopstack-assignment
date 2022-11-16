const express = require('express');
const router = express.Router();
const axios = require("axios");
const FoodModel = require('../models/food_items');


router.get("/",async(req,res)=>{
    // console.log(req)
    let {foodName} = req.query;
    foodName = foodName.toLowerCase();

    if(foodName === undefined){
        return res.status(401).send("Food Name sent incorrectly");
    }

    try{
        
        const ItemsFromDB = await FoodModel.findOne({query:foodName})
        // console.log(ItemsFromDB)
        
        //checking if the foodname is already present in the database
        if(ItemsFromDB){
            console.log(ItemsFromDB)
            return res.status(201).send(ItemsFromDB)
        }
        
        // axios fetches data from third party api
        const items = await axios.post("https://api.nutritionix.com/v1_1/search", {
            appId : process.env.appID,
            appKey : process.env.appKey,
            query : foodName,
            fields : ["item_name","brand_name","nf_calories","item_type"]

        })

        // extracting only required data from the data received from nutritionix api
        let filteredItems = items.data.hits.map((item) => {
            
            return {
                name : item.fields.item_name,
                brand_name : item.fields.brand_name,
                calories : item.fields.nf_calories
            }
            
        })


        //showing only top 5 results
        if(filteredItems.length >= 5)
        {
            filteredItems = filteredItems.slice(0,5)
        }


        // console.log(filteredItems)

        const foodItems = await FoodModel.create({query: foodName, results: filteredItems}) // caching the result in database

        // console.log(foodItems)

        return res.status(201).send(foodItems)


    }catch(err){
        console.log(err);
        return res.status(502).send("Server Error");
    }
})


module.exports = router;