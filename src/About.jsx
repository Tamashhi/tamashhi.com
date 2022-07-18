import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "./redux/blockchain/blockchainActions";
import { fetchData } from "./redux/data/dataActions";
import * as s from "./styles/globalStyles";
import styled from "styled-components";

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
  @media (min-width: 1100px) {
    flex-direction: row;
  }
`;

export const StyledLogo = styled.img`
  box-shadow: 0px 5px 11px 2px rgba(0, 0, 0, 0.7);
  border: 4px var(--secondary);
  background-color: var(--accent);
  border-radius: 100%;
  width: 200px;
  @media (min-width: 900px) {
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
  width: 200px;
  @media (min-width: 900px) {
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
  @media (min-width: 900px) {
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
  @media (min-width: 900px) {
    width: 200px;
  }
  @media (min-width: 1000px) {
    width: 200px;
  }
  transition: width 0.5s;
`;
export const TransparentStyledLogo = styled.img`
  width: 200px;
  @media (min-width: 900px) {
    width: 250px;
  }
  @media (min-width: 1000px) {
    width: 300px;
  }
`;
export const SmallTranStyledLogo = styled.img`
  width: 100px;
  @media (min-width: 900px) {
    width: 10px;
  }
  @media (min-width: 1000px) {
    width: 100px;
  }
`;
export const RMStyledImg = styled.img`
  box-shadow: 0px 5px 11px 2px rgba(0, 0, 0, 0.7);
  border: 4px  var(--secondary);
  background-color: var(--accent);
  border-radius: 10%;
  width: 50px;
  @media (min-width: 900px) {
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
  @media (min-width: 900px) {
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

export default function About() {
    const dispatch = useDispatch();
    const blockchain = useSelector((state) => state.blockchain);
    const data = useSelector((state) => state.data);
    const [claimingNft, setClaimingNft] = useState(false);
    const [feedback, setFeedback] = useState(`Mint up to 10`);
    const [mintAmount, setMintAmount] = useState(1);
    const [CONFIG, SET_CONFIG] = useState({
        CONTRACT_ADDRESS: "",
        SCAN_LINK: "",
        NETWORK: {
            NAME: "",
            SYMBOL: "",
            ID: 0,
        },
        NFT_NAME: "",
        SYMBOL: "",
        MAX_SUPPLY: 1,
        maxMintPerTx: 0,
        WEI_COST: 0,
        DISPLAY_COST: 0,
        GAS_LIMIT: 0,
        MARKETPLACE: "",
        MARKETPLACE_LINK: "",
        SHOW_BACKGROUND: false,
    });

    const claimNFTs = () => {
        let cost = CONFIG.WEI_COST;
        let gasLimit = CONFIG.GAS_LIMIT;
        let totalCostWei = String(cost * mintAmount);
        let totalGasLimit = String(gasLimit * mintAmount);
        console.log("Cost: ", totalCostWei);
        console.log("Gas limit: ", totalGasLimit);
        setFeedback(`Minting your ${CONFIG.NFT_NAME}...`);
        setClaimingNft(true);
        blockchain.smartContract.methods
            .mintWhitelist(mintAmount)
            .send({
                gasLimit: String(totalGasLimit),
                to: CONFIG.CONTRACT_ADDRESS,
                from: blockchain.account,
                value: totalCostWei,
            })
            .once("error", (err) => {
                console.log(err);
                setFeedback("Sorry, you are not whitelisted.");
                setClaimingNft(false);
            })
            .then((receipt) => {
                console.log(receipt);
                setFeedback(
                    `WOW, the ${CONFIG.NFT_NAME} is yours! go visit Opensea.io to view it.`
                );
                setClaimingNft(false);
                dispatch(fetchData(blockchain.account));
            });
    };

    const userTokens = () => {
        blockchain.smartContract.methods
            .ownedTokens()
            .call(function (err, res) {
                if (err) {
                    console.log("An error occured", err)
                    return
                }
                console.log(res)
            });
    };

    const decrementMintAmount = () => {
        let newMintAmount = mintAmount - 1;
        if (newMintAmount < 1) {
            newMintAmount = 1;
        }
        setMintAmount(newMintAmount);
    };

    const incrementMintAmount = () => {
        let newMintAmount = mintAmount + 1;
        if (newMintAmount > 10) {
            newMintAmount = 10;
        }
        setMintAmount(newMintAmount);
    };

    const getData = () => {
        if (blockchain.account !== "" && blockchain.smartContract !== null) {
            dispatch(fetchData(blockchain.account));
        }
    };

    const getConfig = async () => {
        const configResponse = await fetch("/config/config.json", {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        });
        const config = await configResponse.json();
        SET_CONFIG(config);
    };

    useEffect(() => {
        getConfig();
    }, []);

    useEffect(() => {
        getData();
    }, [blockchain.account]);
    return (
        <s.Screen>
            <s.Container
                flex={1}
                ai={"center"}
                style={{
                    backgroundColor: "var(--primary)",
                    padding: 24,
                    borderRadius: 0,
                    border: "2px solid var(--border)",
                    boxShadow: "0px 5px 11px 2px rgba(0,0,0,0.7)"
                }}
                image={CONFIG.SHOW_BACKGROUND ? "/config/images/banner.png" : null}>
                <ResponsiveWrapper flex={1} style={{ padding: 24 }} test>
                    <s.SpacerLarge />
                    <s.Container flex={1} jc={"center"} ai={"center"} fd={"row"}>
                        <s.AboutTitle style={{
                            textAlign: "center",
                            color: "var(--secondary-text)",
                        }}>
                            About Us
                        </s.AboutTitle>
                    </s.Container>
                    <s.SpacerMedium />
                </ResponsiveWrapper>

                <ResponsiveWrapper flex={1} style={{ padding: 24 }} test>
                    <s.Container flex={2} jc={"center"} ai={"center"}
                        style={{
                            backgroundColor: "var(--primary)",
                            borderRadius: 24, border: "2px solid var(--border)",
                            padding: 24,
                            boxShadow: "0px 5px 11px 2px rgba(0,0,0,0.7)"
                        }}>
                        <MedStyledImg alt="Ish" src="/config/images/Ish.jpg" />
                        <s.SpacerLarge />
                        <s.Container flex={2} jc={"center"} ai={"center"}>
                            <s.NormalText
                                style={{
                                    textAlign: "center",
                                    color: "var(--secondary-text)",
                                    textDecoration: "underline 2px",
                                    fontSize: 20
                                }}>
                                Ish Jogee
                            </s.NormalText>
                            <s.NormalText
                                style={{
                                    textAlign: "center",
                                    color: "var(--secondary-text)",
                                    fontSize: 20,
                                    fontWeight: "bold"
                                }}>
                                イシュ ジョジ
                            </s.NormalText>
                            <s.NormalText
                                style={{
                                    textAlign: "center",
                                    color: "var(--secondary-text)",
                                    fontSize: 25
                                }}>
                                Owner
                            </s.NormalText>
                            <s.SmallText style={{
                                textAlign: "center",
                                color: "var(--secondary-text)"
                            }}>
                                Japanese wagyu seller and property entrepreneur. Been in crypto since 2017.
                            </s.SmallText>
                        </s.Container>
                    </s.Container>
                    <s.SpacerLarge />


                    <s.Container flex={2} jc={"center"} ai={"center"}
                        style={{
                            backgroundColor: "var(--primary)",
                            border: "2px solid var(--border)",
                            borderRadius: 24,
                            padding: 24,
                            boxShadow: "0px 5px 11px 2px rgba(0,0,0,0.7)"
                        }}>
                        <MedStyledImg alt="Callum" src="/config/images/Callum.jpg" />
                        <s.SpacerLarge />
                        <s.Container flex={2} jc={"center"} ai={"center"}>
                            <s.NormalText
                                style={{
                                    textAlign: "center",
                                    color: "var(--secondary-text)",
                                    textDecoration: "underline 2px",
                                    fontSize: 20
                                }}>
                                Callum Sidebottom
                            </s.NormalText>
                            <s.NormalText
                                style={{
                                    textAlign: "center",
                                    color: "var(--secondary-text)",
                                    fontSize: 20,
                                    fontWeight: "bold"
                                }}>
                                カラム シデボットム
                            </s.NormalText>
                            <s.NormalText
                                style={{
                                    textAlign: "center",
                                    color: "var(--secondary-text)",
                                    fontSize: 25
                                }}>
                                Developer
                            </s.NormalText>
                            <s.SmallText style={{
                                textAlign: "center",
                                color: "var(--secondary-text)"
                            }}>
                                Always been obsessed with programming and recently been getting into crypto, wish i had joined sooner!
                            </s.SmallText>
                        </s.Container>
                    </s.Container>
                    <s.SpacerLarge />


                    <s.Container flex={2} jc={"center"} ai={"center"}
                        style={{
                            backgroundColor: "var(--primary)",
                            border: "2px solid var(--border)",
                            borderRadius: 24,
                            padding: 24,
                            boxShadow: "0px 5px 11px 2px rgba(0,0,0,0.7)"
                        }}>
                        <MedStyledImg alt="Naomi" src="/config/images/Naomi.jpg" />
                        <s.SpacerLarge />
                        <s.Container flex={2} jc={"center"} ai={"center"}>
                            <s.NormalText
                                style={{
                                    textAlign: "center",
                                    color: "var(--secondary-text)",
                                    textDecoration: "underline 2px",
                                    fontSize: 20
                                }}>
                                Naomi Pitt
                            </s.NormalText>
                            <s.NormalText
                                style={{
                                    textAlign: "center",
                                    color: "var(--secondary-text)",
                                    fontSize: 20,
                                    fontWeight: "bold"
                                }}>
                                ナオミ ピト
                            </s.NormalText>
                            <s.NormalText
                                style={{
                                    textAlign: "center",
                                    color: "var(--secondary-text)",
                                    fontSize: 25
                                }}>
                                Artist
                            </s.NormalText>
                            <s.SmallText style={{
                                textAlign: "center",
                                color: "var(--secondary-text)"
                            }}>
                                A simplistic doodler with a passion to create something beautiful
                            </s.SmallText>
                        </s.Container>
                    </s.Container>
                    <s.SpacerLarge />


                    <s.Container flex={2} jc={"center"} ai={"center"}
                        style={{
                            backgroundColor: "var(--primary)",
                            border: "2px solid var(--border)",
                            borderRadius: 24,
                            padding: 24,
                            boxShadow: "0px 5px 11px 2px rgba(0,0,0,0.7)"
                        }}>
                        <MedStyledImg alt="Luke" src="/config/images/Luke.jpg" />
                        <s.SpacerLarge />
                        <s.Container flex={2} jc={"center"} ai={"center"}>
                            <s.NormalText
                                style={{
                                    textAlign: "center",
                                    color: "var(--secondary-text)",
                                    textDecoration: "underline 2px",
                                    fontSize: 20
                                }}>
                                Luke Smith
                            </s.NormalText>
                            <s.NormalText
                                style={{
                                    textAlign: "center",
                                    color: "var(--secondary-text)",
                                    fontSize: 20,
                                    fontWeight: "bold"
                                }}>
                                ルーク スミス
                            </s.NormalText>
                            <s.NormalText
                                style={{
                                    textAlign: "center",
                                    color: "var(--secondary-text)",
                                    fontSize: 25
                                }}>
                                Social Media/Artist
                            </s.NormalText>
                            <s.SmallText style={{
                                textAlign: "center",
                                color: "var(--secondary-text)"
                            }}>
                                A graphic designer who visualizes the world you live in with a different perspective in every project .

                            </s.SmallText>
                        </s.Container>
                    </s.Container>
                </ResponsiveWrapper>
                <s.SpacerLarge />
                <ResponsiveWrapper flex={1} style={{ padding: 1 }} test>
                    <s.SpacerLarge />
                    <s.Container flex={1} jc={"center"} ai={"center"} fd={"row"}>
                        <s.NormalText style={{
                            textAlign: "center",
                            color: "var(--secondary-text)",
                            fontSize: 25
                        }}>
                            More info over on discord!
                        </s.NormalText>
                        <s.SpacerXSmall />
                    </s.Container>
                    <s.SpacerMedium />
                </ResponsiveWrapper>
                <ResponsiveWrapper flex={1} style={{ padding: 24 }} test>
                    <s.Container flex={1} jc={"center"} ai={"center"} fd={"row"}>
                        <MediaStyledLink href="https://discord.gg/hbRhGS5Crk" target="_blank">
                            <SmallStyledImg alt="Discord" src="/config/images/discord.png" />
                        </MediaStyledLink>
                    </s.Container>
                </ResponsiveWrapper>
            </s.Container>
        </s.Screen >
    );
}