require("dotenv").config();
require("./config/database").connect();
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//bring in our models
const User = require("./model/users");
const Restaurants = require("./model/restaurants");
const Dishes = require("./model/dishes");

const auth = require("./middleware/auth");

const app = express();

app.use(express.json({ limit: "50mb" }));

app.use(cors());

//home route
app.get("/", (req, res) => {
  res.send(`
  <h1>Hospitality facility finder REST APIs</h1>
  `);
});

//endpoints for the apis
app.get("/profile/", auth, async (req, res) => {
  const user = await User.findOne({
    username: req.user.username,
  });

  const result = {
    id: user._id,
    fname: user.fname,
    lname: user.lname,
    email: user.email,
    username: user.username,
  };

  console.log(req.user.username);

  res.json(result);
});

//register restaurant (protected route)
app.post("/restaurants/register/", auth, async (req, res) => {
  try {
    const { name, ratings, cell } = req.body;
    let { district, sector } = req.body;
    if (district) {
      district = district.toLowerCase();
    }
    if (sector) {
      sector = sector.toLowerCase();
    }

    if (!(name && ratings && district && cell && sector)) {
      res.status(400).send({
        status: "Error",
        message: "All fields are required.",
        jsonDataFormatExample: {
          name: "restaurant's name...",
          district: "restaurant's district...",
          sector: "restaurant's sector",
          cell: "restaurant's cell...",
          ratings: "restaurants ratings...",
        },
      });
    }

    // check if restaurant exists
    const oldRestuarant = await Restaurants.findOne({
      name,
      owner: req.user.username,
    });

    if (oldRestuarant) {
      return res.status(409).send("Restaurant Already Exist.");
    }

    // Create user in our database
    const resto = await Restaurants.create({
      name,
      ratings,
      district,
      cell,
      sector,
      owner: req.user.username,
    });

    res.status(201).json({
      status: "success",
      message: "Restaurant created successfull",
    });
  } catch (err) {
    console.log(err);
  }
});

app.post("/restaurants/edit/", auth, async (req, res) => {
  try {
    const { name, ratings, cell, id } = req.body;
    let { district, sector } = req.body;
    if (district) {
      district = district.toLowerCase();
    }
    if (sector) {
      sector = sector.toLowerCase();
    }

    if (!id) {
      res.status(400).send({
        status: "Error",
        message: "Please provide id for the restaurant.",
        jsonDataFormatExample: {
          id: "restaurant's id (Required)",
          name: "new restaurant's name. (optional)",
          district: "new restaurant's district. (optional)",
          sector: "new restaurant's sector. (optional)",
          cell: "new restaurant's cell. (optional)",
          ratings: "new restaurants ratings. (optional)",
        },
      });
    }

    // check if restaurant exists
    const resto = await Restaurants.findOne({
      _id: id,
      owner: req.user.username,
    });

    if (resto) {
      if (name) {
        await Restaurants.updateOne(
          { _id: id, owner: req.user.username },
          { name }
        );
      }

      if (ratings) {
        await Restaurants.updateOne(
          { _id: id, owner: req.user.username },
          { ratings }
        );
      }

      if (district) {
        await Restaurants.updateOne(
          { _id: id, owner: req.user.username },
          { district }
        );
      }

      if (cell) {
        await Restaurants.updateOne(
          { _id: id, owner: req.user.username },
          { cell }
        );
      }

      if (sector) {
        await Restaurants.updateOne(
          { _id: id, owner: req.user.username },
          { sector }
        );
      }

      res.status(201).json({
        status: "success",
        message: "Restaurant updated successfully.",
      });
    } else {
      return res.status(409).send("Restaurant's id does not exist.");
    }
  } catch (err) {
    console.log(err);
    return res.json(err);
  }
});

//get all restaurants
app.get("/restaurants/", (req, res) => {
  Restaurants.find({}, (err, reslult) => {
    if (err) {
      return err;
    }
    res.json(reslult);
  });
});

//get restaurant by id
app.get("/restaurants/id/:id", (req, res) => {
  const { id } = req.params;
  if (!id) {
    Restaurants.findOne({ _id: id }, (err, result) => {
      if (err) {
        return res.json(err);
      } else {
        res.json(result);
      }
    });
  } else {
    res.json({
      status: "Error",
      message: "You did not provide the id for the restaurant",
    });
  }
});

//restaurants by district
app.get("/restaurants/district/:district/", (req, res) => {
  let { district } = req.params;
  district = district.toLowerCase();
  Restaurants.find({ district: district }, (err, result) => {
    if (err) {
      return err;
    }
    res.json(result);
  });
});

//restaurants by district and cell
app.get("/restaurants/district/:district/:sector", (req, res) => {
  let { district, sector } = req.params;
  district = district.toLowerCase();
  sector = sector.toLowerCase();
  Restaurants.find({ district, sector }, (err, result) => {
    if (err) {
      return err;
    }
    res.json(result);
  });
});

//restaurants by owner
app.get("/restaurants/owner/:owner", (req, res) => {
  let { owner } = req.params;
  if (owner) {
    owner = owner.toLowerCase();
  }
  Restaurants.find({ owner }, (err, result) => {
    if (err) {
      return err;
    }
    res.json(result);
  });
});

//restaurants by stars
app.get("/restaurants/ratings/:ratings", (req, res) => {
  let { ratings } = req.params;
  Restaurants.find(
    {
      $or: [
        {
          ratings: {
            $regex: new RegExp(ratings, "i"),
          },
        },
        {
          ratings: ratings,
        },
      ],
    },
    (err, result) => {
      if (err) {
        return err;
      }
      res.json(result);
    }
  );
});

//delete restaurant
app.delete("/restaurants/remove/:id", auth, (req, res) => {
  let { id } = req.params;
  if (!id) {
    res.json({
      status: "error",
      message: "Please provide the id of the restaurant to delete",
    });
  } else {
    Restaurants.deleteOne(
      { _id: id, owner: req.user.username },
      (err, result) => {
        if (err) {
          return err;
        }
        if (result.deletedCount > 0) {
          //delete all dishes for this restaurant
          Dishes.deleteMany({ restaurantId: id }, (err, result) => {
            if (err) {
              console.log(err);
            }
          });

          return res.json({
            status: "success",
            message: "Restaurant deleted successfull!",
          });
        } else {
          return res.status(409).send("Restaurant not found");
        }
      }
    );
  }
});

//dishes
app.post("/dishes/register", auth, async (req, res) => {
  const { restaurantId, name, imageUrl } = req.body;
  if (!(restaurantId && name && imageUrl)) {
    res.json({
      status: "error",
      message: "Please provide full info for the dish",
      sampleJsonData: {
        restaurantId: "restaurant's id",
        name: "dish name",
        imageUrl: "Image url for the dish",
      },
    });
  } else {
    try {
      const resto = await Restaurants.findOne({
        _id: restaurantId,
        owner: req.user.username,
      });

      if (resto) {
        //check dish name
        const dishName = await Dishes.findOne({
          restaurantId,
          name: name.toLowerCase(),
        });
        if (dishName) {
          return res
            .status(409)
            .send("Dish name already exist at " + resto.name);
        } else {
          const dish = await Dishes.create({
            restaurantId,
            name: name.toLowerCase(),
            imageUrl,
          });

          if (dish) {
            res.json({
              status: "success",
              message: name + " Dish saved successfull",
            });
          } else {
            res.json({
              status: "error",
              message:
                "Failed to save the dish, try again later after some time",
            });
          }
        }
      } else {
        res.json({
          status: "error",
          message:
            "Restaurant info doesn't match. Invalid restaurant id or the restaurant does not belong to " +
            req.user.username,
        });
      }
    } catch (error) {
      return res.json(error);
    }
  }
});

//delete dish
app.delete("/dishes/remove/:id", auth, async (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.json({
      status: "error",
      message: "Please provide id of the dish that you want to delete",
    });
  } else {
    try {
      const dish = await Dishes.findOne({ _id: id });
      if (dish) {
        const restaurant = await Restaurants.findOne({
          _id: dish.restaurantId,
        });
        if (restaurant) {
          if (restaurant.owner == req.user.username) {
            Dishes.deleteOne({ _id: id }, (err, result) => {
              if (err) {
                return res.json(err);
              }
              if (result.deletedCount > 0) {
                return res.json({
                  status: "success",
                  message: "Dish deleted successfull!",
                });
              } else {
                return res.status(409).send("Restaurant not found");
              }
            });
          } else {
            res.json({
              status: "error",
              message:
                "You can not delete a dish which does not belong to your restaurant",
            });
          }
        } else {
          res.json({
            status: "error",
            message: "Invalid restaurant for the dish",
          });
        }
      } else {
        res.json({
          status: "error",
          message: "Dish does not found",
        });
      }
    } catch (error) {
      res.json(error);
    }
  }
});

//dish list
app.get("/dishes", (req, res) => {
  Dishes.find({}, (err, result) => {
    if (err) {
      return res.json(err);
    } else {
      res.json(result);
    }
  });
});

const usersRoute = require("./routes/users");
const facilityRoute = require("./routes/facility");
app.use("/api/users/", usersRoute);
app.use("/api/facility/", facilityRoute);

//404 route
app.use("*", (req, res) => {
  res.status(404).json({
    success: "false",
    message: "Page not found",
    error: {
      statusCode: 404,
      message: "The page does not exist on the server.",
    },
  });
});

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
