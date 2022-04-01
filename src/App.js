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
  background-color: var(--primary);
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
export const RMStyledImg = styled.img`
  box-shadow: 0px 5px 11px 2px rgba(0, 0, 0, 0.7);
  border: 4px  var(--secondary);
  background-color: var(--accent);
  border-radius: 10%;
  width: 200px;
  @media (min-width: 900px) {
    width: 250px;
  }
  @media (min-width: 1000px) {
    width: 300px;
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



function NewTab(url) {
  var win = window.open(url, '_blank');
  win.focus();
}



function App() {
  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  const data = useSelector((state) => state.data);
  const [claimingNft, setClaimingNft] = useState(false);
  const [feedback, setFeedback] = useState(`Mint up to 5`);
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
      .mint(mintAmount)
      .send({
        gasLimit: String(totalGasLimit),
        to: CONFIG.CONTRACT_ADDRESS,
        from: blockchain.account,
        value: totalCostWei,
      })
      .once("error", (err) => {
        console.log(err);
        setFeedback("Sorry, something went wrong please try again later.");
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

  const decrementMintAmount = () => {
    let newMintAmount = mintAmount - 1;
    if (newMintAmount < 1) {
      newMintAmount = 1;
    }
    setMintAmount(newMintAmount);
  };

  const incrementMintAmount = () => {
    let newMintAmount = mintAmount + 1;
    if (newMintAmount > 2) {
      newMintAmount = 2;
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
        style={{ padding: 24, backgroundColor: "var(--primary)" }}
        image={CONFIG.SHOW_BACKGROUND ? "/config/images/bg2.png" : null}
      >
        <s.Container flex={1} jc={"center"} ai={"center"} fd={"row"}>
          <s.SpacerLarge/><s.SpacerLarge/>
        <TransparentStyledLogo alt={"logo"} src={"/config/images/logo.png"} />
        </s.Container>

        <s.SpacerXSmall />
        <ResponsiveWrapper flex={1} style={{ padding: 24 }} test>
          <s.Container flex={1} jc={"center"} ai={"center"}>
            <StyledImg alt={"Example"} src={"/config/images/Rat.png"} />
          </s.Container>
          <s.SpacerLarge />
          <s.Container
            flex={2}
            jc={"center"}
            ai={"center"}
            style={{
              backgroundColor: "var(--accent)",
              padding: 24,
              borderRadius: 24,
              border: "4px  var(--secondary)",
              boxShadow: "0px 5px 11px 2px rgba(0,0,0,0.7)",
            }}
          >
            <s.TextTitle
              style={{
                textAlign: "center",
                fontSize: 50,
                fontWeight: "bold",
                color: "var(--accent-text)",
              }}
            >
              {data.totalSupply} / {CONFIG.MAX_SUPPLY}
            </s.TextTitle>
            <s.TextDescription
              style={{
                textAlign: "center",
                color: "var(--primary-text)",
              }}
            >
              <StyledLink target={"_blank"} href={CONFIG.SCAN_LINK}>
                {truncate(CONFIG.CONTRACT_ADDRESS, 15)}
              </StyledLink>
            </s.TextDescription>
            <s.SpacerSmall />
            {Number(data.totalSupply) >= CONFIG.MAX_SUPPLY ? (
              <>
                <s.TextTitle
                  style={{ textAlign: "center", color: "var(--accent-text)" }}
                >
                  Sold out.
                </s.TextTitle>
                <s.TextDescription
                  style={{ textAlign: "center", color: "var(--accent-text)" }}
                >
                  You can still find {CONFIG.NFT_NAME} on
                </s.TextDescription>
                <s.SpacerSmall />
                <StyledLink target={"_blank"} href={CONFIG.MARKETPLACE_LINK}>
                  {CONFIG.MARKETPLACE}
                </StyledLink>
              </>
            ) : (
              <>
                <s.TextTitle
                  style={{ textAlign: "center", color: "var(--accent-text)" }}
                >
                  Mint for {CONFIG.DISPLAY_COST}{CONFIG.NETWORK.SYMBOL} each.
                </s.TextTitle>
                <s.SpacerXSmall />
                <s.TextDescription
                  style={{ textAlign: "center", color: "var(--accent-text)" }}
                >
                  Plus reduced gas fees for multiple mints!
                </s.TextDescription>
                <s.SpacerSmall />
                {blockchain.account === "" ||
                  blockchain.smartContract === null ? (
                  <s.Container ai={"center"} jc={"center"}>
                    <s.TextDescription
                      style={{
                        textAlign: "center",
                        color: "var(--accent-text)",
                      }}
                    >
                      Connect your MetaMask wallet
                    </s.TextDescription>
                    <s.SpacerSmall />
                    <StyledButton
                      onClick={(e) => {
                        e.preventDefault();
                        dispatch(connect());
                        getData();
                      }}
                    >
                      CONNECT
                    </StyledButton>
                    {blockchain.errorMsg !== "" ? (
                      <>
                        <s.SpacerSmall />
                        <s.TextDescription
                          style={{
                            textAlign: "center",
                            color: "var(--accent-text)",
                          }}
                        >
                          {blockchain.errorMsg}
                        </s.TextDescription>
                      </>
                    ) : null}
                    <s.SpacerMedium />
                    <s.Container ai={"center"} jc={"center"} fd={"row"}>
                      <MediaStyledLink href="https://twitter.com/tamashhi" target="_blank" >
                        <SmallStyledImg alt="Twitter" src="/config/images/twitter.png" />
                      </MediaStyledLink>
                      <s.SpacerSmall />
                      <MediaStyledLink href="https://www.instagram.com/tamashhiNFT/" target="_blank">
                        <SmallStyledImg alt="Instagram" src="/config/images/instagram.png" />
                      </MediaStyledLink>
                      <s.SpacerSmall />
                      <MediaStyledLink href="https://discord.gg/cVn7EvyqM2" target="_blank">
                        <SmallStyledImg alt="Discord" src="/config/images/discord.png" />
                      </MediaStyledLink>
                      <s.SpacerSmall />
                      <MediaStyledLink href="https://opensea.io" target="_blank">
                        <SmallStyledImg alt="OpenSea" src="/config/images/openSea.png" />
                      </MediaStyledLink>
                    </s.Container>
                  </s.Container>
                ) : (
                  <>
                    <s.TextDescription
                      style={{
                        textAlign: "center",
                        color: "var(--accent-text)",
                      }}
                    >
                      {feedback}
                    </s.TextDescription>
                    <s.SpacerMedium />
                    <s.Container ai={"center"} jc={"center"} fd={"row"}>
                      <StyledRoundButton
                        style={{ lineHeight: 0.4 }}
                        disabled={claimingNft ? 1 : 0}
                        onClick={(e) => {
                          e.preventDefault();
                          decrementMintAmount();
                        }}
                      >
                        -
                      </StyledRoundButton>
                      <s.SpacerMedium />
                      <s.TextDescription
                        style={{
                          textAlign: "center",
                          color: "var(--accent-text)",
                        }}
                      >
                        {mintAmount}
                      </s.TextDescription>
                      <s.SpacerMedium />
                      <StyledRoundButton
                        disabled={claimingNft ? 1 : 0}
                        onClick={(e) => {e.preventDefault(); 
                        incrementMintAmount();
                        }}>
                        +
                      </StyledRoundButton>
                    </s.Container>
                    <s.SpacerSmall />
                    <s.Container ai={"center"} jc={"center"} fd={"row"}>
                      <StyledButton
                        disabled={claimingNft ? 1 : 0}
                        onClick={(e) => {
                          e.preventDefault();
                          claimNFTs();
                          getData();
                        }}
                      >
                        {claimingNft ? "BUSY" : "BUY"}
                      </StyledButton>
                    </s.Container>
                    <s.SpacerMedium />
                    <s.Container ai={"center"} jc={"center"} fd={"row"}>
                      <MediaStyledLink href="https://twitter.com/Tamashhi" target="_blank" >
                        <SmallStyledImg alt="Twitter" src="/config/images/twitter.png" />
                      </MediaStyledLink>
                      <s.SpacerSmall />
                      <MediaStyledLink href="https://www.instagram.com/tamashhiNFT/" target="_blank">
                        <SmallStyledImg alt="Instagram" src="/config/images/instagram.png" />
                      </MediaStyledLink>
                      <s.SpacerSmall />
                      <MediaStyledLink href="https://discord.gg/cVn7EvyqM2" target="_blank">
                        <SmallStyledImg alt="Discord" src="/config/images/discord.png" />
                      </MediaStyledLink>
                      <s.SpacerSmall />
                      <MediaStyledLink href="https://opensea.io" target="_blank">
                        <SmallStyledImg alt="OpenSea" src="/config/images/openSea.png" />
                      </MediaStyledLink>
                    </s.Container>
                  </>
                )}
              </>
            )}
            <s.SpacerMedium />
          </s.Container>
          <s.SpacerLarge />
          <s.Container flex={1} jc={"center"} ai={"center"}>
            <StyledImg
              alt={"Example"}
              src={"/config/images/Ox.png"}
              style={{ transform: "scaleX(-1)" }}
            />
          </s.Container>
        </ResponsiveWrapper>


        <s.SpacerMedium />
        <s.SpacerLarge />
        <s.Container flex={1} jc={"center"} ai={"center"}>
          <s.TextDescription style={{
            textAlign: "center",
            color: "var(--secondary-text)",
            fontSize: 100,
          }}>
            About us
          </s.TextDescription>
        </s.Container>
        <s.SpacerMedium />



        <ResponsiveWrapper flex={1} style={{ padding: 24 }} test>
          <s.Container flex={2} jc={"center"} ai={"center"} style={{backgroundColor: "var(--accent)", borderRadius: 24, padding: 24, boxShadow: "0px 5px 11px 2px rgba(0,0,0,0.7)" }}>
            <MediaStyledLink href="https://twitter.com" target="_blank">
              <MedStyledImg alt="Twitter" src="/config/images/example.png" />
            </MediaStyledLink>
            <s.SpacerLarge />
            <s.Container flex={2} jc={"center"} ai={"center"}>
              <s.TextDescription
                style={{
                  textAlign: "center",
                  color: "var(--secondary-text)",
                }}
              >
                Ismail Jogee
              </s.TextDescription>
              <s.TextDescription
                style={{
                  textAlign: "center",
                  color: "var(--secondary-text)",
                }}
              >
                Owner
              </s.TextDescription>
              <s.TextDescription style={{
                  textAlign: "center",
                  color: "var(--secondary-text)",
                }}>
                  A couple sentences about yourself
                </s.TextDescription>
            </s.Container>
          </s.Container>
          <s.SpacerLarge />





          <s.Container flex={2} jc={"center"} ai={"center"} style={{backgroundColor: "var(--accent)", borderRadius: 24, padding: 24, boxShadow: "0px 5px 11px 2px rgba(0,0,0,0.7)" }}>
            <MediaStyledLink href="https://twitter.com" target="_blank">
              <MedStyledImg alt="Twitter" src="/config/images/example.png" />
            </MediaStyledLink>
            <s.SpacerLarge />
            <s.Container flex={2} jc={"center"} ai={"center"}>
              <s.TextDescription
                style={{
                  textAlign: "center",
                  color: "var(--secondary-text)",
                }}
              >
                Callum Sidebottom
              </s.TextDescription>
              <s.TextDescription
                style={{
                  textAlign: "center",
                  color: "var(--secondary-text)",
                }}
              >
                Developer
              </s.TextDescription>
            </s.Container>
          </s.Container>
          <s.SpacerLarge />





          <s.Container flex={2} jc={"center"} ai={"center"} style={{backgroundColor: "var(--accent)", borderRadius: 24, padding: 24, boxShadow: "0px 5px 11px 2px rgba(0,0,0,0.7)" }}>
            <MediaStyledLink href="https://twitter.com" target="_blank">
              <MedStyledImg alt="Twitter" src="/config/images/example.png" />
            </MediaStyledLink>
            <s.SpacerLarge />
            <s.Container flex={2} jc={"center"} ai={"center"}>
              <s.TextDescription
                style={{
                  textAlign: "center",
                  color: "var(--secondary-text)",
                }}
              >
                Naomi Pitt
              </s.TextDescription>
              <s.TextDescription
                style={{
                  textAlign: "center",
                  color: "var(--secondary-text)",
                }}
              >
                Artist
              </s.TextDescription>
            </s.Container>
          </s.Container>
          <s.SpacerLarge />





          <s.Container flex={2} jc={"center"} ai={"center"} style={{backgroundColor: "var(--accent)", borderRadius: 24, padding: 24, boxShadow: "0px 5px 11px 2px rgba(0,0,0,0.7)" }}>
            <MediaStyledLink href="https://twitter.com" target="_blank">
              <MedStyledImg alt="Twitter" src="/config/images/example.png" />
            </MediaStyledLink>
            <s.SpacerLarge />
            <s.Container flex={2} jc={"center"} ai={"center"}>
              <s.TextDescription
                style={{
                  textAlign: "center",
                  color: "var(--secondary-text)",
                }}
              >
                Luke Smith
              </s.TextDescription>
              <s.TextDescription
                style={{
                  textAlign: "center",
                  color: "var(--secondary-text)",
                }}
              >
                Artist
              </s.TextDescription>
            </s.Container>
          </s.Container>
          <s.SpacerLarge />
        </ResponsiveWrapper>


        <ResponsiveWrapper flex={1} style={{ padding: 24 }} test>
        <s.SpacerLarge />
        <s.Container flex={1} jc={"center"} ai={"center"}>
          <s.TextDescription style={{
            textAlign: "center",
            color: "var(--secondary-text)",
            fontSize: 100,
          }}>
            Roadmap
          </s.TextDescription>
        </s.Container>
        <s.SpacerMedium />
        </ResponsiveWrapper>
        
        <ResponsiveWrapper flex={1} style={{ padding: 24 }} test>
          <s.Container flex={1} jc={"center"} ai={"center"}>
            <RMStyledImg alt={"Example"} src={"/config/images/Rat.png"} />
          </s.Container>
          <s.Container
            flex={2}
            jc={"center"}
            ai={"center"}
            style={{
              backgroundColor: "var(--accent)",
              padding: 24,
              borderRadius: 24,
              border: "4px  var(--secondary)",
              boxShadow: "0px 5px 11px 2px rgba(0,0,0,0.7)",
            }}
          >
            <s.TextTitle style={{fontSize:40, color: "var(--accent-text)" }}>
              Phase 1
            </s.TextTitle>
            <s.SpacerMedium/>
            <s.TextDescription style={{fontSize:20, color: "var(--accent-text)" }}>
              Release the original Tamashhi collection.
            </s.TextDescription>
        </s.Container>
        </ResponsiveWrapper>


        <ResponsiveWrapper flex={1} style={{ padding: 24 }} test>
          <s.Container
            flex={2}
            jc={"center"}
            ai={"center"}
            style={{
              backgroundColor: "var(--accent)",
              padding: 24,
              borderRadius: 24,
              border: "4px  var(--secondary)",
              boxShadow: "0px 5px 11px 2px rgba(0,0,0,0.7)",
            }}
          >
            <s.TextTitle style={{fontSize:40, color: "var(--accent-text)" }}>
              Phase 2
            </s.TextTitle>
            <s.TextDescription style={{fontSize:20, color: "var(--accent-text)" }}>
              Coming Soon
            </s.TextDescription>
        </s.Container>
        <s.Container flex={1} jc={"center"} ai={"center"}>
            <RMStyledImg alt={"Example"} src={"/config/images/Rat.png"} style={{ transform: "scaleX(-1)" }} />
          </s.Container>
        </ResponsiveWrapper>



        <ResponsiveWrapper flex={1} style={{ padding: 24 }} test>
          <s.Container flex={1} jc={"center"} ai={"center"}>
            <RMStyledImg flex={2} alt={"Example"} src={"/config/images/Rat.png"} />
          </s.Container>
          <s.Container
            flex={2}
            jc={"center"}
            ai={"center"}
            style={{
              backgroundColor: "var(--accent)",
              padding: 24,
              borderRadius: 24,
              border: "4px  var(--secondary)",
              boxShadow: "0px 5px 11px 2px rgba(0,0,0,0.7)",
            }}
          >
            <s.TextTitle style={{fontSize:40, color: "var(--accent-text)" }}>
              Phase 3
            </s.TextTitle>
            <s.TextDescription style={{fontSize:20, color: "var(--accent-text)" }}>
              Coming Soon
            </s.TextDescription>
        </s.Container>
        </ResponsiveWrapper>


      </s.Container>
    </s.Screen >
  );
}

export default App;
