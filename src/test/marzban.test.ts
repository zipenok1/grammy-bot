import { createMarzbanUser } from "../commands/marzban";
import axios from "axios";

jest.mock('axios');

test('создание пользователя', async () => {
    const fakeUsername = "test_user_123";
    const fakeApiResponse = {
      data: {
        links: ["shadowsocks://generated-link-here"]
      }
    };

    (axios.post as jest.Mock).mockResolvedValue(fakeApiResponse);
    const result = await createMarzbanUser(fakeUsername);

    expect(axios.post).toHaveBeenCalledWith("http://localhost:8000/api/user",
      {
        username: fakeUsername,
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

    expect(result).toEqual({
      link: "shadowsocks://generated-link-here"
    }) 
})
