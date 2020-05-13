 
# Recipe Collective

---

Name: Fatima Alvarado 

Date: 04/29/20

Project Topic: Recipes

URL: 

---


### 1. Data Format and Storage

Recipe Schema fields:
- `Field 1`:     Title       `Type: String`
- `Field 2`:     User       `Type: String`
- `Field 3`:     Calories       `Type: Number`
- `Field 4`:     Instructions       `Type: String`
- `Field 5`:     Reviews       `Type: [reviewSchema]

Recipe Schema: 
```javascript
{
  title: String,
  calories: Number,
  instructions: String,
  user: String,
  reviews: [reviewSchema]
}
```

Review Schema fields:
- `Field 1`:     Rating       `Type: Number between 0.0-5.0`
- `Field 2`:     Comment       `Type: String`
- `Field 3`:     User       `Type: String`

Review Schema: 
```javascript
{
  rating: Number,
  comment: String,
  user: String,
}
```

### 2. Add New Data

HTML form route: `/addRecipe`

POST endpoint route: `/api/addRecipe`

Example Node.js POST request to endpoint: 
```javascript
var request = require("request");

var options = { 
    method: 'POST',
    url: 'http://localhost:3000/addRecipe',
    headers: { 
        'content-type': 'application/x-www-form-urlencoded' 
    },
    form: { 
      title: "Macaroons",
      calories: 90,
      instructions: "Make batter, shape and bake",
      user: "Pierre,
      reviews: []
    } 
};
```

POST endpoint route: `/recipe/:id/addReview`

Example Node.js POST request to endpoint: 
```javascript
var request = require("request");

var options = { 
    method: 'POST',
    url: 'http://localhost:3000/recipe/:id/addReview',
    headers: { 
        'content-type': 'application/x-www-form-urlencoded' 
    },
    form: { 
      rating: 4.5,
      comment: "Completely not ever done before",
      user: "LGaga",
    } 
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
```

### 3. View Data

GET endpoint route: `/getRecipes`

### 4. Search Data

Search Field: Title

### 5. Delete Data

DELETE endpoint route: `/recipe/:id`

DELETE endpoint route: `/recipe/:id/review/last`

### 6. Extra Enpoints

GET endpoint route: `/email/:id/:email`
This sends the recipe with specified id to the specified email using Nodemailer

GET endpoint route: `/sendAll/:email`
This sends a PDF of all recipes in the database to the specified email using PDFkit and Nodemailer

### 7. New Module

Created a module in share.js that initializes and creates a PDF using PDFkit

### 8. New NPM Packages

Used PDFkit and Nodemailer.


