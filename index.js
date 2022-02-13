const express = require('express');
const app = express();
const path = require('path')
// add template engine
const hbs = require('express-handlebars');
// setup template engine directory and files extensions
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine('hbs', hbs.engine({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: __dirname + '/views/layouts',
}))
// setup static public directory
app.use(express.static('public'));

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}))

const mysql = require('mysql');
const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "qwerty",
    database: "joga_mysql"
});

con.connect(function (err)  {
    if(err) throw err;
    console.log("Connected to joga_mysql db")
})



// show
app.get('/', (req, res) => {
    let query = "SELECT * FROM article";
    let articles = []
    con.query(query, (err, result) => {
        if (err) throw err;
        articles = result
        console.log(result)
        res.render('index',{
        articles: articles
        })
    })
});

//show article by this slug
app.get('/article/:slug', (req, res) => {
    //let query = `SELECT * FROM article WHERE slug="${req.params.slug}"`
    let query = `SELECT *, author.name as author_name, article.name as article_name FROM author INNER JOIN article ON author.id = article.author_id WHERE slug="${req.params.slug}"`
    let article
    con.query(query, (err, result) => {
        if (err) throw err;
        article = result
        console.log(article)
        res.render('article', {
            article: article
        })
    })
});

//show authors articles
app.get('/author/:id', (req, res) => {
    let query = `SELECT id, name FROM author WHERE id="${req.params.id}"`
    let query1 = `SELECT * FROM article WHERE author_id="${req.params.id}"`
    console.log(query1)
    let author
    con.query(query, (err, result) => {
        if (err) throw err;
        author = result
        console.log(author)
        let articles
        con.query(query1, (err, result) => {
            if (err) throw err;
            articles = result
            res.render('author', {
                author: author,
                articles: articles
            })
        })

    })
});


app.listen(3000, () =>{
    console.log('App is started at http://localhost:3000');
})



