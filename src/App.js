import React, { useState } from 'react';
import { useQuery } from 'graphql-hooks';
import styled from 'styled-components';
import { ReactComponent as Logo } from './assets/logo.svg';
import { saveToLocalStorage } from './utils/helper-localStorage';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Teamlist from './pages/Teamlist';

const INIT_QUERY = `query InitLoad {
  allTeammembers {
    employeeDesc
    employeeName
    employeeTitle
    contact
    employee {
      id
      responsiveImage {
        alt
        bgColor
        title
        src
        
      }
    }
  }
}`;

const App = () => {
  const { loading, error, data } = useQuery(INIT_QUERY, {
    variables: {
      limit: 20,
    },
  });
  const [teamList, setTeamList] = useState([]);
  const [textArea, setTextArea] = useState('');
  const [input, setInput] = useState('');
  const [email, setEmail] = useState('');

  if (loading) return 'Loading...';
  if (error) return 'Something Bad Happened';

  const handleSelect = (id, name, img, title, contact, index) => {
    setTeamList([...teamList, { id, name, img, title, contact }]);
  };

  const handleTextArea = (ev) => {
    setTextArea(ev.target.value);
  };

  const handleInput = (ev) => {
    setInput(ev.target.value);
  };

  const handleEmail = (ev) => {
    setEmail(ev.target.value);
  };

  const handleSend = (ev, teamList) => {
    saveToLocalStorage('list', teamList);
    saveToLocalStorage('input', input);
    saveToLocalStorage('textarea', textArea);
    saveToLocalStorage('email', email);
    const templateId = 'template_GTIg0YTZ';
    sendFeedback(templateId, {
      message_html: textArea,
      from_name: input,
      reply_to: email,
      link_team: 'https://jolly-einstein-6e0e15.netlify.app/team',
    });
    setEmail('');
    setInput('');
    setTextArea('');
    setTeamList([]);
  };

  const sendFeedback = (templateId, data) => {
    window.emailjs
      .send('gmail', templateId, data)
      .then((res) => {
        console.log('Email successfully sent!');
      })
      .catch((err) =>
        console.error(
          'Oh well, you failed. Here some thoughts on the error that occured:',
          err
        )
      );
  };

  return (
    <Router>
      <MainWrapper>
        <Header>
          <Logo width="62px" />
        </Header>
        <HeroTitle>
          <h1>Team management tool</h1>
        </HeroTitle>
        <Switch>
          <Route path="/" exact>
            <AppWrapper>
              <LeftColumn>
                <h2>Add members to your team</h2>
                <TeamWrapper>
                  {teamList.map((item) => (
                    <TeamList key={item.name}>
                      <div>
                        <img src={item.img} alt="employe" width="30px" />
                      </div>
                      <h4>{item.name}</h4>
                    </TeamList>
                  ))}
                  <Form id="userform">
                    <p>Name</p>
                    <input
                      required
                      type="text"
                      name="username"
                      value={input}
                      onChange={(ev) => handleInput(ev)}
                    />
                    <p>Email</p>
                    <input
                      required
                      type="text"
                      name="useremail"
                      value={email}
                      onChange={(ev) => handleEmail(ev)}
                    />
                    <textarea
                      value={textArea}
                      onChange={(ev) => handleTextArea(ev)}
                      placeholder="Remember, be nice!"
                    ></textarea>
                  </Form>
                  <Link to="/team">
                    <SelectButton
                      onClick={(ev) => handleSend(ev, teamList)}
                      disabled={teamList.length === 0}
                    >
                      Send your request
                    </SelectButton>
                  </Link>
                </TeamWrapper>
              </LeftColumn>
              <RightColumn>
                {data.allTeammembers.map((employee, index) => (
                  <Card key={employee.employee.id}>
                    <ImgWrapper>
                      <img
                        src={employee.employee.responsiveImage.src}
                        alt="img"
                      />
                    </ImgWrapper>
                    <h2>{employee.employeeName}</h2>
                    <h3>{employee.employeeTitle}</h3>
                    <a href={`mailto:${employee.contact}`}>
                      {employee.contact}
                    </a>
                    <p>{employee.employeeDesc}</p>

                    <SelectButton
                      onClick={() => {
                        let id = employee.employee.id;
                        let name = employee.employeeName;
                        let img = employee.employee.responsiveImage.src;
                        let contact = employee.contact;
                        let title = employee.employeeTitle;
                        handleSelect(id, name, img, title, contact, index);
                      }}
                    >
                      Add to the team
                    </SelectButton>
                  </Card>
                ))}
              </RightColumn>
            </AppWrapper>
          </Route>
          <Route path="/team" exact>
            <Teamlist />
          </Route>
        </Switch>
      </MainWrapper>
    </Router>
  );
};

const MainWrapper = styled.div`
  padding: 0px;
  margin: 0px;
  box-sizing: border-box;
`;

const TeamWrapper = styled.div``;

const TeamList = styled.div`
  background-color: #efefef;
  border-radius: 3px;
  padding: 5px;
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  div {
    height: 30px;
    overflow: hidden;
    border-radius: 50%;
    margin-right: 15px;
  }

  h4 {
    font-weight: 400;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100vw;
  padding: 30px 30px;
  background-color: #fff;
`;

const HeroTitle = styled.div`
  padding: 30px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background: #000
    url('https://www.datocms-assets.com/7718/1545236284-signifly-trine-cropped.jpg?auto=compress&w=1680&dpr=2&q=70');
  background-position: center;
  background-size: cover;
  height: 200px;
  h1 {
    color: white;
    font-size: 3rem;
    text-transform: uppercase;
  }
`;

const AppWrapper = styled.div`
  display: flex;
  padding: 30px;
`;

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  padding-right: 30px;
  h2 {
    padding-bottom: 30px;
    text-transform: uppercase;
    font-size: 1.2em;
  }
`;

const RightColumn = styled.div`
  width: 100%;
  display: grid;
  grid-gap: 40px;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  img {
    width: 100%;
  }
  h2 {
    font-weight: 700;
    padding-bottom: 5px;
  }
  h3 {
    font-weight: 400;
    padding-bottom: 7px;
    padding-top: 7px;
  }
  p {
    line-height: 1.3em;
    font-size: 0.8em;
    height: 50px;
    overflow: hidden;
    margin-bottom: 15px;
  }
  a {
    font-size: 0.9em;
    padding-bottom: 7px;
  }
`;

const ImgWrapper = styled.div`
  height: 200px;
  overflow: hidden;
  margin-bottom: 15px;
`;

const SelectButton = styled.button`
  text-transform: uppercase;
  color: white;
  font-weight: 400;
  padding: 10px 25px;
  border: none;
  border-radius: 3px;
  background: #4f00cf;
  transition: all 0.2s ease-in;
  width: 150px;
  outline: none;
  cursor: pointer;

  &:hover {
    background: #7e57ea;
  }

  &:disabled {
    background-color: gray;
    cursor: not-allowed;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 30px 0;
  input {
    padding: 10px;
    margin-bottom: 15px;
    font-size: 1rem;
    border-radius: 3px;
    outline: none;
  }
  textarea {
    padding: 10px;
    height: 200px;
    font-size: 1rem;
    border-radius: 3px;
    outline: none;
  }
  p {
    padding-bottom: 5px;
  }
`;

export default App;
