import { updateStatus } from '../actions/actons';
import { useAppDispatch, useAppSelector } from '../store';

export const Index = () => {
  const { status } = useAppSelector((state) => state.one);
  const dispatch = useAppDispatch();

  return (
    <div className='App'>
      <header className='App-header'>
        <p>{status}</p>
        <button onClick={() => dispatch(updateStatus('a call?'))}>Learn React</button>
      </header>
    </div>
  );
};
