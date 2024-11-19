---
title: AIPark API v1.0.0
language_tabs:
  - shell: Shell
  - javascript: JavaScript
language_clients:
  - shell: ""
  - javascript: ""
toc_footers: []
includes: []
search: false
highlight_theme: darkula
headingLevel: 2

---

<!-- Generator: Widdershins v4.0.1 -->

<h1 id="aipark-api">AIPark API v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

기업연계 파이널 프로젝트 API 문서 백엔드 개발용

Base URLs:

* <a href="http://api.popomance.kr:8080">http://api.popomance.kr:8080</a>

<h1 id="aipark-api-vc-view-controller-_team-_multi">vc-view-controller-_team-_multi</h1>

## vcSave

<a id="opIdvcSave"></a>

> Code samples

```shell
# You can also use wget
curl -X POST http://api.popomance.kr:8080/vc/{projectId}/save \
  -H 'Content-Type: application/json' \
  -H 'Accept: */*'

```

```javascript
const inputBody = '{
  "id": 0
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'*/*'
};

fetch('http://api.popomance.kr:8080/vc/{projectId}/save',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`POST /vc/{projectId}/save`

*VC 상태 로드*

VC 프로젝트 상태를 가져옵니다.

> Body parameter

```json
{
  "id": 0
}
```

<h3 id="vcsave-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[VCSaveDto](#schemavcsavedto)|true|none|
|projectId|path|integer(int64)|true|none|

> Example responses

> 200 Response

<h3 id="vcsave-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|[ResponseDto](#schemaresponsedto)|

<aside class="success">
This operation does not require authentication
</aside>

## ttsLoad

<a id="opIdttsLoad"></a>

> Code samples

```shell
# You can also use wget
curl -X GET http://api.popomance.kr:8080/vc/{projectId} \
  -H 'Accept: */*'

```

```javascript

const headers = {
  'Accept':'*/*'
};

fetch('http://api.popomance.kr:8080/vc/{projectId}',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /vc/{projectId}`

*VC 상태 로드*

VC 프로젝트 상태를 가져옵니다.

<h3 id="ttsload-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|projectId|path|integer(int64)|true|none|

> Example responses

> 200 Response

<h3 id="ttsload-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|[ResponseDto](#schemaresponsedto)|

<aside class="success">
This operation does not require authentication
</aside>

<h1 id="aipark-api-vc-controller-_team-_api">vc-controller-_team-_api</h1>

## uploadTargetAudio

<a id="opIduploadTargetAudio"></a>

> Code samples

```shell
# You can also use wget
curl -X POST http://api.popomance.kr:8080/vc/target/upload \
  -H 'Content-Type: multipart/form-data' \
  -H 'Accept: */*'

```

```javascript
const inputBody = '{
  "targetAudio": "string"
}';
const headers = {
  'Content-Type':'multipart/form-data',
  'Accept':'*/*'
};

fetch('http://api.popomance.kr:8080/vc/target/upload',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`POST /vc/target/upload`

*타겟 오디오 업로드 및 Voice ID 생성*

사용자가 업로드한 타겟 오디오 파일을 사용하여 Voice ID를 생성합니다.

> Body parameter

```yaml
targetAudio: string

```

<h3 id="uploadtargetaudio-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|object|false|none|
|» targetAudio|body|string(binary)|true|none|

> Example responses

> 200 Response

<h3 id="uploadtargetaudio-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|[ResponseDto](#schemaresponsedto)|

<aside class="success">
This operation does not require authentication
</aside>

## convertMultipleVoices

<a id="opIdconvertMultipleVoices"></a>

> Code samples

```shell
# You can also use wget
curl -X POST http://api.popomance.kr:8080/vc/convert/batch?voiceId=string \
  -H 'Content-Type: multipart/form-data' \
  -H 'Accept: */*'

```

```javascript
const inputBody = '{
  "sourceAudios": [
    "string"
  ]
}';
const headers = {
  'Content-Type':'multipart/form-data',
  'Accept':'*/*'
};

fetch('http://api.popomance.kr:8080/vc/convert/batch?voiceId=string',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`POST /vc/convert/batch`

*여러 소스 오디오 파일 변환 요청*

사용자가 업로드한 여러 소스 오디오 파일을 타겟 Voice ID로 변환합니다.

> Body parameter

```yaml
sourceAudios:
  - string

```

<h3 id="convertmultiplevoices-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|voiceId|query|string|true|none|
|body|body|object|false|none|
|» sourceAudios|body|[string]|true|none|

> Example responses

> 200 Response

<h3 id="convertmultiplevoices-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|[ResponseDto](#schemaresponsedto)|

<aside class="success">
This operation does not require authentication
</aside>

<h1 id="aipark-api-tts-view-controller-_team-_multi">tts-view-controller-_team-_multi</h1>

## ttsSave

<a id="opIdttsSave"></a>

> Code samples

```shell
# You can also use wget
curl -X POST http://api.popomance.kr:8080/tts/{projectId}/save \
  -H 'Content-Type: application/json' \
  -H 'Accept: */*'

```

```javascript
const inputBody = '{
  "projectId": 0,
  "projectName": "string",
  "voiceStyleId": 0,
  "fullScript": "string",
  "globalSpeed": 0.1,
  "globalPitch": 0.1,
  "globalVolume": 0.1,
  "apiStatus": "IN_PROGRESS",
  "ttsDetails": [
    {
      "id": 0,
      "unitScript": "string",
      "unitSpeed": 0.1,
      "unitPitch": 0.1,
      "unitVolume": 0.1,
      "isDeleted": true,
      "unitSequence": 0,
      "voiceStyleId": 0,
      "projectId": 0
    }
  ]
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'*/*'
};

fetch('http://api.popomance.kr:8080/tts/{projectId}/save',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`POST /tts/{projectId}/save`

*TTS 상태 저장*

TTS 프로젝트 상태를 저장합니다.

> Body parameter

```json
{
  "projectId": 0,
  "projectName": "string",
  "voiceStyleId": 0,
  "fullScript": "string",
  "globalSpeed": 0.1,
  "globalPitch": 0.1,
  "globalVolume": 0.1,
  "apiStatus": "IN_PROGRESS",
  "ttsDetails": [
    {
      "id": 0,
      "unitScript": "string",
      "unitSpeed": 0.1,
      "unitPitch": 0.1,
      "unitVolume": 0.1,
      "isDeleted": true,
      "unitSequence": 0,
      "voiceStyleId": 0,
      "projectId": 0
    }
  ]
}
```

<h3 id="ttssave-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|projectId|path|integer(int64)|true|none|
|body|body|[TTSSaveDto](#schemattssavedto)|true|none|

> Example responses

> 200 Response

<h3 id="ttssave-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|[ResponseDto](#schemaresponsedto)|

<aside class="success">
This operation does not require authentication
</aside>

## ttsLoad_1

<a id="opIdttsLoad_1"></a>

> Code samples

```shell
# You can also use wget
curl -X GET http://api.popomance.kr:8080/tts/{projectId} \
  -H 'Accept: */*'

```

```javascript

const headers = {
  'Accept':'*/*'
};

fetch('http://api.popomance.kr:8080/tts/{projectId}',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /tts/{projectId}`

*TTS 상태 로드*

TTS 프로젝트 상태를 가져옵니다.

<h3 id="ttsload_1-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|projectId|path|integer(int64)|true|none|

> Example responses

> 200 Response

<h3 id="ttsload_1-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|[ResponseDto](#schemaresponsedto)|

<aside class="success">
This operation does not require authentication
</aside>

<h1 id="aipark-api-s-3-controller">s-3-controller</h1>

## uploadUnit

<a id="opIduploadUnit"></a>

> Code samples

```shell
# You can also use wget
curl -X POST http://api.popomance.kr:8080/tts/upload-generated-audio-to-bucket?detailId=0&projectId=0 \
  -H 'Content-Type: multipart/form-data' \
  -H 'Accept: */*'

```

```javascript
const inputBody = '{
  "file": "string"
}';
const headers = {
  'Content-Type':'multipart/form-data',
  'Accept':'*/*'
};

fetch('http://api.popomance.kr:8080/tts/upload-generated-audio-to-bucket?detailId=0&projectId=0',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`POST /tts/upload-generated-audio-to-bucket`

*유닛(TTS or VC) 오디오 업로드*

유닛 오디오를 S3 버킷에 저장하고 메타데이터를 DB에 저장하는 api입니다.<br><br>매개변수 : <br>- 유닛 id, <br>- 프로젝트 id, <br>- 프로젝트 타입 (TTS, VC, Concat), <br>- 오디오 파일

> Body parameter

```yaml
file: string

```

<h3 id="uploadunit-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|detailId|query|integer(int64)|true|none|
|projectId|query|integer(int64)|true|none|
|body|body|object|false|none|
|» file|body|string(binary)|true|none|

> Example responses

> 200 Response

<h3 id="uploadunit-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|[ResponseDto](#schemaresponsedto)|

<aside class="success">
This operation does not require authentication
</aside>

## uploadUnit_1

<a id="opIduploadUnit_1"></a>

> Code samples

```shell
# You can also use wget
curl -X POST http://api.popomance.kr:8080/vc/upload-generated-audio-to-bucket?detailId=0&projectId=0 \
  -H 'Content-Type: multipart/form-data' \
  -H 'Accept: */*'

```

```javascript
const inputBody = '{
  "file": "string"
}';
const headers = {
  'Content-Type':'multipart/form-data',
  'Accept':'*/*'
};

fetch('http://api.popomance.kr:8080/vc/upload-generated-audio-to-bucket?detailId=0&projectId=0',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`POST /vc/upload-generated-audio-to-bucket`

*유닛(TTS or VC) 오디오 업로드*

유닛 오디오를 S3 버킷에 저장하고 메타데이터를 DB에 저장하는 api입니다.<br><br>매개변수 : <br>- 유닛 id, <br>- 프로젝트 id, <br>- 프로젝트 타입 (TTS, VC, Concat), <br>- 오디오 파일

> Body parameter

```yaml
file: string

```

<h3 id="uploadunit_1-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|detailId|query|integer(int64)|true|none|
|projectId|query|integer(int64)|true|none|
|body|body|object|false|none|
|» file|body|string(binary)|true|none|

> Example responses

> 200 Response

<h3 id="uploadunit_1-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|[ResponseDto](#schemaresponsedto)|

<aside class="success">
This operation does not require authentication
</aside>

## uploadFiles

<a id="opIduploadFiles"></a>

> Code samples

```shell
# You can also use wget
curl -X POST http://api.popomance.kr:8080/vc/upload-local-to-bucket?memberId=0&projectId=0&audioType=string&voiceId=string \
  -H 'Content-Type: multipart/form-data' \
  -H 'Accept: */*'

```

```javascript
const inputBody = '{
  "files": [
    "string"
  ]
}';
const headers = {
  'Content-Type':'multipart/form-data',
  'Accept':'*/*'
};

fetch('http://api.popomance.kr:8080/vc/upload-local-to-bucket?memberId=0&projectId=0&audioType=string&voiceId=string',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`POST /vc/upload-local-to-bucket`

*유저가 가지고 있는 오디오를 버킷에 저장*

VC, CONCAT으로 변환할 오디오를 클라이언트 로컬컴퓨터로부터 버킷에 저장하는 api입니다.<br><br>매개변수:<br>- 파일, <br>- 멤버Id, <br>- projectId, <br>- audioType<br>오디오 타입이 VC_TRG일 경우 마지막 매개변수로 voiceId를 입력합니다.

> Body parameter

```yaml
files:
  - string

```

<h3 id="uploadfiles-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|memberId|query|integer(int64)|true|none|
|projectId|query|integer(int64)|true|none|
|audioType|query|string|true|none|
|voiceId|query|string|true|none|
|body|body|object|false|none|
|» files|body|[string]|true|none|

> Example responses

> 200 Response

<h3 id="uploadfiles-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|[ResponseDto](#schemaresponsedto)|

<aside class="success">
This operation does not require authentication
</aside>

## uploadFiles_1

<a id="opIduploadFiles_1"></a>

> Code samples

```shell
# You can also use wget
curl -X POST http://api.popomance.kr:8080/concat/upload-local-to-bucket?memberId=0&projectId=0&audioType=string&voiceId=string \
  -H 'Content-Type: multipart/form-data' \
  -H 'Accept: */*'

```

```javascript
const inputBody = '{
  "files": [
    "string"
  ]
}';
const headers = {
  'Content-Type':'multipart/form-data',
  'Accept':'*/*'
};

fetch('http://api.popomance.kr:8080/concat/upload-local-to-bucket?memberId=0&projectId=0&audioType=string&voiceId=string',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`POST /concat/upload-local-to-bucket`

*유저가 가지고 있는 오디오를 버킷에 저장*

VC, CONCAT으로 변환할 오디오를 클라이언트 로컬컴퓨터로부터 버킷에 저장하는 api입니다.<br><br>매개변수:<br>- 파일, <br>- 멤버Id, <br>- projectId, <br>- audioType<br>오디오 타입이 VC_TRG일 경우 마지막 매개변수로 voiceId를 입력합니다.

> Body parameter

```yaml
files:
  - string

```

<h3 id="uploadfiles_1-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|memberId|query|integer(int64)|true|none|
|projectId|query|integer(int64)|true|none|
|audioType|query|string|true|none|
|voiceId|query|string|true|none|
|body|body|object|false|none|
|» files|body|[string]|true|none|

> Example responses

> 200 Response

<h3 id="uploadfiles_1-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|[ResponseDto](#schemaresponsedto)|

<aside class="success">
This operation does not require authentication
</aside>

## uploadConcat

<a id="opIduploadConcat"></a>

> Code samples

```shell
# You can also use wget
curl -X POST http://api.popomance.kr:8080/concat/upload-generated-audio-to-bucket?projectId=0 \
  -H 'Content-Type: multipart/form-data' \
  -H 'Accept: */*'

```

```javascript
const inputBody = '{
  "file": "string"
}';
const headers = {
  'Content-Type':'multipart/form-data',
  'Accept':'*/*'
};

fetch('http://api.popomance.kr:8080/concat/upload-generated-audio-to-bucket?projectId=0',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`POST /concat/upload-generated-audio-to-bucket`

*Concat 오디오 업로드*

컨캣 오디오를 S3 버킷에 저장하고 메타데이터를 DB에 저장하는 api입니다.<br><br>매개변수 : <br>- 프로젝트 id, <br>- 오디오 파일

> Body parameter

```yaml
file: string

```

<h3 id="uploadconcat-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|projectId|query|integer(int64)|true|none|
|body|body|object|false|none|
|» file|body|string(binary)|true|none|

> Example responses

> 200 Response

<h3 id="uploadconcat-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|[ResponseDto](#schemaresponsedto)|

<aside class="success">
This operation does not require authentication
</aside>

## downloadGeneratedAudio

<a id="opIddownloadGeneratedAudio"></a>

> Code samples

```shell
# You can also use wget
curl -X GET http://api.popomance.kr:8080/tts/download-generated-audio-from-bucket?bucketRoute=string \
  -H 'Accept: */*'

```

```javascript

const headers = {
  'Accept':'*/*'
};

fetch('http://api.popomance.kr:8080/tts/download-generated-audio-from-bucket?bucketRoute=string',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /tts/download-generated-audio-from-bucket`

*버킷에 있는 오디오 다운로드*

오디오를 S3 버킷으로부터 다운로드 받을수 있는 URL을 제공하는 API 입니다.<br><br>매개변수:<br>- 버킷 경로

<h3 id="downloadgeneratedaudio-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|bucketRoute|query|string|true|none|

> Example responses

> 200 Response

<h3 id="downloadgeneratedaudio-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|[ResponseDto](#schemaresponsedto)|

<aside class="success">
This operation does not require authentication
</aside>

## downloadGeneratedAudio_1

<a id="opIddownloadGeneratedAudio_1"></a>

> Code samples

```shell
# You can also use wget
curl -X GET http://api.popomance.kr:8080/vc/download-to-generate-audio-from-bucket?bucketRoute=string \
  -H 'Accept: */*'

```

```javascript

const headers = {
  'Accept':'*/*'
};

fetch('http://api.popomance.kr:8080/vc/download-to-generate-audio-from-bucket?bucketRoute=string',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /vc/download-to-generate-audio-from-bucket`

*버킷에 있는 오디오 다운로드*

오디오를 S3 버킷으로부터 다운로드 받을수 있는 URL을 제공하는 API 입니다.<br><br>매개변수:<br>- 버킷 경로

<h3 id="downloadgeneratedaudio_1-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|bucketRoute|query|string|true|none|

> Example responses

> 200 Response

<h3 id="downloadgeneratedaudio_1-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|[ResponseDto](#schemaresponsedto)|

<aside class="success">
This operation does not require authentication
</aside>

## downloadGeneratedAudio_2

<a id="opIddownloadGeneratedAudio_2"></a>

> Code samples

```shell
# You can also use wget
curl -X GET http://api.popomance.kr:8080/vc/download-generated-audio-from-bucket?bucketRoute=string \
  -H 'Accept: */*'

```

```javascript

const headers = {
  'Accept':'*/*'
};

fetch('http://api.popomance.kr:8080/vc/download-generated-audio-from-bucket?bucketRoute=string',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /vc/download-generated-audio-from-bucket`

*버킷에 있는 오디오 다운로드*

오디오를 S3 버킷으로부터 다운로드 받을수 있는 URL을 제공하는 API 입니다.<br><br>매개변수:<br>- 버킷 경로

<h3 id="downloadgeneratedaudio_2-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|bucketRoute|query|string|true|none|

> Example responses

> 200 Response

<h3 id="downloadgeneratedaudio_2-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|[ResponseDto](#schemaresponsedto)|

<aside class="success">
This operation does not require authentication
</aside>

## downloadGeneratedAudio_3

<a id="opIddownloadGeneratedAudio_3"></a>

> Code samples

```shell
# You can also use wget
curl -X GET http://api.popomance.kr:8080/concat/download-generated-audio-from-bucket?bucketRoute=string \
  -H 'Accept: */*'

```

```javascript

const headers = {
  'Accept':'*/*'
};

fetch('http://api.popomance.kr:8080/concat/download-generated-audio-from-bucket?bucketRoute=string',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /concat/download-generated-audio-from-bucket`

*버킷에 있는 오디오 다운로드*

오디오를 S3 버킷으로부터 다운로드 받을수 있는 URL을 제공하는 API 입니다.<br><br>매개변수:<br>- 버킷 경로

<h3 id="downloadgeneratedaudio_3-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|bucketRoute|query|string|true|none|

> Example responses

> 200 Response

<h3 id="downloadgeneratedaudio_3-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|[ResponseDto](#schemaresponsedto)|

<aside class="success">
This operation does not require authentication
</aside>

## downloadGeneratedAudio_4

<a id="opIddownloadGeneratedAudio_4"></a>

> Code samples

```shell
# You can also use wget
curl -X GET http://api.popomance.kr:8080/concat/download-to-generate-audio-from-bucket?bucketRoute=string \
  -H 'Accept: */*'

```

```javascript

const headers = {
  'Accept':'*/*'
};

fetch('http://api.popomance.kr:8080/concat/download-to-generate-audio-from-bucket?bucketRoute=string',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /concat/download-to-generate-audio-from-bucket`

*버킷에 있는 오디오 다운로드*

오디오를 S3 버킷으로부터 다운로드 받을수 있는 URL을 제공하는 API 입니다.<br><br>매개변수:<br>- 버킷 경로

<h3 id="downloadgeneratedaudio_4-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|bucketRoute|query|string|true|none|

> Example responses

> 200 Response

<h3 id="downloadgeneratedaudio_4-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|[ResponseDto](#schemaresponsedto)|

<aside class="success">
This operation does not require authentication
</aside>

<h1 id="aipark-api-tts-controller-_team-_api">tts-controller-_team-_api</h1>

## convertSingleText

<a id="opIdconvertSingleText"></a>

> Code samples

```shell
# You can also use wget
curl -X POST http://api.popomance.kr:8080/tts/convert/single?id=0 \
  -H 'Accept: */*'

```

```javascript

const headers = {
  'Accept':'*/*'
};

fetch('http://api.popomance.kr:8080/tts/convert/single?id=0',
{
  method: 'POST',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`POST /tts/convert/single`

*Convert Single Text to WAV*

Google TTS API를 사용하여 개별 텍스트를 WAV 형식으로 변환합니다.

매개변수:
- text: 변환할 텍스트 (예: '안녕하세요')
- languageCode: 언어 코드 (예: 'ko-KR', 'en-US')
- gender: 성별 ('male', 'female', 'neutral')
- speed: 말하는 속도 (범위: 0.25 ~ 4.0, 기본값: 1.0)
- volume: 볼륨 조정 (범위: -96.0 ~ 16.0 데시벨, 기본값: 0.0)
- pitch: 음의 높낮이 (범위: -20.0 ~ 20.0, 기본값: 0.0)
- id: 변환하고자 하는 tts_Detail ID 값 (예: 1, 2, 3, ...)

<h3 id="convertsingletext-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|query|integer(int64)|true|none|

> Example responses

> 200 Response

<h3 id="convertsingletext-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|WAV 파일 변환 성공|[ResponseDto](#schemaresponsedto)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|언어 불일치 오류|[ResponseDto](#schemaresponsedto)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|서버 오류 발생|[ResponseDto](#schemaresponsedto)|

<aside class="success">
This operation does not require authentication
</aside>

## convertBatchTexts

<a id="opIdconvertBatchTexts"></a>

> Code samples

```shell
# You can also use wget
curl -X POST http://api.popomance.kr:8080/tts/convert/batch \
  -H 'Content-Type: application/json' \
  -H 'Accept: */*'

```

```javascript
const inputBody = '[
  0
]';
const headers = {
  'Content-Type':'application/json',
  'Accept':'*/*'
};

fetch('http://api.popomance.kr:8080/tts/convert/batch',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`POST /tts/convert/batch`

*Convert Batch of Texts to WAV*

여러 텍스트 세그먼트를 한꺼번에 WAV 형식으로 변환합니다.

매개변수:
- text: 변환할 텍스트 세그먼트 리스트 (JSON 형식)
  - text: 변환할 텍스트 (예: 'Hello')
  - languageCode: 언어 코드 (예: 'en-US')
  - gender: 성별 ('male', 'female', 'neutral')
  - speed: 말하는 속도 (범위: 0.25 ~ 4.0, 기본값: 1.0)
  - volume: 볼륨 조정 (범위: -96.0 ~ 16.0 데시벨, 기본값: 0.0)
  - pitch: 음의 높낮이 (범위: -20.0 ~ 20.0, 기본값: 0.0)

> Body parameter

```json
[
  0
]
```

<h3 id="convertbatchtexts-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|array[integer]|true|none|

> Example responses

> 200 Response

<h3 id="convertbatchtexts-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|WAV 파일 변환 성공|[ResponseDto](#schemaresponsedto)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|언어 불일치 오류|[ResponseDto](#schemaresponsedto)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|서버 오류 발생|[ResponseDto](#schemaresponsedto)|

<aside class="success">
This operation does not require authentication
</aside>

## downloadFile

<a id="opIddownloadFile"></a>

> Code samples

```shell
# You can also use wget
curl -X GET http://api.popomance.kr:8080/tts/converted/download?path=string \
  -H 'Accept: */*'

```

```javascript

const headers = {
  'Accept':'*/*'
};

fetch('http://api.popomance.kr:8080/tts/converted/download?path=string',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /tts/converted/download`

*Download Converted WAV File*

변환된 WAV 파일을 다운로드합니다.

매개변수:
- path: 다운로드할 WAV 파일의 경로 (예: 'output/tts_output_123456.wav')

<h3 id="downloadfile-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|path|query|string|true|none|

> Example responses

> 200 Response

<h3 id="downloadfile-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|WAV 파일 다운로드 성공|string|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|파일을 찾을 수 없음|string|

<aside class="success">
This operation does not require authentication
</aside>

<h1 id="aipark-api-concat-controller-_team-_api">concat-controller-_team-_api</h1>

## convertMultipleAudios

<a id="opIdconvertMultipleAudios"></a>

> Code samples

```shell
# You can also use wget
curl -X POST http://api.popomance.kr:8080/concat/convert/batch \
  -H 'Content-Type: multipart/form-data' \
  -H 'Accept: */*'

```

```javascript
const inputBody = '{
  "sourceAudios": [
    "string"
  ]
}';
const headers = {
  'Content-Type':'multipart/form-data',
  'Accept':'*/*'
};

fetch('http://api.popomance.kr:8080/concat/convert/batch',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`POST /concat/convert/batch`

> Body parameter

```yaml
sourceAudios:
  - string

```

<h3 id="convertmultipleaudios-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|object|false|none|
|» sourceAudios|body|[string]|true|none|

> Example responses

> 200 Response

<h3 id="convertmultipleaudios-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|[ResponseDto](#schemaresponsedto)|

<aside class="success">
This operation does not require authentication
</aside>

<h1 id="aipark-api-test-controller">test-controller</h1>

## testSuccess

<a id="opIdtestSuccess"></a>

> Code samples

```shell
# You can also use wget
curl -X GET http://api.popomance.kr:8080/test/success \
  -H 'Accept: */*'

```

```javascript

const headers = {
  'Accept':'*/*'
};

fetch('http://api.popomance.kr:8080/test/success',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /test/success`

> Example responses

> 200 Response

<h3 id="testsuccess-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|[ResponseDto](#schemaresponsedto)|

<aside class="success">
This operation does not require authentication
</aside>

## testFail

<a id="opIdtestFail"></a>

> Code samples

```shell
# You can also use wget
curl -X GET http://api.popomance.kr:8080/test/fail?Do%20Would%20you%20like%20to%20throw%20an%20exception%3F=string \
  -H 'Accept: */*'

```

```javascript

const headers = {
  'Accept':'*/*'
};

fetch('http://api.popomance.kr:8080/test/fail?Do%20Would%20you%20like%20to%20throw%20an%20exception%3F=string',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /test/fail`

<h3 id="testfail-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|Do Would you like to throw an exception?|query|string|true|none|

> Example responses

> 200 Response

<h3 id="testfail-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|[ResponseDto](#schemaresponsedto)|

<aside class="success">
This operation does not require authentication
</aside>

# Schemas

<h2 id="tocS_VCSaveDto">VCSaveDto</h2>
<!-- backwards compatibility -->
<a id="schemavcsavedto"></a>
<a id="schema_VCSaveDto"></a>
<a id="tocSvcsavedto"></a>
<a id="tocsvcsavedto"></a>

```json
{
  "id": 0
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|integer(int64)|false|none|none|

<h2 id="tocS_ResponseDto">ResponseDto</h2>
<!-- backwards compatibility -->
<a id="schemaresponsedto"></a>
<a id="schema_ResponseDto"></a>
<a id="tocSresponsedto"></a>
<a id="tocsresponsedto"></a>

```json
{
  "success": true,
  "code": 0,
  "message": "string"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|success|boolean|false|none|none|
|code|integer(int32)|false|none|none|
|message|string|false|none|none|

<h2 id="tocS_TTSDetailDto">TTSDetailDto</h2>
<!-- backwards compatibility -->
<a id="schemattsdetaildto"></a>
<a id="schema_TTSDetailDto"></a>
<a id="tocSttsdetaildto"></a>
<a id="tocsttsdetaildto"></a>

```json
{
  "id": 0,
  "unitScript": "string",
  "unitSpeed": 0.1,
  "unitPitch": 0.1,
  "unitVolume": 0.1,
  "isDeleted": true,
  "unitSequence": 0,
  "voiceStyleId": 0,
  "projectId": 0
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|integer(int64)|false|none|none|
|unitScript|string|false|none|none|
|unitSpeed|number(float)|false|none|none|
|unitPitch|number(float)|false|none|none|
|unitVolume|number(float)|false|none|none|
|isDeleted|boolean|false|none|none|
|unitSequence|integer(int32)|false|none|none|
|voiceStyleId|integer(int64)|false|none|none|
|projectId|integer(int64)|false|none|none|

<h2 id="tocS_TTSSaveDto">TTSSaveDto</h2>
<!-- backwards compatibility -->
<a id="schemattssavedto"></a>
<a id="schema_TTSSaveDto"></a>
<a id="tocSttssavedto"></a>
<a id="tocsttssavedto"></a>

```json
{
  "projectId": 0,
  "projectName": "string",
  "voiceStyleId": 0,
  "fullScript": "string",
  "globalSpeed": 0.1,
  "globalPitch": 0.1,
  "globalVolume": 0.1,
  "apiStatus": "IN_PROGRESS",
  "ttsDetails": [
    {
      "id": 0,
      "unitScript": "string",
      "unitSpeed": 0.1,
      "unitPitch": 0.1,
      "unitVolume": 0.1,
      "isDeleted": true,
      "unitSequence": 0,
      "voiceStyleId": 0,
      "projectId": 0
    }
  ]
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|projectId|integer(int64)|false|none|none|
|projectName|string|false|none|none|
|voiceStyleId|integer(int64)|false|none|none|
|fullScript|string|false|none|none|
|globalSpeed|number(float)|false|none|none|
|globalPitch|number(float)|false|none|none|
|globalVolume|number(float)|false|none|none|
|apiStatus|string|false|none|none|
|ttsDetails|[[TTSDetailDto](#schemattsdetaildto)]|false|none|none|

#### Enumerated Values

|Property|Value|
|---|---|
|apiStatus|IN_PROGRESS|
|apiStatus|SUCCESS|
|apiStatus|FAILURE|
|apiStatus|PARTIAL_FAILURE|
|apiStatus|CANCELLED|
|apiStatus|NOT_STARTED|

