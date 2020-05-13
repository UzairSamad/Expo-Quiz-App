import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import RadioForm, {
  RadioButton,
  RadioButtonLabel,
  RadioButtonInput
} from "react-native-simple-radio-button";
import RadioGroup, { Radio } from "react-native-radio-input";

class Quiz extends Component {
  state = {
    quiz: [],
    currentQuestion: "",
    correctAnswers: [],
    questionToDisplay: 0,
    userAnswer: 0,
    nextButton: true,
    quizScreen: true,
    data: false,
    time: {
      minutes: 0,
      second: 0
    },
    options: [],
    score: 0
  };

  // Getting quiz from api ...........
  getData = async () => {
    let rawData = await fetch(
      "https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple"
    );
    let data = await rawData.json();
    //   console.log('This is data in get data function' , data)
    this.setState({ quiz: data.results });
    console.log(this.state.quiz);

    // adding correct answer into a new array of state......
    correctAnswersArray = [];
    this.state.quiz.map((item, index) => {
      correctAnswersArray.push(this.state.quiz[index].correct_answer);
    });
    this.setState({ correctAnswers: correctAnswersArray });

    console.log("Correctanswer in state", this.state.correctAnswers);
  };

  // .... getting quiz ends here.......

  async componentDidMount() {
    let rawData = await fetch(
      "https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple"
    );
    let data = await rawData.json();
    //   console.log('This is data in get data function' , data)
    this.setState({ quiz: data.results });
    console.log(this.state.quiz);

    // adding correct answer into a new array of state......
    correctAnswersArray = [];
    this.state.quiz.map((item, index) => {
      correctAnswersArray.push(this.state.quiz[index].correct_answer);
    });
    this.setState({ correctAnswers: correctAnswersArray });

    console.log("Correctanswer in state", this.state.correctAnswers);

    //  this.getData()
    this.setState({ data: true });
    {
      this.state.data && this.displayQuestion();
    }
  }

  //Renderng Question

  displayQuestion = () => {
    const { quiz, questionToDisplay, userAnswer, score } = this.state;
    const currentQuestion = quiz[questionToDisplay].question;
    let optionsList = quiz[questionToDisplay].incorrect_answers;
    optionsList.push(quiz[questionToDisplay].correct_answer);
    console.log("op => 0", optionsList);
    // console.log("test => ", test);

    const options = optionsList.map((op, index) => ({
      label: op,
      value: index
    }));
    if (options[userAnswer].label === quiz[questionToDisplay].correct_answer) {
      this.setState({ score: score + 10 });
    }
    this.setState({ currentQuestion, options });
    console.log(currentQuestion);
  };

  // handleing next button.............
  handleNext = () => {
    let { questionToDisplay, quiz } = this.state;
    if (questionToDisplay < quiz.length) {
      this.setState({ questionToDisplay: questionToDisplay + 1 }, () => {
        this.displayQuestion();
      });
    } else {
      this.setState({ currentQuestion: "Finished" });
    }

    console.log(questionToDisplay);

    //     let {x} = this.state;
    //    if (x< this.state.quiz.length){
    //     x ++;
    //     let newQuestion = []
    //     newQuestion.push(this.state.quiz[x-1])
    //     console.log( 'this is question array',newQuestion)
    //     this.setState({questionToDisplay:newQuestion})
    //     console.log(this.state.x)
    //     this.setState({x:x})
    //     console.log('this is state obj',this.state.questionToDisplay)
    //     console.log(newQuestion)
    //     console.log(this.state.x)

    //    } else{
    //        return console.log('this is for finish button')
    //    }
  };
  // handle next ends here.....

  //making options for radio buttons.....
  optionsForRadioButton = [];
  makeOptions = () => {
    this.state.questionToDisplay[0].incorrect_answers.map((name, key) => {
      optionsForRadioButton.push({ label: name, value: key });
    });
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "space-around"
        }}
      >
        <TouchableOpacity
          onPress={this.getData}
          style={{
            flex: 0.06,
            alignItems: "center",
            backgroundColor: "pink",
            padding: 5
          }}
        >
          <Text style={{ color: "white", marginBottom: 10, fontSize: 16 }}>
            Get Data
          </Text>
        </TouchableOpacity>
        <Text> {this.state.score} </Text>
        <TouchableOpacity
          onPress={this.handleNext}
          style={{
            flex: 0.06,
            alignItems: "center",
            padding: 5,
            borderRadius: 3,
            backgroundColor: "lightblue"
          }}
        >
          <Text style={{ color: "white", marginBottom: 10, fontSize: 16 }}>
            {this.state.questionToDisplay <= 9 ? "Next Button" : "Finish"}
          </Text>
        </TouchableOpacity>

        {this.state.data && <Text>{this.state.currentQuestion}</Text>}

        <RadioForm
          radio_props={this.state.options}
          initial={0}
          onPress={value => {
            this.setState({ userAnswer: value });
          }}
        />
      </View>
    );
  }
}

export default Quiz;
