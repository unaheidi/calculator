if (Meteor.isClient) {
    var display = 'display';
    Session.setDefault(display, '');

    Template.display.helpers({
        placeholder: '1+2=3',
        result: function () {
            return Session.get(display);
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
            var buttonValue = event.target.value;
            var output = Session.get(display);
            if (isNaN(buttonValue)) {
                if(buttonValue == "=") {
                    try {
                      eval(output);
                      Session.set(display, eval(output));
                    } catch (err) {
                      console.log("The calculation formula has errors! Please check it:" + output);
                      Session.set(display, '');
                    }
                } else if (buttonValue == "C") {
                    Session.set(display, '');
                } else if (buttonValue == '<') {
                    Session.set(display, output.toString().slice(0, -1));
                } else {
                    Session.set(display, output + buttonValue);
                }
            } else {
                Session.set(display, output + buttonValue);
            }
        }
    });
}

if (Meteor.isServer) {
    Meteor.startup(function () {
        // code to run on server at startup
    });
}
