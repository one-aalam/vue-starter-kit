"use strict";
var __defProp = Object.defineProperty;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, {enumerable: true, configurable: true, writable: true, value}) : obj[key] = value;
var __assign = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __rest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
Object.defineProperty(exports, "__esModule", {value: true});
exports[Symbol.toStringTag] = "Module";
var vue = require("vue");
var vueRouter = require("vue-router");
var serverRenderer = require("@vue/server-renderer");
var head = require("@vueuse/head");
var vueI18n = require("vue-i18n");
var core = require("@vueuse/core");
var supabaseJs = require("@supabase/supabase-js");
var __glob_7_0 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module"
});
const _sfc_main$d = {};
function _sfc_ssrRender$9(_ctx, _push, _parent, _attrs) {
  const _component_router_view = vue.resolveComponent("router-view");
  _push(`<main${serverRenderer.ssrRenderAttrs(vue.mergeProps({class: "px-4 py-10 text-center text-gray-700 dark:text-gray-200"}, _attrs))}><div class="w-1/4 m-auto text-center text-gray-300 bg-teal-800"> Default Layout </div>`);
  _push(serverRenderer.ssrRenderComponent(_component_router_view, _ctx.$attrs, null, _parent));
  _push(`</main>`);
}
_sfc_main$d.ssrRender = _sfc_ssrRender$9;
const _sfc_setup$d = _sfc_main$d.setup;
_sfc_main$d.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = new Set())).add("/Users/aftalam/Code/starter-kits/vue-starter-kit/src/layouts/default.vue");
  return _sfc_setup$d ? _sfc_setup$d(props, ctx) : void 0;
};
const layouts = {
  "404": () => Promise.resolve().then(function() {
    return _404;
  }),
  default: _sfc_main$d,
  home: () => Promise.resolve().then(function() {
    return home;
  }),
  private: () => Promise.resolve().then(function() {
    return _private;
  }),
  public: () => Promise.resolve().then(function() {
    return _public;
  })
};
function setupLayouts(routes2) {
  return [
    {
      path: "/",
      component: createRouterLayout(layouts),
      children: routes2
    }
  ];
}
async function resolveLayout(layout) {
  var _a;
  if (typeof layout === "function") {
    return (_a = await layout()) == null ? void 0 : _a.default;
  }
  return layout;
}
function createRouterLayout(_layouts) {
  return vue.defineComponent(() => {
    var _a;
    const router = vueRouter.useRouter();
    const route = vueRouter.useRoute();
    const name = vue.ref("default");
    const layouts2 = vue.shallowReactive(_layouts);
    const layout = vue.computed(() => layouts2[name.value]);
    async function updateLayout(_name) {
      if (typeof layouts2[_name] === "function")
        layouts2[_name] = await resolveLayout(layouts2[_name]);
      name.value = _name || "default";
    }
    router.beforeEach(async (to, from, next) => {
      var _a2;
      await updateLayout((_a2 = to.meta) == null ? void 0 : _a2.layout);
      next();
    });
    updateLayout((_a = route.meta) == null ? void 0 : _a.layout);
    return () => {
      if (!layout.value || typeof layout.value === "function")
        return vue.h(vue.resolveComponent("router-view"));
      return vue.h(layout.value, {
        key: layout.name
      });
    };
  });
}
const routes$1 = [
  {
    name: "all",
    path: "/:all(.*)",
    component: () => Promise.resolve().then(function() {
      return ____all_;
    }),
    props: true,
    meta: {
      layout: 404
    }
  },
  {
    name: "about",
    path: "/about",
    component: () => Promise.resolve().then(function() {
      return about;
    }),
    props: true,
    meta: {
      layout: "default"
    }
  },
  {
    name: "index",
    path: "/",
    component: () => Promise.resolve().then(function() {
      return index;
    }),
    props: true,
    meta: {
      layout: "public"
    }
  },
  {
    name: "hi-name",
    path: "/hi/:name",
    component: () => Promise.resolve().then(function() {
      return _name_;
    }),
    props: true
  },
  {
    name: "profile-id",
    path: "/profile/:id",
    component: () => Promise.resolve().then(function() {
      return _id_;
    }),
    props: true,
    meta: {
      layout: "private"
    }
  }
];
const S = "/";
function withPrefix(string, prefix) {
  return string.startsWith(prefix) ? string : prefix + string;
}
function withoutPrefix(string, prefix) {
  return string.startsWith(prefix) ? string.slice(prefix.length) : string;
}
function withoutSuffix(string, suffix) {
  return string.endsWith(suffix) ? string.slice(0, -1 * suffix.length) : string + suffix;
}
function createUrl(urlLike) {
  if (urlLike instanceof URL) {
    return urlLike;
  }
  if (!(urlLike || "").includes("://")) {
    urlLike = "http://e.g" + withPrefix(urlLike, S);
  }
  return new URL(urlLike);
}
function getFullPath(url, routeBase) {
  url = typeof url === "string" ? createUrl(url) : url;
  let fullPath = withoutPrefix(url.href, url.origin);
  if (routeBase) {
    const parts = fullPath.split(S);
    if (parts[1] === routeBase.replace(/\//g, "")) {
      parts.splice(1, 1);
    }
    fullPath = parts.join(S);
  }
  return fullPath;
}
function findDependencies(modules, manifest) {
  const files = new Set();
  for (const id of modules || []) {
    for (const file of manifest[id] || []) {
      files.add(file);
    }
  }
  return [...files];
}
function renderPreloadLinks(files) {
  let link = "";
  for (const file of files || []) {
    if (file.endsWith(".js")) {
      link += `<link rel="modulepreload" crossorigin href="${file}">`;
    } else if (file.endsWith(".css")) {
      link += `<link rel="stylesheet" href="${file}">`;
    }
  }
  return link;
}
const UNSAFE_CHARS_REGEXP = /[<>\/\u2028\u2029]/g;
const ESCAPED_CHARS = {
  "<": "\\u003C",
  ">": "\\u003E",
  "/": "\\u002F",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
function escapeUnsafeChars(unsafeChar) {
  return ESCAPED_CHARS[unsafeChar];
}
function serializeState(state) {
  try {
    return JSON.stringify(JSON.stringify(state || {})).replace(UNSAFE_CHARS_REGEXP, escapeUnsafeChars);
  } catch (error) {
    console.error("[SSR] On state serialization -", error, state);
    return "{}";
  }
}
function addPagePropsGetterToRoutes(routes2) {
  routes2.forEach((route) => {
    route.props = (r) => __assign(__assign(__assign({}, (r.meta.hmr || {}).value), r.meta.state || {}), (r.props === true ? r.params : r.props) || {});
  });
}
const ClientOnly = vue.defineComponent({
  name: "ClientOnly",
  setup(_, {slots}) {
    const show = vue.ref(false);
    vue.onMounted(() => {
      show.value = true;
    });
    return () => show.value && slots.default ? slots.default() : null;
  }
});
const viteSSR = function viteSSR2(App, {routes: routes2, base, pageProps = {passToPage: true}, transformState = serializeState}, hook) {
  if (pageProps && pageProps.passToPage) {
    addPagePropsGetterToRoutes(routes2);
  }
  return async function(url, _a = {}) {
    var {manifest, preload = false} = _a, extra = __rest(_a, ["manifest", "preload"]);
    const app = vue.createSSRApp(App);
    url = createUrl(url);
    const routeBase = base && withoutSuffix(base({url}), "/");
    const router = vueRouter.createRouter({
      history: vueRouter.createMemoryHistory(routeBase),
      routes: routes2
    });
    app.use(router);
    const context = __assign({
      url,
      isClient: false,
      initialState: {}
    }, extra);
    const fullPath = getFullPath(url, routeBase);
    const {head: head$1} = hook && await hook(__assign({
      app,
      router,
      initialRoute: router.resolve(fullPath)
    }, context)) || {};
    router.push(fullPath);
    await router.isReady();
    Object.assign(context.initialState || {}, (router.currentRoute.value.meta || {}).state || {});
    const body = await serverRenderer.renderToString(app, context);
    let {headTags = "", htmlAttrs = "", bodyAttrs = ""} = head$1 ? head.renderHeadToString(head$1) : {};
    const dependencies = manifest ? findDependencies(context.modules, manifest) : [];
    if (preload && dependencies.length > 0) {
      headTags += renderPreloadLinks(dependencies);
    }
    const initialState = await transformState(context.initialState || {});
    return {
      html: `<!DOCTYPE html>
<html ${htmlAttrs}  lang="en">
  <head>
<link rel="preconnect" href="https://fonts.gstatic.com/" crossorigin>
  <link rel="preload" as="style" onload="this.rel='stylesheet'" href="https://fonts.googleapis.com/css2?family=Source%20Sans%20Pro&display=swap">
    <meta charset="UTF-8" />
    <link rel="icon" href="/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vue Starter Kit</title>
  <script type="module" crossorigin src="/assets/index.367c840f.js"></script>
  <link rel="modulepreload" href="/assets/vendor.827e1cb4.js">
  <link rel="stylesheet" href="/assets/index.002a22c6.css">
<link rel="manifest" href="/manifest.webmanifest">${headTags}
</head>
  <body ${bodyAttrs} >
    <div id="app" class="relative"></div>
    
  </body>
</html>
`,
      htmlAttrs,
      headTags,
      body,
      bodyAttrs,
      initialState,
      dependencies
    };
  };
};
const SUPPORTED_LANGUAGES = [
  {
    locale: "en",
    name: "English",
    default: true
  },
  {
    locale: "es",
    name: "Spanish"
  },
  {
    locale: "fr",
    name: "French"
  },
  {
    locale: "it",
    name: "Italian"
  },
  {
    locale: "ja",
    name: "Japanese"
  },
  {
    locale: "ko",
    name: "Korean"
  },
  {
    locale: "tr",
    name: "Turkish"
  },
  {
    locale: "vi",
    name: "Vietnamese"
  },
  {
    locale: "zh-CN",
    name: "Chinese"
  }
];
const SUPPORTED_LOCALES = SUPPORTED_LANGUAGES.map((lang) => lang.locale);
const DEFAULT_LANGUAGE = SUPPORTED_LANGUAGES.find((lang) => lang.default);
const DEFAULT_LOCALE = DEFAULT_LANGUAGE == null ? void 0 : DEFAULT_LANGUAGE.locale;
function extractLocaleFromPath(path = "") {
  const [_, maybeLocale] = path.split("/");
  return SUPPORTED_LOCALES.includes(maybeLocale) ? maybeLocale : DEFAULT_LOCALE;
}
const DEFAULT_FORMAT$1 = {
  short: {
    year: "numeric",
    month: "short",
    day: "numeric"
  },
  medium: {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric"
  },
  long: {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
    hour: "numeric",
    minute: "numeric"
  },
  month: {
    month: "long"
  }
};
const DATE_FORMATS = Object.freeze(__assign({}, SUPPORTED_LOCALES.reduce((acc, lang) => __assign(__assign({}, acc), {[lang]: DEFAULT_FORMAT$1}), {})));
const DEFAULT_FORMAT = {
  USD: {
    style: "currency",
    currency: "USD"
  },
  EUR: {
    style: "currency",
    currency: "EUR"
  },
  JPY: {
    style: "currency",
    currency: "JPY"
  },
  CAD: {
    style: "currency",
    currency: "CAD"
  },
  AUD: {
    style: "currency",
    currency: "AUD"
  },
  SGD: {
    style: "currency",
    currency: "SGD"
  },
  GBP: {
    style: "currency",
    currency: "GBP"
  },
  decimal: {
    style: "decimal"
  }
};
const NUMBER_FORMATS = Object.freeze(__assign({}, SUPPORTED_LOCALES.reduce((acc, lang) => __assign(__assign({}, acc), {[lang]: DEFAULT_FORMAT}), {})));
const messageImports = {"./translations/en.json": () => Promise.resolve().then(function() {
  return en$1;
}), "./translations/fr.json": () => Promise.resolve().then(function() {
  return fr$1;
})};
function importLocale(locale) {
  const [, importLocale2] = Object.entries(messageImports).find(([key]) => key.includes(`/${locale}.`)) || [];
  return importLocale2 && importLocale2();
}
async function installI18n(app, locale = "") {
  locale = SUPPORTED_LOCALES.includes(locale) ? locale : DEFAULT_LOCALE;
  const messages = await importLocale(locale);
  const i18n = vueI18n.createI18n({
    legacy: false,
    locale,
    fallbackLocale: DEFAULT_LOCALE,
    messages: {
      [locale]: (messages == null ? void 0 : messages.default) || messages
    },
    datetimeFormats: DATE_FORMATS,
    numberFormats: NUMBER_FORMATS
  });
  app.use(i18n);
}
const alerts = vue.reactive([]);
const handleAlert = (alert) => {
  alerts.push(alert);
  setTimeout(() => {
    alerts.splice(0, 1);
  }, 5e3);
};
var _sfc_main$c = {
  setup() {
    return {alerts};
  }
};
function _sfc_ssrRender$8(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_CheckCircleIcon = vue.resolveComponent("CheckCircleIcon");
  const _component_AlertCircleIcon = vue.resolveComponent("AlertCircleIcon");
  _push(`<div${serverRenderer.ssrRenderAttrs(vue.mergeProps({
    class: "alert-list absolute w-screen top-6 flex flex-col place-items-center justify-center z-10",
    role: "status",
    "aria-live": "polite"
  }, _attrs))}><!--[-->`);
  serverRenderer.ssrRenderList($setup.alerts, (alert) => {
    _push(`<div class="shadow-md rounded px-3 py-2 text-shadow transition-all mt-2 {{alert.type === &#39;error&#39; ? &#39;bg-red-500 text-white&#39; : alert.type === &#39;success&#39; ? &#39;bg-green-300 text-gray-800&#39; : &#39;bg-gray-100 text-gray-800&#39;}}"><p> lorem ipsum `);
    if (alert.type === "success") {
      _push(serverRenderer.ssrRenderComponent(_component_CheckCircleIcon, {class: "w-6 inline-block"}, null, _parent));
    } else {
      _push(serverRenderer.ssrRenderComponent(_component_AlertCircleIcon, {class: "w-6 inline-block"}, null, _parent));
    }
    _push(` \xA0 ${serverRenderer.ssrInterpolate(alert == null ? void 0 : alert.text)}</p></div>`);
  });
  _push(`<!--]--></div>`);
}
_sfc_main$c.ssrRender = _sfc_ssrRender$8;
const _sfc_setup$c = _sfc_main$c.setup;
_sfc_main$c.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = new Set())).add("/Users/aftalam/Code/starter-kits/vue-starter-kit/src/lib/alert/AlertList.vue");
  return _sfc_setup$c ? _sfc_setup$c(props, ctx) : void 0;
};
var _sfc_main$b = {
  components: {
    AlertList: _sfc_main$c
  },
  setup() {
    const siteData = vue.reactive({
      title: `Vue Starter Kit`,
      description: `Vue3 with essential bells and useful whistles`
    });
    head.useHead({
      title: vue.computed(() => siteData.title),
      meta: [
        {name: "description", content: vue.computed(() => siteData.description)},
        {property: "og:title", content: vue.computed(() => siteData.title)},
        {
          property: "og:image",
          content: "https://repository-images.githubusercontent.com/341177866/d42c1300-7633-11eb-84fd-ec68894d4fc9"
        }
      ]
    });
  }
};
var App_vue_vue_type_style_index_0_lang = "\n#app {\n    font-family: Avenir, Helvetica, Arial, sans-serif;\n    -webkit-font-smoothing: antialiased;\n    -moz-osx-font-smoothing: grayscale;\n    text-align: center;\n    color: #2c3e50;\n    margin-top: 60px;\n}\n.slide-fade-enter-active {\n    transition: all 0.3s ease;\n}\n.slide-fade-leave-active {\n    transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);\n}\n.slide-fade-enter,\n  .slide-fade-leave-to {\n    transform: translateY(10px);\n    opacity: 0;\n}\n";
function _sfc_ssrRender$7(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_AlertList = vue.resolveComponent("AlertList");
  const _component_router_view = vue.resolveComponent("router-view");
  _push(`<!--[-->`);
  _push(serverRenderer.ssrRenderComponent(_component_AlertList, null, null, _parent));
  _push(`<header></header>`);
  _push(serverRenderer.ssrRenderComponent(_component_router_view, null, null, _parent));
  _push(`<footer></footer><!--]-->`);
}
_sfc_main$b.ssrRender = _sfc_ssrRender$7;
const _sfc_setup$b = _sfc_main$b.setup;
_sfc_main$b.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = new Set())).add("/Users/aftalam/Code/starter-kits/vue-starter-kit/src/App.vue");
  return _sfc_setup$b ? _sfc_setup$b(props, ctx) : void 0;
};
var index$1 = "/*! tailwindcss v2.0.4 | MIT License | https://tailwindcss.com *//*! modern-normalize v1.0.0 | MIT License | https://github.com/sindresorhus/modern-normalize */\n\n/*\nDocument\n========\n*/\n\n/**\nUse a better box model (opinionated).\n*/\n\n*,\n*::before,\n*::after {\n	box-sizing: border-box;\n}\n\n/**\nUse a more readable tab size (opinionated).\n*/\n\n:root {\n	-moz-tab-size: 4;\n	-o-tab-size: 4;\n	   tab-size: 4;\n}\n\n/**\n1. Correct the line height in all browsers.\n2. Prevent adjustments of font size after orientation changes in iOS.\n*/\n\nhtml {\n	line-height: 1.15; /* 1 */\n	-webkit-text-size-adjust: 100%; /* 2 */\n}\n\n/*\nSections\n========\n*/\n\n/**\nRemove the margin in all browsers.\n*/\n\nbody {\n	margin: 0;\n}\n\n/**\nImprove consistency of default fonts in all browsers. (https://github.com/sindresorhus/modern-normalize/issues/3)\n*/\n\nbody {\n	font-family:\n		system-ui,\n		-apple-system, /* Firefox supports this but not yet `system-ui` */\n		'Segoe UI',\n		Roboto,\n		Helvetica,\n		Arial,\n		sans-serif,\n		'Apple Color Emoji',\n		'Segoe UI Emoji';\n}\n\n/*\nGrouping content\n================\n*/\n\n/**\n1. Add the correct height in Firefox.\n2. Correct the inheritance of border color in Firefox. (https://bugzilla.mozilla.org/show_bug.cgi?id=190655)\n*/\n\nhr {\n	height: 0; /* 1 */\n	color: inherit; /* 2 */\n}\n\n/*\nText-level semantics\n====================\n*/\n\n/**\nAdd the correct text decoration in Chrome, Edge, and Safari.\n*/\n\nabbr[title] {\n	-webkit-text-decoration: underline dotted;\n	        text-decoration: underline dotted;\n}\n\n/**\nAdd the correct font weight in Edge and Safari.\n*/\n\nb,\nstrong {\n	font-weight: bolder;\n}\n\n/**\n1. Improve consistency of default fonts in all browsers. (https://github.com/sindresorhus/modern-normalize/issues/3)\n2. Correct the odd 'em' font sizing in all browsers.\n*/\n\ncode,\nkbd,\nsamp,\npre {\n	font-family:\n		ui-monospace,\n		SFMono-Regular,\n		Consolas,\n		'Liberation Mono',\n		Menlo,\n		monospace; /* 1 */\n	font-size: 1em; /* 2 */\n}\n\n/**\nAdd the correct font size in all browsers.\n*/\n\nsmall {\n	font-size: 80%;\n}\n\n/**\nPrevent 'sub' and 'sup' elements from affecting the line height in all browsers.\n*/\n\nsub,\nsup {\n	font-size: 75%;\n	line-height: 0;\n	position: relative;\n	vertical-align: baseline;\n}\n\nsub {\n	bottom: -0.25em;\n}\n\nsup {\n	top: -0.5em;\n}\n\n/*\nTabular data\n============\n*/\n\n/**\n1. Remove text indentation from table contents in Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=999088, https://bugs.webkit.org/show_bug.cgi?id=201297)\n2. Correct table border color inheritance in all Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=935729, https://bugs.webkit.org/show_bug.cgi?id=195016)\n*/\n\ntable {\n	text-indent: 0; /* 1 */\n	border-color: inherit; /* 2 */\n}\n\n/*\nForms\n=====\n*/\n\n/**\n1. Change the font styles in all browsers.\n2. Remove the margin in Firefox and Safari.\n*/\n\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n	font-family: inherit; /* 1 */\n	font-size: 100%; /* 1 */\n	line-height: 1.15; /* 1 */\n	margin: 0; /* 2 */\n}\n\n/**\nRemove the inheritance of text transform in Edge and Firefox.\n1. Remove the inheritance of text transform in Firefox.\n*/\n\nbutton,\nselect { /* 1 */\n	text-transform: none;\n}\n\n/**\nCorrect the inability to style clickable types in iOS and Safari.\n*/\n\nbutton,\n[type='button'],\n[type='reset'],\n[type='submit'] {\n	-webkit-appearance: button;\n}\n\n/**\nRemove the inner border and padding in Firefox.\n*/\n\n::-moz-focus-inner {\n	border-style: none;\n	padding: 0;\n}\n\n/**\nRestore the focus styles unset by the previous rule.\n*/\n\n:-moz-focusring {\n	outline: 1px dotted ButtonText;\n}\n\n/**\nRemove the additional ':invalid' styles in Firefox.\nSee: https://github.com/mozilla/gecko-dev/blob/2f9eacd9d3d995c937b4251a5557d95d494c9be1/layout/style/res/forms.css#L728-L737\n*/\n\n:-moz-ui-invalid {\n	box-shadow: none;\n}\n\n/**\nRemove the padding so developers are not caught out when they zero out 'fieldset' elements in all browsers.\n*/\n\nlegend {\n	padding: 0;\n}\n\n/**\nAdd the correct vertical alignment in Chrome and Firefox.\n*/\n\nprogress {\n	vertical-align: baseline;\n}\n\n/**\nCorrect the cursor style of increment and decrement buttons in Safari.\n*/\n\n::-webkit-inner-spin-button,\n::-webkit-outer-spin-button {\n	height: auto;\n}\n\n/**\n1. Correct the odd appearance in Chrome and Safari.\n2. Correct the outline style in Safari.\n*/\n\n[type='search'] {\n	-webkit-appearance: textfield; /* 1 */\n	outline-offset: -2px; /* 2 */\n}\n\n/**\nRemove the inner padding in Chrome and Safari on macOS.\n*/\n\n::-webkit-search-decoration {\n	-webkit-appearance: none;\n}\n\n/**\n1. Correct the inability to style clickable types in iOS and Safari.\n2. Change font properties to 'inherit' in Safari.\n*/\n\n::-webkit-file-upload-button {\n	-webkit-appearance: button; /* 1 */\n	font: inherit; /* 2 */\n}\n\n/*\nInteractive\n===========\n*/\n\n/*\nAdd the correct display in Chrome and Safari.\n*/\n\nsummary {\n	display: list-item;\n}/**\n * Manually forked from SUIT CSS Base: https://github.com/suitcss/base\n * A thin layer on top of normalize.css that provides a starting point more\n * suitable for web applications.\n */\n\n/**\n * Removes the default spacing and border for appropriate elements.\n */\n\nblockquote,\ndl,\ndd,\nh1,\nh2,\nh3,\nh4,\nh5,\nh6,\nhr,\nfigure,\np,\npre {\n  margin: 0;\n}\n\nbutton {\n  background-color: transparent;\n  background-image: none;\n}\n\n/**\n * Work around a Firefox/IE bug where the transparent `button` background\n * results in a loss of the default `button` focus styles.\n */\n\nbutton:focus {\n  outline: 1px dotted;\n  outline: 5px auto -webkit-focus-ring-color;\n}\n\nfieldset {\n  margin: 0;\n  padding: 0;\n}\n\nol,\nul {\n  list-style: none;\n  margin: 0;\n  padding: 0;\n}\n\n/**\n * Tailwind custom reset styles\n */\n\n/**\n * 1. Use the user's configured `sans` font-family (with Tailwind's default\n *    sans-serif font stack as a fallback) as a sane default.\n * 2. Use Tailwind's default \"normal\" line-height so the user isn't forced\n *    to override it to ensure consistency even when using the default theme.\n */\n\nhtml {\n  font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji\"; /* 1 */\n  line-height: 1.5; /* 2 */\n}\n\n\n/**\n * Inherit font-family and line-height from `html` so users can set them as\n * a class directly on the `html` element.\n */\n\nbody {\n  font-family: inherit;\n  line-height: inherit;\n}\n\n/**\n * 1. Prevent padding and border from affecting element width.\n *\n *    We used to set this in the html element and inherit from\n *    the parent element for everything else. This caused issues\n *    in shadow-dom-enhanced elements like <details> where the content\n *    is wrapped by a div with box-sizing set to `content-box`.\n *\n *    https://github.com/mozdevs/cssremedy/issues/4\n *\n *\n * 2. Allow adding a border to an element by just adding a border-width.\n *\n *    By default, the way the browser specifies that an element should have no\n *    border is by setting it's border-style to `none` in the user-agent\n *    stylesheet.\n *\n *    In order to easily add borders to elements by just setting the `border-width`\n *    property, we change the default border-style for all elements to `solid`, and\n *    use border-width to hide them instead. This way our `border` utilities only\n *    need to set the `border-width` property instead of the entire `border`\n *    shorthand, making our border utilities much more straightforward to compose.\n *\n *    https://github.com/tailwindcss/tailwindcss/pull/116\n */\n\n*,\n::before,\n::after {\n  box-sizing: border-box; /* 1 */\n  border-width: 0; /* 2 */\n  border-style: solid; /* 2 */\n  border-color: #e5e7eb; /* 2 */\n}\n\n/*\n * Ensure horizontal rules are visible by default\n */\n\nhr {\n  border-top-width: 1px;\n}\n\n/**\n * Undo the `border-style: none` reset that Normalize applies to images so that\n * our `border-{width}` utilities have the expected effect.\n *\n * The Normalize reset is unnecessary for us since we default the border-width\n * to 0 on all elements.\n *\n * https://github.com/tailwindcss/tailwindcss/issues/362\n */\n\nimg {\n  border-style: solid;\n}\n\ntextarea {\n  resize: vertical;\n}\n\ninput::-moz-placeholder, textarea::-moz-placeholder {\n  opacity: 1;\n  color: #9ca3af;\n}\n\ninput:-ms-input-placeholder, textarea:-ms-input-placeholder {\n  opacity: 1;\n  color: #9ca3af;\n}\n\ninput::placeholder,\ntextarea::placeholder {\n  opacity: 1;\n  color: #9ca3af;\n}\n\nbutton,\n[role=\"button\"] {\n  cursor: pointer;\n}\n\ntable {\n  border-collapse: collapse;\n}\n\nh1,\nh2,\nh3,\nh4,\nh5,\nh6 {\n  font-size: inherit;\n  font-weight: inherit;\n}\n\n/**\n * Reset links to optimize for opt-in styling instead of\n * opt-out.\n */\n\na {\n  color: inherit;\n  text-decoration: inherit;\n}\n\n/**\n * Reset form element properties that are easy to forget to\n * style explicitly so you don't inadvertently introduce\n * styles that deviate from your design system. These styles\n * supplement a partial reset that is already applied by\n * normalize.css.\n */\n\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  padding: 0;\n  line-height: inherit;\n  color: inherit;\n}\n\n/**\n * Use the configured 'mono' font family for elements that\n * are expected to be rendered with a monospace font, falling\n * back to the system monospace stack if there is no configured\n * 'mono' font family.\n */\n\npre,\ncode,\nkbd,\nsamp {\n  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace;\n}\n\n/**\n * Make replaced elements `display: block` by default as that's\n * the behavior you want almost all of the time. Inspired by\n * CSS Remedy, with `svg` added as well.\n *\n * https://github.com/mozdevs/cssremedy/issues/14\n */\n\nimg,\nsvg,\nvideo,\ncanvas,\naudio,\niframe,\nembed,\nobject {\n  display: block;\n  vertical-align: middle;\n}\n\n/**\n * Constrain images and videos to the parent width and preserve\n * their instrinsic aspect ratio.\n *\n * https://github.com/mozdevs/cssremedy/issues/14\n */\n\nimg,\nvideo {\n  max-width: 100%;\n  height: auto;\n}\n\n* {\n	--tw-shadow: 0 0 #0000;\n	--tw-ring-inset: var(--tw-empty,/*!*/ /*!*/);\n	--tw-ring-offset-width: 0px;\n	--tw-ring-offset-color: #fff;\n	--tw-ring-color: rgba(59, 130, 246, 0.5);\n	--tw-ring-offset-shadow: 0 0 #0000;\n	--tw-ring-shadow: 0 0 #0000;\n}\n.relative {\n	position: relative;\n}\n.absolute {\n	position: absolute;\n}\n.top-6 {\n	top: 1.5rem;\n}\n.z-10 {\n	z-index: 10;\n}\n.m-3 {\n	margin: 0.75rem;\n}\n.m-auto {\n	margin: auto;\n}\n.mx-auto {\n	margin-left: auto;\n	margin-right: auto;\n}\n.my-4 {\n	margin-top: 1rem;\n	margin-bottom: 1rem;\n}\n.mt-6 {\n	margin-top: 1.5rem;\n}\n.mt-3 {\n	margin-top: 0.75rem;\n}\n.mt-12 {\n	margin-top: 3rem;\n}\n.mt-8 {\n	margin-top: 2rem;\n}\n.mt-5 {\n	margin-top: 1.25rem;\n}\n.mb-4 {\n	margin-bottom: 1rem;\n}\n.mb-6 {\n	margin-bottom: 1.5rem;\n}\n.mb-2 {\n	margin-bottom: 0.5rem;\n}\n.mt-2 {\n	margin-top: 0.5rem;\n}\n.flex {\n	display: flex;\n}\n.inline-flex {\n	display: inline-flex;\n}\n.inline-block {\n	display: inline-block;\n}\n.block {\n	display: block;\n}\n.h-40 {\n	height: 10rem;\n}\n.h-2 {\n	height: 0.5rem;\n}\n.h-auto {\n	height: auto;\n}\n.h-16 {\n	height: 4rem;\n}\n.h-full {\n	height: 100%;\n}\n.h-12 {\n	height: 3rem;\n}\n.w-40 {\n	width: 10rem;\n}\n.w-3\\/4 {\n	width: 75%;\n}\n.w-full {\n	width: 100%;\n}\n.w-16 {\n	width: 4rem;\n}\n.w-1\\/4 {\n	width: 25%;\n}\n.w-12 {\n	width: 3rem;\n}\n.w-screen {\n	width: 100vw;\n}\n.w-6 {\n	width: 1.5rem;\n}\n.flex-1 {\n	flex: 1 1 0%;\n}\n.transform {\n	--tw-translate-x: 0;\n	--tw-translate-y: 0;\n	--tw-rotate: 0;\n	--tw-skew-x: 0;\n	--tw-skew-y: 0;\n	--tw-scale-x: 1;\n	--tw-scale-y: 1;\n	transform: translateX(var(--tw-translate-x)) translateY(var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));\n}\n@-webkit-keyframes pulse {\n\n	50% {\n		opacity: .5;\n	}\n}\n@keyframes pulse {\n\n	50% {\n		opacity: .5;\n	}\n}\n.animate-pulse {\n	-webkit-animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;\n	        animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;\n}\n@-webkit-keyframes ping {\n\n	75%, 100% {\n		transform: scale(2);\n		opacity: 0;\n	}\n}\n@keyframes ping {\n\n	75%, 100% {\n		transform: scale(2);\n		opacity: 0;\n	}\n}\n.animate-ping {\n	-webkit-animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;\n	        animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;\n}\n@-webkit-keyframes bounce {\n\n	0%, 100% {\n		transform: translateY(-25%);\n		-webkit-animation-timing-function: cubic-bezier(0.8,0,1,1);\n		        animation-timing-function: cubic-bezier(0.8,0,1,1);\n	}\n\n	50% {\n		transform: none;\n		-webkit-animation-timing-function: cubic-bezier(0,0,0.2,1);\n		        animation-timing-function: cubic-bezier(0,0,0.2,1);\n	}\n}\n@keyframes bounce {\n\n	0%, 100% {\n		transform: translateY(-25%);\n		-webkit-animation-timing-function: cubic-bezier(0.8,0,1,1);\n		        animation-timing-function: cubic-bezier(0.8,0,1,1);\n	}\n\n	50% {\n		transform: none;\n		-webkit-animation-timing-function: cubic-bezier(0,0,0.2,1);\n		        animation-timing-function: cubic-bezier(0,0,0.2,1);\n	}\n}\n.animate-bounce {\n	-webkit-animation: bounce 1s infinite;\n	        animation: bounce 1s infinite;\n}\n.flex-col {\n	flex-direction: column;\n}\n.place-items-center {\n	place-items: center;\n}\n.content-center {\n	align-content: center;\n}\n.items-center {\n	align-items: center;\n}\n.justify-center {\n	justify-content: center;\n}\n.gap-2 {\n	gap: 0.5rem;\n}\n.space-x-2 > :not([hidden]) ~ :not([hidden]) {\n	--tw-space-x-reverse: 0;\n	margin-right: calc(0.5rem * var(--tw-space-x-reverse));\n	margin-left: calc(0.5rem * calc(1 - var(--tw-space-x-reverse)));\n}\n.rounded-xl {\n	border-radius: 0.75rem;\n}\n.rounded-sm {\n	border-radius: 0.125rem;\n}\n.rounded-full {\n	border-radius: 9999px;\n}\n.rounded-lg {\n	border-radius: 0.5rem;\n}\n.rounded {\n	border-radius: 0.25rem;\n}\n.border {\n	border-width: 1px;\n}\n.border-gray-300 {\n	--tw-border-opacity: 1;\n	border-color: rgba(209, 213, 219, var(--tw-border-opacity));\n}\n.border-gray-600 {\n	--tw-border-opacity: 1;\n	border-color: rgba(75, 85, 99, var(--tw-border-opacity));\n}\n.bg-gray-300 {\n	--tw-bg-opacity: 1;\n	background-color: rgba(209, 213, 219, var(--tw-bg-opacity));\n}\n.bg-purple-400 {\n	--tw-bg-opacity: 1;\n	background-color: rgba(167, 139, 250, var(--tw-bg-opacity));\n}\n.bg-purple-200 {\n	--tw-bg-opacity: 1;\n	background-color: rgba(221, 214, 254, var(--tw-bg-opacity));\n}\n.bg-white {\n	--tw-bg-opacity: 1;\n	background-color: rgba(255, 255, 255, var(--tw-bg-opacity));\n}\n.bg-gray-200 {\n	--tw-bg-opacity: 1;\n	background-color: rgba(229, 231, 235, var(--tw-bg-opacity));\n}\n.bg-gray-500 {\n	--tw-bg-opacity: 1;\n	background-color: rgba(107, 114, 128, var(--tw-bg-opacity));\n}\n.bg-red-500 {\n	--tw-bg-opacity: 1;\n	background-color: rgba(239, 68, 68, var(--tw-bg-opacity));\n}\n.bg-green-300 {\n	--tw-bg-opacity: 1;\n	background-color: rgba(110, 231, 183, var(--tw-bg-opacity));\n}\n.bg-gray-100 {\n	--tw-bg-opacity: 1;\n	background-color: rgba(243, 244, 246, var(--tw-bg-opacity));\n}\n.p-2 {\n	padding: 0.5rem;\n}\n.p-8 {\n	padding: 2rem;\n}\n.px-4 {\n	padding-left: 1rem;\n	padding-right: 1rem;\n}\n.py-10 {\n	padding-top: 2.5rem;\n	padding-bottom: 2.5rem;\n}\n.py-3 {\n	padding-top: 0.75rem;\n	padding-bottom: 0.75rem;\n}\n.py-2 {\n	padding-top: 0.5rem;\n	padding-bottom: 0.5rem;\n}\n.px-3 {\n	padding-left: 0.75rem;\n	padding-right: 0.75rem;\n}\n.pt-4 {\n	padding-top: 1rem;\n}\n.text-center {\n	text-align: center;\n}\n.text-left {\n	text-align: left;\n}\n.text-right {\n	text-align: right;\n}\n.text-xl {\n	font-size: 1.25rem;\n	line-height: 1.75rem;\n}\n.text-4xl {\n	font-size: 2.25rem;\n	line-height: 2.5rem;\n}\n.text-sm {\n	font-size: 0.875rem;\n	line-height: 1.25rem;\n}\n.text-3xl {\n	font-size: 1.875rem;\n	line-height: 2.25rem;\n}\n.font-bold {\n	font-weight: 700;\n}\n.font-semibold {\n	font-weight: 600;\n}\n.text-gray-700 {\n	--tw-text-opacity: 1;\n	color: rgba(55, 65, 81, var(--tw-text-opacity));\n}\n.text-gray-300 {\n	--tw-text-opacity: 1;\n	color: rgba(209, 213, 219, var(--tw-text-opacity));\n}\n.text-gray-600 {\n	--tw-text-opacity: 1;\n	color: rgba(75, 85, 99, var(--tw-text-opacity));\n}\n.text-green-700 {\n	--tw-text-opacity: 1;\n	color: rgba(4, 120, 87, var(--tw-text-opacity));\n}\n.text-gray-800 {\n	--tw-text-opacity: 1;\n	color: rgba(31, 41, 55, var(--tw-text-opacity));\n}\n.text-white {\n	--tw-text-opacity: 1;\n	color: rgba(255, 255, 255, var(--tw-text-opacity));\n}\n.opacity-75 {\n	opacity: 0.75;\n}\n.opacity-25 {\n	opacity: 0.25;\n}\n.opacity-50 {\n	opacity: 0.5;\n}\n.shadow-lg {\n	--tw-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);\n	box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);\n}\n.shadow {\n	--tw-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);\n	box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);\n}\n.shadow-inner {\n	--tw-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.06);\n	box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);\n}\n.shadow-md {\n	--tw-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);\n	box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);\n}\n.ring-4 {\n	--tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);\n	--tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(4px + var(--tw-ring-offset-width)) var(--tw-ring-color);\n	box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);\n}\n.ring-gray-200 {\n	--tw-ring-opacity: 1;\n	--tw-ring-color: rgba(229, 231, 235, var(--tw-ring-opacity));\n}\n.transition {\n	transition-property: background-color, border-color, color, fill, stroke, opacity, box-shadow, transform;\n	transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n	transition-duration: 150ms;\n}\n.transition-all {\n	transition-property: all;\n	transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n	transition-duration: 150ms;\n}\n.line-clamp-2 {\n	overflow: hidden;\n	display: -webkit-box;\n	-webkit-box-orient: vertical;\n	-webkit-line-clamp: 2;\n}\n.hover\\:border-gray-400:hover {\n	--tw-border-opacity: 1;\n	border-color: rgba(156, 163, 175, var(--tw-border-opacity));\n}\n@media (min-width: 640px) {\n\n	.sm\\:w-56 {\n		width: 14rem;\n	}\n\n	.sm\\:w-1\\/2 {\n		width: 50%;\n	}\n}\n@media (min-width: 1280px) {\n\n	.xl\\:w-5\\/12 {\n		width: 41.666667%;\n	}\n}\n";
const routes = setupLayouts(routes$1);
var main = viteSSR(_sfc_main$b, {
  routes,
  base: ({url}) => {
    const locale = extractLocaleFromPath(url.pathname);
    return locale === DEFAULT_LOCALE ? "/" : `/${locale}/`;
  }
}, async (context) => {
  Object.values({"./modules/nprogress.ts": __glob_7_0}).map((module) => {
    var _a;
    return (_a = module.install) == null ? void 0 : _a.call(module, context);
  });
  const {app, url, router, isClient, initialState, initialRoute} = context;
  const head$1 = head.createHead();
  app.use(head$1);
  app.component(ClientOnly.name, ClientOnly);
  await installI18n(app, extractLocaleFromPath(initialRoute.href));
  {
    initialState.__VITE_INITIAL_DATA__ = {
      name: "Vite Starter Kit"
    };
  }
  router.beforeEach(async (to, from, next) => {
    if (!!to.meta.state && true) {
      return next();
    }
    const baseUrl = isClient ? "" : url.origin;
    try {
      const res = await fetch(`${baseUrl}/api/get-page-props?path=${encodeURIComponent(to.path)}&name=${String(to.name)}&client=${isClient}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });
      const state = await res.json();
      to.meta.state = state;
    } catch (error) {
      console.error(error);
    }
    next();
  });
  return {head: head$1};
});
var _sfc_main$a = vue.defineComponent({
  expose: [],
  __ssrInlineRender: true,
  setup(__props) {
    vueRouter.useRouter();
    const {t} = vueI18n.useI18n();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_carbon_warning = vue.resolveComponent("carbon-warning");
      const _component_router_view = vue.resolveComponent("router-view");
      _push(`<main${serverRenderer.ssrRenderAttrs(vue.mergeProps({class: "px-4 py-10 text-center text-teal-700 dark:text-gray-200"}, _attrs))}><div><p class="text-4xl">`);
      _push(serverRenderer.ssrRenderComponent(_component_carbon_warning, {class: "inline-block"}, null, _parent));
      _push(`</p></div>`);
      _push(serverRenderer.ssrRenderComponent(_component_router_view, _ctx.$attrs, null, _parent));
      _push(`<div><button class="btn m-3 text-sm mt-8">${serverRenderer.ssrInterpolate(vue.unref(t)("button.back"))}</button></div></main>`);
    };
  }
});
const _sfc_setup$a = _sfc_main$a.setup;
_sfc_main$a.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = new Set())).add("/Users/aftalam/Code/starter-kits/vue-starter-kit/src/layouts/404.vue");
  return _sfc_setup$a ? _sfc_setup$a(props, ctx) : void 0;
};
var _404 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  default: _sfc_main$a
});
var _sfc_main$9 = vue.defineComponent({
  expose: [],
  __ssrInlineRender: true,
  setup(__props) {
    const colorSchema = core.useStorage("color-schema", "auto");
    const preferredDark = core.usePreferredDark();
    const isDark = vue.computed({
      get() {
        return colorSchema.value === "auto" ? preferredDark.value : colorSchema.value === "dark";
      },
      set(v) {
        if (v === preferredDark.value)
          colorSchema.value = "auto";
        else
          colorSchema.value = v ? "dark" : "light";
      }
    });
    core.useToggle(isDark);
    vue.watch(isDark, (v) => typeof document !== "undefined" && document.documentElement.classList.toggle("dark", v), {immediate: true});
    const {t, locale} = vueI18n.useI18n();
    vueRouter.useRoute();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_router_link = vue.resolveComponent("router-link");
      const _component_carbon_campsite = vue.resolveComponent("carbon-campsite");
      const _component_carbon_star = vue.resolveComponent("carbon-star");
      const _component_carbon_moon = vue.resolveComponent("carbon-moon");
      const _component_carbon_sun = vue.resolveComponent("carbon-sun");
      const _component_carbon_language = vue.resolveComponent("carbon-language");
      const _component_carbon_dicom_overlay = vue.resolveComponent("carbon-dicom-overlay");
      const _component_carbon_logo_github = vue.resolveComponent("carbon-logo-github");
      _push(`<nav${serverRenderer.ssrRenderAttrs(vue.mergeProps({class: "text-xl mt-6 space-x-2"}, _attrs))}>`);
      _push(serverRenderer.ssrRenderComponent(_component_router_link, {
        class: "icon-btn",
        to: "/",
        title: vue.unref(t)("button.home")
      }, {
        default: vue.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(serverRenderer.ssrRenderComponent(_component_carbon_campsite, null, null, _parent2, _scopeId));
          } else {
            return [
              vue.createVNode(_component_carbon_campsite)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<a class="icon-btn" rel="noreferrer" href="https://github.com/frandiox/vite-ssr" target="_blank" title="Library">`);
      _push(serverRenderer.ssrRenderComponent(_component_carbon_star, null, null, _parent));
      _push(`</a><a class="icon-btn"${serverRenderer.ssrRenderAttr("title", vue.unref(t)("button.toggle_dark"))}>`);
      if (vue.unref(isDark)) {
        _push(serverRenderer.ssrRenderComponent(_component_carbon_moon, null, null, _parent));
      } else {
        _push(serverRenderer.ssrRenderComponent(_component_carbon_sun, null, null, _parent));
      }
      _push(`</a><a class="icon-btn"${serverRenderer.ssrRenderAttr("title", vue.unref(t)("button.toggle_langs"))}>`);
      _push(serverRenderer.ssrRenderComponent(_component_carbon_language, null, null, _parent));
      _push(`</a>`);
      _push(serverRenderer.ssrRenderComponent(_component_router_link, {
        class: "icon-btn",
        to: "/about",
        title: vue.unref(t)("button.about")
      }, {
        default: vue.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(serverRenderer.ssrRenderComponent(_component_carbon_dicom_overlay, null, null, _parent2, _scopeId));
          } else {
            return [
              vue.createVNode(_component_carbon_dicom_overlay)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<a class="icon-btn" rel="noreferrer" href="https://github.com/frandiox/vitesse-ssr-template" target="_blank" title="Template">`);
      _push(serverRenderer.ssrRenderComponent(_component_carbon_logo_github, null, null, _parent));
      _push(`</a></nav>`);
    };
  }
});
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = new Set())).add("/Users/aftalam/Code/starter-kits/vue-starter-kit/src/components/Footer.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const _sfc_main$8 = {};
function _sfc_ssrRender$6(_ctx, _push, _parent, _attrs) {
  const _component_router_view = vue.resolveComponent("router-view");
  const _component_Footer = _sfc_main$9;
  _push(`<main${serverRenderer.ssrRenderAttrs(vue.mergeProps({class: "px-4 py-10 text-center text-gray-700 dark:text-gray-200"}, _attrs))}>`);
  _push(serverRenderer.ssrRenderComponent(_component_router_view, _ctx.$attrs, null, _parent));
  _push(serverRenderer.ssrRenderComponent(_component_Footer, null, null, _parent));
  _push(`<div class="mt-5 mx-auto text-center opacity-25 text-sm"> [Home Layout] </div></main>`);
}
_sfc_main$8.ssrRender = _sfc_ssrRender$6;
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = new Set())).add("/Users/aftalam/Code/starter-kits/vue-starter-kit/src/layouts/home.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
var home = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  default: _sfc_main$8
});
const _sfc_main$7 = {};
function _sfc_ssrRender$5(_ctx, _push, _parent, _attrs) {
  const _component_router_view = vue.resolveComponent("router-view");
  _push(`<main${serverRenderer.ssrRenderAttrs(vue.mergeProps({class: "px-4 py-10 text-center text-gray-700 dark:text-gray-200"}, _attrs))}><div class="w-1/4 m-auto text-center text-gray-300 bg-teal-800"> Private Layout </div>`);
  _push(serverRenderer.ssrRenderComponent(_component_router_view, null, null, _parent));
  _push(`</main>`);
}
_sfc_main$7.ssrRender = _sfc_ssrRender$5;
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = new Set())).add("/Users/aftalam/Code/starter-kits/vue-starter-kit/src/layouts/private.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
var _private = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  default: _sfc_main$7
});
const _sfc_main$6 = {};
function _sfc_ssrRender$4(_ctx, _push, _parent, _attrs) {
  const _component_router_view = vue.resolveComponent("router-view");
  _push(`<main${serverRenderer.ssrRenderAttrs(vue.mergeProps({class: "px-4 py-10 text-center text-gray-700 dark:text-gray-200"}, _attrs))}><div class="w-1/4 m-auto text-center text-gray-300 bg-teal-800"> Public Layout </div>`);
  _push(serverRenderer.ssrRenderComponent(_component_router_view, null, null, _parent));
  _push(`</main>`);
}
_sfc_main$6.ssrRender = _sfc_ssrRender$4;
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = new Set())).add("/Users/aftalam/Code/starter-kits/vue-starter-kit/src/layouts/public.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
var _public = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  default: _sfc_main$6
});
var _sfc_main$5 = vue.defineComponent({
  expose: [],
  __ssrInlineRender: true,
  setup(__props) {
    const {t} = vueI18n.useI18n();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${serverRenderer.ssrRenderAttrs(_attrs)}>${serverRenderer.ssrInterpolate(vue.unref(t)("not-found"))}</div>`);
    };
  }
});
var block0$3 = {};
if (typeof block0$3 === "function")
  block0$3(_sfc_main$5);
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = new Set())).add("/Users/aftalam/Code/starter-kits/vue-starter-kit/src/pages/[...all].vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
var ____all_ = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  default: _sfc_main$5
});
var _sfc_main$4 = vue.defineComponent({
  setup() {
    const {t} = vueI18n.useI18n({useScope: "global"});
    return {t};
  }
});
var block0$2 = {};
function _sfc_ssrRender$3(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<!--[--><h1>About</h1><p>${serverRenderer.ssrInterpolate(_ctx.t("about.desc"))}</p><!--]-->`);
}
if (typeof block0$2 === "function")
  block0$2(_sfc_main$4);
_sfc_main$4.ssrRender = _sfc_ssrRender$3;
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = new Set())).add("/Users/aftalam/Code/starter-kits/vue-starter-kit/src/pages/about.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
var about = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  default: _sfc_main$4
});
const _hoisted_1 = {
  xmlns: "http://www.w3.org/2000/svg",
  "xmlns:xlink": "http://www.w3.org/1999/xlink",
  width: "1.2em",
  height: "1.2em",
  preserveAspectRatio: "xMidYMid meet",
  viewBox: "0 0 512 512",
  style: {"vertical-align": "middle", transform: "translateY(-5%)"}
};
const _hoisted_2 = /* @__PURE__ */ vue.createVNode("path", {
  d: "M256 32C132.3 32 32 134.9 32 261.7c0 101.5 64.2 187.5 153.2 217.9 1.4.3 2.6.4 3.8.4 8.3 0 11.5-6.1 11.5-11.4 0-5.5-.2-19.9-.3-39.1-8.4 1.9-15.9 2.7-22.6 2.7-43.1 0-52.9-33.5-52.9-33.5-10.2-26.5-24.9-33.6-24.9-33.6-19.5-13.7-.1-14.1 1.4-14.1h.1c22.5 2 34.3 23.8 34.3 23.8 11.2 19.6 26.2 25.1 39.6 25.1 10.5 0 20-3.4 25.6-6 2-14.8 7.8-24.9 14.2-30.7-49.7-5.8-102-25.5-102-113.5 0-25.1 8.7-45.6 23-61.6-2.3-5.8-10-29.2 2.2-60.8 0 0 1.6-.5 5-.5 8.1 0 26.4 3.1 56.6 24.1 17.9-5.1 37-7.6 56.1-7.7 19 .1 38.2 2.6 56.1 7.7 30.2-21 48.5-24.1 56.6-24.1 3.4 0 5 .5 5 .5 12.2 31.6 4.5 55 2.2 60.8 14.3 16.1 23 36.6 23 61.6 0 88.2-52.4 107.6-102.3 113.3 8 7.1 15.2 21.1 15.2 42.5 0 30.7-.3 55.5-.3 63 0 5.4 3.1 11.5 11.4 11.5 1.2 0 2.6-.1 4-.4C415.9 449.2 480 363.1 480 261.7 480 134.9 379.7 32 256 32zm-78.4 416.1c2.2 0 4.4-.1 6.7-.2 0 2.8 0 5.5.1 7.9 0 2.4 0 4.6.1 6.5-15.6-5.8-30.3-13.5-44.1-23 9.8 5.3 22.1 8.8 37.2 8.8zm11.4-72.9c-.8 2.2-1.5 4.5-2.1 6.9-3.4 1-7.5 1.8-11.7 1.8-10.9 0-19-5.4-25.6-16.9-2.4-4.6-6.8-10.7-12.9-16.3 16.8 14.1 36.3 20.9 52.3 24.5zm190 58.9c-15.8 11.9-33 21.3-51 28.2v-6.5-50.4c0-12.4-2.1-22.5-5-30.5 37.2-8.3 92-33.7 92-125.4 0-24.6-7.1-46.5-21.2-65.1 3.1-12.9 5.5-35.6-5.1-63l-2.7-7.1-7.2-2.4c-1.5-.5-4.8-1.3-10-1.3-11.5 0-30.9 4.1-59.5 22.8-17-4.2-34.8-6.4-53.1-6.4H255.9c-18.3 0-36.2 2.2-53.1 6.4-28.6-18.7-48-22.8-59.5-22.8-5.2 0-8.5.9-10 1.4l-7.2 2.4-2.7 7.1c-10.6 27.5-8.2 50.2-5.1 63-14.1 18.7-21.2 40.6-21.2 65.1 0 49.6 16 79.9 36.6 98.5-8.1-6.6-18.6-12.1-31.2-13h-1.3c-13.1 0-22.3 5.4-25.2 14.7-4.7 14.8 9.8 25 14.6 28.4l.5.6 1.5.6c1.6 1 10.1 7 16.9 24.5 2 6.2 6.3 14.5 13.6 22.2-13.1-11.2-24.8-24-34.9-38.1C61.9 351.2 48 307.5 48 261.7c0-28.9 5.5-56.9 16.4-83.3 10.5-25.5 25.5-48.3 44.7-67.9 19.1-19.6 41.4-35 66.1-45.7C200.8 53.7 228 48 256 48s55.2 5.6 80.8 16.7c24.8 10.7 47 26.1 66.1 45.7 19.1 19.6 34.2 42.5 44.7 67.9 10.9 26.4 16.4 54.4 16.4 83.3 0 45.8-13.8 89.5-40.1 126.3-12.6 17.7-27.7 33.2-44.9 46.2z",
  fill: "currentColor"
}, null, -1);
function render(_ctx, _cache) {
  return vue.openBlock(), vue.createBlock("svg", _hoisted_1, [
    _hoisted_2
  ]);
}
var __vite_components_0 = {render};
var _sfc_main$3 = vue.defineComponent({
  props: {
    loading: {
      type: Boolean,
      required: true
    }
  }
});
function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${serverRenderer.ssrRenderAttrs(vue.mergeProps({
    class: "w-full h-auto flex justify-center content-center",
    style: _ctx.loading ? null : {display: "none"}
  }, _attrs))}><div class="flex h-16 w-16 justify-center content-center mt-12"><span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span><span class="relative inline-flex rounded-full h-16 w-16 bg-purple-200 animate-bounce"></span></div></div>`);
}
_sfc_main$3.ssrRender = _sfc_ssrRender$2;
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = new Set())).add("/Users/aftalam/Code/starter-kits/vue-starter-kit/src/components/Spinner.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const supabaseClient = supabaseJs.createClient(String("https://bzajbblvxsmdrceihmlh.supabase.co"), String("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYxNzQ2NDgwMywiZXhwIjoxOTMzMDQwODAzfQ.t8XQmbAiCra0_GesoPrSgoRrbVqFn18YbFeCIvDTr_Q"));
supabaseClient.auth;
var _sfc_main$2 = vue.defineComponent({
  components: {
    Spinner: _sfc_main$3
  },
  setup() {
    const isSignIn = vue.ref(true);
    const loading = vue.ref(false);
    const authForm = vue.reactive({
      email: "",
      password: ""
    });
    async function handleProviderSignIn(provider) {
      loading.value = true;
      const {error} = await supabaseClient.auth.signIn({provider});
      if (error)
        handleAlert({type: "error", text: error.message});
      loading.value = false;
    }
    async function signUpOrSignIn() {
      loading.value = true;
      if (isSignIn) {
        let {error, session} = await supabaseClient.auth.signIn({
          email: authForm.email,
          password: authForm.password
        });
        if (error) {
          handleAlert({type: "error", text: error.message});
        } else {
          handleAlert({type: "success", text: "Signed in successfully"});
        }
      } else {
        const {error} = await supabaseClient.auth.signUp({
          email: authForm.email,
          password: authForm.password
        });
        if (error) {
          handleAlert({type: "error", text: error.message});
        } else {
          handleAlert({type: "error", text: "Registered. Please confirm your email"});
        }
      }
      loading.value = false;
    }
    function toggleView() {
      isSignIn.value = !isSignIn.value;
      console.log(isSignIn);
    }
    return {
      isSignIn,
      loading,
      authForm,
      signUpOrSignIn,
      toggleView,
      handleProviderSignIn
    };
  }
});
var block0$1 = {};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_router_link = vue.resolveComponent("router-link");
  const _component_i_ion_social_github_outline = __vite_components_0;
  const _component_spinner = _sfc_main$3;
  _push(`<!--[--><div><p>index.vue</p>`);
  _push(serverRenderer.ssrRenderComponent(_component_router_link, {to: "/about"}, {
    default: vue.withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(` about `);
      } else {
        return [
          vue.createTextVNode(" about ")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`<p>`);
  _push(serverRenderer.ssrRenderComponent(_component_router_link, {to: "/profile/1"}, {
    default: vue.withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(` Profile `);
      } else {
        return [
          vue.createTextVNode(" Profile ")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</p></div><div class="flex flex-col justify-center items-center relative"><div class="w-full text-center mb-4 flex  flex-col place-items-center"><div></div><h3 class="text-3xl text-gray-600">Supa<strong>Auth</strong>\xA0</h3><small>Please provide your <strong>email</strong> and <strong>password</strong> and ${serverRenderer.ssrInterpolate(_ctx.isSignIn ? "Log In" : "Sign Up")}</small></div><form class="w-full sm:w-1/2 xl:w-5/12"><div class="border-teal p-8 border-t-12 bg-white mb-6 rounded-lg shadow-lg" style="${serverRenderer.ssrRenderStyle({background: "url(/static/undraw_access_denied_re_awnf.svg) no-repeat rgba(76, 175, 80, 0.1)"})}"><button class="flex-1 bg-gray-200 text-green-700 py-3 rounded w-full text-center shadow">`);
  _push(serverRenderer.ssrRenderComponent(_component_i_ion_social_github_outline, {class: "inline-block"}, null, _parent));
  _push(` ${serverRenderer.ssrInterpolate(_ctx.isSignIn ? "Log In" : "Sign Up")} with <strong>Github</strong></button><hr class="my-4"><div class="mb-4"><label for="email" class="block font-semibold text-gray-800 mb-2 text-left">Email</label><input id="email" name="email" type="email" class="h-12 px-4 py-2 bg-white rounded shadow-inner border-gray-300 w-full border  hover:border-gray-400" placeholder="Your Email" required${serverRenderer.ssrRenderAttr("value", _ctx.authForm.email)}></div><div class="mb-4"><label for="password" class="block font-semibold text-gray-800 mb-2 text-left">Password</label><input id="password" name="password" type="password" class="h-12 px-4 py-2 bg-white rounded shadow-inner border-gray-300 w-full border hover:border-gray-400" placeholder="Your password. Leave empty for password-less login"${serverRenderer.ssrRenderAttr("value", _ctx.authForm.password)}></div><div class="flex pt-4 gap-2"><button type="submit" class="flex-1 bg-gray-500 border border-gray-600 text-white py-3 rounded w-full text-center shadow">${serverRenderer.ssrInterpolate(_ctx.isSignIn ? "Log In" : "Sign Up")}</button><div class="flex-1 text-right"><small class="block text-gray-600">${serverRenderer.ssrInterpolate(_ctx.isSignIn ? "Not a member yet?" : "Already a member?")}</small><a class="block font-semibold" href="">${serverRenderer.ssrInterpolate(_ctx.isSignIn ? "Sign Up" : "Log In")}</a></div></div></div></form><div class="h-12 w-12 relative">`);
  if (_ctx.loading) {
    _push(serverRenderer.ssrRenderComponent(_component_spinner, null, null, _parent));
  } else {
    _push(`<!---->`);
  }
  _push(`</div></div><!--]-->`);
}
if (typeof block0$1 === "function")
  block0$1(_sfc_main$2);
_sfc_main$2.ssrRender = _sfc_ssrRender$1;
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = new Set())).add("/Users/aftalam/Code/starter-kits/vue-starter-kit/src/pages/index.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
var index = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  default: _sfc_main$2
});
var _sfc_main$1 = vue.defineComponent({
  expose: [],
  __ssrInlineRender: true,
  props: {
    message: String,
    name: {
      type: String,
      required: true
    }
  },
  setup(__props) {
    const props = __props;
    vueRouter.useRouter();
    const {t} = vueI18n.useI18n();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_carbon_pedestrian = vue.resolveComponent("carbon-pedestrian");
      _push(`<div${serverRenderer.ssrRenderAttrs(_attrs)}><p class="text-4xl">`);
      _push(serverRenderer.ssrRenderComponent(_component_carbon_pedestrian, {class: "inline-block"}, null, _parent));
      _push(`</p><p>${serverRenderer.ssrInterpolate(vue.unref(t)("intro.hi", {name: props.name}))}</p><p class="text-sm opacity-50"><em>${serverRenderer.ssrInterpolate(vue.unref(t)("intro.dynamic-route"))}</em></p><div><button class="btn m-3 text-sm mt-8">${serverRenderer.ssrInterpolate(vue.unref(t)("button.back"))}</button></div> Message from API: ${serverRenderer.ssrInterpolate(props.message)}</div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = new Set())).add("/Users/aftalam/Code/starter-kits/vue-starter-kit/src/pages/hi/[name].vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
var _name_ = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  default: _sfc_main$1
});
var _sfc_main = vue.defineComponent({
  props: {
    id: {
      type: String,
      required: true
    }
  }
});
var block0 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<h1${serverRenderer.ssrRenderAttrs(_attrs)}>Profile ${serverRenderer.ssrInterpolate(_ctx.id)}</h1>`);
}
if (typeof block0 === "function")
  block0(_sfc_main);
_sfc_main.ssrRender = _sfc_ssrRender;
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = new Set())).add("/Users/aftalam/Code/starter-kits/vue-starter-kit/src/pages/profile/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var _id_ = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  default: _sfc_main
});
const button$1 = {
  about: "About",
  back: "Back",
  go: "GO",
  home: "Home",
  toggle_dark: "Toggle dark mode",
  toggle_langs: "Change languages"
};
const intro$1 = {
  desc: "Opinionated Vite Starter Template",
  "dynamic-route": "Demo of dynamic route",
  hi: "Hi, {name}!",
  "whats-your-name": "What's your name?"
};
var en = {
  button: button$1,
  intro: intro$1,
  "not-found": "Not found"
};
var en$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  button: button$1,
  intro: intro$1,
  default: en
});
const button = {
  about: "\xC0 propos de",
  back: "Retour",
  go: "Essayer",
  home: "Maison",
  toggle_dark: "Basculer en mode sombre",
  toggle_langs: "Changer de langue"
};
const intro = {
  desc: "Example d'application Vite",
  "dynamic-route": "D\xE9mo de route dynamique",
  hi: "Salut, {name} !",
  "whats-your-name": "Comment t'appelles-tu ?"
};
var fr = {
  button,
  intro,
  "not-found": "Page non trouv\xE9e"
};
var fr$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  button,
  intro,
  default: fr
});
exports.default = main;
