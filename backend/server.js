const express = require('express')
const ConnectDB = require('./config/db')
const productRoutes = require('./routes/product.routes')
const userRoutes = require('./routes/user.routes')
const cookieParser = require("cookie-parser");
const dotenv = require('dotenv')
const cors = require('cors')
const GetRoutes = require('./routes/productGet')
// const adminRoutes = require('./routes/admin.Routes')
const Viewproduct = require('./routes/viewProduct')
const orderRoutes = require('./routes/orderRoutes')
const dashboardRoutes = require('./routes/dashbordRoutes')
const getProfile = require('./routes/profile.routes')
dotenv.config()




const app = express()
app.use(express.json())
app.use(cookieParser());

 app.use(
  cors({
    origin: [
      "https://shopeease-2.onrender.com",
      "https://shopease-3.onrender.com",
    ],
    credentials: true,
  })
);
  
ConnectDB()






app.use('/api/users',userRoutes)
app.use('/api/product',productRoutes)
app.use('/api',GetRoutes)
app.use("/api/users", dashboardRoutes);

app.use('/api/products',Viewproduct)
app.use("/api/users", getProfile);

 


//order--------------------------------------

app.use('/api/orders' , orderRoutes)









app.listen(5000,()=>{

    console.log('server is live')

})