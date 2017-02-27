const React = require('react');
const axios = require('axios');

let Item = React.createClass({

    render: function () {
        const item = this.props.item;
        const isChecked = item.done ? "checked" : "unChecked";

        return (
            <li className={isChecked} id="item">
                <input type="checkbox"
                       value={item.id}
                       checked={item.done}
                       onChange={this.props.checkItem.bind(this, item)}
                />
                <label>{item.text}</label>
            </li>
        );
    }
});

module.exports = Item;