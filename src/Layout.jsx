import { Outlet, Link } from 'react-router-dom'
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "./redux/blockchain/blockchainActions";
import { fetchData } from "./redux/data/dataActions";
import * as s from "./styles/globalStyles";
import styled from "styled-components";
import { Container } from 'react-bootstrap';


export const ResponsiveWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: stretched;
  align-items: stretched;
  width: 100%;
  @media (min-width: 767px) {
    flex-direction: row;
  }
`;

export const MediaStyledLink = styled.a`
  color: var(--secondary);
  text-decoration: none;
  `;

export const SmallStyledImg = styled.img`
  box-shadow: 0px 5px 11px 2px rgba(0, 0, 0, 0.7);
  background-color: var(--accent);
  border-radius: 100%;
  width: 50px;
  @media (min-width: 800px) {
    width: 50px;
  }
  @media (min-width: 1000px) {
    width: 50px;
  }
  transition: width 0.5s;
`;

export const TransparentStyledLogo = styled.img`
  width: 20px;
  @media (min-width: 800px) {
    width: 25px;
  }
  @media (min-width: 1000px) {
    width: 60px;
  }
  transition: width 0.5s;
`;

export default function Layout() {
  return (
    <ResponsiveWrapper flex={1} >
      <s.Container flex={1} jc={"center"} ai={"center"} fd={"column"}>
        <s.Screen>
          <s.Container flex={1} jc={"center"} ai={"center"} fd={"row"}
          >
            <ResponsiveWrapper>
              <s.Container flex={1} jc={"left"} ai={"center"} fd={"row"}>
                <MediaStyledLink href="/">
                <s.Container flex={1} jc={"left"} ai={"center"} fd={"row"}>
                  <TransparentStyledLogo src="./config/images/logoShiny.png" />
                  <s.navbar>
                    Tamashhi
                  </s.navbar>
                  </s.Container>
                </MediaStyledLink>
              </s.Container>

              <s.Container flex={1} jc={"right"} ai={"center"} fd={"row"}>
                <s.SpacerLarge />
                <MediaStyledLink href="/About" >
                  <s.navbar>
                    About
                  </s.navbar>
                </MediaStyledLink>
                <s.SpacerLarge />
                <MediaStyledLink href="/Roadmap" >
                  <s.navbar>
                    Roadmap
                  </s.navbar>
                </MediaStyledLink>
                <s.SpacerLarge />
                <MediaStyledLink href="/Mint" >
                  <s.navbar>
                    Mint
                  </s.navbar>
                </MediaStyledLink>
                <s.SpacerSmall />
                <MediaStyledLink href="https://twitter.com/tamashhi" target="_blank" >
                  <SmallStyledImg alt="Twitter" src="/config/images/twitter.png" />
                </MediaStyledLink>
                <s.SpacerSmall />
                <MediaStyledLink href="https://discord.gg/cVn7EvyqM2" target="_blank">
                  <SmallStyledImg alt="Discord" src="/config/images/discord.png" />
                </MediaStyledLink>
                <s.SpacerSmall />
                <MediaStyledLink href="https://opensea.io/tamashhi" target="_blank">
                  <SmallStyledImg alt="OpenSea" src="/config/images/openSea.png" />
                </MediaStyledLink>
              </s.Container>
              <s.SpacerSmall />
            </ResponsiveWrapper>
          </s.Container>
          <Outlet />
        </s.Screen>
      </s.Container >
    </ResponsiveWrapper >
  )
}