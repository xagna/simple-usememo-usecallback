import * as React from 'react';
import './style.css';

export default function App() {
  const [count, setCount] = React.useState(0);
  const [show, setShow] = React.useState(false);

  const increment = () => {
    setCount((count) => count + 1);
  };

  const decrement = () => {
    setCount((count) => count - 1);
  };

  const twice = (n: number) => {
    console.log('heavy computation');
    return n * 2;
  };

  const fullText = React.useCallback(
    (text: string) => {
      console.log('run fulltext');
      return count + '-' + text;
    },
    [count]
  );

  // const fullText = (text: string) => {
  //   console.log('run fulltext');
  //   return count + '-' + text;
  // };

  const twiceCount = React.useMemo(() => twice(count), [count]);
  // const twiceCount = twice(count);

  // React.useEffect(() => {
  //   console.log(fullText('appear once'));
  // }, [fullText]);

  return (
    <div>
      <button onClick={() => setShow((v) => !v)}>toggle</button>
      <h1>{show ? 'Show me' : null}</h1>
      <h1>Count: {count}</h1>
      <h1>Twice (heavy computation): {twiceCount}</h1>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      <Name fullText={fullText} />
    </div>
  );
}

type NameProps = {
  fullText: Function;
};

const Name = React.memo(function ({ fullText }: NameProps) {
  const [name, setName] = React.useState('dyva');
  const full = fullText(name);

  React.useEffect(() => {
    console.log('name rerender!');
  });

  return (
    <div>
      <h1>Name: {name}</h1>
      <h1>Full: {full}</h1>
      <input onChange={(e) => setName(e.target.value)} />
    </div>
  );
});
