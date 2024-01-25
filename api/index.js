const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./models/User");
const Booking = require("./models/Booking");
const Place = require("./models/Place");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const fs = require("fs");
const imageDownloader = require("image-downloader");
require("dotenv").config();
const connectDb = require("./db/connect");
const nodemailer = require('nodemailer');

const bodyParser = require('body-parser')
const app = express();

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = "dsjdksanksjndnjsjdkn";




// const config = new Configuration({
//   apiKey:"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"

// })
// const openai = new OpenAIApi(config)

app.use(express.json());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use(
  cors({
    credentials: true,
    // works
    origin: "http://localhost:5173",

    // origin:'http://127.0.0.1:5173',
  })
);

console.log("this:", process.env.MONGO_URL);
// mongoose.connect(process.env.MONGO_URL).then(()=>console.log("db connected ........")).catch(err=>console.log(err))





app.post("/register", async (req, res) => {
  console.log("register");

  const { name, email, password } = req.body;

  try {
    const userDoc = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });
    res.json(userDoc);
  } catch (err) {
    res.status(422).json(err);
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const userDoc = await User.findOne({ email });

  if (userDoc) {
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
      jwt.sign(
        { email: userDoc.email, id: userDoc._id },
        jwtSecret,
        {},
        (err, token) => {
          if (err) throw err;
          res.cookie("token", token).json(userDoc);
        }
      );

      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {          
          user:email,
          
          pass: 'adqhbhpswjiiruou'
        
        }
      });

      var mailOptions = {
        from: 'vanshi.vp17@gmail.com',
        // from: '4.ce.2022.ljiet.vanshipatel@gmail.com',
        
        // to: '4.ce.2022.ljiet.vanshipatel@gmail.com',
        // to:'nrupesh.np@gmail.com',
        to: email,
        subject: 'Sending Email using Node.js (booking app)',
        // text: `<h1>you logged in with email: ${email}</h1>`
        html: `<h1>you logged in with email: ${email}</h1>`
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log(`Email sent on: ${email}`);
        }
      });
      


    } else {
      res.status(422).json("password not okay");
    }
  } else {
    res.json("notfound");
  }
});

app.get("/profile", (req, res) => {
  // we need cookie-parser to get token from request headers
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      console.log("userData",userData);
      if (err) throw err;
      const { name, email, _id } = await User.findById(userData.id);
      res.json({ name, email, _id });
    });
  } else {
    res.json(null);
  }
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json(true);
});



console.log("gives us entire path:", __dirname);
app.post("/upload-by-link", async (req, res) => {
  const { link } = req.body;
  const newName = "photo" + Date.now() + ".jpg";
  await imageDownloader.image({
    url: link,
    dest: __dirname + "/uploads/" + newName,
  });
  // res.json(__dirname + '/uploads/' + newName)
  res.json(newName);
});

const photosMiddleware = multer({ dest: "uploads" });
app.post("/upload", photosMiddleware.array("photos", 100), (req, res) => {
  const uploadedFiles = [];
  console.log("req files:", req.files);
  for (let i = 0; i < req.files.length; i++) {
    const fileInfo = req.files[i];
    const { path, originalname } = fileInfo;
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newPath = path + "." + ext;

    // to rename filename on server
    fs.renameSync(path, newPath);

    uploadedFiles.push(newPath.replace("uploads\\", ""));
  }
  res.json(uploadedFiles);
});


// create place
app.post("/places", (req, res) => {
  console.log("entered ");
  console.log(req.cookies);
  const { token } = req.cookies;
  console.log("token", token);
  const {
    title,
    address,
    addedPhotos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price,
  } = req.body;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    const placeDoc = await Place.create({
      owner: userData.id,
      title,
      address,
      photos: addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    });
    res.json(placeDoc);
  });
});

// show places on "my accommodation" page
app.get("/user-places", (req, res) => {
  const { token } = req.cookies;

  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    const { id } = userData;
    const placeDoc = await Place.find({ owner: id });
    res.json(placeDoc);
  });
});

// get one place
app.get("/places/:id", async (req, res) => {
  const { id } = req.params;

  const place = await Place.findById(id);
  console.log("place", place);
  res.json(place);
});

// update place
app.put("/places", async (req, res) => {
  const { token } = req.cookies;
  const {
    id,
    title,
    address,
    addedPhotos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price,
  } = req.body;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    const placeDoc = await Place.findById(id);
    console.log(userData.id);
    console.log(placeDoc.owner);
    console.log(placeDoc.owner.toString());
    if (userData.id === placeDoc.owner.toString()) {
      placeDoc.set({
        title,
        address,
        photos: addedPhotos,
        description,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
        price,
      });
      await placeDoc.save();
      res.json("ok");
    }
  });
});


// show all places 
app.get("/places", async (req, res) => {
    let {price,filter} = req.headers
    const place = await Place.find({})
    if(price){
    const place = await Place.find({}).sort('price')
    res.json(place)
    return 
    }
    console.log("FILTER VALUE:",filter);
    if(filter){
        filter={$regex :filter,$options:'i'}
    const place = await Place.find({address:filter}).sort('price')
    res.json(place)
    return
    }
  res.json(place);
});

const getUserDataFromReq = (req) => {
  return new Promise((resolve, reject) => {
    jwt.verify(req.cookies.token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      resolve(userData);
    });
  });
};

// create booking from booking widget
app.post("/bookings", async (req, res) => {
  const userData = await getUserDataFromReq(req);

  const { place, checkIn, checkOut, numberOfGuests, name, phone, price } =
    req.body;
  console.log("ENTERED");
  const doc = await Booking.create({
    place,
    checkIn,
    checkOut,
    numberOfGuests,
    name,
    phone,
    price,
    user: userData.id,
  });

  res.json(doc);
});

// get all bookings on "my bookings" page
app.get("/bookings", async (req, res) => {
    const { token } = req.cookies;
    const userData = await getUserDataFromReq(req);
    const Doc = await Booking.find({ user: userData.id }).populate("place");
    const c = await Booking.deleteOne({place:null})
    console.log("ccc",c);
  res.json(Doc);
});

// delete specific booking
app.delete("/bookings/:id", async (req, res) => {
  const userData = await getUserDataFromReq(req);
  const { id } = req.params;
  const delDoc = await Booking.findByIdAndDelete({ _id: id });
  console.log("delDOC", delDoc);
  res.json(delDoc);
});

//delete specific place along with bookings affiliated with that place 
app.delete("/places/:id", async (req, res) => {
  const { id } = req.params;
  const booking = await Booking.deleteOne({place:id})
  const booking1 = await Booking.replaceOne({place:id},{place:null})
  console.log("bookings1: ",booking1);
  const placeDoc = await Place.deleteOne({ _id: id }); 
  console.log("selected place deleted:", placeDoc);
  res.json(placeDoc);
  
});



const port = process.env.PORT || 4000
const start = async () => {
  try {
    await connectDb(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`listening at port: ${port}....`);
    });
  } catch (err) {
    console.log(err);
  }
};
start()
