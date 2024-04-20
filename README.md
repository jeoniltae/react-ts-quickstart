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

## JSX 주의 사항

JSX(JavaScript XML)는 HTML처럼 보이지만 실제로는 자바스크립트 확장입니다. 쉽게 말해 JSX는 자바스크립트 코드로 변환되어 실행된다는 뜻입니다.
JSX의 사용이 필수는 아니지만 JSX는 UI를 표현하는데 적합해서 웹 디자이너나 웹 퍼블리셔들과 협업하기가 편리합니다. 그리고 JSX는 자바스크립트 코드이므로 자바스크립트 언어라는 의미가 변형되지 않으면서도 애플리케이션 화면의 구조를 시각화하여 표현할 수 있습니다. 이러한 장점으로 인해 대부분의 개발자가 JSX를 사용하고 있으므로 JSX를 사용하기를 권장합니다.

**1. 요소의 Attribute는 카멜 표기법을 준수해야 합니다.**

- JSX는 자바스크립트 언어이므로 대소문자를 구벼랍니다. 따라서 css-style과 같이 케밥 표기법을 사용하지 않습니다. 예를 들어 자바스크립트 코드에서는 onclick처럼 이벤트를 모두 소문자로 작성하지만 리액트에서는 onClick과 같이 새로운 단어가 연결되면 첫 글자를 대문자로 표기합니다.

> **파스칼 표기법**
> 첫 문자를 대문자로 표현하고 새로운 단어가 시작할 때마다 대문자로 시작합니다. 주로 Java, C#, C++과 같은 프로그래밍 언어에서 클래스 같은 타입을 선언할 때 사용합니다. 예) PascalCasing
> **카멜 표기법**
> 첫 문자를 소문자로 표현하고 새로운 단어가 시작할 때마다 대문자로 시작합니다. 마치 낙타의 등 모양처럼 보인다고 해서 이름 붙은 표기법입니다. 주로 객체, 변수, 인스턴스 등의 이름을 지정할 때 사용하는 표기법입니다. 예) camelCasing
> **케밥 표기법**
> 모두 소문자를 사용하며 새로운 단어가 시작할 때마다 하이픈(-) 기호를 붙입니다. 대소문자를 구별하지 않는 환경에서 주로 사용합니다. 예) kebob-casing
> **스네이크 표기법**
> 모두 소문자를 사용하며 새로운 단어가 시작할 때마다 언더스코어(\_) 기호를 붙입니다. 예) snake_casing

**2. 속성명이 DOM API 스펙에 기반을 두고 있습니다.**

- HTML에서는 class 속성을 사용하는데 JSX에서는 왜 className 속성을 사용할까요? HTML에서의 CSS클래스 지정 방법과 자바스크립트에서의 CSS 클래스 지정 방법을 비교해보면 그 이유를 알 수 있습니다,

```javascript
// HTML에서의 CSS 클래스 지정
<div id="a" class="test"></div>

// javascript 코드에서의 CSS 클래스 지정
document.getElementById('a').className = 'test';

// JSX에서의 정적 CSS 클래스 지정
<div id="a" className="test"></div>

// JSX에서의 동적 CSS 클래스 지정
let clsName = 'test';
...
<div id="a" className={clsName}></div>
```

- 앞의 코드를 살펴보면 HTML에서는 class라는 속성으로 CSS 클래스명을 지정하지만, 자바스크립트 코드에서는 className 속성으로 클래스명을 지정합니다. JSX는 HTML처럼 보이지만 실제로는 자바스크립트 코드이기 때문에 className 속성으로 사용해야만 합니다.

**3. 보간법{}을 사용할 때는 표현식을 사용해야 합니다.**

- {} 안에는 값, 메서드의 리턴값, 속성 등의 표현식을 작성할 수 있지만 문(statement)을 작성할 수는 없습니다. **{}는 무엇인가 데이터를 UI로 렌더링하려는 것이 목적이므로 반드시 값(리턴값)이 있어야 합니다.** 예를 들어 if문은 리턴값이 없으므로 사용할 수 없습니다. 대신에 다음과 같이 삼항 연산식은 리턴값이 있으므로 사용할 수 있습니다.

```javascript
// a가 true면 b를 리턴, false면 c를 리턴함
{
  a ? b : c;
}
```

for문도 리턴값이 없으므로 {}내부에 작성할 수 없습니다. 배열 데이터를 이용해 반복적으로 요소를 렌더링하려면 배열 객체의 map()과 같은 메서드를 사용하거나 미리 반복 렌더링한 결과 객체를 {}내부에 배치합니다.

**4. {}내에 보간된 HTML 문자열은 인코딩됩니다.**

- {}내부에 배치한 표현식에 의해 리턴되는 값이 문자열인경우, 모두 HTML 인코딩된다는 점을 주의해야 합니다.

```javascript
let msg = "<i>World</i>";
// 출력 결과: &lt;i&gt;World&lt;/igt;
```

- 브라우저 화면에서 <i></i>태그의 문자열이 그대로 출려됐습니다. 그 이유는 웹 애플리케이션에서 흔히 발생하는 XSS(Cross Site Scripting) 같은 공격에 대비하기 위해서 <i>가 `&lt;i&gt;`로 HTML 인코딩됐기 때문입니다.
- 만일 HTML마크업 형태의 값을 보간하려고 한다면 두 가지 방법을 사용할 수 있습니다. 첫 번째 방법은 dangerouslySetInnerHTML 특성을 사용하는 것입니다.

```html
<!-- {msg}를 대신하여 다음 코드를 적용합니다. -->
<span dangerouslySetInnerHTML="{{" __html: msg }} />
```

- 두 번째 방법은 JSX가 XSS 공격에 안전하므로 HTML 문자열 대신 JSX를 사용하는 것입니다.

```javascript
// let msg = '<i>World</i>';
let msg = <i>World</i>;
```
