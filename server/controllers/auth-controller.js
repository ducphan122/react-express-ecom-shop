/*
 * authService : encrpyt password and return the hash
 * usersService: interact with user database and return the require object
 * cartService: interact with cart database and return the require object  */
const { authService, usersService, cartsService } = require("../services");
const { getPwdHash } = authService;
const { createUser, fetchUserByEmail } = usersService;
const { createCart } = cartsService;

const passport = require("passport");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const isProduction = process.env.NODE_ENV === "production";

const signupUser = async (req, res, next) => {
  const {
    email,
    password,
    first_name,
    last_name,
    address1,
    address2,
    postcode,
    city,
    country,
  } = req.body;
  //Check if active user with this email exists
  const userDb = await fetchUserByEmail(email);
  if (userDb?.active === true) {
    return res.status(403).send("USer with this email already exist");
  }

  const pwd_hash = await getPwdHash(password);
  const user = {
    email,
    first_name,
    last_name,
    address1,
    address2,
    postcode,
    city,
    country,
    pwd_hash,
    user_role: "admin",
  };
  const newUser = await createUser(user);
  const newCart = await createCart(newUser.id);
  res.status(201).json({ userId: newUser.id, cartId: newCart.id });
  next();
};

const loginUser = async (req, res, next) => {
  //Reject if validation fails, see express-validator documentation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  // Not error then authenticate 
  passport.authenticate("login", async (err, user, info) => {
    if (err || !user) {
      const error = new Error(info.message);
      return next(error);
    }
    req.login(user, { session: false }, async (error) => {
      if (error) return next(error);
      const body = {
        id: user.id,
        cart_id: user.cart_id,
        email: user.email,
        role: user.user_role,
      };
      const token = jwt.sign({ user: body }, process.env.JWT_KEY);
      res.cookie("A_JWT", token, {
        maxAge: 1000 * 60 * 60 * 24 * 1000,
        httpOnly: true,
        sameSite: isProduction ? "none" : "lax",
        secure: isProduction ? true : false,
      });
      return res.status(200).send(`Login successful`);
    });
  })(req, res, next);
};

const logoutUser = (req, res, next) => {
  res.clearCookie("A_JWT");
  res.status(200).send();
  next();
};

module.exports = {
  signupUser,
  loginUser,
  logoutUser,
};