const React = require('react');

let TodoList = React.createClass({

    render: function () {
        return (
            <div className="container">
                <div className="homepage">
                    <h1>todos</h1>
                    <input></input>
                </div>
            </div>
        );
    }
});

module.exports = TodoList;