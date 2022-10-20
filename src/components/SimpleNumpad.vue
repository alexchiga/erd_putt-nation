<template>
  <div :class="keyboardClass"></div>
</template>

<script>
import Keyboard from 'simple-keyboard';
import 'simple-keyboard/build/css/index.css';

export default {
  name: 'SimpleNumpad',
  props: {
    keyboardClass: {
      default: 'simple-keyboard',
      type: String,
    },
    input: {
      type: String,
    },
    maxLength: {
      default: 100,
      type: Number,
    },
    layoutName: {
      default: 'default',
      type: String,
    },
    shift: {
      default: false,
      type: Boolean,
    },
  },
  data: () => ({
    keyboard: null,
  }),
  mounted() {
    this.keyboard = new Keyboard(this.keyboardClass, {
      onChange: this.onChange,
      onKeyPress: this.onKeyPress,
      maxLength: this.maxLength,
      layout: {
        default: [
          '1 2 3',
          '4 5 6',
          '7 8 9',
          '0 {bksp}',
        ],
        minus: [
          '1 2 3',
          '4 5 6',
          '7 8 9',
          '{lock} 0 {bksp}',
        ],
      },
      layoutName: this.layoutName,
      display: {
        '{shift}': '⇧',
        '{shiftactivated}': '⇧',
        '{enter}': '↵',
        '{bksp}': '⌫',
        '{space}': ' ',
        '{lock}': '-',
      },
    });
    this.keyboard.setInput(this.input);
  },
  methods: {
    onChange(input) {
      this.$emit('onChange', input);
      this.keyboard.setInput(input);
    },
    onKeyPress(button) {
      this.$emit('onKeyPress', button);

      /**
       * If you want to handle the shift and caps lock buttons
       */
      if (button === '{shift}' || button === '{lock}') this.$emit('shift', !this.shift);
      if (button === '{bksp}' && this.input === '') this.$emit('shift', false);
    },
    handleShift() {
      const currentLayout = this.keyboard.options.layoutName;
      const shiftToggle = currentLayout === 'default' ? 'shift' : 'default';

      this.keyboard.setOptions({
        layoutName: shiftToggle,
      });
    },
  },
  watch: {
    input(input) {
      this.keyboard.setInput(input);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
div
  width: fit-content
  font: inherit
  font-weight: 600
  ::v-deep(.hg-row)
    justify-content: right
    .hg-button
      flex-grow: 0 !important
      width: 70px
      height: 70px
      font-size: 40px
    .hg-button-space
      width: 350px
</style>
