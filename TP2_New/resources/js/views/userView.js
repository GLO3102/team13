/**
 * Created by Rod on 27/10/15.
 */
(function(){
    UserView = Backbone.View.extend({
        //template: _.template($('#tvshow-episodes-tpl').html()),
        el: '#show_content',
        events: {
            'click .btn-follow': 'followUser'
        },
        initialize: function(){
            _.bindAll(this, 'render');
            var self = this;
            this.model = new UserModel();
            this.model.url = app_URL + 'users/' + this.id;
            // We want the view to render itself each time the model is changed.
            // We can bind to any events like this.
            this.model.fetch({
                success: function(){
                    self.render();
                },
                error: function (data) {
                    if(data.status == 401){
                        console.log("Token expired");
                        app_router.navigate("",true);
                    }
                }
            });
        },

        render: function(){
            var self = this;
            $.get('resources/templates/userTemplate.html', function (data) {
                self.template = _.template(data);
                self.$el.html(self.template({user : self.model.toJSON()}));
            }, 'html');
        },
        followUser: function(){
            console.log('Click Follow');
            var self = this;
            var idFollow = self.model.toJSON().id;
            $.ajax({
                url: "http://localhost:3000/follow",
                type: 'POST',
                data: {id:idFollow.toString()},
                dataType: 'JSON',
                async: true,
                success: function (data) {
                    console.log('ok');
                    console.log(data);
                },
                error: function (data) {
                    if(data.status == 401){
                        console.log("Token expired");
                        app_router.navigate("",true);
                    }
                }
            });
        }
    });
})();