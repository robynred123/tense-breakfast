import { updateStatus } from '../actions/actons';
import { Header } from '../components/Header';
import { useAppDispatch, useAppSelector } from '../store';

export const Index = () => {
  const { status } = useAppSelector((state) => state.one);
  const dispatch = useAppDispatch();

  return (
    <div className='App'>
      <Header />
      <header className='App-header'>
        <p>{status}</p>
        <button onClick={() => dispatch(updateStatus('a call?'))}>Learn React</button>
      </header>
    </div>
  );
};
