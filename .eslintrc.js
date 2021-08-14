module.exports = {
    env: {
        browser: true,
        node: true
    },
    extends: [
        // 'plugin:vue/essentials',
        'plugin:vue/stringly-recommended',
        // 'plugin:vue/recommended'
        'eslint:recommended'
    ],
    parserOptions: {
        // babel : ES6이상의 코드를 ES5이하로 바꿔줌
        // 하위브라우저도 지원(안전성)
        parser: 'babel-eslint'
    },
    rules: {
        "vue/html-closing-bracket-newline": ['error', {
            singleline: 'never',
            multiline: 'never'
        }]
    }
}