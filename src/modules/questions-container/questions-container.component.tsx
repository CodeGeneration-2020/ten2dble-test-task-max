import React, { Component, Dispatch } from "react";
import { connect } from "react-redux";

import { QUESTIONS } from "../../questions";
import * as Styled from './questions-container.styled'
import { updateScore, updateTries } from "../../redux/slices/user-slices";
import { TState } from "./questions-container.types";
import { TInitialState } from "../../redux/slices/user-slices.types";

const initialState: TState = {
  inputValues: {},
  errors: {},
  isConfirmDisabled: true,
}

interface IQuestionsContainerProps {
  data: TInitialState,
  updateMyTries: (payload: number) => void,
  updateMyScore: (payload: number) => void,
}

class QuestionsContainer extends Component<IQuestionsContainerProps> {
  state = initialState

  changeHandler(value: string, key: string) {
    const inputValues = this.state.inputValues
    const errors = this.state.errors
    // disable the confirm button
    let isConfirmDisabled = false

    // set the value from input
    inputValues[key] = value
    // case insensitive check is value yes or no 
    errors[key] = !value.match(/^(?:Yes|No)$/ig)
     
    // check is all fields fulfiled
    if (Object.keys(QUESTIONS).length !== Object.values(inputValues).length) {
      isConfirmDisabled = true 
    } else {
      // check if errors have true values
      Object.values(errors).forEach(errorTrue => {
        // disable button when error
        if (errorTrue) {
          isConfirmDisabled = true 
        }
      })  
    }

    this.setState({...this.state, errors, inputValues, isConfirmDisabled})
  }

  async confirmHandler() {
    const inputValues = this.state.inputValues
    let yesAns = 0
    let questions = Object.keys(QUESTIONS).length

    // count number of yes answers
    for (let el of Object.values(inputValues)) {
      if (el.match(/^Yes$/ig)) {
        yesAns++
      }
    }

    // calculate the score
    const score = 100 * yesAns / questions

    // update data in storage
    this.props.updateMyTries(1)
    this.props.updateMyScore(score)

    // clear form
    this.setState({ 
      inputValues: {},
      errors: {},
      isConfirmDisabled: true})
    }


  render() {
    return (
      <div>
        {Object.entries(QUESTIONS).map(([key, value]) => (
          <div key={key}>
            <Styled.Text>{value}</Styled.Text>
            {this.state.errors[key] && <Styled.ErrorText>answer should be yes or no</Styled.ErrorText>}
            <Styled.Input 
              placeholder='type your answer' 
              value={this.state.inputValues[key] || ''} 
              onChange={(e) => this.changeHandler(e.target.value, key)}
            />
          </div>
        ))}

        <Styled.Button disabled={this.state.isConfirmDisabled} onClick={this.confirmHandler.bind(this)}>Confirm</Styled.Button>
      </div>
    );
  }
}

const mapStateToProps = (state: TInitialState) => {
  return { data: state };
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    updateMyTries: (payload: number) => {
      dispatch(updateTries(payload));
    },
    updateMyScore: (payload: number) => {
      dispatch(updateScore(payload));
    }
  };
};

const ConnectedQuestionsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(QuestionsContainer);

export default ConnectedQuestionsContainer;

