// FIXTURE: This file contains intentional linting issues to test the React configuration

import React from 'react';

// Missing React import (will be caught by react-in-jsx-scope)
// import React from 'react';

// Boolean prop with explicit value (should be implicit)
function BooleanProp() {
  return <button disabled={true}>Click me</button>;
}

// Incorrect JSX indentation
function BadIndentation() {
  return (
    <div>
      <p>
    Bad indentation
        </p>
    </div>
  );
}

// Missing key in array
function MissingKey() {
  const items = ['a', 'b', 'c'];
  return (
    <ul>
      {items.map(item => <li>{item}</li>)}
    </ul>
  );
}

// Duplicate props
function DuplicateProps() {
  return <div className="one" className="two">Duplicate</div>;
}

// Accessibility issues
function AccessibilityIssues() {
  return (
    <div>
      <img src="image.jpg" />
      <a>Link with no href</a>
      <div onClick={() => console.log('clicked')}>Click me</div>
      <button autofocus>Focus</button>
    </div>
  );
}

// React Hooks issues
function HooksIssues() {
  const [count, setCount] = React.useState(0);

  // Missing dependency
  React.useEffect(() => {
    console.log(count);
  }, []);

  // Conditional hook
  if (count > 0) {
    React.useEffect(() => {
      console.log('Conditional hook');
    }, []);
  }

  return <div>{count}</div>;
}

// Class component with direct state mutation
class StateMutation extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  increment() {
    // Direct state mutation
    this.state.count += 1;
  }

  render() {
    return <div>{this.state.count}</div>;
  }
}

// Missing prop types
function MissingPropTypes(props) {
  return <div>{props.name}</div>;
}

export {
  BooleanProp,
  BadIndentation,
  MissingKey,
  DuplicateProps,
  AccessibilityIssues,
  HooksIssues,
  StateMutation,
  MissingPropTypes
};
