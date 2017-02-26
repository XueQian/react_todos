const React = require('react');
const _ = require('lodash');

let ItemCount = React.createClass({

    calculateUncheckedCount: function (items) {
        let unCheckedCount = 0;

        _.find(items, function (item) {
            if (item.done == false) {
                unCheckedCount++;
            }
        });
        return unCheckedCount;
    },

    render: function () {
        const items = this.props.items;
        let unCheckedCount = this.calculateUncheckedCount(items);

        return (
            <span>{unCheckedCount} item left</span>
        );
    }
});

module.exports = ItemCount;