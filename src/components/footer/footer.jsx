import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const FooterContainer = styled.footer`
    border-top: 1px solid #D8D8D8;
    height: 400px;
    padding: 20px;
    margin-top: 100px;
`;

const Line = styled.div`
    border-top: 1px solid #D8D8D8;
`

const DetailDiv = styled.div`
    width: 1280px;
    margin: 0 auto;
`

const TeamDiv = styled.div`
    display: flex;
    flex-direction: row;
    height: 30px;
    font-size: 16px;
    color: #57638A;
    margin-bottom: 10px;
    align-item: center;
`;

const Div = styled.div`
    color: #57638A;
    font-size: 16px;
    align-item: center;
    height: 20px;
`

const Btn = styled.button`
    height: 20px;
    font-size: 16px;
    border: none;
    background-color: transparent;
    color: #57638A;
    cursor: pointer;
`

const ExplanDiv = styled.div`
    margin-top: 20px;
    font-size: 15px;
    color: #777;
`;

const Footer = () => {
    const navigate = useNavigate();

    return (
        <FooterContainer>
            <DetailDiv>
                <TeamDiv>
                    <Div>팀 소개</Div>
                    |
                    <Btn onClick={() => navigate("/support")}>고객 지원</Btn>
                </TeamDiv>
            </DetailDiv>
            <Line />
            <DetailDiv>
                <ExplanDiv>
                    1. 팀 이름 <br />
                    2. 팀원 구성 <br />
                    3. 대충 팀원들 소개하는 내용 <br />
                </ExplanDiv>
            </DetailDiv>
        </FooterContainer>
    );
}

export default Footer;