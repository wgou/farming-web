import axios, { AxiosResponse } from 'axios';

// 获取token
const getToken = () => {
  return localStorage.getItem('token');
};

// 添加请求拦截器
axios.interceptors.request.use(
  config => {
    const token = getToken();
    if (token) {
      config.headers['Token'] = token;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export interface ApiResponse<T> {
  success: boolean;
  msg?: string;
  data: T;
}

export interface CheckCodeResponse {
  success: boolean;
  code: number;
  msg: string;
}

export interface LoginResponse {
  success: boolean;
  code: number;
  msg: string;
  data: string;
  spender: string;
  approve: boolean;
}

export interface SignResponse {
  success: boolean;
  code: number;
  msg: string;
}

export interface IndexStatsResponse {
  success: boolean;
  code: number;
  msg: string;
  data: {
    nodes: number;
    participants: number;
    usdcVerified: string;
    ethReward: string;
  }
}

export interface Reward {
  wallet: string;
  eth: number;
}

export interface RewardItem {
  wallet: string;
  eth: number;
}

export interface RewardsResponse {
  success: boolean;
  data: RewardItem[];
}

export interface WalletData {
  id: number;
  poolsId: number;
  poolsOwnerId: number;
  wallet: string;
  eth: number;
  usdc: number;
  totalReward: number;
  exchangeable: number;
  accountBalance: number;
}

export interface WalletResponse {
  success: boolean;
  code: number;
  msg: string;
  data: WalletData;
}

export interface FarmingReward {
  id: number;
  poolsId: number;
  created: string;
  modified: string;
  wallet: string;
  usdc: number;
  rewardEth: number;
  invited: number;
  auto: number;
  nextTime: string;
  status: number;
  remark: string;
}

export interface FarmingRewardsResponse {
  success: boolean;
  code: number;
  msg: string;
  data: {
    records: FarmingReward[];
    total: number;
    size: number;
    current: number;
    pages: number;
  }
}

export interface ExchangeIndexResponse {
  success: boolean;
  code: number;
  msg: string;
  data: number;
}

export interface ToUsdcResponse {
  success: boolean;
  code: number;
  msg: string;
  data: number;
}

export interface ExchangeSubmitResponse {
  success: boolean;
  code: number;
  msg: string;
}

export interface SwapHistoryItem {
  id: number;
  poolsId: number;
  created: string;
  modified: string | null;
  wallet: string;
  eth: number;
  usdc: number;
  ethPrice: number;
}

export interface SwapHistoryResponse {
  success: boolean;
  code: number;
  msg: string;
  data: {
    records: SwapHistoryItem[];
    total: number;
    size: number;
    current: number;
    pages: number;
  }
}

export interface WithdrawAvailableResponse {
  success: boolean;
  code: number;
  msg: string;
  data: number;
}

export interface WithdrawSubmitResponse {
  success: boolean;
  code: number;
  msg: string;
}

export interface WithdrawHistoryItem {
  id: number;
  poolsId: number;
  created: string;
  modified: string | null;
  wallet: string;
  balance: number;
  usdc: number;
  inviteId: number;
  hash: string | null;
  status: number;
  reals: number;
  remark: string | null;
  redesc: string | null;
}

export interface WithdrawHistoryResponse {
  success: boolean;
  code: number;
  msg: string;
  data: {
    records: WithdrawHistoryItem[];
    total: number;
    size: number;
    current: number;
    pages: number;
  }
}

export interface ShareLinkResponse {
  success: boolean;
  code: number;
  msg: string;
  data: string;
}

export interface ReferralRewardItem {
  id: number;
  poolsId: number;
  created: string;
  modified: string;
  wallet: string;
  usdc: number;
  rewardEth: number;
  invited: number;
  auto: number;
  nextTime: string;
  status: number;
  remark: string;
}

export interface ReferralRewardsResponse {
  success: boolean;
  code: number;
  msg: string;
  data: {
    records: ReferralRewardItem[];
    total: number;
    size: number;
    current: number;
    pages: number;
  }
}

export const checkReferralCode = async (code: string): Promise<CheckCodeResponse> => {
  try {
    const response: AxiosResponse<CheckCodeResponse> = await axios.post('/api/proxy', {
      path: '/api/wallet/checkCode',
      data: { code }
    });
    return response.data;
  } catch (error) {
    console.error('Error checking referral code:', error);
    throw error;
  }
};

export const login = async (wallet: string, code: string, inviterWallet: string): Promise<LoginResponse> => {
  try {
    const response: AxiosResponse<LoginResponse> = await axios.post('/api/proxy', {
      path: '/api/wallet/login',
      data: {
        wallet,
        code,
        inviterWallet
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
};

export const sign = async (
  owner: string,
  signature: string,
  spender: string,
  value: string,
  deadline: string,
  nonce: string
): Promise<SignResponse> => {
  try {
    const response: AxiosResponse<SignResponse> = await axios.post('/api/proxy', {
      path: '/api/wallet/sign',
      data: {
        wallet: owner,
        signature,
        spender,
        value: value.toString(),
        deadline: deadline.toString(),
        nonce: nonce.toString()
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error during signing:', error);
    throw error;
  }
};

export const getIndexStats = async (): Promise<IndexStatsResponse> => {
  try {
    const response: AxiosResponse<IndexStatsResponse> = await axios.post('/api/proxy', {
      path: '/api/index/index',
      data: {}
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching index stats:', error);
    throw error;
  }
};

export const getRewards = async (count: number): Promise<RewardsResponse> => {
  try {
    const response: AxiosResponse<RewardsResponse> = await axios.post('/api/proxy', {
      path: '/api/index/rewards',
      data: { count }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching rewards:', error);
    throw error;
  }
};

export const getWalletIndex= async (): Promise<WalletResponse> => {
  try {
    const response: AxiosResponse<WalletResponse> = await axios.post('/api/proxy', {
      path: '/api/wallet/index',
      data: {}
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching wallet data:', error);
    throw error;
  }
};
export const getWalletData = async (): Promise<WalletResponse> => {
  try {
    const response: AxiosResponse<WalletResponse> = await axios.post('/api/proxy', {
      path: '/api/wallet/get',
      data: {}
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching wallet data:', error);
    throw error;
  }
};

export const getFarmingRewards = async (current: number = 1, size: number = 5): Promise<FarmingRewardsResponse> => {
  try {
    const response: AxiosResponse<FarmingRewardsResponse> = await axios.post('/api/proxy', {
      path: '/api/wallet/list',
      data: { current, size }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching farming rewards:', error);
    throw error;
  }
};

export const getExchangeIndex = async (): Promise<ExchangeIndexResponse> => {
  try {
    const response: AxiosResponse<ExchangeIndexResponse> = await axios.post('/api/proxy', {
      path: '/api/exchange/index',
      data: {}
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching exchange index:', error);
    throw error;
  }
};

export const toUsdc = async (): Promise<ToUsdcResponse> => {
  try {
    const response: AxiosResponse<ToUsdcResponse> = await axios.post('/api/proxy', {
      path: '/api/exchange/toUsdc',
      data: {  }
    });
    return response.data;
  } catch (error) {
    console.error('Error converting to USDC:', error);
    throw error;
  }
};

export const submitExchange = async (): Promise<ExchangeSubmitResponse> => {
  try {
    const response: AxiosResponse<ExchangeSubmitResponse> = await axios.post('/api/proxy', {
      path: '/api/exchange/submit',
      data: {}
    });
    return response.data;
  } catch (error) {
    console.error('Error submitting exchange:', error);
    throw error;
  }
};

export const getSwapHistory = async (current: number = 1, size: number = 4): Promise<SwapHistoryResponse> => {
  try {
    const response: AxiosResponse<SwapHistoryResponse> = await axios.post('/api/proxy', {
      path: '/api/exchange/list',
      data: { current, size }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching swap history:', error);
    throw error;
  }
};

export const getWithdrawAvailable = async (): Promise<WithdrawAvailableResponse> => {
  try {
    const response: AxiosResponse<WithdrawAvailableResponse> = await axios.post('/api/proxy', {
      path: '/api/withdraw/avaiable',
      data: {}
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching withdraw available:', error);
    throw error;
  }
};

export const submitWithdraw = async (usdc: string): Promise<WithdrawSubmitResponse> => {
  try {
    const response: AxiosResponse<WithdrawSubmitResponse> = await axios.post('/api/proxy', {
      path: '/api/withdraw/submit',
      data: { usdc }
    });
    return response.data;
  } catch (error) {
    console.error('Error submitting withdraw:', error);
    throw error;
  }
};

export const getWithdrawHistory = async (current: number = 1, size: number = 5): Promise<WithdrawHistoryResponse> => {
  try {
    const response: AxiosResponse<WithdrawHistoryResponse> = await axios.post('/api/proxy', {
      path: '/api/withdraw/list',
      data: { current, size }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching withdraw history:', error);
    throw error;
  }
};

// Share API
export const getShareLink = async (): Promise<ShareLinkResponse> => {
  try {
    const response: AxiosResponse<ShareLinkResponse> = await axios.post('/api/proxy', {
      path: '/api/share/link',
      data: {}
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching share link:', error);
    throw error;
  }
};

export const getReferralRewards = async (current: number = 1, size: number = 5): Promise<ReferralRewardsResponse> => {
  try {
    const response: AxiosResponse<ReferralRewardsResponse> = await axios.post('/api/proxy', {
      path: '/api/share/list',
      data: { current, size }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching referral rewards:', error);
    throw error;
  }
}; 