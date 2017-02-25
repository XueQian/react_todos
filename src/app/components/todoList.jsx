const React = require('react');
const axios = require('axios');

let TodoList = React.createClass({
    getInitialState: function () {

        return {
            data: {items: []}
        };
    },
    componentDidMount: function () {

        const that = this;

        axios.get("http://localhost:4010/todoitems")
            .then(function (response) {
                that.setState({data: response.data});
            });
    },

    render: function () {
        const items = this.state.data.items;
        return (
            <div className="container">
                <div className="homepage">
                    <h1>todos</h1>
                    <input></input>
                    <ul>
                        {items.map(function (item) {
                            return <li>
                                <input type="checkbox" value={item.id}/>{item.text}
                            </li>
                        }) }
                    </ul>

                </div>
            </div>
        );
    }
});

module.exports = TodoList;