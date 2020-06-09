import React from 'react';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import styled from 'styled-components';

function SupportPaymentResult({ history }) {
  const { location } = history;
  const { search } = location;
  const query = queryString.parse(search);
  
  const { name, error_msg, buyer_name, paid_amount } = query;
  const isSuccessed = getIsSuccessed();
  function getIsSuccessed() {
    const { success, imp_success } = query;
    if (typeof imp_success === 'string') return imp_success === 'true';
    if (typeof imp_success === 'boolean') return imp_success === true;
    if (typeof success === 'string') return success === 'true';
    if (typeof success === 'boolean') return success === true;
  }

  const resultType = isSuccessed ? '성공' : '실패';
  return (
      <Wrapper>
        <Header>{`후원에 ${resultType}하였습니다`}</Header>
        <br/>
        <SubHeader>
          {name}
        </SubHeader>
        {isSuccessed  ? (
          <>
            <Text>
              후원자 이름 : {buyer_name}
            </Text>
            <Text>
              후원 금액 : {paid_amount}
            </Text>
          </>
        ) : (
          <Text>
            에러 메시지 : {error_msg}
          </Text>
        )}
        <br/>
        <Button variant="contained" onClick={() => history.push('/support')}>
          돌아가기
        </Button>
      </Wrapper>
  );
}

const Wrapper = styled.div `
  padding: 5rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-family: NanumSquare;
`;

const Header = styled.div `
  font-weight: bold;
  text-align: center;
  padding: 2rem;
  padding-top: 0;
  font-size: 3rem;
`;

const SubHeader = styled.div `
  font-weight: bold;
  text-align: left;
  padding: 2rem;
  padding-top: 0;
  font-size: 30px;
`;

const Text = styled.div `
  font-weight: bold;
  text-align: left;
  padding: 2rem;
  padding-top: 0;
  font-size: 22px;
`;

export default withRouter(SupportPaymentResult);
