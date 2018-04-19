function getGoals() {
    $.get('http://localhost:3333/goals', ( data ) => {
        viewModel.goals(data);
    });
}

function ViewModel() {
    const self = this;

    self.goalTypes = ko.observableArray(['Health & Fitness', 'Profeessional', 'Family & Relationships', 'Self help']);

    // STORES THE GOALS ARRY AFTER THE AJAX CALL
    self.goals = ko.observableArray();
    self.editMode = ko.observable(false);
    self.updatableGoal = ko.observable();
    
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
                console.log('Goal Added..');
                newGoal._id = data._id;
                self.goals.push(newGoal);
                self.restForm();
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

    self.editGoal = function () {
        self.editMode(true);
        self.goalInputName(this.name);
        self.goalInputType(this.type);
        self.goalInputDeadline(this.deadline);
        self.updatableGoal(this);
    }
    self.allowUpdate = ko.observable(false);

    self.updateGoal = function() {
        let goal = self.updatableGoal()
        let id = goal._id;
        let name = self.goalInputName();
        let type = self.goalInputType();
        let deadline = self.goalInputDeadline();
        let indexInGoals = self.goals().indexOf(goal);

        $.ajax({
            url: `http://localhost:3333/goals/${id}`,
            data: JSON.stringify({"name": name, "type": type, "deadline": deadline}),
            type: 'PUT',
            contentType: 'application/json',
            success: function(data) {
                console.log('updated')
                let oldGoal = self.goals()[indexInGoals];
                let updatedGoal = { _id: id, name, type, deadline}
                self.goals.replace(oldGoal, updatedGoal);

                self.restForm();
            },
            error: function( xhr, status, err ) {
                console.log('an error detected...')
            }
        })
    }

    self.restForm = function() {
        self.goalInputName('');
        self.goalInputType('');
        self.goalInputDeadline('');
        self.updatableGoal('')
        self.editMode(false);
    }
    
}

let viewModel = new ViewModel();
ko.applyBindings(viewModel)