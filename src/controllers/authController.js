import * as authServices from '../services/auth.js';
import { accessTokenLifetime } from '../constants/users.js';

export const registerController = async (req, res) => {
  const resData = await authServices.register(req.body);

  const { _id, accessToken, refreshToken, refreshTokenValidUntil } =
    resData.session;

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

  res.status(201).json({
    status: 201,
    message: 'Successfully registerd user',
    data: {
      user: resData.user,
      accessToken,
    },
  });
};

export const loginController = async (req, res) => {
  const resData = await authServices.login(req.body);

  const { _id, accessToken, refreshToken, refreshTokenValidUntil } =
    resData.session;

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
      user: resData.user,
      accessToken,
    },
  });
};

export const logoutController = async (req, res) => {
  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');
  res.status(204).send();
};

const setupSession = (res, session) => {
  const { _id, refreshToken, refreshTokenValidUntil } = session;

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    expires: refreshTokenValidUntil,
  });

  res.cookie('sessionId', _id, {
    httpOnly: true,
    expires: refreshTokenValidUntil,
  });
};

export const refreshController = async (req, res) => {
  const session = await authServices.refreshUserSession({
    sessionId: req.cookies.sessionId,
    refreshToken: req.cookies.refreshToken,
  });
  setupSession(res, session);
  res.json({
    status: 200,
    message: 'Successfully refreshed a session! ',
    data: {
      accessToken: session.accessToken,
    },
  });
};
