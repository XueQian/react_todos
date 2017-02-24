(function () {
    const React = require('react'),
        ReactDOM = require('react-dom');
    TodoList = require('./components/todoList.jsx');

    window.React = React;

    ReactDOM.render(<TodoList />, document.getElementById("main"));
})();