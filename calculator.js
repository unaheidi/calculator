if (Meteor.isClient) {
    const calculator = {
        result: 'result',
        init: function() {
            Session.setDefault(this.result, '');
        },
        getResult: function() {
            return Session.get(this.result);
        },
        setResult: function(data) {
            Session.set(this.result, data)
        },
        calc: function() {
            this.setResult(
                eval(this.getResult())
            );
        },
        clear: function() {
            this.setResult('');
        },
        undo: function() {
            this.setResult(
                this.getResult().slice(0,-1)
            );
        },
        add: function(data) {
            this.setResult(
                this.getResult() + data
            );
        }
    };
    calculator.init();

    Template.display.helpers({
        placeholder: '1+2=3',
        result: function () {
            return calculator.getResult();
        }
    });

    Template.numpad.helpers({
        buttons: function () {
            return [
                [
                    {value: 'C', classType:'danger'},
                    {value: '(', classType:'primary'},
                    {value: ')', classType:'primary'},
                    {value: '<', classType:'default'},
                ],
                [
                    {value: '7', classType:'info'},
                    {value: '8', classType:'info'},
                    {value: '9', classType:'info'},
                    {value: '/', classType:'primary'},
                ],
                [
                    {value: '4', classType:'info'},
                    {value: '5', classType:'info'},
                    {value: '6', classType:'info'},
                    {value: '*', classType:'primary'},
                ],
                [
                    {value: '1', classType:'info'},
                    {value: '2', classType:'info'},
                    {value: '3', classType:'info'},
                    {value: '-', classType:'primary'},
                ],
                [
                    {value: '0', classType:'info'},
                    {value: '.', classType:'info'},
                    {value: '=', classType:'success'},
                    {value: '+', classType:'primary'},
                ],
            ];
        }
    });

    Template.button.events({
        'click button': function (event) {
            const value = event.target.value;
            switch (value) {
                case '=':
                    calculator.calc();
                    break;
                case 'C':
                    calculator.clear();
                    break;
                case '<':
                    calculator.undo();
                    break;
                default:
                    calculator.add(value);
                    break;
            }
        }
    });
}

if (Meteor.isServer) {
    Meteor.startup(function () {
        // code to run on server at startup
    });
}
