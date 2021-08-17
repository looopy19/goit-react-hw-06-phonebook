
import Form from './components/Form';
import Section from './components/Section';
import Contacts from './components/Contacts';
import Filter from './components/Filter';



function App() {
  return (
    <>
      <Section title='Phonebook'>
        <Form/>
      </Section>
      
      <Section title='Contacts'>
        <Filter />
        <Contacts/>
        </Section>
      </>
  );
}


export default App;