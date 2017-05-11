##YelpCamp

This project was completed as part of a Udemy course, it is a fully functional production version of the site. I made a wholehost of changes to the original material.

inluding 

```
Mae a number of wholesale changes to the UI/UX - using a modified version of the gaia template from creative-Tim
Added ability for users to search
Split out views into seperate UI components
Added a number of new links like My campgrounds, MY Reviews
Added ability for user to edit their own user profile and change passwords
Added ability for user to edit their own campgrounds
Made a number Extended the user, campground models, and added a number of new routes
Added identicon support for users avatar using jdenticon.js
Created an actual logo with a modified version of a logo from the Noun Project
To give the site a bit more legitmacy I scrapped data from a website offering similar to seed the data base

upload images via drag and drop/or image finder

```

I will be launching a udemy course on how I exteneded the original Yelpcamp into a fully fledged app.

## Code Example

```
//SEARCH POST ROUTE
router.post("/search", function (req,res){ 
      var search = req.body.search;
	  if (search){
		res.redirect("/search?q="+search)
	  }
	  else {
	     res.redirect("/search")
	  }
})

//SEARCH GET ROUTE
router.get("/search", function (req,res){
	var query = req.query["q"]
	if (query){//if search then search
        Campground.find({location: new RegExp(query, 'i')}, function(err, campgrounds){
            if (err){
                console.log(err)
            }
            else{
                res.render("campgrounds/search", {campgrounds, query})
            }
        })
    }
    else {
        Campground.find({}, function(err, campgrounds){
            if (err){
                console.log(err)
            }
            else{
                res.render("campgrounds/search", {campgrounds, query: "/search"})
            }
        })
    }
})
```

Show what the library does as concisely as possible, developers should be able to figure out **how** your project solves their problem by looking at the code example. Make sure the API you are showing off is obvious, and that your code is short and concise.

## Motivation

This project was a built as a side project over a few weeks, to pull all the knowledge I have gained over the years in front end dev into one project.

## Installation

Provide code examples and explanations of how to get the project.

## Tests

Describe and show how to run the tests with code examples.

## Useful Links

* [OluOmoniyi](http://www.oluomoniyi.com) - personal website
* [Azimuth](http://www.theazimuth.co)

* [unsplash](http://www.unsplash.com) - Amazing image source
* [jdenticon](http://www.jdenticon.com) - Generates user avatar from random seed data
* [nounproject](http://www.nounproject.com) - Starter user logo
* [nounproject](http://www.fontawesosome.com) - font icons

## License

Do as you please with it, if you find it useful drop me a message (MIT, Apache, etc.)