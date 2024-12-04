const mongo = require("mongoose")
const ex = require("express")
const app = ex()
app.use(ex.json())


mongo.connect
("mongodb+srv://4@hadi-database.zo37f.mongodb.net/?retryWrites=true&w=majority&appName=hadi-database")

app.post("signup", async (req,res)=>{

    const user = mongo.model("users", {name: String, username: String, password: String })
    
    const name = req.body.name
    const username = req.body.username
    const password = req.body.password

   
    const existUser = await user.findOne({username: username})
    if(existUser){
        res.status(400).send("user already exists")
    }
    const user1 = new user({name: name, username: username, password: password})
    // user.create({name, username, password})
    user1.save()

    res.json({
        msg: "user created successfully"
    })
})


app.listen(3000)

