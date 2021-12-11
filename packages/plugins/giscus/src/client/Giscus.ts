import {
  computed,
  defineComponent,
  h,
  onBeforeUnmount,
  onMounted,
  ref,
  watch
} from "vue";
import type { VNode } from "vue";
import type { GiscusOptions } from "../shared";

declare const __GISCUS_OPTIONS__: GiscusOptions;
const options = __GISCUS_OPTIONS__;

export default defineComponent({
  name: "Giscus",

  props: {
    theme: {
      type: String,
      required: false
    },
    lang: {
      type: String,
      required: false
    }
  },

  setup(props) {
    const theme = computed(() => props.theme || options.theme);
    const lang = computed(() => props.lang || options.lang);

    const getScriptElement = () => {
      const element = document.createElement("script");
      element.setAttribute("src", "https://giscus.app/client.js");
      element.setAttribute("data-repo", options.repo);
      element.setAttribute("data-repo-id", options.repoId);
      element.setAttribute("data-category", options.category);
      element.setAttribute("data-category-id", options.categoryId);
      element.setAttribute(
        "data-mapping",
        options.mapping ? options.mapping : "title"
      );
      element.setAttribute(
        "data-reactions-enabled",
        options.reactionsEnabled === false ? "0" : "1"
      );
      element.setAttribute("data-emit-metadata", "0");
      element.setAttribute("data-theme", theme.value ? theme.value : "light");
      element.setAttribute("data-lang", lang.value ? lang.value : "en");
      element.setAttribute(
        "crossorigin",
        options.crossorigin ? options.crossorigin : "anonymous"
      );
      element.setAttribute("async", "true");
      return element;
    };

    const scriptElement = ref<HTMLScriptElement>(getScriptElement());

    watch(
      () => props.theme,
      () => {
        // Hanlde theme switching by removing and re-adding the <script> element
        document.head.removeChild(scriptElement.value);
        scriptElement.value = getScriptElement();
        document.head.appendChild(scriptElement.value);
      }
    );

    onMounted(() => {
      document.head.appendChild(scriptElement.value);
    });

    onBeforeUnmount(() => {
      document.head.removeChild(scriptElement.value);
    });

    return (): VNode =>
      h("div", {
        class: "giscus"
      });
  }
});
