# Welcome to Remix Starter Kit!

- About
- React Remix + Vite + pnpm + husky(gitmoji) + ESLint(Live)

# 이하 마크다운 문서 작성중...

1. pnpm 설치 및 react remix 설치

ts-node 전역 설치
$ npm install -g ts-node

pnpm 전역 설치
$ npm install -g pnpm --force

using a shorter alias .zshrc, .bashrc

alias pn=pnpm
$ source ~/.zshrc
$ pn --version
9.4.0
react remix install
$ npx create-remix@latest --template remix-run/remix/templates/express

```
Need to install the following packages:
create-remix@2.10.3
Ok to proceed? (y) // 👈 y
dir Where should we create your new project?
./my-project-name // 👈 input
git Initialize a new git repository? (recommended)
○ Yes  ● No // 👈 No
```

pnpm 으로 의존성 설치

$ pn install

.eslintrc.cjs 에서 실행환경에 node 항목 추가

Buffer, process 등 node js 메서드 사용할 때 에러 구문을 표시 하지 않게 된다

```
...
 env: {
    browser: true,
    commonjs: true,
    node: true, // Node.js 환경 추가
    es6: true,
  },
  ...
```

2. .editorconfig 설정

```
# @reference https://github.com/airbnb/javascript/blob/master/.editorconfig

root = true # 가장 상위에 설정한 설정 파일임을 나타냄, EditorConfig 파일이 프로젝트 디렉토리 최상위에 위치함을 의미한다
[*] # 모든 파일 적용
indent_style = space # 들여쓰기에 스페이스를 사용
indent_size = 2 # 들여쓰기 크기를 2칸
end_of_line = lf # 줄 끝 문자는 LF(line feed)로 설정
trim_trailing_whitespace = true # 줄바꿈 전에 불필요한 공백이 있는 경우 자동으로 제거
insert_final_newline = true # 파일의 끝에 마지막 줄은 항상 새로운 줄을 추가하도록 함

[*.{js,ts,tsx,css,scss,sass,json,yml,html}] # 해당 파일
charset = utf-8 # 파일 문자 인코딩 UTF-8
max_line_length = off # 코드 라인의 최대 길이에 대한 설정을 off로 하여, 길이 제한을 두지 않도록 함

[*.md] # 해당 파일
indent_size = false # 들여쓰기 미지정
trim_trailing_whitespace = false # 줄바꿈 전에 불필요한 공백이 있는 경우 자동으로 제거
```

3. .nvmrc 설정
   v22.5.1

4. .gitignore 설정

```
# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.
node_modules
/.cache
/build
.env
/.history
```

5. .gitattributes 설정

줄바꿈 LF, CRLF 에 대해 알기
LF: Line Feed
\n

리눅스에서 사용

CRLF: Carriage Return Line Feed
\r

윈도우에서 사용

쉽게 기억하기
타자기에서 왼쪽 시작점으로 동작시키기 위한 부품으로 캐리지를 사용하였고, 캐리지 리턴으로 부르게 된다

MS-DOS에서 줄바꿈 방식을 CRLF로 설정하였다

CRLF를 수평으로 이해하면 쉽다

20세기 타자기는 왼쪽으로 이동하는 캐리지에, 새로운 줄로 이동되는 기능이 추가되었다

LF 수직으로 이해하면 쉽다

OS 마다 줄바꿈을 다르게 설정하기
.git 저장소에는 모든 이력을 가지고 있고 그 이력은 key, value 형태의 데이터 베이스이다

git 입장에서는 문자열이 변경 되었으므로 같은 소스코드를 mac, windows에서 작업하는 경우

결과물이 동일 하더라도 코드 이력은 계속 변경된 것으로 간주한다.

변경이 간주되는 경우 실제 코드는 변경된 것이 없는데 로그가 바뀌거나 merge시 충돌이 날 수 있다.

따라서 로컬 환경에서 git config 설정을 제공하고있다

git config --global core.autocrlf [true | false | input]

문제가 되는 점
git config 는 로컬에서 설정할 수 있으므로, OS가 다른 환경에서 개발하는 경우
각자의 로컬에서 설정을 매번 변경해 주어야 한다는 것이다.

따라서 이 문제를 단순하게 해결할 수 있는 방법이 .gitattrubutes 설정인 것이다

이 파일은 OS를 벗어나 git 에게 파일 내부의 설정 값들을 표현하는 것만 이야기한다

따라서 git config 와 같은 명령어를 사용하여 OS 별로 변경하지 않아도 된다

.gitattributes 사용
줄바꿈 설정
.gitattributes 를 저장소에 커밋하면 다른 클라이언트는 별도의 설정이 필요없다

- text=auto eol=lf 를 사용하면

- 모든 파일을 대상으로 한다

text 파일 내용을 분석하고 일부 휴리스틱(heuristic)을 사용하여 파일이 텍스트 파일로 여겨지는지 여부를 결정한다

auto 이때, 텍스트 파일로 판단된다면

eol=lf 줄끝 마감을 LF로 사용한다

# Auto detect text files and perform LF normalization

- text=auto eol=lf
  부가적인 언어분석 설정 명시(선택사항)
  github의 경우 자동으로 파일들을 분석하여 어떤 언어를 사용 하였는지 볼 수 있도록 제공하고 있다

예를 들어 저장소 목록에서

Open image-20231208-073738.png

이렇게 특정 저장소를 선택하여 Languages 항목을 보면, 어떤 언어로 이루어져있는지 표시가 된다

Open image-20231208-073913.png

Languages
그러나 라이브러리의 덩치가 크면 그러한 파일들이 대부분의 코드를 차지하게 됨으로써 다른 개발언어로

표시되는 경우가 있고

위 Language 그림 표시 처럼 HTML에 대한 코드가 너무 많은 경우 HTML 프로젝트로 표시되는 경우가 있다

이처럼 원하지 않는 언어로 표시되는 문제를 해결하기 위해 github에서는 .gitattributes 파일로

언어 설정을 도와주고있다.

속성

설명

사용 예

속성

설명

사용 예

linguist-detectable

언어 표시HTML감지를 제거할 수 있다

\*.html linguist-detectable=false

linguist-vendor

3rd 파티 설치 모듈로 설정함

/.yarn/\*\* linguist-vendored

linguist-generated

자동 생성 도구에 의해 생성됨을 설정

/.pnp.\* binary linguist-generated

binary

이진 파일로 설정함

/.yarn/releases/\* binary

yarn berry에서 설정
yarn berry에서 모듈을 pnp로 사용하게 되므로 아래와 같이 설정하도록 한다

```
# 파일이 텍스트인지 자동으로 감지하고, 줄바꿈 형식을 LF로 사용한다
*                     text=auto eol=lf
# git 언어표시에서 3rd파티 설치 모듈로 인식한다
/.yarn/**             linguist-vendored
# git 언어표시에서 이진 파일로 설정
/.yarn/release/*      binary
# git 언어표시에서 이진 파일로 설정
/.yarn/plugins/**/*   binary
# git 언어표시에서 자동 생성 도구에 의해 언어가 설정된다
/.pnp.* binary        linguist-generated
```

pnpm 설정

```
# 파일이 텍스트인지 자동으로 감지하고, 줄바꿈 형식을 LF로 사용한다
*                     text=auto eol=lf
```

6. .tsconfig.json 설정

```
{
  /** 컴파일 대상 지정 */
  "include": [
    "**/*.ts",
    "**/*.tsx",
    "**/.server/**/*.ts",
    "**/.server/**/*.tsx",
    "**/.client/**/*.ts",
    "**/.client/**/*.tsx"
  ],
  /** 컴파일 예외 목록 */
  "exclude": ["node_modules", "public"],
  /** ts 컴파일러 옵션 */
  "compilerOptions": {
    "lib": ["DOM", "DOM.Iterable", "ES2022", "WebWorker"], // ECMAScript 표준 라이브러리의 목록을 명시적으로 설정함
    "types": ["@remix-run/node", "vite/client"], // TypeScript가 사용할 타입 정의 파일을 명시함. 이 옵션은 TypeScript가 특정 패키지의 타입 정의를 자동으로 포함하도록 함
    "isolatedModules": true, // 각 파일을 독립적인 모듈로 취급하고, 파일 간에 전역 스코프를 공유하지 않도록 함. 파일을 모듈처럼 독립적으로 컴파일하게 됨
    "esModuleInterop": true, // ES모듈에서 CommonJS모듈을 가져올때 import문을 사용하여 가져올 수 있다. 호환성을 높히고 모듈 간의 이전 코드를 더 쉽게 업그레이드할 수 있다
    "jsx": "react-jsx", // JSX 코드를 React.createElement 함수 호출로 변환
    "module": "ESNext", // 파일간 import 문법 commonjs 는 require, es2015, esnext는 import로 사용. IE 호환성의 경우 es5의 commonjs 사용, BigInt함수나 타입등 신버전 js는 esnext로 사용
    "moduleResolution": "Bundler", // 모듈 해석방식
    "resolveJsonModule": true, // json 파일을 모듈로 가져올 수 있도록 함
    "target": "ES2022", // TypeScript가 컴파일된 JavaScript 코드의 ECMAScript(ES) 버전을 설정. ES2022는 최신 JavaScript 기능을 포함하며, 새로운 문법과 현대적인 API를 지원한다
    "strict": true,
    /** strict 모드 (아래 옵션이 모두 활성화 된다) */
    // noImplicitAny
    // noImplicitThis
    // alwaysStrict
    // strictBindCallApply
    // strictFunctionTypes
    // strictNullChecks
    // strictPropertyInitialization
    "allowJs": true, // js 파일을 ts에서 import 하여 사용
    "skipLibCheck": true, // 타입 선언 파일(*.d.ts)검사를 스킵, 외부 라이브러리 타입 선언 검사를 생략한다
    "forceConsistentCasingInFileNames": true, // 파일이름의 대소문자의 일관성을 강제함
    "baseUrl": ".", // 상대 모듈 경로를 해결할 때 사용되는 기본 경로, src에서 기준 디렉토리가 된다
    "paths": {
      // 모듈을 가져올 때 상대 경로가 아닌 별칭을 사용할 수 있다, import from './app/some/path' 를 import from '~/some/path'로 가져올 수 있다
      "~/*": ["./app/*"]
    },
    // Vite takes care of building everything, not tsc.
    "noEmit": true, // 컴파일러가 실행 될때 .js파일을 생성하지 않도록 한다. 오직 타입 체크만 수행하여 빠른 빌드 및 타입 검사만 진행한다
    "removeComments": true // 컴파일시 주석제거
  }
}
```

7. .prettierrc, .prettierignore 설정
   .prettierrc

```
{
  "printWidth": 80,
  "trailingComma": "all",
  "tabWidth": 2,
  "semi": true,
  "singleQuote": true,
  "quoteProps": "as-needed"
}
```

.prettierignore

```
build
```

8. package.json 설정

```
{
...
  "type": "module",
  "packageManager": "pnpm@9.4.0",
...
}
```

9. ESLint 설정 (기본)

### react remix template로 설치된 기본 eslintrc.cjs 에서 rules에 다음을 추가

- 가장 기본이 되는 룰이며, ERROR 단계를 WARNING 단계로 다운그레이드 하기 위함
- .eslintrc.cjs

```
const OFF = 0;
const WARNING = 1;
const ERROR = 2;
/** @type {import('eslint').Linter.Config} */
module.exports = {
  ...
  rules: {
    /**
     * @custom
     * @description 수동 룰
     */
    'no-console': WARNING, // console.log 사용여부
    'no-unused-vars': WARNING, // 사용하지 않는 변수
  },
  ...
}
```

10. .vscode/settings.json 과 extension.json

- extensions.json

```
{
  "recommendations": ["dbaeumer.vscode-eslint", "esbenp.prettier-vscode"]
}
```

- settings.json

```
{
  /** 프롬프트 */
  "typescript.enablePromptUseWorkspaceTsdk": true, // 작업 공간 내에서 사용 가능한 ts sdk를 권고
  /** 검색 제외 파일 */
  "search.exclude": {
    "public": true
  },
  /** 에디터 설정 */
  "editor.defaultFormatter": "esbenp.prettier-vscode", // 모든 파일 형식의 기본 포맷터로 prettier 사용
  "[json]": {
    // .json
    "editor.quickSuggestions": {
      "strings": true // 문자열 완성 사용
    },
    "editor.suggest.insertMode": "replace", // 제안된 문자열을 기존 코드를 대체
    "gitlens.codeLens.scopes": ["document"] // gitlens 코드 분석을 문서 영역에만 적용
  },
  "editor.tabSize": 2, // 탭 크기
  "editor.formatOnSave": true, // 파일 저장 시 자동으로 코드 포캣을 적용
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact"
  ],
  // =================== 선택적 옵션 =================== //
  /** ui 설정 */
  "workbench.colorCustomizations": {
    "tab.activeBackground": "#505050", // 활성화된 탭 배경색 변경
    "tab.activeBorder": "#b4b4b4" // 활성화된 탭 아래 보더 색상 변경
  },
  "i18n-ally.localesPaths": ["public/locales"],
}
```

11. gitmoji 설정

### husky 사용을 위한 준비 (준비가 안된경우 실행시 에러가 발생하므로 반드시 준비해야 함)

- jsonc-parser 를 미리 설치해 둔다
  `$ pn add -D jsonc-parser`
- .vscode/settings.json 파일을 만들어 둔다
- gitmoji 설정을 위해서 다음의 폴더 구조와 스크립트를 미리 준비한다 (빈파일 이어도 상관없다)
  - 상위 항목에서 설정했던 .vscode/settings.json 준비를 권장한다
    ├── ./commitlint.config.js
    ├── ./scripts
    ├── ./scripts/gitmoji
    ├── ./scripts/gitmoji/allowed-gitmojis.json
    └── ./scripts/gitmoji/gitmoji.js
- scripts/gitmoji/allowed-gitmojis.json

```
[
  {
    "emoji": "✨",
    "description": "새로운 기능 추가 / 새로운 파일 추가",
    "name": "feat"
  },
  {
    "emoji": "🐛",
    "description": "버그 수정",
    "name": "fix"
  },
  {
    "emoji": "📝",
    "description": ".md 파일이나 주석에 한정한 수정",
    "name": "docs"
  },
  {
    "emoji": "🌐",
    "description": "번역 관련 업데이트",
    "name": "i18n"
  },
  {
    "emoji": "🎨",
    "description": "코드 포맷팅, 세미콜론 누락, 코드 변경이 없는 경우",
    "name": "style"
  },
  {
    "emoji": "♻️",
    "description": "코드의 구조 및 형태를 개선하는 작업 / 결과물이 기존과 동일해야 함",
    "name": "refactor"
  },
  {
    "emoji": "🔖",
    "description": "릴리즈 태깅, Changelog 작성",
    "name": "release"
  },
  {
    "emoji": "💡",
    "description": "그 외 / 패키지 버전 업데이트",
    "name": "chore"
  }
]
```

- scripts/gitmoji/gitmoji.js
  - ESLint 설정 (기본) 을 누락한 경우, 이 파일에서 ESLint 에러가 출력 될 수 있다

```
/**
 *
 * Gitmoji를 적용하기 위한 환경설정 파일들을 자동으로 업데이트합니다.
 * 업데이트되는 파일:
 * - .gitmojirc.json
 * - .vscode/settings.json
 * - commitlint.config.js
 */
import { readFileSync, writeFile } from 'fs';
import { join } from 'path';
import { inspect } from 'util';
import { applyEdits, modify } from 'jsonc-parser';
/** Gitmoji 타입
 * emoji: string;
 * name: string;
 * description: string;
 */
const GITMOJIRC = {
  autoAdd: false,
  emojiFormat: 'emoji',
  scopePrompt: true,
  messagePrompt: true,
  capitalizeTitle: false,
  gitmojisUrl: '',
};
const file = readFileSync('scripts/gitmoji/allowed-gitmojis.json', 'utf-8');
export const ALLOWED_GITMOJIS = JSON.parse(file);
export function getGitmojisUrl(data) {
  console.log('[gitmoji] Generate gitmojisUrl...');
  const gitmojis = data.map((gitmoji) => ({
    ...gitmoji,
    code: `:${gitmoji.name}:`,
  }));
  const stringified = JSON.stringify({ gitmojis });
  return `data:application/json;base64,${Buffer.from(stringified).toString(
    'base64',
  )}`;
}
export function updateGitmojiRC(data) {
  console.log('[gitmoji] Update ".gitmojirc.json"...');
  const uri = getGitmojisUrl(data);
  const gitmojirc = {
    ...GITMOJIRC,
    gitmojisUrl: uri,
  };
  writeFile(
    join(process.cwd(), '.gitmojirc.json'),
    JSON.stringify(gitmojirc),
    () => {
      console.log('[gitmoji] Update ".gitmojirc.json" success');
    },
  );
}
export function updateCommitLintConfig(data) {
  const filePath = join(process.cwd(), 'commitlint.config.js');
  const EMOJI_CHECK_LIST = Object.fromEntries(
    data.map(({ emoji, name }) => [emoji, name]),
  );
  const MATCH_GITMOJI = new RegExp(
    `(${Array.from(Object.keys(EMOJI_CHECK_LIST)).join('|')})`,
  );
  let configFileContents = readFileSync(filePath, { encoding: 'utf-8' });
  configFileContents = configFileContents
    .replace(/const MATCH_GITMOJI.*;/, `const MATCH_GITMOJI=${MATCH_GITMOJI};`)
    .replace(
      /const EMOJI_CHECK_LIST.*;/,
      `const EMOJI_CHECK_LIST=${inspect(EMOJI_CHECK_LIST, {
        compact: true,
        breakLength: Infinity,
      })};`, // replace할 단어 검출하는 정규식이 줄바꿈에 대응하지 않아 object가 줄바꿈 되지 않도록 처리함
    );
  writeFile(filePath, configFileContents, () => {
    console.log('[gitmoji] Update "commitlint.config.js" success');
  });
}
export function updateVSCodeSettings(_data) {
  const filePath = join(process.cwd(), '.vscode', 'settings.json');
  const customEmojis = ALLOWED_GITMOJIS.map(({ emoji, name, description }) => ({
    emoji,
    description,
    code: `:${name}:`,
  }));
  let settings = readFileSync(filePath, { encoding: 'utf-8' });
  [
    ['gitmoji.onlyUseCustomEmoji', true],
    ['gitmoji.outputType', 'emoji'],
    ['gitmoji.showEmojiCode', true],
    ['gitmoji.addCustomEmoji', customEmojis],
  ].forEach(([jsonPath, value]) => {
    const config = {};
    settings = applyEdits(
      settings,
      modify(settings, [jsonPath], value, config),
    );
  });
  writeFile(filePath, settings, () => {
    console.log('[gitmoji] Update ".vscode/settings.json" success');
  });
}
updateGitmojiRC(ALLOWED_GITMOJIS);
updateCommitLintConfig(ALLOWED_GITMOJIS);
updateVSCodeSettings(ALLOWED_GITMOJIS);
```

- commitlint.config.js

```
const MATCH_GITMOJI=/(✨|🐛|📝|🌐|🎨|♻️|🔖|💡)/;
const EMOJI_CHECK_LIST = {
  '✨': 'feat',
  '🐛': 'fix',
  '📝': 'docs',
  '🌐': 'i18n',
  '🎨': 'style',
  '♻️': 'refactor',
  '🔖': 'release',
  '💡': 'chore',
};
const matchScope = /(\(([^)]*)\):)?/; // "(scope):" 생략가능
const matchSubject = /.*/; // subject
export default {
  parserPreset: {
    parserOpts: {
      headerPattern: new RegExp(
        `^${MATCH_GITMOJI.source}${matchScope.source}${matchSubject.source}$`,
      ),
      headerCorrespondence: ['emoji', 'scope', 'subject'],
    },
  },
  plugins: [
    {
      rules: {
        'commit-msg-check': (parsed) => {
          const { emoji, scope, subject } = parsed;
          if (emoji === null && scope === null && subject === null) {
            return [
              false,
              "🚨warning: commit message must be in format '✨(scope): subject'",
            ];
          }
          return [true, ''];
        },
        'emoji-check': (parsed, _when, emojisObject) => {
          const { emoji } = parsed;
          if (emoji && !Object.keys(emojisObject).includes(emoji)) {
            return [
              false,
              `🚨warning: emoji must be one of: ${Object.keys(emojisObject)
                .map((emojiType) => `${emojiType} - ${emojisObject[emojiType]}`)
                .join('\n')}`,
            ];
          }
          return [true, ''];
        },
      },
    },
  ],
  rules: {
    'commit-msg-check': [2, 'always'],
    'emoji-check': [2, 'always', EMOJI_CHECK_LIST],
  },
};
```

husky 설치
`$ pn add -D husky`
husky 구동 및 gitmoji 초기화
husky v8 에서 사용했던 방식인 husky install 커맨드를 사용하면 install command is DEPRECATED 가 출력됨

따라서 v9 부터는 husky install 대신 husky 로 입력하면 된다 [Husky Install comment is Deprecated](https://github.com/code100x/cms/issues/630)
package.json 에서 스크립트 작성

```
"scripts": {
    "postinstall": "husky install && gitmoji init",
    "apply-gitmojis": "ts-node scripts/gitmoji/gitmoji.js && gitmoji update",
}
```

husky 실행

`$ pn run postinstall`

gitmoji 스크립트 실행

`$ pn run apply-gitmojis` 12. ESLint 설정 (심화)

모듈 설치

$ pn add -D @tanstack/eslint-plugin-query @typescript-eslint/eslint-plugin @types/eslint @typescript-eslint/parser eslint eslint-config-airbnb-base eslint-config-prettier eslint-plugin-prettier eslint-config-react-app eslint-import-resolver-typescript eslint-plugin-html eslint-plugin-import eslint-plugin-prettier

.eslintrc.cjs

```
/**
 * @const
 * @description `facebook/react` 저장소의 eslint 상수 규칙을 사용함
 * @see {@link https://github.com/facebook/react/blob/main/.eslintrc.js} react eslint
 */
const OFF = 0;
const WARNING = 1;
const ERROR = 2;
const EXTENSIONS = ['.mjs', '.js', '.jsx', '.mts', '.ts', '.tsx', '.d.ts'];
const {
  rules: airbnbBestPracticeRules,
} = require('eslint-config-airbnb-base/rules/best-practices');
const {
  rules: airbnbErrorRules,
} = require('eslint-config-airbnb-base/rules/errors');
const {
  rules: airbnbES6Rules,
} = require('eslint-config-airbnb-base/rules/es6');
const {
  rules: airbnbStyleRules,
} = require('eslint-config-airbnb-base/rules/style');
const {
  rules: airbnbVariableRules,
} = require('eslint-config-airbnb-base/rules/variables');
module.exports = {
  /**
   * @root
   * @description 설정 파일의 위치가 프로젝트 root임을 명시함
   * - ESLint는 Monorepo를 위해 상위 폴더로 올라가도록 설계되어있다
   * - root설정을 통해서 현재 디렉토리보다 상위 디렉토리는 무시한다
   */
  root: true,
  /**
   * @parser
   * @description ts AST(Abstract Syntax Tree) 정적 분석 파싱이 가능하도록 사용하기위한 파서
   */
  parser: '@typescript-eslint/parser',
  /**
   * @env
   * @description 런타임 실행 환경 전역 객체 선언
   */
  env: {
    browser: true, // browser 설정으로 windows 객체를 참조 가능하다
    es2021: true, // ECMAScript 2021 전역변수 사전 정의
    jest: true, // jest 활성화 시, describe, test, expect 함수를 no-undef 규칙에서 예외 시킨다
    commonjs: true,
    es6: true,
    node: true,
  },
  /**
   * @extends
   * @description extends: base 설정 행동 양식
   * - `eslint-config-<name>` 사용
   * - 기본 규칙: CRA의 react-app (import와 마크업/스타일링, 테스트)
   * - 추가 규칙: Airbnb 규칙을 plugin으로 사용
   * @caution
   * - 위에서 부터 순서대로 덮어씌여 지며 재정의 됨
   * - 따라서 prettier의 경우 안전하게 맨 나중에 적용해야 한다
   * @see {@link https://github.com/facebook/create-react-app/tree/main/packages/eslint-config-react-app} create react app eslint rules
   * @see {@link https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb} airbnb eslint rules
   */
  extends: [
    'plugin:import/recommended',
    'eslint:recommended', // * eslint
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    // 'react-app', // * eslint-config-react-app
    // 'react-app/jest', // * @testing-library/jest-dom
    'plugin:@tanstack/eslint-plugin-query/recommended', // * @tanstack/eslint-plugin-query
    'plugin:prettier/recommended', // * prettier, * eslint-config-prettier
  ],
  /**
   * @parseOption
   * @description ESLint 코드 분석 방법
   */
  parserOptions: {
    ecmaVersion: 'latest', // ECMAScript 최신버전 지원 (latest는 현재 2022)
    sourceType: 'module', // 모듈 형식의 코드를 지원
    // project: ['./tsconfig.json'], // `./tsconfig.json` 파일설정을 사용하여 코드 분석 // NOT USE
  },
  /**
   * @rules
   * @description 상세 규칙 옵션
   * @caution extends 옵션을 통해서 가져온 규칙보다 우선된다
   */
  rules: {
    /**
     * @airbnb
     * @description airbnb 룰 적용
     */
    ...airbnbBestPracticeRules,
    ...airbnbErrorRules,
    ...airbnbES6Rules,
    ...airbnbStyleRules,
    ...airbnbVariableRules,
    /**
     * @import
     * @description 불러오기 옵션
     */
    /**
     * 기본 내보내기에 대한 alias경고
     * @see {@link https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-named-as-default.md}
     */
    'import/no-named-as-default': WARNING,
    'import/no-unresolved': [ERROR, { caseSensitive: true }], // 모듈이 실제 존재하는지 확인
    // import할때 EXTENSIONS 리스트의 확장자를 빼도록 함
    'import/extensions': [
      ERROR,
      'ignorePackages',
      EXTENSIONS.reduce((acc, ext) => {
        acc[ext.slice(1)] = 'never';
        return acc;
      }, {}),
    ],
    // import 순서 정의
    'import/order': [
      ERROR,
      {
        groups: [
          'external', // 외부 모듈
          'builtin', // nodejs 내장 모듈
          'object', // 타입스크립트 객체 타입 파일
          'internal', // 프로젝트 내부 파일
          'parent', // 현재 파일의 부모(상위)파일
          'sibling', // 현재 파일 형제(동일경로) 파일
        ],
        // 정의된 패턴의 모듈을 특정 그룹으로 강제함
        pathGroups: [
          {
            pattern: 'react', // 특정 패턴의 모듈로 지정 (react)
            group: 'external', // 외부 모듈 그룹으로 (external)
            position: 'before', // 순서는 맨 앞 (before)
          },
        ],
        // 그룹 지정 제외
        pathGroupsExcludedImportTypes: ['./*.scss'],
        'newlines-between': 'always', // 각 그룹 사이에 항상 개행 문자
        // 각 그룹 내부의 모듈을 알파벳 오름차순으로 정렬, 대소문자 구분 안함
        alphabetize: { order: 'asc', caseInsensitive: true },
      },
    ],
    /**
     * @react
     * @description 리액트 옵션
     */
    'react/prop-types': OFF, // prop-types 라이브러리 사용 권고 해제
    'react/jsx-filename-extension': [ERROR, { extensions: EXTENSIONS }], // jsx 파일 확장자
    /**
     * props를 구조 분해 할당으로 사용할지의 여부
     * @see {@link https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/destructuring-assignment.md}
     */
    'react/destructuring-assignment': [WARNING, 'always'],
    'react/jsx-one-expression-per-line': OFF, // jsx를 `<App>Hello</App>`와 같이 한줄로 표현하지 못하도록 함
    'react/require-default-props': OFF, // prop 유형에 defaultProps 값이 있는지 확인함
    // react 컴포넌트 함수 형태 정의
    'react/function-component-definition': [
      ERROR,
      {
        namedComponents: 'function-declaration', // 이름이 있는 함수 선언문 방식
        unnamedComponents: 'arrow-function', // 이름이 없는 화살표 함수 기호 방식
      },
    ],
    'react/jsx-pascal-case': ERROR,
    /**
     * @custom
     * @description 수동 룰
     */
    'no-console': WARNING, // console.log 사용여부
    'no-unused-vars': WARNING, // 사용하지 않는 변수
    camelcase: OFF, // 카멜케이스 사용 허용
    'no-underscore-dangle': OFF, // 변수에 밑줄 허용 여부 (var _foo;)
    /** 함수나 클래스 메서드에 명시적 반환 유형을 강제하는 여부
     * @see {@link https://gitlab.univ-lorraine.fr/laroche5/r203_depot_a_cloner/-/blob/main/node_modules/@typescript-eslint/eslint-plugin/docs/rules/explicit-function-return-type.md}
     */
    '@typescript-eslint/explicit-function-return-type': OFF,
    /**
     * @prettier
     * @description 충돌을 피하기 위한 옵션
     */
    'max-len': [
      ERROR,
      {
        code: 80,
        ignoreComments: true,
        ignoreTemplateLiterals: true,
        ignoreStrings: true,
        ignoreUrls: true,
        ignorePattern: 'd="([\\s\\S]*?)"',
      },
    ], // 주석은 길이 제한을 없애기로 한다, 만약 소스코드와 주석줄이 포함된 경우 code 수치를 조정하여 해결해야 한다
    'object-curly-newline': [OFF], // eslint 중괄호를 닫기전 줄 바꿈 사용 옵션. prettier와 충돌함, 따라서 prettier 설정을 따르도록 함
    'implicit-arrow-linebreak': [OFF], // eslint 화살표 함수에서 반환 표현식에 대한 줄바꿈 옵션(줄바꿈을 못하게 beside 적용). prettier는 줄바꿈 하므로 설정을 따른다
    'operator-linebreak': [OFF], // eslint 연산자 다음 줄 바꿈 옵션, prettier 설정과 충돌하여 OFF 함
    'function-paren-newline': [OFF], // eslint 함수 매개변수 또는 인수의 괄호 안에 일관된 줄 바꿈을 적용, prettier 설정과 충돌하여 OFF 함
    'no-void': [OFF], // eslint에서 값으로 void 연산자 사용
    indent: [OFF], // 들여쓰기와 공백에대한 계산을 prettier에 맡김
    // 화살표 함수 표현식 규칙
    'no-confusing-arrow': [
      ERROR,
      // allowParens: 매개변수가 단일 인자일 때, 괄호 사용 여부. true 이면 항상 괄호를 사용함
      // onlyOneSimpleParam: 화살표 함수의 매개변수가 하나이상이거나 복잡한 경우에도, ture 이면 화살표 함수를 사용할 수 있도록 함
      { allowParens: true, onlyOneSimpleParam: true },
    ],
    /**
     * @TypeScript
     * @description 타입스크립트 설정
     */
    /**
     * enum(열거형)을 사용하는 경우 no-shadow (error 'Something' is already declared in the upper scope no-shadow) 규칙의 잘못된 경고 발생에 대한 처리
     * @see {@link https://github.com/typescript-eslint/typescript-eslint/issues/2483}
     */
    'no-shadow': OFF, // no-shadow 기능을 끄고
    '@typescript-eslint/no-shadow': [ERROR], // @typescript-eslint/no-shadow 를 활성화 시킨다
    'react/react-in-jsx-scope': 'off', // React 17 이상에서는 이 규칙을 비활성화
  },
  /**
   * @pulgins
   * @description 추가 규칙
   * `eslint-plugin-<name>` 으로 설치한다
   */
  plugins: [
    'prettier', // * eslint-plugin-prettier"
    'html', // * eslint-plugin-html
  ],
  /**
   * @overrides
   * @description 프로젝트 내 일부 파일에 대해 복수 설정하여 덮어쓴다
   * - JS & Node.js
   */
  overrides: [
    {
      files: ['.eslintrc.{js,cjs}', '*.{js}', 'src/**/*.slice.ts'],
      env: { node: true },
      parserOptions: { sourceType: 'script' },
      rules: {
        'no-unused-vars': WARNING,
        /**
         * ReduxToolkit의 immer 에서 state에 값을 바로 적용하기위한 설정
         * 매개 변수에 대한 할당 방지기능을 해제한다
         *  @see {@link https://redux-toolkit.js.org/usage/immer-reducers#linting-state-mutations}
         */
        'no-param-reassign': ['error', { props: false }],
      },
    },
    // Node
    {
      files: ['.eslintrc.cjs', 'server.js'],
      env: {
        node: true,
      },
    },
  ],
  /**
   * @settings
   * @description 추가 설정
   */
  settings: {
    /** ESLint가 Typescript코드를 분석할 때, @typescript-eslint/parser 파서를 사용하며, .ts, .tsx파일을 분석하도록 설정함 */
    'import/parsers': { '@typescript-eslint/parser': ['.ts', '.tsx'] },
    /**
     * TypeScript의 상대경로를 `tsconfig` 에서 `baseUrl('./src)`로 지정하여 사용할 때, react의 import 에서 사용할 수 없는 에러가 표시되는 경우가 있다
     * TypeScript의 모듈 해석(리졸버) 방식으로 인한 에러인데 이를 해결하기 위한 설정이다, 확장자는 EXTENSIONS 을 사용한다
     * @see {@link https://github.com/import-js/eslint-plugin-import/issues/1485#issuecomment-535351922}
     */
    'import/resolver': {
      /** Node.js 모듈 해석 리졸버, 확장자는 EXTENSIONS 을 사용한다 */
      node: { extensions: EXTENSIONS },
      typescript: { extensions: EXTENSIONS, alwaysTryTypes: true },
    },
    react: {
      version: 'detect',
    },
    formComponents: ['Form'],
    linkComponents: [
      { name: 'Link', linkAttribute: 'to' },
      { name: 'NavLink', linkAttribute: 'to' },
    ],
    'import/internal-regex': '^~/',
  },
  /**
   * @ignorePatterns
   * @description 예외(무시)설정
   * - node_modules와 `.`으로 시작하는 설정 파일은 기본으로 무시하도록 되어있음을 참고
   */
  ignorePatterns: [
    '.eslintrc.cjs',
    'vite.config.ts',
    '!**/.server',
    '!**/.client',
    'build',
    'dist',
    'public',
    'package.json',
    '**/index.html',
    '**/assets/*.html',
    'pnpm-lock.lock',
    '*.sass',
    '*.scss',
    '*.css',
  ],
};
```

13. vite.config.ts 설정

vite 에서는 실시간 린팅을 지원하지 않는다
CRA 와 다르게 $ pn run dev 하면 프로그램이 린팅없이 구동된다

수동으로 하려면 $ pn run lint 로 직접 할 수 있긴하다

원인은 vite 에서 정적 소스 분석을 하지 않아서 이며,

> Vite's job is to get your source modules into a form that can run in the browser as fast as possible. To that end, we recommend separating static analysis checks from Vite's transform pipeline. This principle applies to other static analysis checks such as ESLint.
> (https://vitejs.dev/guide/features.html#transpile-only)
> tsc 나 플러그인을 권고하고 있다, 따라서 아래의 vite-plugin-checker 를 설치하도록 한다
> vite-plugin-checker 설치
> $ pn add -D vite-plugin-checker (eslint 와 typescript 를 둘다 체크할 수 있음)

```
import checker from 'vite-plugin-checker';
export default defineConfig({
  plugins: [
     ...
     checker({
      typescript: true,
      eslint: {
        lintCommand: 'eslint .',
      },
    }),
    ...
  ],
});
```

린트 에러 확인
$ pn run dev 구동하면

이렇게 올바르게 린팅이 동작하는것을 볼 수 있다, 아쉽게도 CRA에서 볼 수 있었던 브라우저 린팅은 못본다

첨부된 이미지 맨 하단을 보면 Found 28 errors 가 표시되는데 현재 warning 은 의도된 경고 설정일 확률이 높으니 무시해도 되므로,

에러를 중점적으로 처리하도록 한다
