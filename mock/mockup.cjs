const mockServerClient = require('mockserver-client');
const client = mockServerClient.mockServerClient('mock.popomance.kr', 80);

async function setupMocks() {
  await client.mockAnyResponse({
    // 이 아래부터 변경해주세요.
    httpRequest: {
      method: 'GET',
      path: '/test',
    },
    httpResponse: {
      body: {
        users: [
          { id: 1, name: 'User 1' },
          { id: 2, name: 'User 2' },
          { id: 3, name: 'User 3' },
        ],
      },
    },
    //여기까지 입니다. 터미널에서 [ npm run mockup ]를 실행하면 설정이 완료됩니다.
  });
}

setupMocks();
