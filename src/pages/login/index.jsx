import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Button, Form, Input } from 'antd';
import './styles.scss';
import { queryAuthenticated } from '../../store/slice-reducers/authenticated';
/**
 * 
 * Xác định định dạng dữ liệu chung, cho toàn bộ hệ thống
 * state {
 *      data,
 *      isLoading: boolean | true | false
 *      message,
 *      success: true | false,
 * }
 * 
 */
const Login = () => {
    const authenticated = useSelector((state) => state.authenticated);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onSubmit = (values) => {
        dispatch(queryAuthenticated(values));
    };
    return (
        <div className="container-form-login">
            <h1>Social app MindX Fullstack</h1>
            <Form
                onFinish={onSubmit}
                name="basic"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                style={{
                    maxWidth: 600,
                }}
            >
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Bạn cần nhập email và đúng định dạng!',
                            type: 'email'
                        },
                    ]}>
                    <Input placeholder="example@gmail.com" size="small" />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Bạn cần nhập mật khẩu!',
                        },
                    ]}
                >
                    <Input.Password size="small" />
                </Form.Item>
                {authenticated.message && <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 14,
                    }}
                >

                    <Alert
                        type={authenticated.message && !authenticated.success ? 'error' : 'success'}
                        message={authenticated.message}
                    />
                </Form.Item>}
                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 14,
                    }}
                >
                    <div className="btn">
                        <Button size="small" htmlType="submit" loading={authenticated.isLoading}>
                            Đăng nhập
                        </Button>
                        <Button
                            size="small"
                            className="btn-signup"
                            onClick={() => {
                                navigate('/auth/register');
                            }}
                        >
                            Đăng ký
                        </Button>
                    </div>
                </Form.Item>
            </Form>
        </div>
    )
}

export default Login