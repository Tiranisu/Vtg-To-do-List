# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended Setup

- [VS Code](https://code.visualstudio.com/) + [Vue - Official](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (previously Volar) and disable Vetur

- Use [vue-tsc](https://github.com/vuejs/language-tools/tree/master/packages/tsc) for performing the same type checking from the command line, or for generating d.ts files for SFCs.


```
npm create vite@latest my-vue-app
npm i eslint --save-dev
npm i eslint-plugin-vue --save-dev
npm install --save-dev --save-exact prettier
echo {}> .prettierrc.json
npm install pinia --save-dev

WebStorm -> don't forget to enable on save prettier in the setting (Ctrl + Alt + S)
```
