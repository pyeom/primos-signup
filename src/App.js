import './App.css';
import { Form } from './componentes/Form';

export default function App() {
  return (
    <div className="App">
      <div className='Container'>
        <h1 style={{color:'aliceblue'}}>Ingrese sus datos:</h1>
        <Form className="Form"/>
      </div>
    </div>
  );
}