// using express
const express = require("express");
const cors = require("cors");
/*const { UserModel, PackageModel, BookingModel } = require("./db");*/
const { UserModel, PackageModel, BookingModel, WishlistModel } = require("./db");

const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

//create an instance of express
const app = express();
// app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}))


// Replace app.use(cors()); with this:
app.use(cors({
    origin: ["http://localhost:3000","https://wonderaway-frontend.onrender.com" ],// or whatever port your frontend is on
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));
// authontication middlewares

function auth(req,res,next){
    try{
         const token = req.headers.token;
        if(!token)
            return res.status(403).json({message:"No token provided"});
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        req.userid=decoded.id;
        req.role=decoded.role;
        next();
    }catch(err){
        return res.status(403).json({message:"Invalid or expired token"});
    }
};

//user auth
function userAuth(req, res, next) {
     if(req.role!=="user"){
            return res.status(403).json({message:"user access only"});
 }
 next();
};
 
//admin auth

function agencyAuth(req, res, next) {
     if(req.role!=="agency"){
            return res.status(403).json({message:"user access only"});
 }
 next();
};






app.get("/", (req, res) => {
    res.send("traveling web backend is running.....")
});


//user routers


//create user   --signup  or register
app.post("/register/user", async (req, res) => {
try{
    const { name, email, password } = req.body;




            const existingUser=await UserModel.findOne({email});
        if(existingUser){
            return res.status(400).json({message:"User already exists"});
        }

        const newUser = new UserModel({
            name, email, password, role:"user"
        });
        await newUser.save();
        res.status(201).json({message:"user registered successfylly",user: newUser });
    }catch(error){
        console.error("user register error",error);
        res.status(500).json({message:error.message});
    }
});

app.post("/register/agency",async(req,res)=>{
    try{
     const { name, email, password ,agencyprofile} = req.body;

     
            const existingUser=await UserModel.findOne({email});
        if(existingUser){
            return res.status(400).json({message:"agency  already exists"});
        }



        const newAgency=new UserModel({name,email,password,role:"agency",agencyprofile:{
        companyname:agencyprofile?.companyname,
        licenseNumber:agencyprofile?.licenseNumber,
        gstNumber:agencyprofile?. gstNumber,
        address:agencyprofile?. address,
        phone:agencyprofile?. phone,

        

    }})
     await newAgency.save();
        res.status(201).json({message:"agency registered sucessfully",user: newAgency });
    }catch(error){
        console.error("agency registered error:",error);
        res.status(500).json({message:error.message})
    }
});
     


//get all user info--may be for admin only                          //admin only 
app.get('/user', async (req, res) => {
    try {
        const user = await UserModel.find();
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})
//get user by id --for ..to display user's profile page(may be optinal)      //user-auth

app.get("/user:id",auth,userAuth, async (req, res) => {
    try {
        const id = req.params.id;
        const user = await UserModel.findById(id);
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})
//update user  put user/:id                             //user -auth

app.put("/user:id",auth,userAuth, async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const id = req.params.id;

        const updateduser = await UserModel.findByIdAndUpdate(
            id,
            { name, email, password },
            { new: true }
        );
        if (!updateduser) {
            return res.status(404).json({ message: "user not found" })
        }
        res.json({ updateduser });
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
});

//delete user                                            //user-auth
app.delete("/user:id",auth,userAuth, async (req, res) => {
    try {
        const id = req.params.id;
        await UserModel.findByIdAndDelete(id);
        res.status(204).end();
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
});



// user login or sign in                   //user-auth





app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        if (password !== user.password) {
            return res.status(400).json({ message: "Incorrect password" });
        }

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        const responseUser = {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        };

        // ✅ SEND RESPONSE
        res.status(200).json({
            message: "Login successful",
            user: responseUser,
            token
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


//agency  login 

app.post("/login/agency", async (req, res) => {
    try {
        const { email, password } = req.body;

        //checking if user exists or not

        const agency = await UserModel.findOne({ email });

        if (!agency) {
            return res.send("Agency not found");
        }

        if (agency.password !== password) {
            return res.send("incorrect password");
        }
        //generating token 
         const token=jwt.sign(
            {id:agency._id,role:agency.role},
            process.env.JWT_SECRET,
            {expiresIn:"1d"}
        );

        //filtered response for agency

        const responseAgency={
            id:agency._id,
            name:agency.name,
            email:agency.email,
            role:agency.role,
            agencyprofile:agency.agencyprofile
        };
    

     res.json({message:" Agency   Login successful",user:responseAgency,token});
    } catch (error) {
         res.status(500).send(error.message)
    }
});




//code for wishlist



// Replace your existing wishlist POST and DELETE routes with this single Toggle route
app.post("/wishlist/toggle", auth, async (req, res) => {
    try {
        const { packageId, title, price, image,days,description } = req.body;

        // 1. Check if it exists for THIS user
        const existing = await WishlistModel.findOne({ 
            user_id: req.userid, 
            package_id: packageId 
        });

        if (existing) {
            // 2. Logic: If found, REMOVE it
            await WishlistModel.deleteOne({ _id: existing._id });
            return res.status(200).json({ status: "removed" });
        } else {
            // 3. Logic: If NOT found, ADD it
            const newItem = new WishlistModel({
                user_id: req.userid,
                package_id: packageId,
                title, price, image,days,description
            });
            await newItem.save();
            return res.status(201).json({ status: "added" });
        }
    } catch (err) {
        // This will print the error to your VS Code terminal
        console.error("Wishlist Toggle Error:", err); 
        res.status(500).json({ error: err.message });
    }
});



app.get("/wishlist", auth, async (req, res) => {
    const items = await WishlistModel
        .find({ user_id: req.userid })
        .populate("package_id"); // 

    res.json(items);
});








app.post("/packages", auth, agencyAuth, async (req, res) => {
  try {
    const { title, description, days, price, image } = req.body;

    const newPackage = new PackageModel({
      title,
      description,
      days,
      price,
      image,
      agency_id: req.userid   
    });

    await newPackage.save();
    res.status(201).json(newPackage);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.get("/agency/packages", auth, agencyAuth, async (req, res) => {
  try {
    const packages = await PackageModel.find({
      agency_id: req.userid
    });

    res.json(packages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


//get all package info--may be for admin only
app.get('/packages',async (req, res) => {
    try {
        const packages = await PackageModel.find();
        res.json(packages);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})
//get package by id --for ..to display selected packages           //may be both auth?

app.get("/packages:id",auth,userAuth,agencyAuth,async (req, res) => {
    try {
        const id = req.params.id;
        const packages = await PackageModel.findById(id);
        res.json(packages);
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})
//update package  

app.put("/packages/:id", auth,agencyAuth,async (req, res) => {
    try {
        const {title,description,days,price,image} = req.body;
        const id = req.params.id;

        const updatedpackage = await PackageModel.findByIdAndUpdate(
            id,
            { title,description,days,price,image},
            { new: true }
        );
        if (!updatedpackage) {
            return res.status(404).json({ message: "user not found" })
        }
        res.json({ updatedpackage });
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
});

//delete package ---for admin only
app.delete("/packages/:id",auth,agencyAuth,async (req, res) => {
    try {
        const id = req.params.id;
        await PackageModel.findByIdAndDelete(id);
        res.status(204).end();
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
});








app.post("/bookings", auth, userAuth, async (req, res) => {
    try {
        const {
            package_id,
            packageName,
            price,
            travelDate,
            numOfTravelers,
            notes
        } = req.body;

        // Get logged-in user
        const user = await UserModel.findById(req.userid);
        if (!user) return res.status(404).json({ message: "User not found" });

        // Get package to find the agency
        const packageData = await PackageModel.findById(package_id);
        if (!packageData) return res.status(404).json({ message: "Package not found" });

        // Get agency info
        const agency = await UserModel.findById(packageData.agency_id);
        if (!agency) return res.status(404).json({ message: "Agency not found" });

        // Save booking
        const newBooking = new BookingModel({
            package_id,
            packageName,
            price,
            user_id: req.userid,
            userName: user.name,
            email: user.email,
            travelDate,
            numOfTravelers,
            notes
        });

        await newBooking.save();

        // Return booking + agency info (optional)
        res.status(201).json({
            booking: newBooking,
            agency: {
                name: agency.name,
                email: agency.email,
                company: agency.agencyprofile?.companyname
            }
        });

    } catch (err) {
        console.error("Booking POST error:", err);
        res.status(500).json({ error: err.message });
    }
});


// --- Get all bookings for the logged-in agency ---
app.get("/agency/bookings", auth, agencyAuth, async (req, res) => {
    try {
        // 1️⃣ Get all packages for this agency
        const packages = await PackageModel.find({ agency_id: req.userid }).select("_id title");
        const packageIds = packages.map(pkg => pkg._id);

        if (packageIds.length === 0) {
            return res.status(200).json({ message: "No packages found for this agency", bookings: [] });
        }

        // 2️⃣ Get all bookings for these packages
       const bookings = await BookingModel.find({ package_id: { $in: packageIds } })
    .populate("user_id", "name email")
    .populate("package_id", "title")
    .lean(); // returns plain JS objects, avoids Mongoose magic

        // 3️⃣ Return the bookings
        res.status(200).json({ bookings });
    } catch (err) {
        console.error("Error fetching agency bookings:", err);
        res.status(500).json({ error: err.message });
    }
});









app.get('/bookings', auth, userAuth, async (req, res) => {
    try {
        const bookings = await BookingModel.find({
            user_id: req.userid
        });

        res.json(bookings);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


app.put("/bookings:id",auth, userAuth,async (req, res) => {
    try {
        const { package_id, user_id, seats, status } = req.body;
        const id = req.params.id;

        const updatedBooking = await BookingModel.findByIdAndUpdate(
            id,
            { package_id, user_id, seats, status },
            { new: true }
        );
        if (!updatedBooking) {
            return res.status(404).json({ message: "user not found" })
        }
        res.json({ updatedBooking });
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
});


app.delete("/bookings/:id", auth, userAuth, async (req, res) => {
    const booking = await BookingModel.findOne({
        _id: req.params.id,
        user_id: req.userid
    });

    if (!booking) {
        return res.status(403).json({ message: "Access denied" });
    }

    await booking.deleteOne();
    res.status(204).end();
});





//start server

const port = process.env.PORT  || 5000;
app.listen(port, () => {
    console.log("Server is listening to port", port)
});



