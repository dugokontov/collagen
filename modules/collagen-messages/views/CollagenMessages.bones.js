view = Backbone.View.extend({
    initialize: function() {
        // Allow for global display of messages
        Collagen.message = this.message;
        Collagen.error = this.error;
        return this.render();
    },
    render: function() {
        var messages = '';
        Collagen.messages.forEach(function(message) {
            messages += templates.CollagenMessage(message);
        });
        $('#messages').empty().append(messages);
        return this;
    },
    // Display single message
    message: function(type, message) {
        if (typeof message === 'undefined') {
            message = type;
            type = 'info';
        }
        $('#messages').empty().append(templates.CollagenMessage({
            type: type,
            message: message
        }));
    },
    // Display error message from `sync` request
    error: function(model, resp) {
        var message = resp;
        if (resp instanceof Object) {
            if (resp.responseText) {
                try {
                    message = $.parseJSON(resp.responseText).message;
                } catch (err) {}
            } else if (resp.message) {
                message = resp.message;
            } else {
                message = resp.toString();
            }
        }
        $('#messages').empty().append(templates.CollagenMessage({
            type: 'error',
            message: message
        }));
    }
});
