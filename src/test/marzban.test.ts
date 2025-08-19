import * as marzbanAll from "../commands/marzban"
import axios from "axios"

jest.mock('axios')

describe('marzban', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('создание пользователя', async () => {
    const fakeUsername = "test_user_123"
    const fakeApiResponse = {
      data: {
        links: ["shadowsocks://generated-link-here"]
      }
    }

    jest.spyOn(marzbanAll, 'validToken').mockResolvedValue(true);
    (axios.post as jest.Mock).mockResolvedValue(fakeApiResponse)

    const result = await marzbanAll.createMarzbanUser(fakeUsername)

    expect(axios.post).toHaveBeenCalledWith(
      "http://localhost:8000/api/user",
      {
        username: fakeUsername,
        data_limit: 1073741824,
        proxies: { shadowsocks: { method: "chacha20-ietf-poly1305" } },
        inbounds: { shadowsocks: ["Shadowsocks TCP"] }
      },
      {
        headers: {
          Authorization: expect.stringContaining('Bearer')
        }
      }
    )

    expect(result).toEqual({
      link: "shadowsocks://generated-link-here"
    })
  })
})