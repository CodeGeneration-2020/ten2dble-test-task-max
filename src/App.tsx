import React, { Component } from "react";
import { connect } from "react-redux";

import QuestionsContainer from "./modules/questions-container/questions-container.component";
import { TInitialState } from "./redux/slices/user-slices.types";

interface IAppProps {
  data: TInitialState,
}

class App extends Component<IAppProps> {
  state = {
    averageScore: 0
  }

  componentDidUpdate(prevProps: IAppProps) {
    if(prevProps.data !== this.props.data) {
      this.setState({averageScore: (100 * this.props.data.userTotalScore / this.props.data.userTries) || 0})
    }
  }

  render() {
    return (
      <div className="main__wrap">
        <main className="container">
          <p>Your Average Score: {this.state.averageScore.toFixed(2)}</p>
          <QuestionsContainer  />
        </main>
      </div>
    );
  }
}

const mapStateToProps = (state: TInitialState) => {
  return { data: state };
};

const ConnectedApp = connect(
  mapStateToProps,
)(App);

export default ConnectedApp;
