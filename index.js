let Joi = require('joi')
let express = require('express')
let app = express()

//returns middleware 
app.use(express.json)


const courses = [
    
        {id: 1, name: 'course 1'},
        {id: 2, name: 'course 2'},
        {id: 3, name: 'course 3'},

    
]

app.get('/', (req,res)=> {
    res.send('hello sebastian')
})

app.get('/api/courses', (req,res) => {
    res.send(courses)
})

//Add a new course or POST to a server
app.post('/api/courses', (req,res) => {
    
    
    //This is your schema
    const schema = {
        name:Joi.string().min(3).required()
    }


    const result= Joi.validate(req.body, schema)  
    
    
if (result.error) {
        res.status(400).send(result.error.details[0].message)
        return;
    }
    
    const course = {
        id: courses.length + 1,
        name: req.body.name
     }

    courses.push(course); //This pushes new course to array in server
     // Remember that this push ONLY pushes the new course to the server. You 
     //cannot see it unless type in the line of code below.

    res.send(course) //This prints or returns what was put into array to client on the screen



})

//get request from the array above ^^
//this route makes it easy to get whatever course you want from an id
// type in the route and id into url and get course name
app.get('/api/courses/:id', (req,res)=>{
    const course = courses.find(c => c.id ===parseInt(req.params.id))
    if (!course) res.status(404).send('course not found')
    res.send(course)
})
//PORT
let port = process.env.PORT|| 3000
app.listen(port, () => console.log(`listening on port ${port}`)
)