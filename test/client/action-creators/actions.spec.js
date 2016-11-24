import * as actionCreators from "../../../client/action-creators/todo";
import actionTypes from "../../../client/actions/todo";

describe("Todo add Todo", () => {
  it("should create an action to add a todo", () => {
    const text = "Finish docs";
    const expectedAction = {
      type: actionTypes.ADD,
      payload: {
        text,
        completed: false
      }
    };
    const actual = actionCreators.addTodoAction({text, completed: false});
    expect(actual).to.deep.equal(expectedAction);
  });
});

describe("Todo toggle action", () => {
  it("should create a toggle action ", () => {
    const expectedAction = {
      type: actionTypes.TOGGLE,
      meta: {
        todoId: 1
      }
    };
    const actual = actionCreators.toggleTodo(1);
    expect(actual).to.deep.equal(expectedAction);
  });
});

describe("Todo error action", () => {
  it("should create an error action ", () => {
    const expectedAction = {
      type: actionTypes.ADD_ERROR,
      payload: {
        error: new Error("error")
      }
    };
    const actual = actionCreators.addTodoError(new Error("error"));
    expect(actual).to.deep.equal(expectedAction);
  });
});
