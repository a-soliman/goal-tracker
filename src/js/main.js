function getGoals() {
    $.get('http://localhost:3333/goals', ( data ) => {
        viewModel.goals(data);
        console.log(data)
    });
}

function ViewModel() {
    const self = this;

    self.goals = ko.observableArray();
}

let viewModel = new ViewModel();

ko.applyBindings(viewModel)