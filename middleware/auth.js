const secretPin = '2912'; // Change this to your secret PIN

module.exports = (req, res, next) => {
    if(req.session.isAuthenticated) {
        next();
   } else {
    res.redirect("/auth/login")
   }
};