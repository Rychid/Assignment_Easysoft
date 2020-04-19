const express = require('express');
const mongoose = require('mongoose');
const {MongoClient} = require('mongodb');

const app = express();

let db;
let todo;

const client = MongoClient.connect("mongodb://localhost:27017/employeedb", 
{ useUnifiedTopology: true }, (error, client)=>{
    if(!error){
      console.log("DB Connected");
       db = client.db('employeedb')
       todo = db.collection('todo')
    } else{
      console.log("DB not connected")
    }
});


app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

  const employees = [
    {
        _id: "5e9640feaf62fa7fa1157fe8",
        isActive: false,
        picture: "/images/ray.jpg",
        age: 33,
        name: "Raymond Walters",
        position: "Chief Technology Officer (CTO)",
        email: "rosie.walters@undefined.net",
        phone: "+233 (978) 467-3459",
        address: "619 Fayette Street, Shaft, Wyoming, 5988",
        about: "Proident irure deserunt commodo laborum excepteur duis sint ex nisi irure commodo sint voluptate in. Qui velit id occaecat nostrud culpa ipsum. Proident consectetur id amet Lorem cupidatat. Do laboris amet consequat nulla incididunt minim nulla consequat aliqua.",
        date_hired: "Friday, April 18, 2014 3:42 PM"
      },
      {
        _id: "5e9640fe5e6f790c040c179a",
        isActive: false,
        picture: "/images/cathryn.jpg",
        age: 23,
        name: "Cathryn Romero",
        position: "Data Entry",
        email: "cathryn.romero@undefined.com",
        phone: "+233 (916) 408-2130",
        address: "175 Kaufman Place, Whipholt, Colorado, 769",
        about: "Lorem aute eiusmod elit duis voluptate anim ad ipsum enim commodo esse. Veniam incididunt duis deserunt voluptate id magna laboris id veniam nulla commodo esse quis. Adipisicing est consectetur ex aliqua laborum non laborum elit magna culpa ullamco elit. Magna officia laborum officia qui magna.",
        date_hired: "Thursday, February 6, 2020 7:05 AM"
      },
      {
        _id: "5e9640fe78e6d4999ed266ef",
        isActive: false,
        picture: "/images/lindsay.jpg",
        age: 28,
        name:"Lindsay Whitney",
        position: "Network Administrator",
        email: "lindsay.whitney@undefined.co.uk",
        phone: "+233 (900) 471-3663",
        address: "687 Seigel Street, Summertown, Minnesota, 7853",
        about: "Voluptate amet voluptate proident commodo reprehenderit laboris esse laborum deserunt ea elit ullamco magna velit. Aliquip nostrud proident duis ut velit. Deserunt reprehenderit quis nisi minim nulla reprehenderit laboris nulla culpa labore. Deserunt pariatur excepteur sit consequat nisi. Veniam pariatur amet ullamco veniam.",
        date_hired: "Tuesday, January 8, 2019 7:16 AM"
      },
      {
        _id: "5e9640fe18d159438798d556",
        isActive: false,
        picture: "/images/matt.jpg",
        age: 27,
        name: "Matt Robertson",
        position: "Web Developer",
        email: "shelley.rich@undefined.ca",
        phone: "+233 (972) 592-2580",
        address: "826 Interborough Parkway, Belva, District Of Columbia, 8248",
        about: "Sunt ipsum velit in velit laboris culpa minim do cillum occaecat. Qui laboris ut tempor do amet minim minim labore eiusmod qui ut. Tempor enim anim enim exercitation aute nostrud Lorem ullamco tempor. Ut ea minim occaecat incididunt id labore commodo ut officia ea minim. Mollit esse anim fugiat veniam enim magna. Mollit labore tempor fugiat sit sit. Veniam laboris proident dolore aute enim eu veniam commodo deserunt minim nisi fugiat nulla fugiat.",
        date_hired: "Sunday, June 25, 2017 1:14 PM"
      },
      {
        _id: "5e9640fe521ac49fe6d8682a",
        isActive: false,
        picture: "/images/drew.jpg",
        age: 21,
        name: "Drew Stevenson"
        ,
        position: "Accountant",
        email: "florence.stevenson@undefined.tv",
        phone: "+233 (985) 415-2869",
        address: "934 Brevoort Place, Cade, Palau, 5273",
        about: "Non eiusmod laboris proident amet. Quis deserunt laboris cupidatat fugiat aliquip veniam. Do reprehenderit qui elit fugiat id est Lorem. Dolore sint non incididunt dolor laborum id consectetur. Adipisicing dolore esse pariatur pariatur aliqua deserunt est veniam tempor aute eu. Est sit sunt cupidatat et. Aute enim cillum sunt deserunt deserunt pariatur elit cupidatat.",
        date_hired: "Saturday, September 21, 2019 11:54 AM"
      }
]

app.get('/', (req, res)=>{
  res.render('home')
});

app.get('/employees', async(req, res)=>{
  const todolist = await todo.find({}).toArray();
    console.table(todolist)
    res.render('employeeList', {
      employees
  })
});

app.get('/todolist', async(req, res)=>{
  const result = await todo.find({}).toArray()
  console.table(result)
  // res.redirect('/todolist');
  res.render('todo',{result} )
});

app.post('/todolist', async (req, res)=>{
    let data = {
      fName : req.body.fName, 
      lName:req.body.lName, 
      position:req.body.position,
      todo: req.body.todo
      };

    const result = await todo.insertOne(data);
    res.redirect('/todolist');
});

const port = 4100;
app.listen(port, ()=>{
    console.log("Running on port " + port)
});