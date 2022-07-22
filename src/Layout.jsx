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

export default function Layout() {
  return (
    <ResponsiveWrapper flex={1} >
      <s.Container flex={1} jc={"center"} ai={"center"} fd={"column"}>
        <s.Screen>
          <s.Container flex={1} jc={"center"} ai={"center"} fd={"row"}
            >
            <ResponsiveWrapper>
              <s.Container flex={1} jc={"center"} ai={"center"} fd={"row"}>
                <MediaStyledLink href="/" >
                  <s.navbar>
                    Home
                  </s.navbar>
                </MediaStyledLink>
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
              </s.Container>
            </ResponsiveWrapper>
          </s.Container>
          <Outlet />
        </s.Screen>
      </s.Container >
    </ResponsiveWrapper >
  )
}