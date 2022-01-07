require('babel-register')({
    presets: ['react'],
})
//
//node.js를 이용해서 React 컴포넌트를 HTML로 렌더링하는 방법
// const ReactDOMServer = require('react-dom/server')
// const React = require('react')
// const Email = React.createFactory(require('./components/index.js')) //email.js의 React 엘리먼트를 반환
// const emailString = ReactDOMServer.renderToString(Email())
// const emailStaticMarkup = ReactDOMServer.renderToStaticMarkup(Email())
// const emailStringWithName = ReactDOMServer.renderToStaticMarkup(
//     Email({
//         name: 'jb',
//     }),
// )
// console.log(emailString)
// console.log(emailStaticMarkup)
// console.log(emailStringWithName)
//

//
//express를 이용해서 서버를 만들고 서버에서 React를 이용해서 HTML을 페이지에 렌더링
//가장기본으로 뷰 엔진으로 사용 사용한다
//서버로 요청이 체크섬 없이 단순히 HTML 문자열을 생성한 후 응답을 보낸다
// const express = require('express')
// const app = express()
// const http = require('http')
// const ReactDOMServer = require('react-dom/server')
// const React = require('react')
// const About = React.createFactory(require('./components/about.jsx'))
// app.get('/about', (req, res, next) => {
//     const aboutStaticMarkup = ReactDOMServer.renderToStaticMarkup(About())
//     res.send(aboutStaticMarkup)
// })
// http.createServer(app).listen(3000)
//

//
//ejs템플릿안에 React컴포넌트 넣기
const http = require('http')
const https = require('https')
const path = require('path')
const fs = require('fs')
const express = require('express')
const app = express()
const errorHandler = require('errorhandler')
const ReactDOMServer = require('react-dom/server')
const React = require('react')
const About = React.createElement.bind(null, require('./components/about.jsx'))
const Index = React.createElement.bind(null, require('./components/index.jsx'))
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'views')))

app.get('/', (req, res) => {
    const indexHTML = ReactDOMServer.renderToString(Index())
    res.render('index', { index: indexHTML })
})
app.get('/about', (req, res) => {
    const aboutHTML = ReactDOMServer.renderToString(About({ name: '종범' }))
    res.render('about', { about: aboutHTML })
})
app.all('*', (req, res) => {
    res.status(404).send('Not found... did you mean to go to')
})
app.get('/error', (req, res) => {
    console.log(req.url, error)
    res.send('Web page error')
})

app.use(errorHandler)
app.listen(3000)

try {
    const options = {
        key: fs.readFileSync('./server.key'),
        cert: fs.readFileSync('./server.crt'),
    }
} catch (e) {
    console.warn('Create Server.key and Server.crt for HTTPS')
}
if (typeof options != 'undefined') http.createServer(app, options).listen(443)
