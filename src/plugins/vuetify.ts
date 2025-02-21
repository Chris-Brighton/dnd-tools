import 'vuetify/styles'
import { createVuetify, type IconSet, type IconProps } from 'vuetify'
import { en } from 'vuetify/locale'
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'
import type { VDataTable } from 'vuetify/lib/components/index.mjs'
import { deepOrange, teal, deepPurple } from 'vuetify/util/colors'
const colors = {
  primary: deepOrange.base,
  secondary: teal.accent2,
  accent: deepPurple.base,
}

export type DataTableHeaders = InstanceType<
  typeof VDataTable
>['$props']['headers']

function filename(path: string) {
  return path
    .split(/(\\|\/)/g)
    .pop()!
    .replace(/\.[^/.]+$/, '')
}

const svgIcons = Object.fromEntries(
  Object.entries(
    import.meta.glob('@/assets/icons/*.svg', {
      eager: true,
      query: '?raw',
      import: 'default',
    }),
  ).map(([k, v]) => [filename(k), v]),
)

const custom: IconSet = {
  component: (props: IconProps) =>
    h(props.tag, { innerHTML: svgIcons[props.icon as string] }),
}

export default createVuetify({
  // blueprint: md3,
  locale: {
    locale: 'en',
    fallback: 'en',
    messages: {  en },
  },
  defaults: {
    VAlert: {
      class: 'rounded-0',
    },
    VAutocomplete: {
      color: 'primary',
      density: 'comfortable',
    },
    VBtn: {
      density: 'default',
      class: 'text-capitalize rounded-0 clip-2',
    },
    VCard: {
      density: 'default',
      class: 'rounded-0 clip-4',
      elevation: '2',
    },
    VCheckbox: {
      color: 'primary',
      density: 'comfortable',
    },
    VCombobox: {
      color: 'primary',
      density: 'comfortable',
    },
    VExpansionPanels: {
      rounded: false,
    },
    VFileInput: {
      color: 'primary',
      prependInnerIcon: 'mdi-file-upload',
      prependIcon: '',
      density: 'comfortable',
    },
    VOverlay: {
      opacity: 0.9,
    },
    VRadio: {
      color: 'primary',
      density: 'comfortable',
    },
    VRangeSlider: {
      color: 'primary',
      thumbLabel: 'always',
      thumbColor: 'primary',
      density: 'comfortable',
    },
    VSelect: {
      color: 'primary',
      prependInnerIcon: 'mdi-form-select',
      density: 'comfortable',
    },
    VSheet: {
      class: 'rounded-0',
    },
    VSnackbar: {
      class: 'd-flex',
      rounded: 0,
    },
    VSlider: {
      color: 'primary',
      thumbLabel: 'always',
      thumbColor: 'primary',
    },
    VStepper: {
      class: 'clip-4',
    },
    VSwitch: {
      color: 'primary',
      density: 'comfortable',
    },
    VTab: {
      class: 'text-capitalize text-button',
    },
    VTable: {
      density: 'compact',
    },
    VTooltip: {
      contentClass: 'rounded-0 clip-2',
    },
    VList: {
      density: 'compact',
    },
    VTextField: {
      color: 'primary',
      prependInnerIcon: 'mdi-form-textbox',
      density: 'comfortable',
    },
    VTextarea: {
      color: 'primary',
      prependInnerIcon: 'mdi-form-textarea',
      density: 'comfortable',
    },
    VNavigationDrawer: {
      VList: {
        nav: true,
      },
    },
  },
  theme: {
    defaultTheme: 'dark',
    themes: {
      dark: {
        colors,
      },
    },
  },
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: { mdi, custom },
  },
  display: {
    mobileBreakpoint: 'sm',
  },
})
