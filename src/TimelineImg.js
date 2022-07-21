import React from "react";
import styled from "styled-components";


export const StyledImg = styled.img`
  box-shadow: 0px 5px 11px 2px rgba(0, 0, 0, 0.7);
  border: 4px  var(--secondary);
  background-color: var(--accent);
  border-radius: 100%;
  width: 40px;
  @media (min-width: 900px) {
    width: 40px;
  }
  @media (min-width: 1170px) {
    width: 60px;
  }

`;

const TimelineImg = () => (
  <div>
    <StyledImg
      className="img_logo"
      src="./config/images/RoadmapIcon.png"
    />
  </div>
);

export default TimelineImg;