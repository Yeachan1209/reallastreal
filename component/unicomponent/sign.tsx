import { useState } from "react";
import {
  Flex,
  Box,
  Text,
  Input,
  Button,
  HStack,
  theme,
} from "@chakra-ui/react";
import { FaGoogle } from "react-icons/fa";
import { FiHome } from "react-icons/fi";
import Link from "next/link";
import router from "next/router";
import styled from "styled-components";

const Sign = styled(Flex)`
  height: 100vh;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const Signcenter = styled(Box)`
display: block;

@media (min-width: 768px) {
  display: flex;
}

flex-direction: column;

@media (min-width: 768px) {
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
}

justify-content: center;

@media (max-width: 767px) {
  align-items: center;
}
  }
`;

const SignBox = styled(Box)`
  margin-left: auto;
  max-width: 100%;
  display: block;
  align-items: center;

  @media (min-width: 768px) {
    margin-left: 0;
    margin-top: 0;
    max-width: 600px;
    display: flex;
    justify-content: center;
    align-items: flex-start;
  }
`;

const IconBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 3.5rem;
`;

const HomeIcon = styled(Box)`
  width: 160px;
  height: 160px;
  color: #38b2ac;
  margin-top: 30px;
`;

const Title = styled(Text)`
  font-weight: bold;
  width: 220px;
  text-align: left;
  margin-top: 10px;
`;

const LoginSignBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px;
  width: 100%;
  border-radius: none;
  margin-top: 15px;

  @media (min-width: 768px) {
    width: auto;
    border-radius: md;
    align-items: flex-start;
  }
`;

const SignNameEmailPass = styled(Input)`
  margin-bottom: 8px;
  width: 100%;
  max-width: 366px;
  background-color: #e5e5e5 !important;
  border-radius: 16px;
  &:focus {
    outline: none;
    box-shadow: outline;
  }
  &::placeholder {
    color: gray.500;
  }
`;

const SignLoginButton = styled(Button)`
  width: 100%;
  max-width: 366px;
  background-color: #38b2ac !important;
  color: white;
  border-radius: lg;
  &:hover {
    background-color: #319795 !important;
  }
`;

const ErrorMessage = styled(Text)`
  color: ${theme.colors.red[500]};
  font-size: sm;
  margin-bottom: 8px;
`;

const GoogleLogin = styled(Button)`
  margin-top: 8px;
  width: 366px;
  color: black;
  border-radius: lg;
  background-color: #e5e5e5 !important;

  &:hover {
    background-color: #d1d1d1 !important;
  }
`;

const LoginSignupButton = styled(HStack)`
  margin-top: 8px;
  display: flex;
  justify-content: center;
  width: 100%;
`;

const Notaccount = styled(Text)`
  font-weight: bold;
`;

const LoginorSignup = styled.a`
  font-weight: bold;
  color: #38b2ac;
  padding: 0.25rem 0.5rem;
  border-radius: 0.375rem;
  margin-left: 0.5rem;
`;

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [isSignup, setIsSignup] = useState(false);

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleNameChange = (e) => setName(e.target.value);

  const handleSignup = () => {};

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  const handleSubmit = () => {
    if (!email || !password) {
      setError("이메일과 비밀번호를 모두 입력해주세요.");
    } else if (!emailRegex.test(email)) {
      setError("올바른 이메일 형식이 아닙니다.");
    } else if (!passwordRegex.test(password)) {
      setError(
        "비밀번호는 최소 8자 이상, 숫자와 문자, 특수문자가 모두 포함되어야 합니다."
      );
    } else {
      router.push("/HomePage");
    }
  };

  return (
    <Sign>
      <Signcenter>
        <SignBox>
          <IconBox>
            <HomeIcon as={FiHome} />
            <Title>동네이야기부터 중고거래까지 가까운 이웃과 함께해요</Title>
          </IconBox>
          <LoginSignBox>
            {isSignup && (
              <SignNameEmailPass
                placeholder="이름"
                value={name}
                onChange={handleNameChange}
              />
            )}
            <SignNameEmailPass
              placeholder="이메일"
              value={email}
              onChange={handleEmailChange}
            />
            <SignNameEmailPass
              placeholder="비밀번호"
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
            {error && <ErrorMessage>{error}</ErrorMessage>}
            {isSignup ? (
              <SignLoginButton onClick={handleSignup}>회원가입</SignLoginButton>
            ) : (
              <SignLoginButton onClick={handleSubmit}>로그인</SignLoginButton>
            )}
            <Link href="../../HomePage">
              <GoogleLogin leftIcon={<FaGoogle />}>
                Google 계정으로 로그인
              </GoogleLogin>
            </Link>
            <LoginSignupButton>
              <Notaccount>계정이 없으신가요?</Notaccount>
              <Link href="/" passHref>
                <LoginorSignup onClick={() => setIsSignup(!isSignup)}>
                  {isSignup ? "로그인" : "회원가입"}
                </LoginorSignup>
              </Link>
            </LoginSignupButton>
          </LoginSignBox>
        </SignBox>
      </Signcenter>
    </Sign>
  );
}
