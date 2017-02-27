const React = require('react');
const axios = require('axios');
const Item = require('./item.jsx');
const ItemCount = require('./itemCount.jsx');
const _ = require('lodash');
const ENTER_KEY = 13;

let TodoList = React.createClass({

    getInitialState: function () {

        return {
            items: [],
            fetchItems: [],
            newItem: ''
        };
    },

    componentDidMount: function () {
        this.fetchItems();
    },

    fetchItems: function () {

        const that = this;

        axios.get("http://localhost:8080/todoitems")
            .then(function (response) {
                that.setState({
                    items: response.data.items,
                    fetchItems: response.data.items
                });
            });
    },

    submitNewItem: function (event) {

        if (event.keyCode !== ENTER_KEY) {
            return;
        }
        event.preventDefault();

        let newInput = this.state.newItem.trim();

        if (newInput) {
            let newItem = {
                "done": false,
                "id": this.state.items.length + 1,
                "text": newInput,
                "timestamp": new Date()
            };

            this.state.items.push(newItem);

            axios.post('http://localhost:8080/todoitems?todoItem=' + newInput, null, {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            })
                .then(function (response) {
                    console.log(response.status + "post a new item");
                });

            this.setState({newItem: ''});
        }
    },

    createNewItem: function (event) {
        this.setState({newItem: event.target.value});
    },

    checkItem: function (item) {

        item.done = true;

        axios.put('http://localhost:8080/todoitems/' + item.id, item)
            .then(function (response) {
                console.log(response.status + "put item, id:" + item.id);
            });

        this.fetchItems();
    },

    clearCompleted: function (event) {
        event.preventDefault();
        _.find(this.state.fetchItems, function (item) {
            if (item.done == true) {

                axios.delete('http://localhost:8080/todoitems?id=' + item.id)
                    .then(function (response) {
                        console.log(response.status + "delete item, id:" + item.id);
                    })
            }
        });

        this.fetchItems();
    },

    filterActive: function (event) {
        event.preventDefault();

        let activeItems = _.filter(this.state.fetchItems, function (item) {
            return item.done == false;
        });

        this.setState({
            items: activeItems
        });
    },

    filterCompleted: function (event) {
        event.preventDefault();

        let completedItems = _.filter(this.state.items, function (item) {
            return item.done == true;
        });

        this.setState({
            items: completedItems
        });
    },

    render: function () {
        const that = this;
        const items = this.state.items;
        return (
            <div className="container">
                <div className="homepage">

                    <h1>todos</h1>
                    <input
                        id="newInput"
                        placeholder="What need to be done?"
                        value={this.state.newItem}
                        onKeyDown={this.submitNewItem.bind(this)}
                        onChange={this.createNewItem.bind(this)}
                    />
                    <ul id="itemList">
                        {items.map(function (item) {
                            return <Item item={item} checkItem={that.checkItem.bind(this)}/>
                        }) }
                    </ul>

                    <ul id="footerList">
                        <li id="itemCount"><ItemCount items={this.state.items}/></li>

                        <li>
                            <button onClick={this.fetchItems.bind(this)}>All</button>
                        </li>
                        <li>
                            <button onClick={this.filterActive.bind(this)}>Active</button>
                        </li>
                        <li>
                            <button onClick={this.filterCompleted.bind(this)}>Completed</button>
                        </li>
                        <li>
                            <button onClick={this.clearCompleted.bind(this)}>Clear completed</button>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
});

module.exports = TodoList;