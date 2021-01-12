## Get :
- app.get("/") Home Page (Will show 3  products) -
- app.get("/products") Shows all products -
- app.get("/products/:product_id") (Will show each product on separate pages) -
- app.get("/products/favourites") - My Favourites Page (Available for logged in users)
(USE COOKIE) -
- app.get("/login") Login Page  -
- app.get("/signup") Sign up Page -
- app.get("/products/new") create product page (Admin only) -
- app.get("/about-us") About us Page -
- app.get("/messages") List of all messages -
- app.get("/messages/:conversation_id") List messages grouped by conversation (for each product per user) -
- Strech:
- - app.get("/contact") contact page (For all with some text about us and phone numb and address) 
- - app.get("/products/search") Search page

## POST:
- app.post("/login") Login page  -
- app.post("/signup") Sign up page -
- app.post("/logout") Logout page -
- app.post("/products") Post New Product Created by Admin pn Products page -
- app.post("/products/:product_id/favourite") User can unfavourite -
- TBC?: app.post("/messages") Send messages
- Stretch:
- - app.post("/products/search") Search page 

