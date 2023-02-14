import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

const app = express()
const port = process.env.PORT || 8080

let messageSchema = new mongoose.Schema({
    query: { type: String, required: true },
    from: {type: String },
    createdOn: { type: Date, default: Date.now }
});
const messageModel = mongoose.model('message', messageSchema);






app.use(express.json());
app.use(cors());





app.post("/message", (req, res) => {

    const body = req.body;
    if (
        !body.query
    ) {
        res.status(400).send(` required parameter missing. example request body:
        {
            "query": "hi",
            
        }`)
        return;
    }

    messageModel.create({
        query : body.query,
        from : "user"
    },
        (err, saved) => {
            if (!err) {
                console.log(saved);

                res.send({
                    message: {
                        text : "hello i am chatbot from dialogflow"
                    }
                })
            } else {
                res.status(500).send({
                    message: "server error"
                })
            }
        })

})















app.listen(port, () => {
    console.log(`app listening on port ${port}`)
})







let dbURI = 'mongodb+srv://malik:umermalik120@cluster0.3agpx4r.mongodb.net/malikdatabase?retryWrites=true&w=majority';
mongoose.connect(dbURI);


////////////////mongodb connected disconnected events///////////////////////////////////////////////
mongoose.connection.on('connected', function () {//connected
    console.log("Mongoose is connected");
    // process.exit(1);
});

mongoose.connection.on('disconnected', function () {//disconnected
    console.log("Mongoose is disconnected");
    process.exit(1);
});

mongoose.connection.on('error', function (err) {//any error
    console.log('Mongoose connection error: ', err);
    process.exit(1);
});

process.on('SIGINT', function () {/////this function will run jst before app is closing
    console.log("app is terminating");
    mongoose.connection.close(function () {
        console.log('Mongoose default connection closed');
        process.exit(0);
    });
});

