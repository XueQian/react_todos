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
            newItem: ''
        };
    },
    componentDidMount: function () {
        this.fetchItems();
    },

    fetchItems: function () {

        const that = this;

        axios.get("http://localhost:4010/todoitems")
            .then(function (response) {
                that.setState({items: response.data.items});
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

            axios.post('http://localhost:4010/todoitems', newItem)
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

        axios.post('http://localhost:4010/todoitems', item)
            .then(function (response) {
                console.log(response.status + "put item, id:" + item.id);
            });
    },

    clearCompleted: function () {
        _.find(this.state.items, function (item) {
            if (item.done == true) {

                axios.delete('http://localhost:4010/todoitems/' + item.id)
                    .then(function (response) {
                        console.log(response.status + "delete item, id:" + item.id);
                    })
            }
        });

        this.fetchItems();
    },

    filterActive: function () {
        this.fetchItems();

        this.setState({
            items: _.filter(this.state.items, function (item) {
                return item.done == true;
            })
        });
    },

    filterCompleted: function () {
        this.fetchItems();

        this.setState({
            items: _.filter(this.state.items, function (item) {
                return item.done == false;
            })
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
                        placeholder="What need to be done?"
                        value={this.state.newItem}
                        onKeyDown={this.submitNewItem}
                        onChange={this.createNewItem}
                    />
                    <ul>
                        {items.map(function (item) {
                            return <Item item={item} checkItem={that.checkItem}/>
                        }) }
                    </ul>

                    <ItemCount items={this.state.items}/>

                    <button onClick={this.fetchItems()}>All</button>
                    <button onClick={this.filterActive}>Active</button>
                    <button onClick={this.filterCompleted}>Completed</button>
                    <button onClick={this.clearCompleted}>Clear completed</button>
                </div>
            </div>
        );
    }
});

module.exports = TodoList;