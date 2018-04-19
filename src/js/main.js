function getGoals() {
    $.get('http://localhost:3333/goals', ( data ) => {
        viewModel.goals(data);
    });
}

function ViewModel() {
    const self = this;

    // STORES THE GOALS ARRY AFTER THE AJAX CALL
    self.goals = ko.observableArray();
    
    // FORM VALUES
    self.goalInputName      = ko.observable();
    self.goalInputType      = ko.observable();
    self.goalInputDeadline  = ko.observable();

    self.addGoal = function () {
        let name        = self.goalInputName();
        let type        = self.goalInputType();
        let deadline    = self.goalInputDeadline();

        const newGoal = { name, type, deadline };

        $.ajax({
            url: 'http://localhost:3333/goals',
            data: JSON.stringify({"name": name, "type": type, "deadline": deadline}),
            type: "POST",
            contentType: 'application/json',
            success: function( data ) {
                console.log('Goal Added..', data);
                newGoal._id = data._id;
                self.goals.push(newGoal);
            },
            error: function( xhr, status, err ) {
                consoe.log('an error detected...')
            }
        })
    };

    self.deleteGoal = function () {
        const indexInGoals = self.goals().indexOf(this);
        $.ajax({
            url: `http://localhost:3333/goals/${this._id}`,
            type: 'Delete',
            success: function(data) {
                console.log('deleted', data)
                let goals = self.goals();
                goals.splice(indexInGoals, 1);
                self.goals(goals);
                
            },
            error: function( xhr, status, err ) {
                console.log('an error detected...')
            }
        })
    };

    self.goalTypes = ko.observableArray(['Health & Fitness', 'Profeessional', 'Family & Relationships', 'Self help'])
}

let viewModel = new ViewModel();
ko.applyBindings(viewModel)