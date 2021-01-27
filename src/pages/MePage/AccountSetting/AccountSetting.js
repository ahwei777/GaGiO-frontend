import React, { useState } from 'react';
import styled from 'styled-components';
import { Row, Col, Button, Input, message} from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectUser,
  getMe,
  updateMyInfo,
} from '../../../redux/reducers/userReducer';
import ModalUpdatePassword from './ModalUpdatePassword';

const PageWrapper = styled.div`
  font-size: 20px;
  text-align: center;
  padding: 10px;
`;
const InfoRow = styled(Row)`
  margin: 30px auto;
`;
const InfoTitle = styled(Col)`
  text-align: right;
`;
const InfoDetail = styled(Col)`
  text-align: left;
`;
const { Search } = Input;

export default function AccountSetting() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const handleClickUpdateNickname = (value) => {
    if (value === user.nickname ){
      message.warning({
        content: '暱稱相同',
        key: 'isUpdating',
        duration: 5,
      });
      return
    }
    message.loading({
      content: '變更暱稱中',
      key: 'isUpdating',
      duration: 0,
    });

    dispatch(updateMyInfo(value)).then((json) => {
      if (json.ok === 1) {
        message.success({
          content: '變更暱稱成功',
          key: 'isUpdating',
          duration: 5,
        });
        return dispatch(getMe());
      }
      message.error({
        content: json.errorMessage,
        key: 'isUpdating',
        duration: 5,
      });
      return 
    });
  };
  // 變更密碼 Modal
  const [visible, setVisible] = useState(false);
  const showModal = () => {
    setVisible(true);
  };

  return (
    <PageWrapper>
      <InfoRow>
        <InfoTitle span={10}>Email：</InfoTitle>
        <InfoDetail span={12}>{user.email}</InfoDetail>
      </InfoRow>
      <InfoRow>
        <InfoTitle span={10}>註冊時間：</InfoTitle>
        <InfoDetail span={12}>
          {new Date(user.createdAt).toLocaleString()}
        </InfoDetail>
      </InfoRow>
      <InfoRow>
        <InfoTitle span={10}>更新時間：</InfoTitle>
        <InfoDetail span={12}>
          {new Date(user.updatedAt).toLocaleString()}
        </InfoDetail>
      </InfoRow>
      <InfoRow>
        <InfoTitle span={10}>暱稱：</InfoTitle>
        <InfoDetail span={8}>
          <Search
            defaultValue={user.nickname}
            enterButton="變更暱稱"
            onSearch={handleClickUpdateNickname}
          />
        </InfoDetail>
      </InfoRow>
      <Button type="primary" size="large" danger onClick={showModal}>
        變更密碼
      </Button>
      <ModalUpdatePassword visible={visible} setVisible={setVisible} />
    </PageWrapper>
  );
}
