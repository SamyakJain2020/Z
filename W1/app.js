const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
app.set('view engine', 'ejs');
app.use('/css', express.static(path.resolve('./static/css')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose
  .connect('mongodb://localhost:27017/student1')
  .then(() => {
    console.log('Successfully connected to the database');
  })
  .catch(() => {
    console.log('Could not connect to database', err);
    process.exit();
  });

const StudentSchema = mongoose.Schema({
  name: String,
  rollno: Number,
  wad_marks: Number,
  cc_marks: Number,
  dsbda_marks: Number,
  cns_marks: Number,
  ai_marks: Number,
});

let Student = mongoose.model('Student', StudentSchema);

app.get('/', (req, res) => {
  res.render('index');
});
app.post('/addmarks', (req, res) => {
  console.log(req.body);
  var myData = new Student(req.body);
  myData
    .save()
    .then((item) => {
      console.log('item saved to database');
      res.redirect('/getMarks');
    })
    .catch((err) => {
      res.status(400).send('unable to save to database');
    });
});
app.get('/getMarks', (req, res) => {
  // console.log(req.query);
  Student.find()
    .then((student) => {
      res.render('table', { student: student });
    })
    .catch((err) => {
      res.json({ message: 'err' });
    });
});
app.get('/dsbdaGreaterThan20', (req, res) => {
  Student.find({ dsbda_marks: { $gt: 20 } })
    .then((student) => {
      res.render('table', { student: student });
    })
    .catch((err) => {
      res.json({ message: 'err' });
    });
});

app.get('/wadccGreaterThan40', (req, res) => {
  Student.find({ wad_marks: { $gt: 40 }, cc_marks: { $gt: 40 } })
    .then((student) => {
      res.render('table', { student: student });
    })
    .catch((err) => {
      res.json({ message: 'err' });
    });
});

app.post('/deleteStudent/:id', (req, res) => {
  Student.findByIdAndDelete(req.params.id).then((student) => {
    console.log('Deleted Successfully');
    res.redirect('/getMarks');
  });
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
