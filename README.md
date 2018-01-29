# demo

=======

# Motivation

This project was a built as a side project over a few weeks, to pull all the knowledge I have gained over the years in front end dev into one project.

# Installation

* `git clone https://github.com/oluomoniyi/camper-bnb.git`
* `cd [project folder]`
* `npm install`

# Running

* `nodemon`

# Highlights

```
Added search by location on the home page
>>>>>>> 825795a342f469b2057ab3fb04c3b3f085761ef1

* [camperbnb.herokuapp.com](https://camperbnb.herokuapp.com/) - A demo version of this app has been deployed to Heroku

# camper-bnb

This project was completed as a fully functional production version camping booking website.

The website was heavily inpsired by airbnb design I made a whole host of changes to the original material.

# Motivation

This project was a built as a side project over a few weeks, to pull all the knowledge I have gained over the years in front end dev into one project.

<<<<<<< HEAD
# Installation

* `git clone https://github.com/oluomoniyi/camper-bnb.git`
* `cd camperbnb`
* `npm install`

# Running

* You will need to run a mongo daemon with the mongod, or you can unc
* `nodemon`
=======
```

# Additional Code Examples

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

> > > > > > > 825795a342f469b2057ab3fb04c3b3f085761ef1

# Useful Links

* [OluOmoniyi](http://www.oluomoniyi.com) - personal website
* [theazimuth.co](http://www.theazimuth.co) - Company Website

* [udemy](https://www.udemy.com/the-web-developer-bootcamp/) - Udemy course, that could help you build something similar cant recommend it enough to be honest!
* [unsplash](http://www.unsplash.com) - Amazing image source
* [jdenticon](http://www.jdenticon.com) - Generates user avatar from random seed data
* [nounproject](http://www.nounproject.com) - Starter user logo
* [fontawesosome](http://www.fontawesosome.com) - font icons

* [Inspired by Airbnb](https://www.airbnb.co.uk/)

# License (MIT, Apache, etc.)

Do as you please with it, if you find it useful then please drop me a message and/or star it.
