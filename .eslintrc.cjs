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
    '@typescript-eslint/no-unused-vars': WARNING,
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
    'react/react-in-jsx-scope': 'off', // React 17 이상에서는 React를 필수로 불러오지 않아도 되므로, 이 규칙을 비활성화
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
        '@typescript-eslint/no-unused-vars': WARNING,
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
