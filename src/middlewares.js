import multer from "multer";
import path from "path";

export const localsMiddleware = (req, res, next) => {
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.siteName = "Wetube";
  res.locals.loggedInUser = req.session.user || {};
  next();
};

export const protectorMiddleware = (req, res, next) => {
  if (req.session.loggedIn) {
    return next();
  } else {
    req.flash("error", "Log in first.");
    return res.redirect("/login");
  }
};

export const publicOnlyMiddleware = (req, res, next) => {
  if (!req.session.loggedIn) {
    return next();
  } else {
    req.flash("error", "Not authorized");
    return res.redirect("/");
  }
};

export const avatarUpload = multer({
  dest: "uploads/avatars/",
  limits: {
    fileSize: 3000000,
  },
});

export const videoUpload = multer({
  dest: "uploads/videos/",
  limits: {
    fileSize: 10000000,
  },
});

const noteStorage = multer.diskStorage({
  destination: "uploads/notes/",
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const basename = path.basename(file.originalname, ext);
    cb(null, `${basename}-${Date.now()}${ext}`);
  },
});

const noteFileFilter = (req, file, cb) => {
  // Allow only PDF and TXT
  if (file.mimetype === 'application/pdf' || file.mimetype === 'text/plain') {
    cb(null, true); // Accept the file
  } else {
    cb(null, false); // Reject the file
    cb(new Error('Invalid file type. Only PDF and TXT files are allowed.'));
  }
};

export const noteUpload = multer({
  storage: noteStorage,
  limits: {
    fileSize: 5000000,
  },
  fileFilter: noteFileFilter
});