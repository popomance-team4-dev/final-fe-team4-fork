// eslint-disable-next-line @typescript-eslint/no-require-imports, no-undef
const mockServerClient = require('mockserver-client');
const client = mockServerClient.mockServerClient('mock.popomance.kr', 80);

async function clearMocks() {
  await client.clear({
    // 특정 API 지우기 - 아래 부분만 수정하면 됩니다.
    path: '/test',
    method: 'GET',
    // 터미널에서 [ npm run mockdown ] 실행하면 삭제됩니다.
  });
  // 또는 전체 지우기
  // await client.reset();
}

clearMocks();
