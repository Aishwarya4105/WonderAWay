const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;
const dotenv = require("dotenv");
dotenv.config();

//connecting mongodb
mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log('DB connected!')
    })
    .catch((err) => {

        console.log(err)
    })



const User = new Schema({
    name: {required:true,type:String} ,  
    email: {required:true,type:String,unique:true} ,  
    password:{required:true,type:String} ,

    role:{type:String,enum:["user","agency"] ,required:true},
     
    agencyprofile:{
        companyname:{ type:String },
        licenseNumber:{type:String},
        gstNumber:{type:String},
        address:{type:String},
        phone:{type:String},

        

    }
},
{timestamps:true}
);

const Wishlist = new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: 'users', required: true },
    package_id: { type: Schema.Types.ObjectId, ref: 'packages', required: true },
    // We store these to show them on the wishlist page without extra lookups
    title: String,
    price: Number,
    image: String,
    days:Number,
    description:String,
}, { timestamps: true });

const Package = new Schema({
    image: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    days: { type: Number, required: true },

    agency_id: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true
    }
}, { timestamps: true });

const Booking = new Schema({
    package_id: { type: Schema.Types.ObjectId, ref: 'packages', required: true },
    packageName: { type: String, required: true },
    price: { type: Number, required: true }, // Use Number, not String
    user_id: { type: Schema.Types.ObjectId, ref: 'users', required: true }, // FIXED
    userName: { type: String},
    email: { type: String},
    travelDate: { type: Date, required: true },
    numOfTravelers: { type: Number, required: true },
    notes: { type: String },
    status: { type: String, default: "pending" },
    razorpayOrderId: String,
    razorpayPaymentId: String
}, { timestamps: true });



const UserModel = mongoose.model('users', User);
const PackageModel = mongoose.model('packages', Package);
const BookingModel = mongoose.model('booking', Booking);
const WishlistModel = mongoose.model('Wishlist', Wishlist);


//export this

module.exports = {
    UserModel: UserModel,
    PackageModel: PackageModel,
    BookingModel: BookingModel,
      WishlistModel: WishlistModel, 
}

