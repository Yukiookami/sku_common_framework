import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

const axiosInstance: AxiosInstance = axios.create({
  // API URL，一般存储到环境变量中
  baseURL: "/",
});

axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  // 请求头数据格式 一般来说都是application/json 特殊情况下可能有form-data
  config.headers["Content-Type"] = "application/json";

  // 获取token和设置token相关处理
  const token = "token";
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return Promise.resolve(config);
});

axiosInstance.interceptors.response.use(
  // API返回成功，状态码为200
  (response: AxiosResponse) => {
    // 对响应数据的处理（当请求返回成功为200，但业务代码需要特殊处理的时候，写在这里）

    // 返回响应数据
    return response;
  },
  // API返回失败，状态码不为200
  (error: AxiosError) => {
    const { code } = error;
    // 对响应错误的处理（当请求返回失败，需要特殊处理的时候，写在这里）
    // 例如：请求超时、网络断开、404、500、401、403、304等

    // 特殊错误码处理
    const codeError = [
      // 请求超时
      "ECONNABORTED",
      // 无法解析主机
      "ENOTFOUND",
      // 连接被拒绝
      "ECONNREFUSED",
      // 连接被重置
      "ECONNRESET",
      // 网络错误
      "ERR_NETWORK",
    ];
    if (code && codeError.includes(code)) {
      // redirectTo(url404);
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);
