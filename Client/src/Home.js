import React from 'react';
import styled from 'styled-components';

const Style = styled.div`
  margin-top: 1em;
  margin-left: 6em;
  margin-right: 6em;
`;
const GridWrapper = styled.div`
  background-image: url('https://images-prod.healthline.com/hlcmsresource/images/AN_images/healthy-eating-ingredients-1296x728-header.jpg');
  background-size: cover;
  width:100%;
  height:100%;
  background-repeat: no-repeat;
  background-position: center;
  justify-content: center;
  font-size: 25px;
  color: black;
  grid-template-columns: repeat(12, 1fr);
  grid-auto-rows: minmax(25px, auto);
`;

export const Home = (props) => (
  <GridWrapper>
    <div className="HomeStyling">
      <Style>
        <br />
      <p>Tired of Cooking at Home? Or Want to Watch a Movie at your Leisure and
        dont want to cook?
        </p>
      <p>
      This is the Exact Place for you explore and find the product of your
      choice
      </p>

    </Style>
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    </div>
  </GridWrapper>
);
