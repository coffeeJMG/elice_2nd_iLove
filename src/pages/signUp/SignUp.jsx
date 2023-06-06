/* eslint-disable */
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

// 이미지 링크
import mainLogo from "../../assets/mainLogo.svg";

// 공통 컴포넌트 연결 링크
import {
  Button,
  CardBox,
  Header,
  NavigationBar,
  Container,
  Footer,
  SearchBar,
} from "../../components/index";

// 상수로 뽑아둔 color, fontSize 연결 링크
import colors from "../../constants/colors";
import fontSize from "../../constants/fontSize";

export const SignUp = () => {
  const [isUserView, setIsUserView] = useState(true); // 일반회원 뷰 여부 상태
  const [isHospitalView, setIsHospitalView] = useState(false); // 병원 뷰 여부 상태

  const handleUserButtonClick = () => {
    setIsUserView(true); // 일반회원 뷰 표시
    setIsHospitalView(false); // 병원 뷰 숨김
  };

  const handleHospitalButtonClick = () => {
    setIsUserView(false); // 일반회원 뷰 숨김
    setIsHospitalView(true); // 병원 뷰 표시
  };
  return (
    <>
      <div>
        <SignUpDiv>
          <SignUpImg src={mainLogo}></SignUpImg>
          <H1>회원가입</H1>
        </SignUpDiv>
        <SignUpFormDiv>
          <ChangeButtonDiv>
            <ButtonUser
              className={isUserView ? "" : "active"}
              onClick={handleUserButtonClick}
            >
              일반 회원
            </ButtonUser>
            <ButtonHospital
              className={isHospitalView ? "active" : ""}
              onClick={handleHospitalButtonClick}
            >
              병원 클라이언트
            </ButtonHospital>
          </ChangeButtonDiv>
          {isUserView && <UserView />}
          {isHospitalView && <HospitalView />}
        </SignUpFormDiv>
      </div>
    </>
  );
};
export default SignUp;

// 일반 회원 창
const UserView = () => {
  // 이메일
  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState(false);
  //비밀번호
  const [pw, setPw] = useState("");
  const [pwValid, setPwValid] = useState(false);
  // 비밀번호 확인
  const [pwCheck, setPwCheck] = useState("");
  const [pwCheckValid, setPwCheckValid] = useState(false);
  // 핸드폰번호
  const [phone, setPhone] = useState("");
  const [phoneValid, setPhoneValid] = useState(false);

  // 이름
  const [name, setName] = useState("");
  const [nameValid, setNameValid] = useState(false);

  //버튼 활성화
  const [notAllow, setNotAllow] = useState(true);

  // 이메일 유효성 검사
  const handleEmail = (e) => {
    setEmail(e.target.value);
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (regex.test(email)) {
      setEmailValid(true);
    } else {
      setEmailValid(false);
    }
  };
  // 비밀번호 유효성 검사
  const handlePassword = (e) => {
    setPw(e.target.value);
    if (e.target.value.length >= 8) {
      setPwValid(true);
    } else {
      setPwValid(false);
    }
    console.log(e.target.value);
  };

  // 비밀번호 확인 검사
  const handlePasswordCheck = (e) => {
    setPwCheck(e.target.value);
    if (pw === e.target.value) {
      setPwCheckValid(true);
    } else {
      setPwCheckValid(false);
    }
    console.log(e.target.value);
  };

  // 핸드폰 유효성 검사
  const handlePhone = (e) => {
    setPhone(e.target.value);
    const regex = /^01[0-9]{1}-[0-9]{4}-[0-9]{4}$/;
    if (regex.test(e.target.value)) {
      setPhoneValid(true);
    } else {
      setPhoneValid(false);
    }
  };

  // 이름 빈값인지 확인
  const handleName = (e) => {
    setName(e.target.value);
    if (e.target.value !== "") {
      setNameValid(true);
    } else {
      setNameValid(false);
    }
  };

  // 버튼 활성화
  useEffect(() => {
    if (emailValid && pwValid && pwCheckValid && nameValid && phoneValid) {
      setNotAllow(false);
      return;
    }
    setNotAllow(true);
  }, [emailValid, pwValid, pwCheckValid, nameValid, phoneValid]);

  return (
    <>
      <SignUpForm>
        <SignUpInputDiv>
          <InputTitle>이름</InputTitle>
          <SignUpInput
            placeholder="아이사"
            type="text"
            value={name}
            onChange={handleName}
          ></SignUpInput>
        </SignUpInputDiv>

        <SignUpInputDiv>
          <InputTitle>이메일</InputTitle>
          <SignUpInput
            placeholder="test123@test.com"
            type="email"
            value={email}
            onChange={handleEmail}
          ></SignUpInput>
          {!emailValid && email.length > 0 && (
            <ErrorMaessage>올바른 이메일을 입력해주세요.</ErrorMaessage>
          )}
        </SignUpInputDiv>

        <SignUpInputDiv>
          <InputTitle>핸드폰번호</InputTitle>
          <SignUpInput
            placeholder="010-0000-0000"
            type="text"
            value={phone}
            onChange={handlePhone}
          ></SignUpInput>
          {!phoneValid && phone.length > 0 && (
            <ErrorMaessage>-을 붙여서 입력해주세요</ErrorMaessage>
          )}
        </SignUpInputDiv>

        <SignUpInputDiv>
          <InputTitle>비밀번호</InputTitle>
          <SignUpInput
            placeholder="8자리 이상 입력해주세요"
            type="password"
            value={pw}
            onChange={handlePassword}
          ></SignUpInput>
          {!pwValid && pw.length > 0 && (
            <ErrorMaessage>8자리 이상 입력해주세요.</ErrorMaessage>
          )}
        </SignUpInputDiv>

        <SignUpInputDiv>
          <InputTitle>비밀번호 확인</InputTitle>
          <SignUpInput
            placeholder="8자리 이상 입력해주세요"
            type="password"
            value={pwCheck}
            onChange={handlePasswordCheck}
          ></SignUpInput>
          {!pwCheckValid && pwCheck.length > 0 && (
            <ErrorMaessage>비밀번호가 다릅니다</ErrorMaessage>
          )}
        </SignUpInputDiv>

        <SignUpBtn>
          <Button
            btnFontSize={fontSize.but}
            label={"회원가입"}
            btnColor={"white"}
            bgcolor={colors.primary}
            borderOutLine={colors.BtnborderOut}
            width={"90%"}
            height={"70px"}
            disabled={notAllow}
          />
        </SignUpBtn>
      </SignUpForm>
    </>
  );
};

const HospitalView = () => {
  // 이메일
  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState(false);
  //비밀번호
  const [pw, setPw] = useState("");
  const [pwValid, setPwValid] = useState(false);
  // 비밀번호 확인
  const [pwCheck, setPwCheck] = useState("");
  const [pwCheckValid, setPwCheckValid] = useState(false);
  // 핸드폰번호
  const [phone, setPhone] = useState("");
  const [phoneValid, setPhoneValid] = useState(false);

  // 이름
  const [name, setName] = useState("");
  const [nameValid, setNameValid] = useState(false);

  //버튼 활성화
  const [notAllow, setNotAllow] = useState(true);

  // 이메일 유효성 검사
  const handleEmail = (e) => {
    setEmail(e.target.value);
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (regex.test(email)) {
      setEmailValid(true);
    } else {
      setEmailValid(false);
    }
  };
  // 비밀번호 유효성 검사
  const handlePassword = (e) => {
    setPw(e.target.value);
    if (e.target.value.length >= 8) {
      setPwValid(true);
    } else {
      setPwValid(false);
    }
    console.log(e.target.value);
  };

  // 비밀번호 확인 검사
  const handlePasswordCheck = (e) => {
    setPwCheck(e.target.value);
    if (pw === e.target.value) {
      setPwCheckValid(true);
    } else {
      setPwCheckValid(false);
    }
    console.log(e.target.value);
  };

  // 핸드폰 유효성 검사
  const handlePhone = (e) => {
    setPhone(e.target.value);
    const regex = /^01[0-9]{1}-[0-9]{4}-[0-9]{4}$/;
    if (regex.test(e.target.value)) {
      setPhoneValid(true);
    } else {
      setPhoneValid(false);
    }
  };

  // 이름 빈값인지 확인
  const handleName = (e) => {
    setName(e.target.value);
    if (e.target.value !== "") {
      setNameValid(true);
    } else {
      setNameValid(false);
    }
  };

  // 버튼 활성화
  useEffect(() => {
    if (emailValid && pwValid && pwCheckValid && nameValid && phoneValid) {
      setNotAllow(false);
      return;
    }
    setNotAllow(true);
  }, [emailValid, pwValid, pwCheckValid, nameValid, phoneValid]);

  return (
    <>
      <SignUpForm>
        <SignUpInputDiv>
          <InputTitle>담당자 성함</InputTitle>
          <SignUpInput
            placeholder="테스트"
            type="text"
            value={name}
            onChange={handleName}
          ></SignUpInput>
        </SignUpInputDiv>

        <SignUpInputDiv>
          <InputTitle>병원명</InputTitle>
          <SignUpInput
            placeholder="병원명을 검색해주세요"
            type="text"
          ></SignUpInput>
          <P>
            *찾으시는 병원이 없으실 경우 하단에 신규병원 등록신청하기를
            눌러주세요.
          </P>
        </SignUpInputDiv>

        <SignUpInputDiv>
          <InputTitle>담당자 핸드폰번호</InputTitle>
          <SignUpInput
            placeholder="010-0000-0000"
            type="text"
            value={phone}
            onChange={handlePhone}
          ></SignUpInput>
          {!phoneValid && phone.length > 0 && (
            <ErrorMaessage>-을 붙여서 입력해주세요</ErrorMaessage>
          )}
        </SignUpInputDiv>

        <SignUpInputDiv>
          <InputTitle>담당자 이메일</InputTitle>
          <SignUpInput
            placeholder="test@naver.com"
            type="email"
            value={email}
            onChange={handleEmail}
          ></SignUpInput>
          {!emailValid && email.length > 0 && (
            <ErrorMaessage>올바른 이메일을 입력해주세요.</ErrorMaessage>
          )}
        </SignUpInputDiv>

        <SignUpInputDiv>
          <InputTitle>비밀번호</InputTitle>
          <SignUpInput
            placeholder="8자리 이상 입력해주세요"
            type="password"
            value={pw}
            onChange={handlePassword}
          ></SignUpInput>
          {!pwValid && pw.length > 0 && (
            <ErrorMaessage>8자리 이상 입력해주세요.</ErrorMaessage>
          )}
        </SignUpInputDiv>

        <SignUpInputDiv>
          <InputTitle>비밀번호 확인</InputTitle>
          <SignUpInput
            placeholder="8자리 이상 입력해주세요"
            type="password"
            value={pwCheck}
            onChange={handlePasswordCheck}
          ></SignUpInput>
          {!pwCheckValid && pwCheck.length > 0 && (
            <ErrorMaessage>비밀번호가 다릅니다</ErrorMaessage>
          )}
        </SignUpInputDiv>

        <SignUpBtn>
          <Button
            btnFontSize={fontSize.but}
            label={"회원가입"}
            btnColor={"white"}
            bgcolor={colors.primary}
            borderOutLine={colors.BtnborderOut}
            width={"90%"}
            height={"70px"}
            disabled={notAllow}
          />
        </SignUpBtn>
      </SignUpForm>
    </>
  );
};

const ButtonHospital = styled.button`
  /* 일반 버튼 스타일 */
  font-size: ${fontSize.but};
  font-weight: 500;
  color: ${colors.InputBorderInFont};
  width: 50%;
  border: 1px solid ${colors.InputBorderOut};
  border-bottom: none;
  background-color: white;
  cursor: pointer;
  padding: 5%;

  /* 활성 버튼 스타일 */
  &.active {
    font-size: ${fontSize.but};
    font-weight: 500;
    color: white;
    width: 50%;
    border: 1px solid ${colors.primary};
    border-bottom: none;
    background-color: ${colors.primary};
    cursor: pointer;
    padding: 5%;
  }
`;

const ButtonUser = styled.button`
  /* 일반 버튼 스타일 */
  font-size: ${fontSize.but};
  font-weight: 500;
  color: white;
  width: 50%;
  border: 1px solid ${colors.primary};
  border-bottom: none;
  background-color: ${colors.primary};
  cursor: pointer;
  padding: 5%;

  /* 활성 버튼 스타일 */
  &.active {
    font-size: ${fontSize.but};
    font-weight: 500;
    color: ${colors.InputBorderInFont};
    width: 50%;
    border: 1px solid ${colors.InputBorderOut};
    border-bottom: none;
    background-color: white;
    cursor: pointer;
    padding: 5%;
  }
`;

const SignUpDiv = styled.div`
  margin-top: 4%;
`;

const SignUpImg = styled.img`
  padding: 3% 3% 0 3%;
`;

const H1 = styled.p`
  font-size: 38px;
  margin: 0;
  padding: 2%;
  color: #00ad5c;
  font-weight: 700;
`;

const SignUpFormDiv = styled.div`
  width: 100%;
  padding: 10% 5% 2% 5%;
`;
const SignUpForm = styled.form`
  border: 1px solid ${colors.InputBorderOut};
  border-radius: 5px;
  padding: 10%;
  text-align: center;
  box-shadow: 0px 4px 5px 0px rgba(0, 0, 0, 0.1);
`;
const SignUpInput = styled.input`
  padding: 4%;
  width: 90%;
  margin: 4%;
  border-radius: 5px;
  border: 1px solid ${colors.InputBorderOut};
  font-size: 18px;
`;
const SignUpBtn = styled.div`
  margin-top: 10%;
`;

const SignUpInputDiv = styled.div``;

const InputTitle = styled.p`
  font-size: 18px;
`;

const ChangeButtonDiv = styled.div`
  width: 100%;
`;

const P = styled.p`
  font-size: 14px;
  color: #c20000;
  margin-bottom: 3%;
`;

const ErrorMaessage = styled.p`
  color: #c20000;
`;
