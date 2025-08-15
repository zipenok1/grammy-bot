import axios from 'axios';

export const createMarzbanUser = async (tgUsername: string) => {
  
  try {
    const { data } = await axios.post(`http://localhost:8000/api/user`,
      {
        username: tgUsername,
        data_limit: 1073741824, 
        proxies: { shadowsocks: { method: "chacha20-ietf-poly1305" } },
        inbounds: { shadowsocks: ["Shadowsocks TCP"] }
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.MARZBAN_TOKEN}`
        }
      }
    )
    return {
      link: data.links[0]
    }
    
  } catch (error: any) {
    console.error('API Error:', error.response?.data || error.message);
  }
};