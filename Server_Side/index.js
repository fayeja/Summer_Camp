const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const stripe = require("stripe")(process.env.PAYMENT_SECRET_KEY);
// console.log(process.env.PAYMENT_SECRET_KEY);
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

const verifyJWT = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    return res
      .status(401)
      .send({ error: true, message: "unauthorized access" });
  }
  // bearer token
  const token = authorization.split(" ")[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .send({ error: true, message: "unauthorized access" });
    }
    req.decoded = decoded;
    next();
  });
};

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ow0xyg9.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    const classCollection = client.db("sportToday").collection("class");
    const paymentCollection = client.db("sportToday").collection("payments");
    const instructorCollection = client
      .db("sportToday")
      .collection("instructor");
    const selectedClassCollection = client
      .db("sportToday")
      .collection("selectedClass");
    const usersCollection = client.db("sportToday").collection("users");

    //   jwt
    app.post("/jwt", (req, res) => {
      const user = req.body;
      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "7days"
      });

      res.send({ token });
    });

    const verifyAdmin = async (req, res, next) => {
      const email = req.decoded.email;
      const query = { email: email };
      const user = await usersCollection.findOne(query);
      if (user?.role !== "admin") {
        return res
          .status(403)
          .send({ error: true, message: "forbidden message" });
      }
      next();
    };

    //   User related API
    app.get("/users", async (req, res) => {
      const result = await usersCollection.find().toArray();
      res.send(result);
    });

    app.post("/users", async (req, res) => {
      const user = req.body;

      const query = { email: user.email };
      const existingUser = await usersCollection.findOne(query);

      if (existingUser) {
        return res.send({ message: "user already exists" });
      }
      const result = await usersCollection.insertOne(user);
      res.send(result);
    });

    // user admin
    app.get("/users/admin/:email", verifyJWT, async (req, res) => {
      const email = req.params.email;

      if (req.decoded.email !== email) {
        return res.send({ admin: false });
      }

      const query = { email: email };
      const user = await usersCollection.findOne(query);
      const result = { admin: user?.role === "admin" };
      res.send(result);
    });

    app.patch("/users/admin/:id", async (req, res) => {
      const id = req.params.id;
      //   console.log(id);
      const filter = { _id: new ObjectId(id) };
      const updateDoc = {
        $set: {
          role: "admin"
        }
      };
      const result = await usersCollection.updateOne(filter, updateDoc);
      res.send(result);
    });
    // user instructor
    app.get("/users/instructor/:email", verifyJWT, async (req, res) => {
      const email = req.params.email;

      if (req.decoded.email !== email) {
        return res.send({ instructor: false });
      }

      const query = { email: email };
      const user = await usersCollection.findOne(query);
      const result = { instructor: user?.role === "instructor" };
      res.send(result);
    });

    app.patch("/users/instructor/:id", async (req, res) => {
      const id = req.params.id;
      //   console.log(id);
      const filter = { _id: new ObjectId(id) };
      const updateDoc = {
        $set: {
          role: "instructor"
        }
      };
      const result = await usersCollection.updateOne(filter, updateDoc);
      res.send(result);
    });

    // Class related Api
    app.get("/class", async (req, res) => {
      const cursor = classCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    app.post("/class", async (req, res) => {
      const newClass = req.body;
      const result = await classCollection.insertOne(newClass);
      res.send(result);
    });

    app.put("/class/:id", async (req, res) => {
      const id = req.params.id;
      const { status } = req.body;
      const filter = { _id: new ObjectId(id) };
      const updateDoc = {
        $set: {
          status: status
        }
      };

      const result = await classCollection.updateOne(filter, updateDoc);
      res.send(result);
    });

    app.put("/class/:id", async (req, res) => {
      const id = req.params.id;
      const user = req.body;
      const filter = { _id: new ObjectId(id) };
      const option = { upsert: true };
      const UpdateUser = {
        $set: {
          seatsAvailable: user.seatsAvailable,
          umberOfStudents: user.numberOfStudents
        }
      };

      const result = await classCollection.updateOne(
        filter,
        UpdateUser,
        option
      );

      res.send(result);
    });

    app.post("/class/:classId/feedback", async (req, res) => {
      const classId = req.params.classId;
      const feedback = req.body.feedback;

      try {
        const filter = { _id: new ObjectId(classId) };
        const updateDoc = {
          $set: {
            feedback: feedback
          }
        };

        const result = await classCollection.updateOne(filter, updateDoc);

        if (result.modifiedCount > 0) {
          res.sendStatus(200); // Send a success status code if the document was updated successfully
        } else {
          res.sendStatus(404); // Send a not found status code if the class document was not found
        }
      } catch (error) {
        console.error("Error:", error);
        res.sendStatus(500); // Send a server error status code if an error occurred
      }
    });

    //  Instructor related API
    app.get("/instructor", async (req, res) => {
      const cursor = instructorCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    // Selected classes api
    app.get("/selectedClass", verifyJWT, async (req, res) => {
      const email = req.query.email;

      if (!email) {
        return res.send([]);
      }

      const decodedEmail = req.decoded.email;
      if (email !== decodedEmail) {
        return res
          .status(403)
          .send({ error: true, message: "forbidden access" });
      }

      const query = { email: email };
      const result = await selectedClassCollection.find(query).toArray();
      res.send(result);
    });

    app.post("/selectedClass", async (req, res) => {
      const classes = req.body;
      //   console.log(classes);
      const result = await selectedClassCollection.insertOne(classes);
      res.send(result);
    });

    app.delete("/selectedClass/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await selectedClassCollection.deleteOne(query);
      res.send(result);
    });

    // create_payment_Intent
    app.post("/create-payment-intent", verifyJWT, async (req, res) => {
      const { price } = req.body;
      const amount = parseInt(price * 100);
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: "usd",
        payment_method_types: ["card"]
      });

      res.send({
        clientSecret: paymentIntent.client_secret
      });
    });

    // payment related api
    app.post("/payments", async (req, res) => {
      const payment = req.body;
      const insertedId = await paymentCollection.insertOne(payment);

      //   const query = {
      //     _id: { $in: payment.classItems.map((id) => new ObjectId(id)) }
      //   };
      //   const deleteResult = await classCollection.deleteMany(query);

      res.send({ insertedId });
    });
    app.get("/payments", verifyJWT, async (req, res) => {
      const email = req.query.email;

      if (!email) {
        return res.send([]);
      }

      const decodedEmail = req.decoded.email;
      if (email !== decodedEmail) {
        return res
          .status(403)
          .send({ error: true, message: "forbidden access" });
      }

      const query = { email: email };
      const result = await paymentCollection.find(query).toArray();
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("SportToday is running");
});

app.listen(port, () => {
  console.log(`SportToday Server is running on port ${port}`);
});
