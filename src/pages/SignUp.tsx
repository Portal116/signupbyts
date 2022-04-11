import React, { useEffect, useState } from 'react';
import './SignUp.scss';
import X_Mark from '../styles/img/x_mark.png';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import _ from 'lodash';

const SignUp: React.FC = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
    reset,
  } = useForm<FormInput>({
    criteriaMode: 'all',
  });

  interface FormInput {
    id: string;
    nickName: string;
    password: string;
    passwordCheck: string;
    mobile: number;
    email: string;
    client?: string;
    clientNumber?: string;
  }

  const [idFlag, setIdFlag] = useState<boolean>(false);
  const [nickNameFlag, setNickNameFlag] = useState<boolean>(false);
  const [mobileFlag, setMobileFlag] = useState<boolean>(false);
  const [emailFlag, setEmailFlag] = useState<boolean>(false);
  const onSubmit = (data: FormInput) => {
    if (idFlag && nickNameFlag && mobileFlag && emailFlag) {
      console.log(data);
      reset();
      alert('완료');
    }
  };
  return (
    <form className="container_signup" onSubmit={handleSubmit(onSubmit)}>
      <div className="title">2/2 아이디 생성 및 인증</div>
      <img src={X_Mark} className="close"></img>
      <div className="divider"></div>
      <div>
        <div>
          <label>아이디</label>
          <input
            {...register('id', {
              required: { value: true, message: 'ID는 입력 필수입니다.' },
              pattern: {
                value: /^(?=.*?[a-z])(?=.*?[0-9]).{5,20}$/,
                message: '아이디는 5~20자의 영문 소문자, 숫자만 사용 가능합니다.',
              },
              onChange: () => {
                setIdFlag(false);
              },
            })}
            placeholder="아이디 입력"
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              setIdFlag(true);
            }}
          >
            중복확인
          </button>
          <div>
            <ErrorMessage
              errors={errors}
              name="id"
              render={({ message }) => {
                // console.log('messages', message);
                return message;
              }}
            />
          </div>
          <div>{!idFlag && getValues('id') && 'ID 중복확인은 필수입니다'}</div>
        </div>
        <div>
          <label>닉네임</label>
          <input
            {...register('nickName', {
              required: { value: true, message: '닉네임은 입력 필수입니다.' },
              pattern: {
                value: /^(?=.*?[a-z])(?=.*?[0-9]).{5,20}$/,
                message: '닉네임은 5~20자의 영문 소문자, 숫자만 사용 가능합니다.',
              },
              onChange: (e) => {
                setNickNameFlag(false);
              },
            })}
            placeholder="닉네임 입력"
          ></input>
          <button
            onClick={(e) => {
              e.preventDefault();
              setNickNameFlag(true);
            }}
          >
            중복확인
          </button>
          <div>
            <ErrorMessage
              errors={errors}
              name="nickName"
              render={({ message }) => {
                // console.log('messages', message);
                return message;
              }}
            />
          </div>
          <div>
            <div>{!nickNameFlag && getValues('nickName') && '닉네임 중복확인은 필수입니다'}</div>
          </div>
        </div>
      </div>
      <div className="divider"></div>
      <div>
        <div>
          <label>비밀번호</label>
          <input
            type="password"
            {...register('password', {
              required: { value: true, message: '비밀번호는 입력 필수입니다.' },
              pattern: {
                value: /^(?=.*[A-Za-z])(?=.*[a-z0-9])(?=.*[A-Z0-9]).{8,12}$/,
                message: '비밀번호는 영문 대소문자, 숫자 2가지 이상을 조합하여 8~12자리로 입력해주세요.',
              },
            })}
            placeholder="비밀번호 입력"
          ></input>
          <div>
            <ErrorMessage
              errors={errors}
              name="password"
              render={({ message }) => {
                // console.log('messages', message);
                return message;
              }}
            />
          </div>
        </div>
        <div>
          <input
            type="password"
            {...register('passwordCheck', {
              required: { value: true, message: '비밀번호 확인은 입력 필수입니다.' },
              validate: (value) => value === getValues('password') || '비밀번호가 일치하지 않습니다',
            })}
            placeholder="비밀번호 재입력"
          ></input>
          <div>
            <ErrorMessage
              errors={errors}
              name="passwordCheck"
              render={({ message }) => {
                // console.log('messages', message);
                return message;
              }}
            />
          </div>
        </div>
      </div>
      <div className="divider"></div>
      <div>
        <div>
          <label>핸드폰 인증</label>
          <input
            {...register('mobile', {
              required: { value: true, message: '전화번호는 입력 필수입니다.' },
              pattern: {
                value: /^(01[016789]{1})-?[0-9]{3,4}-?[0-9]{4}$/,
                message: '- 를 제외한 10~11자리로 입력해주세요',
              },
              onChange: (e) => {
                setMobileFlag(false);
              },
            })}
            placeholder="핸드폰 번호 입력"
          ></input>
          <button
            onClick={(e) => {
              e.preventDefault();
              setMobileFlag(true);
            }}
          >
            인증하기
          </button>
          <div>
            <ErrorMessage
              errors={errors}
              name="mobile"
              render={({ message }) => {
                // console.log('messages', message);
                return message;
              }}
            />
          </div>
          <div>
            <div>{!mobileFlag && getValues('mobile') && '핸드폰 인증을 해주세요'}</div>
          </div>
        </div>
        <label>이메일 인증</label>
        <div>
          <input
            {...register('email', {
              required: { value: true, message: '이메일은 입력 필수입니다.' },
              pattern: {
                value: /^[0-9a-zA-Z]{1,}[@][0-9a-zA-Z]{1,}[.][a-zA-Z]{2,3}$/,
                message: '전체 이메일 주소를 입력하세요',
              },
              onChange: (e) => {
                setEmailFlag(false);
              },
            })}
            placeholder="이메일 입력"
          ></input>
          <button
            onClick={(e) => {
              e.preventDefault();
              setEmailFlag(true);
            }}
          >
            인증하기
          </button>
          <div>
            <ErrorMessage
              errors={errors}
              name="email"
              render={({ message }) => {
                // console.log('messages', message);
                return message;
              }}
            />
          </div>
          <div>
            <div>{!emailFlag && getValues('email') && '이메일 인증을 해주세요'}</div>
          </div>
        </div>
      </div>
      <div className="divider"></div>
      <div>
        <label>고객사 선택(선택사항)</label>
        <input {...register('client')} placeholder="고객사 선택"></input>
        <input {...register('clientNumber')} placeholder="고객번호 입력"></input>
        <div>고객사는 선택사항이며 추후 정보등록을 통해 변경 가능합니다.</div>
      </div>
      <div className="divider"></div>
      <input type="submit" value="제출하기" />
    </form>
  );
};
export default SignUp;
