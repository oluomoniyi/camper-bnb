var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(){
     if (req.isAuthenticated()){ 
        Campground.findById(req.params.id, function(err, campgrounds){
            if (err){
                res.redirect("back")
            }
            else{
                if (campgrounds.user.id && campgrounds.user.id.equals(req.user._id)){//check if user.id exists first
                    next()
                }
                else {
                    res.redirect("back")
                }
            }
        })
    }
    else {
        res.redirect("back")
    }

}

module.exports = middlewareObj;