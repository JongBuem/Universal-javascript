const React = require('react')
const About = (props) => {
    return (
        <div>
            <h1 style={{ color: 'red' }}> Tank you {props.name ? props.name : ''} for signing up!</h1>
            <p>If tou have any questions, plese conutact support</p>
        </div>
    )
}

module.exports = About
