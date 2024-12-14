import * as authServices from '../services/auth.js';
import { accessTokenLifetime } from '../constants/users.js';

export const registerController = async (req, res) => {
    const data = await authServices.register(req.body);
  
    res.status(201).json({
      status: 201,
      message: 'Successfully registerd user',
      data: data,
    });
  };
  
  export const loginController = async (req, res) => {
    const { _id, accessToken, refreshToken, refreshTokenValidUntil } =
      await authServices.login(req.body);
  
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      expires: refreshTokenValidUntil,
    });
  
    res.cookie('sessionId', _id, {
      httpOnly: true,
      expires: refreshTokenValidUntil,
    });
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      expires: new Date(Date.now() + accessTokenLifetime),
    });
  
    res.json({
      status: 200,
      message: 'Successfully login user',
      data: {
        accessToken,
      },
    });
  };

 export const logoutController = async (req, res) => {
    res.clearCookie('accessToken');
  
    res.status(200).json({
      success: true,
      message: 'Successfully logged out',
    });
  };
  
  