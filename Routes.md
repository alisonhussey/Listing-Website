## Get :
- app.get("/") Home Page (Will show all products)
- app.get("/products/:id") (Will show each product on separate pages)
- app.get("/favourites/:user_id") - My Favourites Page (Available for logged in users)
- app.get("/login") Login Page  
- app.get("/signup") Sign up Page 
- app.get("/search") Search page
- app.get("/createproduct") create product page (Admin only)
- app.get("/aboutus") About us Page
- app.get("/cart") My cart Page (Available for logged in users)
- Strech app.get("/contact") contact page (For all with some text about us and phone numb and address) 

## POST:
- app.post("/login") Login page  
- app.post("/signup") Sign up page 
- app.post("/logout") Logout page
- app.post("/search") Search page 
- app.post("/favourites/:user_id") User can unfavourite (or Checkout?)
- app.post("/products/:id") Favourite/ Message/ Add to cart
