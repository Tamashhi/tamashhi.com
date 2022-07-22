import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "./redux/blockchain/blockchainActions";
import { fetchData } from "./redux/data/dataActions";
import * as s from "./styles/globalStyles";
import styled from "styled-components";
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import TimelineImg from "./TimelineImg"

const truncate = (input, len) =>
    input.length > len ? `${input.substring(0, len)}...` : input;

export const StyledButton = styled.button`
  padding: 10px;
  border-radius: 50px;
  border: none;
  background-color: var(--secondary);
  padding: 10px;
  font-weight: bold;
  color: var(--secondary-text);
  width: 100px;
  cursor: pointer;
  box-shadow: 0px 6px 0px -2px rgba(250, 250, 250, 0.3);
  -webkit-box-shadow: 0px 6px 0px -2px rgba(250, 250, 250, 0.3);
  -moz-box-shadow: 0px 6px 0px -2px rgba(250, 250, 250, 0.3);
  :active {
    box-shadow: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
  }
`;

export const StyledRoundButton = styled.button`
  padding: 10px;
  border-radius: 100%;
  border: none;
  background-color: var(--secondary);
  padding: 10px;
  font-weight: bold;
  font-size: 15px;
  color: var(--primary-text);
  width: 30px;
  height: 30px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 4px 0px -2px rgba(250, 250, 250, 0.3);
  -webkit-box-shadow: 0px 4px 0px -2px rgba(250, 250, 250, 0.3);
  -moz-box-shadow: 0px 4px 0px -2px rgba(250, 250, 250, 0.3);
  :active {
    box-shadow: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
  }
`;

export const ResponsiveWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: stretched;
  align-items: stretched;
  width: 100%;
  @media (min-width: 767px) {
    flex-direction: row;
    fontSize: 50;
  }
`;

export const ResponsiveWrapper1 = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: stretched;
  align-items: stretched;
  width: 100%;
  @media (min-width: 800px) {
    flex-direction: column;
    fontSize: 50;
  }
`;

export const StyledLogo = styled.img`
  box-shadow: 0px 5px 11px 2px rgba(0, 0, 0, 0.7);
  border: 4px var(--secondary);
  background-color: var(--accent);
  border-radius: 100%;
  width: 200px;
  @media (min-width: 800px) {
    width: 250px;
  }
  @media (min-width: 1000px) {
    width: 300px;
  }
  transition: width 0.5s;
`;

export const StyledMedia = styled.img`
  width: 100px;
  @media (min-width: 100px) {
    width: 100px;
  }
`;

export const StyledImg = styled.img`
  box-shadow: 0px 5px 11px 2px rgba(0, 0, 0, 0.7);
  border: 4px  var(--secondary);
  background-color: var(--accent);
  border-radius: 100%;
  width: 150px;
  @media (min-width: 800px) {
    width: 250px;
  }
  @media (min-width: 1000px) {
    width: 300px;
  }
  transition: width 0.5s;
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
export const MedStyledImg = styled.img`
  box-shadow: 0px 5px 11px 2px rgba(0, 0, 0, 0.7);
  background-color: var(--accent);
  border-radius: 100%;
  width: 200px;
  @media (min-width: 800px) {
    width: 200px;
  }
  @media (min-width: 1000px) {
    width: 200px;
  }
  transition: width 0.5s;
`;
export const TransparentStyledLogo = styled.img`
  width: 200px;
  @media (min-width: 800px) {
    width: 250px;
  }
  @media (min-width: 1000px) {
    width: 300px;
  }
  transition: width 0.5s;
`;
export const TransparentStyledTitle = styled.img`
  width: 200px;
  @media (min-width: 800px) {
    width: 300px;
  }
  @media (min-width: 1000px) {
    width: 800px;
  }
`;
export const SmallTranStyledLogo = styled.img`
  width: 100px;
  @media (min-width: 800px) {
    width: 10px;
  }
  @media (min-width: 1000px) {
    width: 100px;
  }
  transition: width 0.5s;
`;
export const RMStyledImg = styled.img`
  box-shadow: 0px 5px 11px 2px rgba(0, 0, 0, 0.7);
  border: 4px  var(--secondary);
  background-color: var(--accent);
  border-radius: 10%;
  width: 50px;
  @media (min-width: 800px) {
    width: 100px;
  }
  @media (min-width: 1000px) {
    width: 150px;
  }
  transition: width 0.5s;
`;
export const TallRMStyledImg = styled.img`
  box-shadow: 0px 5px 11px 2px rgba(0, 0, 0, 0.7);
  border: 2px solid var(--border);
  border-radius: 100px;
  width: 50px;
  @media (min-width: 800px) {
    width: 50px;
  }
  @media (min-width: 1000px) {
    width: 50px;
  }
  transition: width 0.5s;
`;
export const MediaStyledLink = styled.a`
  color: var(--secondary);
  text-decoration: none;
  `;
export const StyledLink = styled.a`
  color: var(--secondary);
  text-decoration: none;
`;


export default function Roadmap() {
    return (
        <s.Screen>
            <ResponsiveWrapper flex={1}>
                <s.Container flex={1} jc={"center"} ai={"center"} fd={"column"}>
                    

                    <s.Container
                        flex={1}
                        jc={"center"}
                        ai={"center"}
                        style={{
                            backgroundColor: "var(--primary)",
                            padding: 24,
                            borderRadius: 0,
                            border: "2px solid var(--border)",
                            boxShadow: "0px 1px 50px rgba(0,0,0,0.7)"
                        }}
                        image={"/config/images/banner.png"}>
                        <s.Container flex={1} jc={"center"} ai={"center"} fd={"row"}>
                            <s.Container flex={1} jc={"center"} ai={"center"} fd={"column"}>
                                <s.TamashhiTitle style={{
                                    textAlign: "center",
                                    color: "var(--secondary-text)",
                                }}>
                                    Tamashhi NFT
                                </s.TamashhiTitle>
                                <s.TitleDescription style={{
                                    textAlign: "center",
                                    color: "var(--secondary-text)",
                                }}>
                                    Supply
                                </s.TitleDescription>
                                <s.SmallDescription style={{
                                    textAlign: "center",
                                    color: "var(--secondary-text)",
                                }}>
                                    7,777
                                </s.SmallDescription>
                                <s.TitleDescription style={{
                                    textAlign: "center",
                                    color: "var(--secondary-text)",
                                }}>
                                    Utility
                                </s.TitleDescription>
                                <s.SmallDescription style={{
                                    textAlign: "center",
                                    color: "var(--secondary-text)",
                                }}>
                                    ???
                                </s.SmallDescription>
                                <s.TitleDescription style={{
                                    textAlign: "center",
                                    color: "var(--secondary-text)",
                                }}>
                                    Story
                                </s.TitleDescription>
                                <s.SmallDescription style={{
                                    textAlign: "center",
                                    color: "var(--secondary-text)",
                                }}>
                                    ???
                                </s.SmallDescription>
                            </s.Container>


                        </s.Container>
                        <VerticalTimeline >
                            <VerticalTimelineElement
                                className="vertical-timeline-element--work"
                                contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                                contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
                                iconStyle={{ background: 'rgb(91, 173, 204)', color: '#fff' }}
                                icon={<TimelineImg />}
                            >
                                <h3 className="vertical-timeline-element-title">Tamashhi</h3>
                                <p>
                                    Tamashhi NFT launch
                                </p>
                            </VerticalTimelineElement>
                            <VerticalTimelineElement
                                className="vertical-timeline-element--work"
                                iconStyle={{ background: 'rgb(91, 173, 204)', color: '#fff' }}
                                icon={<TimelineImg />}

                            >
                                <h3 className="vertical-timeline-element-title">Staking</h3>
                                <p>
                                    ???
                                </p>
                            </VerticalTimelineElement>
                            <VerticalTimelineElement
                                className="vertical-timeline-element--work"
                                iconStyle={{ background: 'rgb(91, 173, 204)', color: '#fff' }}
                                icon={<TimelineImg />}

                            >
                                <h3 className="vertical-timeline-element-title">???</h3>
                                <p>
                                    ???
                                </p>
                            </VerticalTimelineElement>
                            <VerticalTimelineElement
                                className="vertical-timeline-element--work"
                                iconStyle={{ background: 'rgb(91, 173, 204)', color: '#fff' }}
                                icon={<TimelineImg />}

                            >
                                <h3 className="vertical-timeline-element-title">???</h3>
                                <p>
                                    ???
                                </p>
                            </VerticalTimelineElement>
                            <VerticalTimelineElement
                                className="vertical-timeline-element--education"
                                iconStyle={{ background: 'rgb(91, 173, 204)', color: '#fff' }}
                                icon={<TimelineImg />}

                            >
                                <h3 className="vertical-timeline-element-title">???</h3>
                                <p>
                                    ???
                                </p>
                            </VerticalTimelineElement>
                            <VerticalTimelineElement
                                className="vertical-timeline-element--education"
                                iconStyle={{ background: 'rgb(91, 173, 204)', color: '#fff' }}
                                icon={<TimelineImg />}

                            >
                                <h3 className="vertical-timeline-element-title">???</h3>
                                <p>
                                    ???
                                </p>
                            </VerticalTimelineElement>
                            <VerticalTimelineElement
                                className="vertical-timeline-element--education"
                                iconStyle={{ background: 'rgb(91, 173, 204)', color: '#fff' }}
                                icon={<TimelineImg />}

                            >
                                <h3 className="vertical-timeline-element-title">???</h3>
                                <p>
                                    ???
                                </p>
                            </VerticalTimelineElement>
                            <VerticalTimelineElement
                                className="vertical-timeline-element--education"
                                iconStyle={{ background: 'rgb(91, 173, 204)', color: '#fff' }}
                                icon={<TimelineImg />}

                            >
                                <h3 className="vertical-timeline-element-title">???</h3>
                                <p>
                                    ???
                                </p>
                            </VerticalTimelineElement>
                        </VerticalTimeline>
                    </s.Container>
                </s.Container>
            </ResponsiveWrapper>
        </s.Screen >
    );
}