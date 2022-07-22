import styled from "styled-components";

// Used for wrapping a page component
export const Screen = styled.div`
  background-color: var(--primary);
  background-image: ${({ image }) => (image ? `url(${image})` : "none")};
  background-size: cover;
  background-position: center;
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

// Used for providing space between components
export const SpacerXSmall = styled.div`
  height: 8px;
  width: 8px;
`;

// Used for providing space between components
export const SpacerSmall = styled.div`
  height: 16px;
  width: 16px;
`;

// Used for providing space between components
export const SpacerMedium = styled.div`
  height: 24px;
  width: 24px;
`;

// Used for providing space between components
export const SpacerLarge = styled.div`
  height: 32px;
  width: 32px;
`;

// Used for providing a wrapper around a component
export const Container = styled.div`
  display: flex;
  flex: ${({ flex }) => (flex ? flex : 0)};
  flex-direction: ${({ fd }) => (fd ? fd : "column")};
  justify-content: ${({ jc }) => (jc ? jc : "flex-start")};
  align-items: ${({ ai }) => (ai ? ai : "flex-start")};
  background-color: ${({ test }) => (test ? "pink" : "none")};
  width: 100%;
  background-image: ${({ image }) => (image ? `url(${image})` : "none")};
  background-size: cover;
  background-position: center;
`;

export const TextTitle = styled.p`
  color: var(--primary-text);
  font-size: 22px;
  font-weight: 500;
  line-height: 1.6;
`;

export const TextSubTitle = styled.p`
  color: var(--primary-text);
  font-size: 18px;
  line-height: 1.6;
`;

export const TextDescription = styled.p`
  color: var(--primary-text);
  font-size: 50px;
  line-height: 1.6;
  @media (min-width: 800px) {
    font-size:70px;
  }
`;
export const TitleDescription = styled.p`
  color: var(--primary-text);
  font-size: 25px;
  line-height:1.6;
  @media (min-width: 800px) {
    font-size: 40px;
  }
`;
export const SmallDescription = styled.p`
  color: var(--primary-text);
  font-size: 20px;
  line-height:1.6;
  @media (min-width: 800px) {
    font-size: 30px;
  }
`;

export const HomeTitle = styled.p`
color: var(--secondary-text);
font-size: 50px;
line-height:1.6;
@media (min-width: 800px) {
  font-size: 100px;
}
@media (min-width: 1000px) {
  font-size: 200px;
}
transition: width 0.5s;
`;

export const AboutTitle = styled.p`
color: var(--secondary-text);
font-size: 50px;
line-height:1.6;
@media (min-width: 800px) {
  font-size: 100px;
}
`;

export const navbar = styled.p`
color:var(--secondary-text);
font-size: 20px;
line-height:1.6;
@media (min-width:800px){
  font-size:40px;
}
transition: width 0.5s;
`;

export const HomeDescription = styled.p`
color:var(--secondary-text);
font-size: 20px;
line-height:1.6;
@media (min-width:800px){
  font-size:50px;
}
`;

export const TamashhiTitle = styled.p`
color:var(--secondary-text);
font-size: 35px;
line-height:1.6;
@media (min-width:800px){
  font-size:50px;
}
`;

export const soon = styled.p`
color:var(--secondary-text);
font-size: 35px;
line-height:1.6;
@media (min-width:800px){
  font-size:50px;
}
`;

export const NormalText = styled.p`
color:var (--secondary-text);
font-size: 20px;
line-height:1.6;
@media (min-width:800px){
  font-size:25px;
}
`;

export const SmallText = styled.p`
color:var (--secondary-text);
font-size:17px;
line-height:1.6;
@media (min-width:800px){
  font-size:20px;
}
`;

export const StyledClickable = styled.div`
  :active {
    opacity: 0.6;
  }
`;
