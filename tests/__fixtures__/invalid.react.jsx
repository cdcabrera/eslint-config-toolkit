// FIXTURE: This file contains intentional linting issues to test the React configuration

import React from 'react';

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

// Duplicate props (coverage gap: react/jsx-no-duplicate-props has no @eslint-react equivalent).
// Uses a known attribute (`id`) so @eslint-react/dom-no-unknown-property does not mask the gap;
// expected to produce NO duplicate-prop violation so the regression is visible in the snapshot.
function DuplicateProps() {
  return <div id="first" id="second">Duplicate props</div>;
}

// Children passed as a prop instead of JSX children
function ChildrenProp() {
  return <div children="Children prop" />;
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

// JSX scope tracking: `Child` is only referenced from JSX and is NOT exported, so it must
// not be reported by no-unused-vars. `UndeclaredChild` must be reported by toolkit/jsx-uses-vars.
function Child() {
  return <span />;
}

function ScopeTracking() {
  return (
    <div>
      <Child />
      <UndeclaredChild />
    </div>
  );
}

// Explicit React.Fragment without attributes (allowed: @stylistic/jsx-shorthand-fragment is disabled)
function FragmentSyntax() {
  return <React.Fragment>Fragment content</React.Fragment>;
}

export {
  BooleanProp,
  BadIndentation,
  MissingKey,
  DuplicateProps,
  ChildrenProp,
  AccessibilityIssues,
  HooksIssues,
  StateMutation,
  ScopeTracking,
  FragmentSyntax
};
