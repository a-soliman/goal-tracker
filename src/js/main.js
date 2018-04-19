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

        self.goals.push(newGoal);
        

    };

    self.goalTypes = ko.observableArray(['Health & Fitness', 'Profeessional', 'Family & Relationships', 'Self help'])
}

let viewModel = new ViewModel();

ko.applyBindings(viewModel)