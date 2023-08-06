// Import multer for file uploads
import multer from "multer";
// Import path module to handle file and directory paths
import path from "path";

// Middleware to set up local variables
export const localsMiddleware = (req, res, next) => {
  res.locals.loggedIn = Boolean(req.session.loggedIn); // Set login status
  res.locals.siteName = "Wetube"; // Setting site name
  res.locals.loggedInUser = req.session.user || {}; // Set logged-in user information
  next();
};

// Middleware to protect routes that require authentication
export const protectorMiddleware = (req, res, next) => {
  if (req.session.loggedIn) {
    return next(); // Proceed if logged in
  } else {
    req.flash("error", "Log in first."); // Show error message if not logged in
    return res.redirect("/login"); // Redirect to login page
  }
};

// Middleware to protect routes that should be accessed only by non-authenticated users
export const publicOnlyMiddleware = (req, res, next) => {
  if (!req.session.loggedIn) {
    return next(); // Proceed if not logged in
  } else {
    req.flash("error", "Not authorized"); // Show error message if logged in
    return res.redirect("/"); // Redirect to home page
  }
};

// Configuration for avatar upload with multer
export const avatarUpload = multer({
  dest: "uploads/avatars/", 
  limits: {
    fileSize: 3000000, // 3MB file size limit
  },
});

// Configuration for video upload with multer
export const videoUpload = multer({
  dest: "uploads/videos/", 
  limits: {
    fileSize: 10000000, // 10MB file size limit
  },
});

// Custom storage configuration for note uploads
const noteStorage = multer.diskStorage({
  destination: "uploads/notes/", 
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname); 
    const basename = path.basename(file.originalname, ext); 
    cb(null, `${basename}-${Date.now()}${ext}`); 
  },
});

// Configuration for note upload with multer
export const noteUpload = multer({
  storage: noteStorage, 
  limits: {
    fileSize: 5000000, // 5MB file size limit
  },
});

// Custom storage configuration for post uploads
const postStorage = multer.diskStorage({
  destination: "uploads/posts/", 
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname); 
    const basename = path.basename(file.originalname, ext); 
    cb(null, `${basename}-${Date.now()}${ext}`); 
  },
});

// Configuration for post upload with multer
export const postUpload = multer({
  storage: postStorage,
  limits: {
    fileSize: 5000000, // 5MB file size limit
  },
});
