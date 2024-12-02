// setting MongoDB
const { MongoClient, ObjectId } = require("mongodb");
const client = new MongoClient(process.env.MONGO_URL);
const database = client.db("sample_mflix");
const databaseCollection = database.collection("products");



module.exports= function(app) {
   
   app.get("/products", async (req, res) => {
      try{const data = databaseCollection.find({});
      const result = await data.toArray();
      const dataProducts={products:result}
      res.render('index', dataProducts);
      }
      catch(error){
         res
         .status(500)
         .json({message:"Internal server eror. Error fetching product", error})
      }
    });

    app.get("/products/:id", async (req, res) => {
      try{
         const id = req.params.id;
         const query = { _id: new ObjectId(id) };
         const data = databaseCollection.find(query);
         const result = await data.toArray();
         const {name, description, price}=result[0]
         const dataProduct={name, description, price}
         res.render('products', dataProduct);
      }
      catch(error){
         res
         .status(500)
         .json({message:"Internal server eror. Error fetching product", error})
      }
    });

 

}