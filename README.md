# react-ts-quickstart

## Vite 프로젝트에서 절대 경로를 사용하는 방법

Vite로 생성된 프로젝트에서 절대 경로를 사용하려면 약간의 설정이 필요함.

1. tsconfig.json에 아래의 내용을 추가

```json
{
    "compilerOptions": {
        "baseUrl": ".",
        "paths": { "@/*": ["./src/*"] },
        ...
    }
}
```

2. npm install path 명령어를 수행하여 path 패키지를 추가한 후 vite.config.ts 파일에 아래 내용 추가

```javascript
import path from "path";
export default defineConfig({
  resolve: {
    alias: [{ find: "@", replacement: path.resolve("src") }],
  },
});
```

이제부터는 절대 경로를 사용할 수 있습니다. App 컴포넌트를 임포트하는 코드를 절대 경로로 표현하면 다음과 같습니다.

```javascript
// import App from "./App";
// @가 src 디렉토리를 나타냅니다.
import App from "@/App";
```
