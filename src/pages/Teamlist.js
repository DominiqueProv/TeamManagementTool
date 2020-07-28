import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getFromLocalStorage } from '../utils/helper-localStorage';
import { Link } from 'react-router-dom';

const Teamlist = () => {
  const [data, setData] = useState();
  useEffect(() => {
    setData(getFromLocalStorage('list'));
  }, []);

  return (
    <div>
      <TeamHeader>
        <Link to="/">
          <Arrow>
            <h2>← Back</h2>
          </Arrow>
        </Link>
        <h1>Your team</h1>
      </TeamHeader>
      <TeamList>
        {data &&
          data.map((item) => (
            <Card key={item.id}>
              <ImgWrapper>
                <img src={item.img} alt="img" />
              </ImgWrapper>
              <h2>{item.name}</h2>
              <h3>{item.title}</h3>
              <a href={`mailto:${item.contact}`}>{item.contact}</a>
            </Card>
          ))}
      </TeamList>
    </div>
  );
};

const TeamHeader = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  height: 80px;
  h1 {
    font-size: 2rem;
  }
`;

const TeamList = styled.div`
  padding: 30px;
  width: 100%;
  display: grid;
  grid-gap: 40px;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
`;

const Arrow = styled.div`
  position: absolute;
  top: 30px;
  left: 30px;
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

export default Teamlist;
