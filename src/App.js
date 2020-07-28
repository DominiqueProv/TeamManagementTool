import React, { useState } from 'react';
import { useQuery } from 'graphql-hooks';
import styled from 'styled-components';
import { ReactComponent as Logo } from './assets/logo.svg';
import { TeamProvider } from './context/team.context';

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

function App() {
  const [teamList, setTeamList] = useState([]);
  const { loading, error, data } = useQuery(INIT_QUERY, {
    variables: {
      limit: 20,
    },
  });

  if (loading) return 'Loading...';
  if (error) return 'Something Bad Happened';

  const handleSelect = (id, name, img, title, contact, index) => {
    setTeamList([...teamList, { id, name, img, title, contact }]);
  };
  console.log(data.allTeammembers.length);
  return (
    <MainWrapper>
      <Header>
        <Logo width="62px" />
      </Header>
      <HeroTitle>
        <h1>Team management tool</h1>
      </HeroTitle>
      <AppWrapper>
        <TeamProvider>
          <LeftColumn>
            <h2>Your customized team</h2>
            <TeamWrapper>
              {teamList.map((item) => (
                <TeamList key={item.name}>
                  <div>
                    <img src={item.img} alt="employe" width="30px" />
                  </div>
                  <h4>{item.name}</h4>
                </TeamList>
              ))}
              <SelectButton disabled={teamList.length === 0}>
                Send your request
              </SelectButton>
            </TeamWrapper>
          </LeftColumn>
          <RightColumn>
            {data.allTeammembers.map((employee, index) => (
              <Card key={employee.employee.id}>
                <ImgWrapper>
                  <img src={employee.employee.responsiveImage.src} alt="img" />
                </ImgWrapper>
                <h2>{employee.employeeName}</h2>
                <h3>{employee.employeeTitle}</h3>
                <a href={`mailto:${employee.contact}`}>{employee.contact}</a>
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
        </TeamProvider>
      </AppWrapper>
    </MainWrapper>
  );
}

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

export default App;
