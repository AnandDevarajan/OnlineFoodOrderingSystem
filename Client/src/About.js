import React from 'react';
import styled from 'styled-components';

const Style = styled.div`
  margin-top: 1em;
  margin-left: 6em;
  margin-right: 6em;
`;
const GridWrapper = styled.div`
  background-image: url('https://wallpaperaccess.com/full/1316970.jpg');
  background-size: cover;
  width:100%;
  height:100%;  
  font-size: 25px;
  color:#0A014D;
  grid-template-columns: repeat(12, 1fr);
  grid-auto-rows: minmax(25px, auto);
`; 
export const About = () => (
  <GridWrapper>
    <Style>
      <br />
    <h2>About Page</h2>
    <br />
    <p>We provide quality products right at your doorstep at superfast speeds..</p>
    <p>We are the ASSK Team</p>
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
  </GridWrapper>
)