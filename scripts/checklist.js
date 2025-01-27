(function(window){
    'use strict';
    var App = window.App || {};
    var $ = window.jQuery;

    function CheckList(selector) {
        if(!selector){
            throw new Error('No selector provided');
        }
        this.$element = $(selector);
        if(this.$element.length === 0){
            throw new Error('Could not find element with selecter ' + selector);
        }
    }

    CheckList.prototype.addClickHandler = function (fn) {
        this.$element.on('click','input',function(event){
            var email = event.target.value;
            this.removeRow(email);
            fn(email);
        }.bind(this));
    };

    CheckList.prototype.addRow = function (coffeeOrder) {
        // remove any existing rows that match the email
        this.removeRow(coffeeOrder.emailAddress);
        // create a new instance of a row using the coffee order info
        var rowElement = new Row(coffeeOrder);

        // add the new row instance's element property to the checklist
        this.$element.append(rowElement.$element);
    };

    CheckList.prototype.removeRow = function (email) {
        this.$element
            .find('[value="' + email + '"]')
            .closest('[data-coffee-order="checkbox"]')
            .remove();
    };
    function Row(coffeeOrder){
        var $div = $('<div></div>', {
            'data-coffee-order' : 'checkbox',
            'class' : 'checkbox'
        });

        var description = coffeeOrder.size + ' ';
        if(coffeeOrder.flavor){
            description += coffeeOrder.flavor + ' ';
        }
        description += coffeeOrder.coffee + ',';
        description += ' (' + coffeeOrder.emailAddress + ')';
        description += ' [' + coffeeOrder.strength + 'x]';

        var $label = $('<label></label>');

        var $checkbox = $('<input></input>', {
            type: 'checkbox',
            value: coffeeOrder.emailAddress
        });

        $label.append($checkbox);
        $label.append(description);
        $div.append($label);

        this.$element = $div;
    }

    App.CheckList = CheckList;
    window.App = App;
})(window);
