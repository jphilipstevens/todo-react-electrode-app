import { connect } from "react-redux";

import { mapStateToProps, mapDispatchToProps } from "./transforms";
import TodoList from "./view";

const Container = connect(mapStateToProps, mapDispatchToProps)(TodoList);

export default Container;
